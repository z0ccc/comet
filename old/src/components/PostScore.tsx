import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataType } from './types';
import { getVote, getDir, formatNumber } from './main';

interface ComponentProps {
  post: DataType;
}

const Posts = ({ post }: ComponentProps) => {
  const [vote, setVote] = useState<number>(0);
  const [score, setScore] = useState<number>(post.data.score);

  useEffect(() => {
    setScore(post.data.score);
    setVote(getVote(post.data.likes));
  }, [post]);

  const handleVote = (voteDir: number) => {
    const dir: number = getDir(voteDir, vote);
    chrome.runtime.sendMessage({ id: post.data.name, dir });
    setVote(dir);
    setScore(score + (dir === 0 ? voteDir * -1 : dir));
  };

  return (
    <div className="postScore">
      <button
        className={`arrow ${vote === 1 ? 'upmod' : 'upvote'}`}
        type="button"
        aria-label="Upvote"
        onClick={() => handleVote(1)}
      />
      <div
        className={`postNumber ${
          vote === 1 ? 'orange' : vote === -1 && 'purple'
        }`}
      >
        {formatNumber(score)}
      </div>
      <button
        className={`arrow ${vote === -1 ? 'downmod' : 'downvote'}`}
        type="button"
        aria-label="Downvote"
        onClick={() => handleVote(-1)}
      />
    </div>
  );
};

export default Posts;
