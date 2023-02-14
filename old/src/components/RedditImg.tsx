import * as React from 'react';
import { toggleYoutube } from './main';

const RedditImg = () => (
  <button type="button" className="toggleButton" onClick={toggleYoutube}>
    <img
      id="redditImg"
      className="toggleImg"
      alt="Youtube toggle icon"
      src={chrome.runtime.getURL('../images/youtube_32.png')}
    />
  </button>
);

export default RedditImg;
