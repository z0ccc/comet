import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

const mountNode = document.getElementById('popup');
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  ReactDOM.render(<App onYoutube={false} sortSetting={''} url={tabs[0].url!} />, mountNode);
});
