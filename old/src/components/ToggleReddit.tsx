import * as React from 'react';

const toggleReddit = () => {
  document.getElementById('comments')!.style.display = 'none';
  document.getElementById('redditImgWrap')!.style.display = 'none';
  document.getElementById('redComments')!.style.display = 'block';
};

const ToggleReddit = () => (
  <button type="button" className="toggleButton" onClick={toggleReddit}>
    <img
      id="redditImg"
      className="toggleImg"
      alt="Youtube toggle icon"
      src={chrome.runtime.getURL('../images/reddit_32.png')}
    />
  </button>
);

export default ToggleReddit;
