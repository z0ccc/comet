/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  useState, useCallback, Dispatch, SetStateAction, memo
} from 'react';
import Parser from 'html-react-parser';
import {
  DataType, CommentListType
} from './types';
import Comment from './Comment';

const Comments = ({ comment }: any) => {
  // const mountNode = document.getElementById('popup');
  // ReactDOM.render(<Comment comment="hello" />, mountNode);
  return (
    <>
      <div>{comment.parentID}</div>
      <Comment comment={comment} />
    </>
  );
};

export default Comments;
