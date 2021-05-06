chrome.runtime.onMessage.addListener((msg) => {
  getQueries(msg.url);
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (!clickOnly) {
      getQueries(tab.url);
    }
  });
});

chrome.tabs.onActivated.addListener(() => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (!clickOnly) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        getQueries(tabs[0].url);
      });
    }
  });
});

// Gets reddit search query URLs
function getQueries(url) {
  const queries = [`https://api.reddit.com/submit?url=${url}`];

  if (url.startsWith('https')) {
    queries.push(
      `https://api.reddit.com/submit?url=${url.replace('https', 'http')}`
    );
  } else {
    queries.push(
      `https://api.reddit.com/submit?url=${url.replace('http', 'https')}`
    );
  }

  for (let i = 0; i < 2; i++) {
    if (url.endsWith('/')) {
      queries.push(queries[i].slice(0, -1));
    } else {
      queries.push(`${queries[i]}/`);
    }
  }

  for (let i = 0; i < 4; i++) {
    queries.push(
      queries[i].replace(
        'api.reddit.com/submit?url=',
        'www.reddit.com/api/info.json?url='
      )
    );
  }

  if (url.indexOf('www.youtube.com/watch?v=') !== -1) {
    for (let i = 0; i < 8; i++) {
      queries.push(queries[i].replace('www.youtube.com/watch?v=', 'youtu.be/'));
    }
    queries.push(
      `https://api.reddit.com/search/?q=site:youtube.com+OR+site:youtu.be+url:${
        url.split('v=')[1]
      }&include_over_18=on&t=all&sort=top`
    );
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

  Promise.all(promisesFetch).then(async (resFetch) => {
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

      chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
        if (!clickOnly) {
          setIcon(postArr);
        }
      });
      postArr = [
        ...new Map(postArr.map((item) => [item.data.id, item])).values(),
      ];
      postArr = postArr.sort(compare);
      chrome.storage.local.set({ postArr });
      chrome.runtime.sendMessage({ postArr: 'complete' });
    });
  });
}

function compare(a, b) {
  return b.data.num_comments - a.data.num_comments;
}

// Sets extension icon based on if there are matching posts
function setIcon(postArr) {
  const icon = postArr.length ? 'images/reddit_16.png' : 'images/grey_16.png';
  chrome.action.setIcon({
    path: {
      16: icon,
    },
  });
}
