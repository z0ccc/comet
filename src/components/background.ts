// This file is ran as a background script
import {
  getQueries,
  getPostArr,
} from './main';

import {
  DataType,
} from './types';

// Changes icon color
const setIcon = (postArr: DataType[]) => {
  const icon = postArr.length ? 'images/reddit_16.png' : 'images/grey_16.png';
  chrome.action.setIcon({
    path: {
      16: icon,
    },
  });
};

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (!clickOnly) {
      const queries: string[] = getQueries(tab.url!);
      getPostArr(queries).then((postArr) => {
        setIcon(postArr);
      });
    }
  });
});

chrome.tabs.onActivated.addListener(() => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (!clickOnly) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const queries: string[] = getQueries(tabs[0].url!);
        getPostArr(queries).then((postArr) => {
          setIcon(postArr);
        });
      });
    }
  });
});
