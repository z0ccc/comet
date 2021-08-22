import * as React from 'react';
import { useState } from 'react';
import { CommentType } from './types';
import Comment from './Comment';

interface ComponentProps {
  comment: CommentType;
  permalink: string;
}

const LoadMore = ({ comment, permalink }: ComponentProps) => {
  const [replies, setReplies] = useState<CommentType[][]>([]);
  const [loading, setLoading] = useState<boolean>();

  const loadMore = async () => {
    setLoading(true);
    chrome.runtime.sendMessage(
      { permalink, children: comment.data.children },
      async (res) => {
        setReplies(res.value);
      }
    );
  };

  return (
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
              {comments.map((object) => (
                <Comment comment={object} permalink={permalink} />
              ))}
            </>
          ))}
        </>
      )}
    </>
  );
};

export default LoadMore;
