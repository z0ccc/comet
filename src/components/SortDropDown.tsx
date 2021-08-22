import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

interface ComponentProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const SortDropDown = ({ sort, setSort }: ComponentProps) => (
  <select onChange={(e) => setSort(e.target.value)} value={sort}>
    <option value="best">Best</option>
    <option value="top">Top</option>
    <option value="new">New</option>
    <option value="controversial">Controversial</option>
    <option value="old">Old</option>
  </select>
);
export default SortDropDown;
