/* eslint-disable no-unused-vars */
// This file is injected as a content script
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Test from './Test';
import './popup.css';

const observer = new MutationObserver((mutations, me) => {
  // `mutations` is an array of mutations that occurred
  // `me` is the MutationObserver instance
  const mountNode = document.getElementById('comments');
  if (mountNode) {
    ytPrepare(mountNode);
    me.disconnect(); // stop observing
  }
});

// start observing
observer.observe(document, {
  childList: true,
  subtree: true,
});

const ytPrepare = (mountNode: HTMLElement | undefined) => {
  const redComments = document.createElement('redComments');
  redComments.innerHTML = 'Hello World!';
  mountNode!.parentNode!.insertBefore(redComments, mountNode!);
  document.getElementById('comments')!.style.display = 'none';
  ReactDOM.render(<Test />, redComments);
};
