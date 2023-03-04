import getPosts from '../../utils/getPosts'

const setIcon = (postCount) => {
  const icon = postCount ? '../icon48.png' : '../iconGrey48.png'
  chrome.action.setIcon({
    path: {
      48: icon,
    },
  })
}

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  getPosts(tab.url).then((posts) => {
    setIcon(posts.length)
  })
})

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    getPosts(tabs[0].url).then((posts) => {
      setIcon(posts.length)
    })
  })
})
