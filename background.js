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
async function getPosts(queries) {
  const resJsons = await Promise.all(
    queries.map(async (query) => (await fetch(query)).json())
  );
  let postArr = resJsons
    .filter((json) => json.kind === 'Listing' && json.data.children.length > 0)
    .map((json) => json.data.children);

  setIcon(postArr[0]);
  postArr = postArr[0].sort(compare);
  chrome.storage.local.set({ postArr });
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
