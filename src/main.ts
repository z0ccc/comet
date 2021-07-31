import { SubredditType, PostType, CommentType } from './types';

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
export const getPostArr = async (queries: string[]) => {
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

// Gets and prints list of subreddits
export const getSubreddits = (data: any) => {
  const subreddits: SubredditType[] = [];
  for (let i = 0; i < data.length; i++) {
    subreddits.push({ id: i, name: data[i].data.subreddit, commentNum: `(${data[i].data.num_comments})` });
  }
  return subreddits;
};

// Gets and print post info
export const getPosts = (data: any) => {
  const posts: PostType[] = [];
  for (let i = 0; i < data.length; i++) {
    posts.push({
      id: i, score: formatNumber(data[i].data.score), title: decodeHtml(data[i].data.title), permalink: data[i].data.permalink, date: convertDate(data[i].data.created_utc), author: data[i].data.author
    });
  }
  return posts;
};

// Gets list of comments from post
export const getCommentArr = async (permalink: string) => {
  let commentArr: string[] = [];
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
export const getComments = (data: any, topLevel: boolean) => {
  const comments: CommentType[] = [];
  let bodyHTML: string;
  let parentID: string | null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].kind === 'more') {
      // console.log(data[i]);
    } else {
      // getReplies(data[i]);
      bodyHTML = decodeHtml(data[i].data.body_html).replace(
        '<a href=',
        '<a target="_blank" href='
      );
      if (topLevel) {
        parentID = null;
      } else {
        parentID = data[i].data.parent_id.substring(3);
      }
      comments.push({
        index: i, id: data[i].data.id, parentID, author: data[i].data.author, score: formatNumber(data[i].data.score), date: convertDate(data[i].data.created_utc), bodyHTML
      });
    }
  }
  return comments;
};

// Gets replies to comments
export const getReplies = (comment: any) => {
  if (
    comment.kind === 't1' &&
    comment.data.replies &&
    comment.data.replies.kind === 'Listing' &&
    comment.data.replies.data.children
  ) {
    // console.log(comment.data.replies.data.children);
    return getComments(comment.data.replies.data.children.reverse(), false);
    // return comment.data.replies.data.children;
  }
  return null;
};

const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const formatNumber = (num: number) => (Math.abs(num) > 9999
  ? `${(Math.sign(num) * (Math.abs(num) / 1000)).toFixed(0)}k`
  : `${Math.sign(num) * Math.abs(num)}`);

const convertDate = (timestamp: number) => {
  let diff: number = Date.now() - timestamp * 1000;

  if (diff < 1000) {
    return 'just now';
  }

  diff /= 1000;
  if (diff < 60) {
    return `${Math.trunc(diff)} second${
      diff === 1 ? '' : 's'
    } ago`;
  }

  diff /= 60;
  if (diff < 60) {
    return `${Math.trunc(diff)} minute${
      diff === 1 ? '' : 's'
    } ago`;
  }

  diff /= 60;
  if (diff < 24) {
    return `${Math.trunc(diff)} hour${
      diff === 1 ? '' : 's'
    } ago`;
  }

  diff /= 24;
  if (diff < 7) {
    return `${Math.trunc(diff)} day${
      diff === 1 ? '' : 's'
    } ago`;
  }

  diff /= 7;
  if (diff < 4) {
    return `${Math.trunc(diff)} week${
      diff === 1 ? '' : 's'
    } ago`;
  }

  diff /= 4;
  if (diff < 13) {
    return `${Math.trunc(diff)} month${
      diff === 1 ? '' : 's'
    } ago`;
  }

  diff /= 12;
  return `${Math.trunc(diff)} year${diff === 1 ? '' : 's'} ago`;
};
