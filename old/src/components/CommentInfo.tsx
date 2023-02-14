import * as React from 'react';
import { useState } from 'react';
import { DataType } from './types';
import CollapsedComment from './CollapsedComment';
import FullComment from './FullComment';

interface ComponentProps {
  comment: DataType;
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
