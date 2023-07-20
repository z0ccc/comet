import { setIcon } from '../../utils/setIcon'
import { readStorage } from '../../utils/storage'
import { isFirefox } from '../../utils/constants'
import fetchPosts from './fetchPosts'
import { getModhash, sendVote, sendReply, savePost } from './userFunctions'

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
    Promise.all([fetchPosts(request.url), getModhash()])
      .then((response) => {
        sendResponse({ posts: response[0], modhash: response[1] })
      })
      .catch((error) => {
        sendResponse({ error })
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

if (!isFirefox) {
  chrome.storage.local.get(['sidePanelDefault'], (storage) => {
    if (storage.sidePanelDefault) {
      chrome.sidePanel
        .setPanelBehavior({ openPanelOnActionClick: true })
        .catch((error) => console.error(error))
    }
  })
}
