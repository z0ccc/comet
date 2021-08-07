/* eslint-disable no-unused-vars */
// This file is injected as a content script
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Test from './Test';
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
  let redComments = document.getElementById('redComments');
  if (redComments) {
    redComments.remove();
  }
  redComments = document.createElement('div');
  redComments.setAttribute('id', 'redComments');
  mountNode!.parentNode!.insertBefore(redComments, mountNode!);
  document.getElementById('comments')!.style.display = 'none';
  ReactDOM.render(<Test />, redComments);
};
