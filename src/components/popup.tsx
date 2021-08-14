import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import '../styles/popup.css';

const mountNode = document.getElementById('popup');
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  ReactDOM.render(<App onYoutube={false} url={tabs[0].url!} />, mountNode);
});
