import * as React from 'react';
import { DataType } from './types';
import PostInfo from './PostInfo';
import PostScore from './PostScore';

interface ComponentProps {
  post: DataType;
}

const Posts = ({ post }: ComponentProps) => (
  <div className="post">
    <PostScore post={post} />
    <PostInfo post={post} />
  </div>
);

export default Posts;
