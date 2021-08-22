/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { PostType } from './types';
import { getVote, getDir } from './main';
import PostInfo from './PostInfo';

interface ComponentProps {
  post: PostType;
}

const Posts = ({ post }: ComponentProps) => {
  const [vote, setVote] = useState<number>(0);

  useEffect(() => {
    setVote(getVote(post.likes));
  }, []);

  const handleVote = (voteDir: number) => {
    const dir: number = getDir(voteDir, vote);
    chrome.runtime.sendMessage({ id: post.name, dir });
    setVote(dir);
  };

  return (
    <div className="post">
      <div className="postScore">
        <button
          className={`arrow ${vote === 1 ? 'upmod' : 'up'}`}
          type="button"
          aria-label="Upvote"
          onClick={() => handleVote(1)}
        />
        <div
          className={`postNumber ${
            vote === 1 ? 'orange' : vote === -1 && 'purple'
          }`}
        >
          {post.score}
        </div>
        <button
          className={`arrow ${vote === -1 ? 'downmod' : 'down'}`}
          type="button"
          aria-label="Downvote"
          onClick={() => handleVote(-1)}
        />
      </div>
      <PostInfo post={post} />
    </div>
  );
};

export default Posts;
