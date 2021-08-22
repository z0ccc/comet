import * as React from 'react';
import { useState } from 'react';
import { CommentType } from './types';
import CollapsedComment from './CollapsedComment';
import FullComment from './FullComment';

interface ComponentProps {
  comment: CommentType;
  permalink: string;
}

const CommentInfo = ({ comment, permalink }: ComponentProps) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <div className="comment">
      {collapse ? (
        <CollapsedComment comment={comment} setCollapse={setCollapse} />
      ) : (
        <FullComment
          comment={comment}
          permalink={permalink}
          setCollapse={setCollapse}
        />
      )}
    </div>
  );
};

export default CommentInfo;
