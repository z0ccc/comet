/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { getQueries, getPosts, getSubreddits } from './main';
import { Item } from './types';
import SubredditList from './SubredditList';
import './App.css';

const App = () => {
  const [subreddits, setSubreddits] = useState<Item[]>([]);

  useEffect(() => {
    const queries: string[] = getQueries('https://www.youtube.com/watch?v=6swmTBVI83k');
    getPosts(queries).then((value) => {
      const subArr: Item[] = getSubreddits(value);
      setSubreddits(subArr);
    });
  }, []);

  return (
    <div className="App">
      <SubredditList items={subreddits} />
    </div>
  );
};

export default App;
