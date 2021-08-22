import * as React from 'react';
import { useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import { CommentType } from './types';
import {
  getVote, getDir, convertDate, decodeHtml, formatNumber
} from './main';
import Comment from './Comment';
import CollapsedComment from './CollapsedComment';

interface ComponentProps {
  comment: CommentType;
  permalink: string;
}

const CommentInfo = ({ comment, permalink }: ComponentProps) => {
  const [vote, setVote] = useState<number>(0);
  const [collapse, setCollapse] = useState<boolean>(false);

  useEffect(() => {
    setVote(getVote(comment.data.likes));
  }, []);

  const handleVote = (voteDir: number) => {
    const dir: number = getDir(voteDir, vote);
    chrome.runtime.sendMessage({ id: comment.data.name, dir });
    setVote(dir);
  };

  // useEffect(() => {
  //   console.log(collapse);
  // }, [collapse]);

  return (
    <div className="comment">
      {collapse ? (
        <CollapsedComment comment={comment} setCollapse={setCollapse} />
      ) : (
        <>
          <div className="commentInfo">
            <div className="postScore">
              <button
                className={`arrow arrowMargin ${vote === 1 ? 'upmod' : 'up'}`}
                type="button"
                aria-label="Upvote"
                onClick={() => handleVote(1)}
              />
              <button
                className={`arrow arrowMargin ${
                  vote === -1 ? 'downmod' : 'down'
                }`}
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
                  onClick={() => setCollapse(!collapse)}
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
                <div className="info">
                  {formatNumber(comment.data.score)} points
                </div>
                <div className="info">
                  {convertDate(comment.data.created_utc)}
                </div>
              </div>
              <div className="commentBody">
                {Parser(decodeHtml(comment.data.body_html))}
              </div>
            </div>
          </div>
          <div className="child">
            {comment.data.replies &&
              comment.data.replies.data.children.map((object: CommentType) => (
                <Comment comment={object} permalink={permalink} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentInfo;
