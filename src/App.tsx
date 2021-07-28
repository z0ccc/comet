import * as React from 'react';
import { getQueries } from './main';
import './App.css';

const App = () => {
  getQueries('https://www.youtube.com/watch?v=6swmTBVI83k');
  return (
    <div className="App">hello</div>
  );
};

export default App;
