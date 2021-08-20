import * as React from 'react';
import { PostType } from './types';

interface ComponentProps {
  post: PostType;
}

const handleVote = () => {
  console.log('hello');
};

const Posts = ({ post }: ComponentProps) => (
  <div className="post">
    <div className="postScore">
      <button
        className="arrow up"
        type="button"
        aria-label="Upvote"
        onClick={handleVote}
      />
      <div className="postNumber">{post.score}</div>
      <div className="arrow down" />
    </div>
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
  </div>
);

export default Posts;
