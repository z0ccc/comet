const toggleYoutube = () => {
  document.getElementById('redditComments').style.display = 'none'
  document.getElementById('comments').style.display = 'block'
  document.getElementById('redditImgWrap').style.display = 'flex'
  window.scrollBy(0, 1) // youtube comments won't load unless movement is detected
}

const toggleReddit = () => {
  document.getElementById('comments').style.display = 'none'
  document.getElementById('redditImgWrap').style.display = 'none'
  document.getElementById('redditComments').style.display = 'block'
}

export { toggleYoutube, toggleReddit }
