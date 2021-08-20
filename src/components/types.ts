/* eslint-disable camelcase */
export type SubredditType = {
  id: number;
  name: string;
  commentNum: string;
};

export type PostType = {
  id: string;
  name: string;
  score: string;
  title: string;
  permalink: string;
  date: string;
  author: string;
  likes: boolean;
};

export type CommentType = {
  data: {
    score: number;
    title: string;
    permalink: string;
    created_utc: number;
    author: string;
    subreddit: string;
    num_comments: number;
    id: string;
    parent_id: string;
    children: string[];
    count: number;
    depth: number;
    body_html: string;
    likes: boolean;
    name: string;
    replies: {
      kind: string;
      data: {
        children: CommentType[];
      };
    };
  };
  kind: string;
  length: number;
  depth: number;
};
