import { setIcon } from '../../utils/setIcon'

// https://hn.algolia.com/api/v1/search?query=https://hn.algolia.com/&restrictSearchableAttributes=url&typoTolerance=false

const YOUTUBE_BASE = 'www.youtube.com/watch?v='

const fetchPosts = async (url) => {
  const hidePosts = await readStorage('hidePosts')

  const youtubeIdIndex = url.indexOf(YOUTUBE_BASE)
  const isYoutube = youtubeIdIndex !== -1

  const cleanedUrl = cleanUrl(url)

  let responses

  if (isYoutube) {
    const youtubeId = getYoutubeId(youtubeIdIndex, url)
    responses = [await fetchSearchApi(youtubeId)]
  } else {
    responses = await Promise.all([
      fetchSearchApi(cleanedUrl),
      fetchSubmitApi(cleanedUrl),
    ])
  }

  const posts = processResponses(responses, cleanedUrl, isYoutube, hidePosts)

  return posts
}

// Retrieves stored data from Chrome's local storage
const readStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (storage) => {
      resolve(storage[key])
    })
  })
}

// Fetches Reddit data based on a Youtube video ID
const fetchSearchApi = async (searchString) => {
  const response = await fetch(
    `https://www.reddit.com/search.json?q=url%3A%27${searchString}%27&include_over_18=on&sort=top&type=link`
  )
  return await response.json()
}

// Fetches Reddit data directly from a sanitized URL
const fetchSubmitApi = async (url) => {
  const response = await fetch(
    `https://www.reddit.com/submit.json?url=${cleanUrl(url)}`
  )
  return await response.json()
}

// Sanitizes URL by removing http and https protocols
const cleanUrl = (url) => {
  const urlNoSlash = url.endsWith('/') ? url.slice(0, -1) : url
  const urlNoProtocol = urlNoSlash.replace(/(^\w+:|^)\/\//, '')
  const urlNoHash = urlNoProtocol.split('#')[0]
  return urlNoHash
}

// Extracts Youtube ID from a URL
const getYoutubeId = (youtubeIdIndex, url) => {
  return url.indexOf('&') === -1
    ? url.substring(youtubeIdIndex + YOUTUBE_BASE.length)
    : url.substring(youtubeIdIndex + YOUTUBE_BASE.length, url.lastIndexOf('&'))
}

// Process the fetch response, filter and reduce posts
const processResponses = (responses, cleanedUrl, isYoutube, hidePosts) => {
  let posts = responses
    .filter(
      (response) =>
        response.kind === 'Listing' && response.data.children.length > 0
    )
    .reduce((acc, val) => acc.concat(val.data.children), [])
    .reduce((acc, val) => acc.concat(val.data), [])
    .filter((post) => post.num_comments >= (hidePosts ? 1 : 0))

  if (!isYoutube) {
    posts = posts.filter((post) => cleanUrl(post.url) === cleanedUrl)
  }

  posts = [...new Map(posts.map((post) => [post.id, post])).values()]

  posts = posts.sort(compareComments)

  return posts
}

// Compare function for sorting posts based on number of comments
const compareComments = (a, b) => b.num_comments - a.num_comments

const updateIcon = async (url) => {
  const noPopupCheck = await readStorage('noPopupCheck')
  if (!noPopupCheck) {
    const posts = await fetchPosts(url)
    const icon = posts.length ? '../icon48.png' : '../iconGrey48.png'
    setIcon(icon)
  }
}

const handleWebNavigation = (e) => {
  if (e.frameType === 'outermost_frame' || e.frameId === 0) {
    updateIcon(e.url)
  }
}

chrome.webNavigation.onHistoryStateUpdated.addListener(handleWebNavigation)

chrome.webNavigation.onBeforeNavigate.addListener(handleWebNavigation)

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    updateIcon(tabs[0].url)
  })
})

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.url) {
    fetchPosts(request.url).then((posts) => {
      getModhash().then((modhash) => {
        sendResponse({ posts, modhash })
      })
    })
    return true
  }

  if (request.voteId) {
    sendVote(request.voteId, request.direction)
  }

  if (request.replyId) {
    sendReply(request.replyId, request.replyText).then((response) => {
      sendResponse(response)
    })
    return true
  }

  if (request.saveId) {
    savePost(request.saveId, request.action).then((response) => {
      sendResponse(response)
    })
    return true
  }
})

const getModhash = () =>
  fetch('https://api.reddit.com/api/me.json', { cache: 'no-cache' })
    .then((response) => response.json())
    .then((json) => json.data.modhash)
    .catch((err) => err)

// Helper function to build URL with query parameters
const buildURL = (baseURL, queryParams) => {
  const url = new URL(baseURL)
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, queryParams[key])
  )
  return url
}

// sends vote to Reddit api
const sendVote = async (id, dir) => {
  const modhash = await getModhash()
  if (!modhash) return

  const queryParams = {
    dir,
    id,
    rank: 2,
    uh: modhash,
  }

  const url = buildURL('https://www.reddit.com/api/vote.json', queryParams)

  const response = await fetch(url, {
    method: 'POST',
  })
  return response.json()
}

// sends a reply to a post
const sendReply = async (replyId, text) => {
  const modhash = await getModhash()
  const queryParams = {
    api_type: 'json',
    text,
    thing_id: replyId,
    uh: modhash,
  }

  const url = buildURL('https://www.reddit.com/api/comment.json', queryParams)

  const response = await fetch(url, {
    method: 'POST',
  })

  return response.json()
}

const savePost = async (id, action) => {
  const modhash = await getModhash()
  const queryParams = {
    id,
    uh: modhash,
  }

  const url = buildURL(`https://www.reddit.com/api/${action}.json`, queryParams)

  const response = await fetch(url, {
    method: 'POST',
  })

  if (response.ok) {
    return { success: true }
  } else {
    const error = await response.text()
    return { error }
  }
}
