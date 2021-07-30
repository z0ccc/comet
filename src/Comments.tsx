/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useCallback, Dispatch, SetStateAction } from 'react';
import Parser from 'html-react-parser';
import { CommentType } from './types';

interface ComponentProps {
  commentsArr: any;
}

const Comments = ({ commentsArr }: ComponentProps) => (
  <div id="comments">
    {commentsArr.map((comment: any) => (
      <div className="commentInfo">
        <div className="infoWrap">
          <a
            href="https://reddit.com/u/{{author}}"
            target="_blank"
            className="commentTitle"
            rel="noreferrer"
          >
            {comment.author}
          </a>
          <div className="info">{comment.score} points</div>
          <div className="info">{comment.date}</div>
        </div>
        <div className="commentBody">{Parser(comment.bodyHTML)}</div>
      </div>
    ))}
  </div>
);

export default Comments;
