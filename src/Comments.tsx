/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  useCallback, Dispatch, SetStateAction, memo
} from 'react';
import Parser from 'html-react-parser';
import { CommentType } from './types';
import { getCommentArr, getComments } from './main';

interface ComponentProps {
  comments: any;
  setComments: any;
  permalink: string;
}

const Comments = memo(({ comments, setComments, permalink }: ComponentProps) => {
  const loadMore = useCallback(
    (id, comments2, index) => {
      console.log(comments2);
      comments2.splice(index, 0, {
        author: 'hhh',
        bodyHTML: '111',
        date: '4 months ago',
        depth: 2,
        id: 'gsakm322',
        kind: 't1',
        score: '72',
      });
      // comments2.push({
      //   author: 'hhh',
      //   bodyHTML: '111',
      //   date: '4 months ago',
      //   depth: 2,
      //   id: 'gsakm322',
      //   kind: 't1',
      //   score: '72',
      // });
      setComments(comments2);
      setComments((coms: any) => coms.filter((c:any) => c.id !== id));
    },
    []
  );

  return (
    <div id="comments">
      {comments.map((comment: any) => {
        return comment.kind === 'more' ? (
          <div className="comment" key={comment.id}>
            {[...Array(comment.depth)].map(() => (
              <div className="commentLine" />
            ))}
            <button
              className="commentTitle loadMore"
              type="submit"
              onClick={() =>
                loadMore(comment.id, comments, comments.indexOf(comment))
              }
            >
              load more comments ({comment.count})
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
        );
      })}
    </div>
  );
});

export default Comments;
