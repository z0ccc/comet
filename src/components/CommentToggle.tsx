/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import * as React from 'react';

const toggle = () => {
  document.getElementById('comments')!.style.display = 'none';
  document.getElementById('redImgWrap')!.style.display = 'none';
  document.getElementById('redComments')!.style.display = 'block';
};

const CommentToggle = () => {
  return (
    <button type="submit" className="toggleButton" onClick={toggle}>
      <img
        id="redImg"
        className="toggleImg"
        alt="Youtube toggle icon"
        src={chrome.runtime.getURL('../images/grey_32.png')}
      />
    </button>
  );
};

export default CommentToggle;
