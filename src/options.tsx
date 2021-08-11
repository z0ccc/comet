import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Option from './Option';
import './popup.css';

const mountNode = document.getElementById('options');
ReactDOM.render(<Option />, mountNode);
