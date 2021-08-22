import * as React from 'react';
import { PostType } from './types';

interface ComponentProps {
  post: PostType;
}

const Posts = ({ post }: ComponentProps) => (
  <div className="postInfo">
    <a
      href={`https://reddit.com${post.permalink}`}
      target="_blank"
      className="postTitle"
      rel="noreferrer"
    >
      {post.title}
    </a>
    <div className="infoPostWrap">
      <div className="info">
        {post.date} by{' '}
        <a
          className="postAuthor"
          href={`https://reddit.com/u/${post.author}`}
          target="_blank"
          rel="noreferrer"
        >
          {post.author}
        </a>
      </div>
    </div>
  </div>
);

export default Posts;
