document.addEventListener('DOMContentLoaded', () => ytPrepare());
document.addEventListener('yt-navigate-finish', () => ytPrepare());
document.addEventListener('spfdone', () => ytPrepare());

// prepares the youtube page for reddit comments
function ytPrepare() {
  const ytComments = document.getElementById('comments');
  let redComments = document.getElementById('redComments');
  let redImgWrap = document.getElementById('redImgWrap');

  if (redComments) {
    redComments.remove();
    redImgWrap.remove();
  }

  redComments = document.createElement('div');
  redComments.setAttribute('id', 'redComments');
  redComments.style.backgroundColor = 'transparent';
  redImgWrap = document.createElement('div');
  redImgWrap.setAttribute('id', 'redImgWrap');

  chrome.storage.sync.get('ytDefault', ({ ytDefault }) => {
    if (ytDefault) {
      redComments.style.display = 'none';
      redImgWrap.style.display = 'flex';
    } else {
      ytComments.style.display = 'none';
    }
  });

  redImgWrap.innerHTML = `<img id="redImg" class="toggleImg" src="${chrome.runtime.getURL(
    '../images/grey_32.png'
  )}" height="30px" width="30px"/>`;

  fetch(chrome.runtime.getURL('html/youtube.html'))
    .then((response) => response.text())
    .then((template) => {
      Mustache.parse(template);
      const rendered = Mustache.render(template, {
        image: chrome.runtime.getURL('../images/youtube_32.png'),
      });
      redComments.innerHTML = rendered;
    });

  ytComments.parentNode.insertBefore(redImgWrap, ytComments);
  ytComments.parentNode.insertBefore(redComments, ytComments);

  setTheme();

  getQueries(window.location.href, false);
}
