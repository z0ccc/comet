/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
  getQueries, getJson, getSubreddits, getPosts
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

  useEffect(() => {
    const queries: string[] = getQueries('https://www.youtube.com/watch?v=6swmTBVI83k');
    getJson(queries).then((value) => {
      setSubreddits(getSubreddits(value));
      setPosts(getPosts(value));
      const firstPost: PostType[] = getPosts(value);
      setPost(firstPost[0]);
    });
  }, []);

  useEffect(() => {
    console.log(selected);
    console.log(posts[selected]);
    if (selected) setPost(posts[selected]);
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
