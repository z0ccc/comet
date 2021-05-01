chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  getQueries(tab.url);
});

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    getQueries(tabs[0].url);
  });
});

// Gets reddit search query URLs
function getQueries(url) {
  let queries = [];

  chrome.storage.local.set({ url });

  if (url.indexOf('youtube.com/watch?v=') !== -1) {
    queries = [
      `https://api.reddit.com/search/?q=site:youtube.com+OR+site:youtu.be+url:${
        url.split('v=')[1]
      }&include_over_18=on&t=all&sort=top`,
    ];
  } else {
    queries = [
      `https://www.reddit.com/api/info.json?url=${encodeURIComponent(url)}`,
    ];

    if (url.startsWith('https')) {
      queries.push(
        `https://www.reddit.com/api/info.json?url=${encodeURIComponent(
          url.replace('https', 'http')
        )}`
      );
    } else {
      queries.push(
        `https://www.reddit.com/api/info.json?url=${encodeURIComponent(
          url.replace('http', 'https')
        )}`
      );
    }
  }
  getPosts(queries);
}

// Gets list of matching reddit posts
function getPosts(queries) {
  const promisesFetch = [];
  const promisesJson = [];
  let postArr = [];

  for (let i = 0; i < queries.length; i++) {
    promisesFetch.push(fetch(queries[i]));
  }

  Promise.all(promisesFetch).then((resFetch) => {
    for (let i = 0; i < resFetch.length; i++) {
      promisesJson.push(resFetch[i].json());
    }
    Promise.all(promisesJson).then((resJson) => {
      for (let i = 0; i < resJson.length; i++) {
        if (
          resJson[i].kind === 'Listing' &&
          resJson[i].data.children.length > 0
        ) {
          postArr = postArr.concat(resJson[i].data.children);
        }
      }
      setIcon(postArr);
      postArr = postArr.sort(compare);
      chrome.storage.local.set({ postArr });
    });
  });
}

// Sets extension icon based on if there are matching posts
function setIcon(postArr) {
  if (postArr.length === 0) {
    chrome.action.setIcon({
      path: {
        16: 'images/grey_16.png',
      },
    });
  } else {
    chrome.action.setIcon({
      path: {
        16: 'images/reddit_16.png',
      },
    });
  }
}

function compare(a, b) {
  return b.data.num_comments - a.data.num_comments;
}
