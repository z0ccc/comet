export type SubredditType = {
  id: number,
  name: string;
  commentNum: string;
};

export type PostType = {
  id: number,
  score: string,
  title: string,
  permalink: string,
  date: string,
  author: string,
};

export type CommentType = {
  id: number,
  author: string,
  score: string,
  date: string,
  bodyHTML: string,
};

// export type LoadMoreType = {
//   id: number,
//   title: string,
//   id: number,
// };
