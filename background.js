'use strict';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
//   console.log(window.location.href);
// });

// chrome.tabs.onUpdated.addListener( async function (tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete') {
//     chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//       let url = tabs[0].url;
//       url = url.replace('https://','');
//       url = url.replace('http://','');
//       url = url.replace('www.','');
//       console.log(url);
//       let postList = findPosts(url);
//       // showPosts(postList);
//       chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//         console.log(response.farewell);
//       });
//     });
//   }
// })

// async function showPosts(postList) {
//   let posts = await postList;
//   console.log(posts);
//   posts.map(async (item) => {
//     console.log(item.data.subreddit);
//   });
//   console.log(posts)
//   // console.log(Promise.all(postList));

// }


// async function findPosts(url) {

//   let result = await fetch('https://api.reddit.com/search/?q=url:' + url + '&include_over_18=on&t=all&sort=top&limit=20', {mode: 'cors'});

//   if (result.status === 200 ) {
//     let json = await result.json();
//     if( json && json.kind === 'Listing' && json.data.children.length > 0 ) {
//       return json.data.children;
//     }
//   }
// }