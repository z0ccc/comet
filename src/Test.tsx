/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState, useEffect } from 'react';

import './App.css';

const App = () => {
  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const queries: string[] = getQueries(tabs[0].url!);
    });
  }, []);
  return (
    <div className="App">
      HELLO
    </div>
  );
};

export default App;
