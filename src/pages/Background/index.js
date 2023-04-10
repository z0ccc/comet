import getPosts from '../../utils/getPosts'

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
  fetch('https://api.reddit.com/api/me.json', {
    credentials: 'include',
  })
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
