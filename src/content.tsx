/* eslint-disable no-unused-vars */
// This file is injected as a content script
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Test from './Test';
import './popup.css';

if (window.location.href.includes('watch?v=')) {
  document.addEventListener('yt-navigate-finish', () => {
    const mountNode = document.getElementById('comments');
    if (mountNode) {
      ytPrepare(mountNode);
    }
  });
}
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

const ytPrepare = (mountNode: HTMLElement | undefined) => {
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
