import * as React from 'react';
import { useEffect } from 'react';
import SelectTheme from './SelectTheme';
import SortDefault from './SortDefault';
import ClickOnly from './ClickOnly';
import CommentDefault from './CommentDefault';
import { detectTheme } from './main';

const OptionsPage = () => {
  useEffect(() => {
    detectTheme();
  }, []);
  return (
    <div className="options">
      <SelectTheme />
      <SortDefault />
      <ClickOnly />
      <CommentDefault />
      <div className="optionText">
        Github:{' '}
        <a
          target="_blank"
          className="submit"
          href="https://github.com/z0ccc/Upvote-Anywhere"
          rel="noreferrer"
        >
          https://github.com/z0ccc/Upvote-Anywhere
        </a>
      </div>
    </div>
  );
};

export default OptionsPage;
