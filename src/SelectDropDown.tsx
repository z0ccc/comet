/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useCallback, Dispatch, SetStateAction } from 'react';
import { SubredditType } from './types';

// interface ComponentProps {
//   subreddits: SubredditType[];
//   selected: number;
//   setSelected: Dispatch<SetStateAction<number>>;
// }

const SelectDropDown = () => (
  <select>
    <option value="best">Best</option>
    <option value="top">Top</option>
    <option value="new">New</option>
    <option value="controversial">Controversial</option>
    <option value="old">Old</option>
  </select>
);

export default SelectDropDown;
