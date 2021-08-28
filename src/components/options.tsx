import * as React from 'react';
import * as ReactDOM from 'react-dom';

import OptionsPage from './OptionsPage';
import '../styles/App.css';

const mountNode = document.getElementById('options');
ReactDOM.render(<OptionsPage />, mountNode);
