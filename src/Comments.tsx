/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useCallback, Dispatch, SetStateAction } from 'react';
import Parser from 'html-react-parser';
import { CommentType } from './types';

interface ComponentProps {
  comments: any;
}

const Comments = ({ comments }: ComponentProps) => (
  <div id="comments">
    {comments.map((comment: any) => (
      <div className="comment">
        {[...Array(comment.depth)].map(() => (
          <div className="commentLine" />
        ))}
        <div className="commentInfo">
          <div className="infoWrap">
            <a
              href={`https://reddit.com/u/${comment.author}`}
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
      </div>
    ))}
  </div>
);

export default Comments;
