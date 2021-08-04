export type SubredditType = {
  id: number;
  name: string;
  commentNum: string;
};

export type PostType = {
  id: number;
  score: string;
  title: string;
  permalink: string;
  date: string;
  author: string;
};

export type CommentType = {
  index: number;
  id: string;
  author: string;
  score: string;
  date: string;
  bodyHTML: string;
  depth: number;
};

export type DataType = {
  data: {
    score: number;
    title: string;
    permalink: string;
    created_utc: number;
    author: string;
    subreddit: string;
    num_comments: number;
  };
  length: number;
};

