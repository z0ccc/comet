import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataType } from './types';
import { getVote, getDir } from './main';

interface ComponentProps {
  comment: DataType;
}

const CommentScore = ({ comment }: ComponentProps) => {
  const [vote, setVote] = useState<number>(0);

  useEffect(() => {
    setVote(getVote(comment.data.likes));
  }, []);

  const handleVote = (voteDir: number) => {
    const dir: number = getDir(voteDir, vote);
    chrome.runtime.sendMessage({ id: comment.data.name, dir });
    setVote(dir);
  };

  return (
    <div className="postScore">
      <button
        className={`arrow arrowMargin ${vote === 1 ? 'upmod' : 'upvote'}`}
        type="button"
        aria-label="Upvote"
        onClick={() => handleVote(1)}
      />
      <button
        className={`arrow arrowMargin ${vote === -1 ? 'downmod' : 'downvote'}`}
        type="button"
        aria-label="Downvote"
        onClick={() => handleVote(-1)}
      />
    </div>
  );
};

export default CommentScore;
