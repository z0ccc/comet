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
import { SubredditType, PostType, CommentType } from './types';
import Subreddits from './Subreddits';
import Post from './Post';
import Comments from './Comments';
import SortDropDown from './SortDropDown';

import './App.css';

const App = () => {
  const [firstRender, setfirstRender] = useState<boolean>(true);
  const [subreddits, setSubreddits] = useState<SubredditType[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<any>([]);
  const [sort, setSort] = useState<string>('');

  useEffect(() => {
    setfirstRender(false);
    const queries: string[] = getQueries('https://www.youtube.com/watch?v=6swmTBVI83k');
    getPostArr(queries).then((postArr) => {
      setSubreddits(getSubreddits(postArr));
      setPosts(getPosts(postArr));
      const firstPost: PostType = getPosts(postArr)[0];
      setPost(firstPost);
      getCommentArr(firstPost.permalink).then((commentArr) => {
        setComments(getComments(commentArr).flat(Infinity));
      });
    });
  }, []);

  useEffect(() => {
    if (!firstRender) {
      setPost(posts[selected]);
      setComments([]);
      getCommentArr(posts[selected].permalink).then((commentArr) => {
        setComments(getComments(commentArr).flat(Infinity));
      });
    }
  }, [selected]);

  useEffect(() => {
    if (!firstRender) {
      setComments([]);
      getCommentArr(`${post!.permalink}?sort=${sort}`).then((commentArr) => {
        setComments(getComments(commentArr).flat(Infinity));
      });
    }
  }, [sort]);

  return (
    <div className="App">
      <Subreddits
        subreddits={subreddits}
        selected={selected}
        setSelected={setSelected}
      />
      {post !== null && (
        <>
          <Post post={post} />
          <SortDropDown setSort={setSort} />
          <Comments
            comments={comments}
            setComments={setComments}
            permalink={post.permalink}
          />
        </>
      )}
    </div>
  );
};

export default App;
