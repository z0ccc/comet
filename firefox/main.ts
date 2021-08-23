import { SubredditType, PostType, DataType, CommentListType } from './types';

// Changes icon color
export const setIcon = (postArr: DataType[]) => {
  const icon = postArr.length
    ? '../images/reddit_16.png'
    : '../images/grey_16.png';
  chrome.browserAction.setIcon({
    path: {
      16: icon,
    },
  });
};

export const handleClickOnly = () => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    const value = !clickOnly;
    chrome.storage.sync.set({ clickOnly: value });
    if (value === true) {
      chrome.browserAction.setIcon({
        path: {
          16: '../images/reddit_16.png',
        },
      });
    }
  });
};

export const toggleYoutube = () => {
  document.getElementById('redComments')!.style.display = 'none';
  document.getElementById('comments')!.style.display = 'block';
  document.getElementById('redditImgWrap')!.style.display = 'flex';
  window.scrollBy(0, 1); // youtube comments won't load unless movement is detected
};

export const detectTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // OS theme setting detected as dark
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  chrome.storage.sync.get('theme', ({ theme }) => {
    // local storage is used to override OS theme settings
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  });
};

// Gets reddit search query URLs
export const getQueries = (url: string): string[] => {
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
export const getPostArr = async (queries: string[]): Promise<DataType[]> => {
  const promisesFetch: Promise<Response>[] = [];
  const promisesJson: Promise<Response>[] = [];
  let postArr: DataType[] = [];

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
        ...new Map(
          postArr.map((item: DataType) => [item.data.id, item])
        ).values(),
      ];
      postArr = postArr.sort(compare);
    });
  });
  return postArr;
};

const compare = (a: DataType, b: DataType): number =>
  b.data.num_comments - a.data.num_comments;

// Gets and prints list of subreddits
export const getSubreddits = (data: DataType[]): SubredditType[] => {
  const subreddits: SubredditType[] = [];
  for (let i = 0; i < data.length; i++) {
    subreddits.push({
      id: i,
      name: data[i].data.subreddit,
      commentNum: `(${data[i].data.num_comments})`,
    });
  }
  return subreddits;
};

// Gets and print post info
export const getPosts = (data: DataType[]): PostType[] => {
  const posts: PostType[] = [];
  for (let i = 0; i < data.length; i++) {
    posts.push({
      id: i,
      score: formatNumber(data[i].data.score),
      title: decodeHtml(data[i].data.title),
      permalink: data[i].data.permalink,
      date: convertDate(data[i].data.created_utc),
      author: data[i].data.author,
    });
  }
  return posts;
};

// Gets list of comments from post
export const getCommentArr = async (permalink: string): Promise<DataType[]> => {
  let commentArr: DataType[] = [];
  await fetch(`https://api.reddit.com${permalink}`)
    .then((response) => response.json())
    .then((json) => {
      if (
        json &&
        json[1] &&
        json[1].kind === 'Listing' &&
        json[1].data &&
        json[1].data.children.length
      ) {
        commentArr = json[1].data.children;
      }
    });
  return commentArr;
};

// Gets and print post info
export const getComments = (data: DataType[]): CommentListType[] => {
  const comments: CommentListType[] = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].kind === 'more') {
      comments.push({
        id: `${data[i].data.children[0]}0`,
        kind: data[i].kind,
        children: data[i].data.children,
        count: data[i].data.count,
        depth: data[i].data.depth,
      });
    } else {
      const bodyHTML: string = decodeHtml(data[i].data.body_html).replace(
        '<a href=',
        '<a target="_blank" href='
      );
      comments.push({
        id: data[i].data.id,
        kind: data[i].kind,
        author: data[i].data.author,
        score: formatNumber(data[i].data.score),
        date: convertDate(data[i].data.created_utc),
        bodyHTML,
        depth: data[i].data.depth,
      });
      if (
        data[i].kind === 't1' &&
        data[i].data.replies &&
        data[i].data.replies.kind === 'Listing' &&
        data[i].data.replies.data.children
      ) {
        comments.push(getComments(data[i].data.replies.data.children));
      }
    }
  }
  return comments.flat(Infinity);
};

const decodeHtml = (html: string): string => {
  const txt: HTMLTextAreaElement = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const formatNumber = (num: number) =>
  Math.abs(num) > 9999
    ? `${(Math.sign(num) * (Math.abs(num) / 1000)).toFixed(0)}k`
    : `${Math.sign(num) * Math.abs(num)}`;

const convertDate = (timestamp: number) => {
  let diff: number = Date.now() - timestamp * 1000;

  if (diff < 1000) {
    return 'just now';
  }

  diff /= 1000;
  if (diff < 60) {
    return `${Math.trunc(diff)} second${diff === 1 ? '' : 's'} ago`;
  }

  diff /= 60;
  if (diff < 60) {
    return `${Math.trunc(diff)} minute${diff === 1 ? '' : 's'} ago`;
  }

  diff /= 60;
  if (diff < 24) {
    return `${Math.trunc(diff)} hour${diff === 1 ? '' : 's'} ago`;
  }

  diff /= 24;
  if (diff < 7) {
    return `${Math.trunc(diff)} day${diff === 1 ? '' : 's'} ago`;
  }

  diff /= 7;
  if (diff < 4) {
    return `${Math.trunc(diff)} week${diff === 1 ? '' : 's'} ago`;
  }

  diff /= 4;
  if (diff < 13) {
    return `${Math.trunc(diff)} month${diff === 1 ? '' : 's'} ago`;
  }

  diff /= 12;
  return `${Math.trunc(diff)} year${diff === 1 ? '' : 's'} ago`;
};
