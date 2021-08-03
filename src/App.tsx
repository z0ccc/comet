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

import './App.css';

const App = () => {
  const [firstRender, setfirstRender] = useState<boolean>(false);
  const [subreddits, setSubreddits] = useState<SubredditType[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    setfirstRender(true);
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
    if (firstRender) setPost(posts[selected]);
  }, [selected]);

  // useEffect(() => {
  //   console.log('hel');
  //   // console.log(comments);
  // }, [comments]);

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
