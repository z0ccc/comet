/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  getQueries, getPostArr, getSubreddits, getPosts, getComments
} from './main';
import { SubredditType, PostType } from './types';
import SubredditList from './SubredditList';
import Post from './Post';
import './App.css';

const App = () => {
  const [subreddits, setSubreddits] = useState<SubredditType[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [post, setPost] = useState<PostType | null>(null);
  const [firstRender, setfirstRender] = useState<boolean>(false);

  useEffect(() => {
    setfirstRender(true);
    const queries: string[] = getQueries('https://www.youtube.com/watch?v=6swmTBVI83k');
    getPostArr(queries).then((postArr) => {
      setSubreddits(getSubreddits(postArr));
      setPosts(getPosts(postArr));
      const firstPost: PostType[] = getPosts(postArr);
      setPost(firstPost[0]);
      // getComments(firstPost[0].permalink).then((comments) => {
      //   console.log(comments);
      // });
    });
  }, []);

  useEffect(() => {
    if (firstRender) setPost(posts[selected]);
  }, [selected]);

  return (
    <div className="App">
      <SubredditList
        subreddits={subreddits}
        selected={selected}
        setSelected={setSelected}
      />
      {post !== null && <Post post={post} />}
    </div>
  );
};

export default App;
