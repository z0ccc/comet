/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  useState, useCallback, Dispatch, SetStateAction, memo
} from 'react';
import Parser from 'html-react-parser';
import { CommentType } from './types';
import { getCommentArr, getComments } from './main';

interface ComponentProps {
  comments: any;
  setComments: any;
  permalink: string;
}

const Comments = memo(
  ({ comments, setComments, permalink }: ComponentProps) => {
    const [load, setLoad] = useState<any>();

    const loadMore = useCallback(
      async (link, commentsList, id, children, depth, index) => {
        setLoad(id);
        const promisesFetch: any = [];
        for (let i = 0; i < children.length; i++) {
          promisesFetch.push(getCommentArr(link + children[i]));
        }

        await Promise.all(promisesFetch).then((value: any) => {
          const arr: any = getComments(value.flat(Infinity)).flat(Infinity);
          for (let i = 0; i < arr.length; i++) {
            const reply: any = arr[i];
            reply.depth += depth;
            commentsList.splice(index + i, 0, reply);
          }
        });
        setComments(commentsList);
        setComments((arr: any) => arr.filter((item: any) => item.id !== id));
      },
      []
    );

    return (
      <div id="comments">
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
      </div>
    );
  }
);

export default Comments;
