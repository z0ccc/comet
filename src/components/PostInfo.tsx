import * as React from 'react';
import { DataType } from './types';
import { convertDate, decodeHtml } from './main';

interface ComponentProps {
  post: DataType;
}

const Posts = ({ post }: ComponentProps) => (
  <div className="postInfo">
    <a
      href={`https://reddit.com${post.data.permalink}`}
      target="_blank"
      className="postTitle"
      rel="noreferrer"
    >
      {decodeHtml(post.data.title)}
    </a>
    <div className="infoPostWrap">
      <div className="info">
        {convertDate(post.data.created_utc)} by{' '}
        <a
          className="postAuthor"
          href={`https://reddit.com/u/${post.data.author}`}
          target="_blank"
          rel="noreferrer"
        >
          {post.data.author}
        </a>
      </div>
    </div>
  </div>
);

export default Posts;
