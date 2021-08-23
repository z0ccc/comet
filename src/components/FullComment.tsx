import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import Parser from 'html-react-parser';
import { DataType } from './types';
import { convertDate, decodeHtml, formatNumber } from './main';
import Comment from './Comment';
import CommentScore from './CommentScore';

interface ComponentProps {
  comment: DataType;
  permalink: string;
  setCollapse: Dispatch<SetStateAction<boolean>>;
}

const FullComment = ({ comment, permalink, setCollapse }: ComponentProps) => (
  <>
    <div className="commentInfo">
      <CommentScore comment={comment} />
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
          <div className="info">{formatNumber(comment.data.score)} points</div>
          <div className="info">{convertDate(comment.data.created_utc)}</div>
        </div>
        <div className="commentBody">
          {Parser(decodeHtml(comment.data.body_html))}
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

export default FullComment;
