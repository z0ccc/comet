import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

const mountNode = document.getElementById('popup');
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  chrome.storage.sync.get('sort', ({ sort }) => {
    ReactDOM.render(
      <App onYoutube={false} sortSetting={sort} url={tabs[0].url!} />,
      mountNode
    );
  });
});
