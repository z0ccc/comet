/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
import * as React from 'react';
import {
  useState, useCallback, Dispatch, SetStateAction, memo
} from 'react';
import Parser from 'html-react-parser';
import {
  DataType, CommentListType
} from './types';

import { convertDate, decodeHtml, formatNumber } from './main';

const Comment = ({ comment }: any) => {
  return (
    <div className="comment">
      <div className="commentInfo">
        <div className="infoWrap">
          <a
            href={`https://reddit.com/u/${comment.data.author}`}
            target="_blank"
            className="commentTitle"
            rel="noreferrer"
          >
            {comment.data.author}
          </a>
          <div className="info">{formatNumber(comment.data.score)} points</div>
          <div className="info">{convertDate(comment.data.created_utc)}</div>
        </div>
        <div className="commentBody">
          {Parser(decodeHtml(comment.data.body_html))}
        </div>
      </div>
      {comment.data.replies && (
        comment.data.replies.data.children.map((object: any) => {
          return <Comment comment={object} />;
        })
      )}
    </div>
  );
};

export default Comment;
