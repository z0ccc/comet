import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { DataType } from './types';
import { convertDate, formatNumber } from './main';

interface ComponentProps {
  comment: DataType;
  setCollapse: Dispatch<SetStateAction<boolean>>;
}

const CollapsedComment = ({ comment, setCollapse }: ComponentProps) => (
  <div className="commentInfo">
    <div className="infoWrap collapsedMargin">
      <button className="info" type="button" onClick={() => setCollapse(false)}>
        [+]
      </button>
      <a
        href={`https://reddit.com/u/${comment.data.author}`}
        target="_blank"
        className="commentTitle collapsed"
        rel="noreferrer"
      >
        {comment.data.author}
      </a>
      <div className="info collapsed">
        {formatNumber(comment.data.score)} points
      </div>
      <div className="info collapsed">
        {convertDate(comment.data.created_utc)}
      </div>
    </div>
  </div>
);

export default CollapsedComment;
