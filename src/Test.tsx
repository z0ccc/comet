/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  getQueries,
  getPostArr,
  getSubreddits,
  getPosts,
  getCommentArr,
  getComments,
} from './main';
import { SubredditType, PostType, CommentListType } from './types';
import Subreddits from './Subreddits';
import Post from './Post';
import Comments from './Comments';
import SortDropDown from './SortDropDown';
import CommentToggle from './CommentToggle';

import './App.css';

const App = () => {
  const [firstRender, setfirstRender] = useState<boolean>(true);
  const [subreddits, setSubreddits] = useState<SubredditType[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentListType[]>([]);
  const [sort, setSort] = useState<string>('');

  useEffect(() => {
    setfirstRender(false);
    const queries: string[] = getQueries(window.location.href);
    getPostArr(queries).then((postArr) => {
      setSubreddits(getSubreddits(postArr));
      setPosts(getPosts(postArr));
      const firstPost: PostType = getPosts(postArr)[0];
      setPost(firstPost);
      getCommentArr(firstPost.permalink).then((commentArr) => {
        setComments(getComments(commentArr));
      });
    });
  }, []);

  useEffect(() => {
    if (!firstRender) {
      setPost(posts[selected]);
      setSort('best');
      setComments([]);
      getCommentArr(posts[selected].permalink).then((commentArr) => {
        setComments(getComments(commentArr));
      });
    }
  }, [selected]);

  useEffect(() => {
    if (!firstRender) {
      setComments([]);
      getCommentArr(`${post!.permalink}?sort=${sort}`).then((commentArr) => {
        setComments(getComments(commentArr));
      });
    }
  }, [sort]);

  return (
    <div className="App">
      <CommentToggle />
      <div>
        <Subreddits
          subreddits={subreddits}
          selected={selected}
          setSelected={setSelected}
        />
        {post !== null && (
          <>
            <Post post={post} />
            <SortDropDown sort={sort} setSort={setSort} />
            <Comments
              comments={comments}
              setComments={setComments}
              permalink={post.permalink}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
