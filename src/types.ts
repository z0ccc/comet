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
  id: string | number;
  kind: string;
  author: string;
  score: string;
  date: string;
  bodyHTML: string;
  depth: number;
};

export type LoadMoreType = {
  id: string;
  kind: string;
  children: string[];
  count: number;
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
    id: number;
    children: string[];
    count: number;
    depth: number;
    body_html: string;
    replies: {
      kind: string;
      data: {
        children: DataType[];
      };
    };
  };
  kind: string;
  length: number;
};

