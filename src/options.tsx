import * as React from 'react';
import * as ReactDOM from 'react-dom';

import OptionsPage from './OptionsPage';
import './popup.css';

const mountNode = document.getElementById('options');
ReactDOM.render(<OptionsPage />, mountNode);
