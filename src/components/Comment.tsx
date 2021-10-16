import * as React from 'react';
import { DataType } from './types';
import LoadMore from './LoadMore';
import CommentInfo from './CommentInfo';

interface ComponentProps {
  comment: DataType;
  permalink: string;
}

const Comment = ({ comment, permalink }: ComponentProps) => (
  <>
    {comment.kind === 'more' ? (
      <LoadMore comment={comment} permalink={permalink} />
    ) : (
      <CommentInfo comment={comment} permalink={permalink} />
    )}
  </>
);

export default Comment;
