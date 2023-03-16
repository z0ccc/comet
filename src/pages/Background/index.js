import getPosts from '../../utils/getPosts'

const setIcon = (url) => {
  chrome.storage.local.get(['noPopupCheck'], (storage) => {
    if (!storage.noPopupCheck) {
      getPosts(url).then((posts) => {
        const icon = posts.length ? '../icon48.png' : '../iconGrey48.png'
        chrome.action.setIcon({
          path: {
            48: icon,
          },
        })
      })
    }
  })
}

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  setIcon(tab.url)
})

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    setIcon(tabs[0].url)
  })
})

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.id) {
    sendVote(request.id, request.direction)
  }
})

// sends vote to Reddit api
const sendVote = async (id, dir) => {
  const modhash = await getModhash()
  const data = {
    dir,
    id,
    rank: 2,
    uh: modhash,
  }

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => formData.append(key, data[key]))
  }

  fetch('https://api.reddit.com/api/vote', {
    method: 'POST',
    body: formData,
  })
}

const getModhash = () =>
  fetch('https://api.reddit.com/api/me.json')
    .then((response) => response.json())
    .then((json) => json.data.modhash)
