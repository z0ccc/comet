// Gets reddit search query URLs
export const getQueries = (url: string) => {
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
  return queries;
};

// Gets list of matching reddit posts
export const getPosts = async (queries: string[]) => {
  const promisesFetch: Promise<Response>[] = [];
  const promisesJson: Promise<Response>[] = [];
  let postArr: string[] = [];

  for (let i = 0; i < queries.length; i++) {
    promisesFetch.push(fetch(queries[i]));
  }

  await Promise.all(promisesFetch).then(async (resFetch: Response[]) => {
    for (let i = 0; i < resFetch.length; i++) {
      promisesJson.push(resFetch[i].json());
    }
    await Promise.all(promisesJson).then((resJson: Response[]) => {
      for (let i = 0; i < resJson.length; i++) {
        if (
          (<any>resJson[i]).kind === 'Listing' &&
          (<any>resJson[i]).data.children.length > 0
        ) {
          postArr = postArr.concat((<any>resJson[i]).data.children);
        }
      }
      postArr = [
        ...new Map(postArr.map((item: any) => [item.data.id, item])).values(),
      ];
      postArr = postArr.sort(compare);
    });
  });
  return postArr;
};

const compare = (a: any, b: any) => b.data.num_comments - a.data.num_comments;

// // Checks if there are posts for the current url
// export const checkPosts = async (queries: string[]) => {
// function checkPosts(postArr, url) {
//   if (postArr.length === 0) {
//     // if (scriptType === 2) {
//     //   document.getElementById('comments').style.display = 'block';
//     //   document.getElementById('redComments').style.display = 'none';
//     //   document.getElementById('redImgWrap').style.display = 'flex';
//     // }
//     const messageEl = document.getElementById('message');
//     messageEl.textContent = '';
//     messageEl.insertAdjacentHTML(
//       'beforeend', `No posts found. <a class="submit" target="_blank" href="https://www.reddit.com/submit?url=${url}">Submit it</a>`
//     );
//   } else {
//     getSubreddits(postArr);
//   }
// }

// Gets and prints list of subreddits
export const getSubreddits = (data: any) => {
  const subreddits: any = [];
  for (let i = 0; i < data.length; i++) {
    subreddits.push({ name: data[i].data.subreddit, commentNum: `(${data[i].data.num_comments})` });
  }

  return subreddits;

  // document
  //   .getElementById('subreddits')
  //   .insertAdjacentHTML(
  //     'beforeend',
  //     `<div class="subreddit" id="${data[i].data.permalink}">${data[i].data.subreddit} (${data[i].data.num_comments})</div>`
  //   );

  // if (i === 0) {
  //   document.getElementById(data[i].data.permalink).style.backgroundColor =
  //     'var(--light-grey)';
  //   document.getElementById(data[i].data.permalink).className +=
  //     ' currentPost';
  //   getPost(data[i], 1);
  // } else {
  //   getPost(data[i], 0);
  // }
};
