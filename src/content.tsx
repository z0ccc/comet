// This file is injected as a content script
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Test from './Test';
import './popup.css';

const mountNode = document.getElementById('container');
ReactDOM.render(<Test />, mountNode);

console.log('Hello from content script!');
