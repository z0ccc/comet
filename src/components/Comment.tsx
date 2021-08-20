import * as React from 'react';
import { useState } from 'react';
import Parser from 'html-react-parser';
import { CommentType } from './types';

import {
  getCommentArr, convertDate, decodeHtml, formatNumber
} from './main';

const Comment = ({ comment, permalink }: any) => {
  const [replies, setReplies] = useState<CommentType[][]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [collapse, setCollapse] = useState<boolean>(false);

  const loadMore = async () => {
    setLoading(true);
    const promisesFetch: Promise<CommentType[]>[] = [];
    for (let i = 0; i < comment.data.children.length; i++) {
      promisesFetch.push(getCommentArr(permalink + comment.data.children[i]));
    }
    await Promise.all(promisesFetch).then((value: any) => {
      setReplies(value);
    });
  };

  const collapseComment = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      {comment.kind === 'more' ? (
        <>
          {replies.length === 0 ? (
            <div className="comment">
              {loading ? (
                <div className="commentTitle loadMore">loading...</div>
              ) : (
                <button
                  className="commentTitle loadMore"
                  type="button"
                  onClick={loadMore}
                >
                  {`load more comments (${comment.data.count})`}
                </button>
              )}
            </div>
          ) : (
            <>
              {replies.map((comments) => (
                <>
                  {comments.map((object: any) => (
                    <Comment comment={object} permalink={permalink} />
                  ))}
                </>
              ))}
            </>
          )}
        </>
      ) : (
        <div className="comment">
          {collapse ? (
            <div className="commentInfo">
              <div className="infoWrap">
                <button
                  className="info"
                  type="button"
                  onClick={collapseComment}
                >
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
          ) : (
            <>
              <div className="commentInfo">
                <div className="infoWrap">
                  <button
                    className="info"
                    type="button"
                    onClick={collapseComment}
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
                  comment.data.replies.data.children.map((object: any) => (
                    <Comment comment={object} permalink={permalink} />
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
