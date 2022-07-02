import * as React from 'react';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import { DataType } from './types';
import { convertDate, fixHref, formatNumber, getVote, getDir } from './main';
import Comment from './Comment';

interface ComponentProps {
  comment: DataType;
  permalink: string;
  setCollapse: Dispatch<SetStateAction<boolean>>;
}

const FullComment = ({ comment, permalink, setCollapse }: ComponentProps) => {
  const [vote, setVote] = useState<number>(0);
  const [score, setScore] = useState<number>(comment.data.score);

  useEffect(() => {
    setVote(getVote(comment.data.likes));
  }, []);

  const handleVote = (voteDir: number) => {
    const dir: number = getDir(voteDir, vote);
    chrome.runtime.sendMessage({ id: comment.data.name, dir });
    setVote(dir);
    setScore(score + (dir === 0 ? voteDir * -1 : dir));
  };
  return (
    <>
      <div className="commentInfo">
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
        <div>
          <div className="infoWrap">
            <button
              className="info"
              type="button"
              onClick={() => setCollapse(true)}
            >
              [–]
            </button>
            <a
              href={`https://reddit.com/u/${comment.data.author}`}
              target="_blank"
              className="commentTitle"
              rel="noreferrer"
            >
              {comment.data.author}
            </a>
            <div className="info">{formatNumber(score)} points</div>
            <div className="info">{convertDate(comment.data.created_utc)}</div>
          </div>
          <div className="commentBody">
            {Parser(fixHref(comment.data.body_html))}
          </div>
        </div>
      </div>
      <div className="child">
        {comment.data.replies &&
        comment.data.replies.data.children.map((object: DataType) => (
          <Comment comment={object} permalink={permalink} />
        ))}
      </div>
    </>
  );
};

export default FullComment;
