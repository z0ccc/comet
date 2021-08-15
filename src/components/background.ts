// This file is ran as a background script
import {
  setIcon,
  getQueries,
  getPostArr,
} from './main';

// Detects if there are posts for current url
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

// Detects if there are posts for current url
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
