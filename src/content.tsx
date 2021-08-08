/* eslint-disable no-unused-vars */
// This file is injected as a content script
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Test from './Test';
import CommentToggle from './CommentToggle';
import './popup.css';

document.addEventListener('DOMContentLoaded', () => prepareComments());
document.addEventListener('yt-navigate-finish', () => prepareComments());
document.addEventListener('spfdone', () => prepareComments());

const prepareComments = () => {
  if (window.location.href.includes('watch?v=')) {
    const mountNode = document.getElementById('comments');
    if (mountNode) {
      loadComments(mountNode);
    }
  }
};

const loadComments = (mountNode: HTMLElement | undefined) => {
  const ytComments = document.getElementById('comments');
  let redComments = document.getElementById('redComments');
  let redImgWrap = document.getElementById('redImgWrap');

  if (redComments) {
    redComments.remove();
    redImgWrap!.remove();
  }
  redComments = document.createElement('div');
  redComments.setAttribute('id', 'redComments');
  redComments.style.marginTop = '20px';

  redImgWrap = document.createElement('div');
  redImgWrap.setAttribute('id', 'redImgWrap');

  ytComments!.style.display = 'none';

  mountNode!.parentNode!.insertBefore(redComments, mountNode!);
  mountNode!.parentNode!.insertBefore(redImgWrap, mountNode!);

  ReactDOM.render(<Test />, redComments);
  ReactDOM.render(<CommentToggle />, redImgWrap);
};
