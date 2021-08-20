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

chrome.runtime.onMessage.addListener((request) => {
  sendVote(request.id);
});

const sendVote = async (postID: string) => {
  const modhash = await getModhash();
  const data = {
    dir: 1,
    id: `t3_${postID}`,
    rank: 2,
    uh: modhash,
  };
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key: any) =>
      formData.append(key, data[key as keyof typeof data]));
  }
  fetch('https://api.reddit.com/api/vote', {
    method: 'POST',
    body: formData,
  });
};

const getModhash = () =>
  fetch('https://api.reddit.com/api/me.json')
    .then((response) => response.json())
    .then((json) => json.data.modhash);
