import * as React from 'react';
import { useCallback, Dispatch, SetStateAction } from 'react';

interface ComponentProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const SortDropDown = ({
  sort,
  setSort,
}: ComponentProps) => {
  const sortComments = useCallback(
    (e) => {
      setSort(e.target.value);
    },
    [setSort]
  );
  return (
    <select onChange={(e) => sortComments(e)} value={sort}>
      <option value="best">Best</option>
      <option value="top">Top</option>
      <option value="new">New</option>
      <option value="controversial">Controversial</option>
      <option value="old">Old</option>
    </select>
  );
};
export default SortDropDown;
