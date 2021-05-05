chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg.url);
  asyncMessage(msg.url).then(sendResponse);
  return true;
});

async function asyncMessage(url) {
  await getQueries(url, true);
}

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (clickOnly === false) {
      getQueries(tab.url, false);
    }
  });
});

chrome.tabs.onActivated.addListener(() => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    if (clickOnly === false) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        getQueries(tabs[0].url, false);
      });
    }
  });
});

// Gets reddit search query URLs
async function getQueries(url, clickOnly) {
  chrome.storage.local.set({ url });
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
  }
  await getPosts(queries, clickOnly);
}

// Gets list of matching reddit posts
async function getPosts(queries, clickOnly) {
  const promisesFetch = [];
  const promisesJson = [];
  let postArr = [];

  for (let i = 0; i < queries.length; i++) {
    promisesFetch.push(fetch(queries[i]));
  }

  await Promise.all(promisesFetch).then(async (resFetch) => {
    for (let i = 0; i < resFetch.length; i++) {
      promisesJson.push(resFetch[i].json());
    }
    await Promise.all(promisesJson).then((resJson) => {
      for (let i = 0; i < resJson.length; i++) {
        if (
          resJson[i].kind === 'Listing' &&
          resJson[i].data.children.length > 0
        ) {
          postArr = postArr.concat(resJson[i].data.children);
        }
      }
      if (clickOnly === false) {
        setIcon(postArr);
      }
      postArr = [
        ...new Map(postArr.map((item) => [item.data.id, item])).values(),
      ];

      postArr = postArr.sort(compare);
      chrome.storage.local.set({ postArr });
    });
  });
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

function compare(a, b) {
  return b.data.num_comments - a.data.num_comments;
}
