/* eslint-disable no-unused-vars */
// This file is ran as a background script
import {
  getQueries,
  getPostArr,
  getSubreddits,
  getPosts,
  getCommentArr,
  getComments,
} from './main';

// function setIcon(postArr) {
//   const icon = postArr.length ? 'images/reddit_16.png' : 'images/grey_16.png';
//   chrome.action.setIcon({
//     path: {
//       16: icon,
//     },
//   });
// }

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (!clickOnly) {
      console.log(getQueries(tab.url!));
    }
  });
});

chrome.tabs.onActivated.addListener(() => {
  setTimeout(() => {
    chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
      if (!clickOnly) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          console.log(getQueries(tabs[0].url!));
        });
      }
    });
  }, 500);
});
