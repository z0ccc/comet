/* eslint-disable no-unused-vars */
// This file is injected as a content script
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Test from './Test';
import './popup.css';

document.addEventListener('DOMContentLoaded', () => ytPrepare());
document.addEventListener('yt-navigate-finish', () => ytPrepare());
document.addEventListener('spfdone', () => ytPrepare());
// console.log(window.location.href);

// const observer = new MutationObserver((mutations, me) => {
//   // `mutations` is an array of mutations that occurred
//   // `me` is the MutationObserver instance
//   const mountNode = document.getElementById('comments');
//   if (mountNode) {
//     console.log('mountNode2:');
//     console.log(mountNode);
//     ytPrepare(mountNode);
//     me.disconnect(); // stop observing
//   }
// });

// // start observing
// observer.observe(document, {
//   childList: true,
//   subtree: true,
// });

const ytPrepare = () => {
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
