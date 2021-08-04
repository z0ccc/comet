/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useCallback, Dispatch, SetStateAction } from 'react';
import { SubredditType } from './types';

interface ComponentProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const SortDropDown = ({
  sort,
  setSort,
}: ComponentProps) => {
  const sortComments = useCallback(
    (e: any) => {
      setSort(e.target.value);
      // console.log(e.target.value);
    },
    [setSort]
  );
  return (
    <select onChange={(e: any) => sortComments(e)}>
      <option value="best">Best</option>
      <option value="top">Top</option>
      <option value="new">New</option>
      <option value="controversial">Controversial</option>
      <option value="old">Old</option>
    </select>
  );
};
export default SortDropDown;
