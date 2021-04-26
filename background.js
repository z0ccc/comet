chrome.tabs.onActivated.addListener(function (tabId, change, tab) {
  checkURL();
});

chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
  checkURL();
});

function checkURL() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    getPosts(tabs[0].url);
  });
}

async function getPosts(url) {
  var result, path;
  let urls = [];

  if (url.indexOf("youtube.com/watch?v=") != -1) {
    path = url.split("v=");
    urls = [
      "https://api.reddit.com/search/?q=site:youtube.com+OR+site:youtu.be+url:" +
        path[1] +
        "&include_over_18=on&t=all&sort=top",
    ];
  } else {
    urls = [
      "https://www.reddit.com/api/info.json?url=" + encodeURIComponent(url),
    ];

    if (url.startsWith("https")) {
      urls.push(
        "https://www.reddit.com/api/info.json?url=" +
          encodeURIComponent(url.replace("https", "http"))
      );
    } else {
      urls.push(
        "https://www.reddit.com/api/info.json?url=" +
          encodeURIComponent(url.replace("http", "https"))
      );
    }
  }

  let postList = [];
  for (var i = 0; i < urls.length; ++i) {
    result = await fetch(urls[i]);
    let json = await result.json();
    if (json && json.kind === "Listing" && json.data.children.length > 0) {
      let data = await Promise.all(json.data.children);
      postList = postList.concat(data);
    }
  }


  if (postList.length == 0) {
    // chrome.browserAction.setIcon({path: "/images/grey_16.png"});
    chrome.storage.local.set({ url });
  } else {
    postList = postList.sort(compare);
  }
  chrome.storage.local.set({ postList });
}

function compare(a, b) {
  if (a.data.num_comments < b.data.num_comments) {
    return 1;
  }
  if (a.data.num_comments > b.data.num_comments) {
    return -1;
  }
  return 0;
}
