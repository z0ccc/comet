importScripts('js/main.js');

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (!clickOnly) {
      getQueries(tab.url, true);
    }
  });
});

chrome.tabs.onActivated.addListener(() => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (!clickOnly) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        getQueries(tabs[0].url, true);
      });
    }
  });
});
