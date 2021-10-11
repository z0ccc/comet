import * as React from 'react';
import { useState } from 'react';
import { DataType } from './types';
import Comment from './Comment';

interface ComponentProps {
  comment: DataType;
  permalink: string;
}

const LoadMore = ({ comment, permalink }: ComponentProps) => {
  const [replies, setReplies] = useState<DataType[][]>([]);
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
        <>
          {comment.data.count === 0 ? (
            <a
              className="commentTitle loadMore"
              href={`https://www.reddit.com/${permalink}${comment.data.parent_id.substring(
                3
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              continue this thread
            </a>
          ) : (
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
          )}
        </>
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
