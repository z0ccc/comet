import * as React from 'react';
import {
  useState, useCallback, Dispatch, SetStateAction, memo
} from 'react';
import Parser from 'html-react-parser';
import {
  DataType, CommentListType
} from './types';
import { getCommentArr, getComments } from './main';

const isObjectArray = (obj: CommentListType): obj is CommentListType[] => 'length' in obj;

interface ComponentProps {
  comments: CommentListType[];
  setComments: Dispatch<SetStateAction<CommentListType[]>>;
  permalink: string;
}

const Comments = memo(
  ({ comments, setComments, permalink }: ComponentProps) => {
    const [load, setLoad] = useState<string>();


    return (
      <>
        {comments.map((comment: any) =>
          (comment.kind === 'more' ? (
            <div className="comment" key={comment.id}>
              {[...Array(comment.depth)].map(() => (
                <div className="commentLine" />
              ))}
              <button
                className="commentTitle loadMore"
                type="submit"
                onClick={() =>
                  loadMore(
                    permalink,
                    comments,
                    comment.id,
                    comment.children,
                    comment.depth,
                    comments.indexOf(comment)
                  )
                }
              >
                {load === comment.id
                  ? 'loading...'
                  : `load more comments (${comment.count})`}
              </button>
            </div>
          ) : (
            <div className="comment" key={comment.id}>
              {[...Array(comment.depth)].map(() => (
                <div className="commentLine" />
              ))}
              <div className="commentInfo">
                <div className="infoWrap">
                  <a
                    href={`https://reddit.com/u/${comment.author}`}
                    target="_blank"
                    className="commentTitle"
                    rel="noreferrer"
                  >
                    {comment.author}
                  </a>
                  <div className="info">{comment.score} points</div>
                  <div className="info">{comment.date}</div>
                </div>
                <div className="commentBody">{Parser(comment.bodyHTML)}</div>
              </div>
            </div>
          )))}
      </>
    );
  }
);

export default Comments;
