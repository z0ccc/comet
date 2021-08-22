/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import { CommentType } from './types';
import {
  getVote, getDir, convertDate, decodeHtml, formatNumber
} from './main';
import CommentInfo from './CommentInfo';

interface ComponentProps {
  comment: CommentType;
  permalink: string;
}

const Comment = ({ comment, permalink }: ComponentProps) => {
  const [replies, setReplies] = useState<CommentType[][]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [vote, setVote] = useState<number>(0);
  const [collapse, setCollapse] = useState<boolean>(false);

  useEffect(() => {
    setVote(getVote(comment.data.likes));
  }, []);

  const handleVote = (voteDir: number) => {
    const dir: number = getDir(voteDir, vote);
    chrome.runtime.sendMessage({ id: comment.data.name, dir });
    setVote(dir);
  };

  const loadMore = async () => {
    setLoading(true);
    chrome.runtime.sendMessage(
      { permalink, children: comment.data.children },
      async (res) => {
        setReplies(res.value);
      }
    );
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
                  {comments.map((object) => (
                    <Comment comment={object} permalink={permalink} />
                  ))}
                </>
              ))}
            </>
          )}
        </>
      ) : (
        <CommentInfo comment={comment} permalink={permalink} />
      )}
    </>
  );
};

export default Comment;
