import * as React from 'react';
import SelectTheme from './SelectTheme';
import ClickOnly from './ClickOnly';
import CommentDefault from './CommentDefault';

const OptionsPage = () => (
  <div>
    <SelectTheme />
    <ClickOnly />
    <CommentDefault />
    <div className="optionText">
      Github:{' '}
      <a
        target="_blank"
        href="https://github.com/z0ccc/Reddit-Wherever"
        rel="noreferrer"
      >
        https://github.com/z0ccc/Reddit-Wherever
      </a>
    </div>
  </div>
);

export default OptionsPage;
