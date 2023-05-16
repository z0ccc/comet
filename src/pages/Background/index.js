const getPosts = async (url) => {
  const urls = getUrls(url)
  const redditUrls = [
    'https://api.reddit.com/submit?url=',
    'https://www.reddit.com/api/info.json?url=',
  ]

  let responses = await Promise.all(
    redditUrls
      .map((redditUrl) =>
        urls.map(async (url) => await (await fetch(redditUrl + url)).json())
      )
      .flat()
  )

  const youtubeVideoString = 'www.youtube.com/watch?v='
  const youtubeIdIndex = url.indexOf(youtubeVideoString)

  if (youtubeIdIndex !== -1) {
    let youtubeId
    if (url.indexOf('&') === -1) {
      youtubeId = url.substring(youtubeIdIndex + youtubeVideoString.length)
    } else {
      youtubeId = url.substring(
        youtubeIdIndex + youtubeVideoString.length,
        url.lastIndexOf('&')
      )
    }
    const searchResponse = await fetch(
      `https://www.reddit.com/search.json?q=url%3A%27${youtubeId}%27&sort=top&type=link`
    )
    responses.push(await searchResponse.json())
  }

  // https://hn.algolia.com/api/v1/search?query=https://hn.algolia.com/&restrictSearchableAttributes=url&typoTolerance=false

  const hidePosts = await readStorage('hidePosts')

  let posts = responses
    .filter(
      (response) =>
        response.kind === 'Listing' && response.data.children.length > 0
    )
    .reduce((acc, val) => acc.concat(val.data.children), [])
    .reduce((acc, val) => acc.concat(val.data), [])
    .filter((post) => post.num_comments >= (hidePosts ? 1 : 0))

  posts = posts.sort(compare)

  posts = [...new Map(posts.map((post) => [post.id, post])).values()]

  return posts
}

const getUrls = (url) => {
  const urls = [url]

  url.startsWith('https')
    ? urls.push(url.replace('https', 'http'))
    : urls.push(url.replace('http', 'https'))

  urls.forEach((url) => {
    url.endsWith('/') ? urls.push(url.slice(0, -1)) : urls.push(url + '/')
  })

  if (url.indexOf('www.youtube.com/watch?v=') !== -1) {
    urls.forEach((url) => {
      urls.push(url.replace('www.youtube.com/watch?v=', 'youtu.be/'))
    })
  }

  return urls
}

const readStorage = async (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], function (result) {
      resolve(result[key])
    })
  })
}

const compare = (a, b) => b.num_comments - a.num_comments
const updateIcon = async (url) => {
  const noPopupCheck = await getStorageValue('noPopupCheck')
  if (!noPopupCheck) {
    const posts = await getPosts(url)
    const icon = posts.length ? '../icon48.png' : '../iconGrey48.png'
    setBrowserActionIcon(icon)
  }
}

const getStorageValue = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (storage) => {
      resolve(storage[key])
    })
  })
}

const setBrowserActionIcon = (icon) => {
  chrome.action.setIcon({
    path: {
      48: icon,
    },
  })
}

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  updateIcon(tab.url)
})

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    updateIcon(tabs[0].url)
  })
})

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.url) {
    getPosts(request.url)
      .then((posts) => {
        getModhash().then((modhash) => {
          sendResponse({ posts, modhash: modhash })
        })
      })
      .catch(() => {
        sendResponse(-1)
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
