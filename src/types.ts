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
  index: number,
  id: string,
  parentID: string | null,
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
