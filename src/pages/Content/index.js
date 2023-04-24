// This file is injected as a content script
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../../theme'
import App from '../../components/App'
import CommentToggle from '../../components/CommentToggle'

const prepareComments = () => {
  if (window.location.href.includes('watch?v=')) {
    const mountNode = document.getElementById('comments')
    if (mountNode) {
      loadComments(mountNode)
    }
  }
}

const loadComments = (mountNode) => {
  const ytComments = document.getElementById('comments')
  let redditComments = document.getElementById('redditComments')
  let redditImgWrap = document.getElementById('redditImgWrap')

  if (redditComments) {
    redditComments.remove()
    redditImgWrap.remove()
  }

  redditComments = document.createElement('div')
  redditComments.setAttribute('id', 'redditComments')
  redditComments.style.marginTop = '16px'

  redditImgWrap = document.createElement('div')
  redditImgWrap.setAttribute('id', 'redditImgWrap')

  chrome.storage.sync.get('commentDefault', ({ commentDefault }) => {
    if (commentDefault) {
      redditComments.style.display = 'none'
      redditImgWrap.style.display = 'flex'
    } else {
      ytComments.style.display = 'none'
    }
  })

  mountNode.parentNode.insertBefore(redditComments, mountNode)
  mountNode.parentNode.insertBefore(redditImgWrap, mountNode)

  chrome.storage.sync.get('sort', ({ sort }) => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <App url={window.location.href} />
      </ThemeProvider>,
      redditComments
    )
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CommentToggle />
      </ThemeProvider>,
      redditImgWrap
    )
  })
}

document.addEventListener('DOMContentLoaded', () => prepareComments())
document.addEventListener('yt-navigate-finish', () => prepareComments())
document.addEventListener('spfdone', () => prepareComments())

prepareComments()
