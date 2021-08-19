/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
import * as React from 'react';
import {
  useState, useEffect
} from 'react';
import Parser from 'html-react-parser';
import {
  SubredditType, PostType, CommentListType, DataType
} from './types';

import {
  getPostArr,
  getSubreddits,
  getPosts,
  getCommentArr,
  convertDate,
  decodeHtml,
  formatNumber,
} from './main';

const Comment = ({ comment, permalink }: any) => {
  const [replies, setReplies] = useState<DataType[]>([]);

  const loadMore = () => {
    console.log(comment.data.children, permalink);
    comment.data.children.forEach((id: any) => {
      getCommentArr(permalink + id).then((commentArr) => {
        console.log(commentArr);
        setReplies(commentArr);
      });
    });
  };

  return (
    <>
      {comment.kind === 'more' ? (
        <>
          {replies.length === 0 ? (
            <div className="comment">
              <button
                className="commentTitle loadMore"
                type="submit"
                onClick={loadMore}
              >
                {`load more comments (${comment.data.count})`}
              </button>
            </div>
          ) : (
            <>
              {replies.map((object) => {
                return <Comment comment={object} permalink={permalink} />;
              })}
            </>
          )}
        </>
      ) : (
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
              <div className="info">
                {formatNumber(comment.data.score)} points
              </div>
              <div className="info">
                {convertDate(comment.data.created_utc)}
              </div>
            </div>
            <div className="commentBody">
              {Parser(decodeHtml(comment.data.body_html))}
            </div>
          </div>
          <div className="child">
            {comment.data.replies &&
              comment.data.replies.data.children.map((object: any) => {
                return <Comment comment={object} permalink={permalink} />;
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
