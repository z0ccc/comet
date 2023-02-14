// This file is ran as a background script
import { setIcon, getQueries, getPostArr, getCommentArr } from './main';
import { DataType } from './types';

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

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.queries) {
    getPostArr(request.queries)
      .then((postArr) => {
        sendResponse({ postArr });
      })
      .catch(() => sendResponse('err'));
  } else if (request.children) {
    const promisesFetch: Promise<DataType[]>[] = [];
    for (let i = 0; i < request.children.length; i++) {
      promisesFetch.push(
        getCommentArr(request.permalink + request.children[i])
      );
    }
    Promise.all(promisesFetch).then((value) => {
      sendResponse({ value });
    });
  } else if (request.permalink) {
    getCommentArr(request.permalink).then((commentArr) => {
      sendResponse({ commentArr });
    });
  } else if (request.id) {
    sendVote(request.id, request.dir);
  }
  return true;
});

// sends vote to Reddit api
const sendVote = async (id: string, dir: number) => {
  const modhash = await getModhash();
  const data = {
    dir,
    id,
    rank: 2,
    uh: modhash,
  };
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) =>
      formData.append(key, data[key as keyof typeof data])
    );
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
