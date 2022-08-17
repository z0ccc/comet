import * as React from 'react';
import { useState, useEffect } from 'react';

const OptionsPage = () => {
  const [sortVal, setSort] = useState<string>('');

  useEffect(() => {
    chrome.storage.sync.get('sort', ({ sort }) => {
      setSort(sort);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ sort: sortVal });
  }, [sortVal]);

  return (
    <div className="optionItemWrap">
      <select
        className="selectBoxWrap"
        name="sort"
        onChange={(e) => setSort(e.target.value)}
        value={sortVal}
      >
        <option value="best">Best</option>
        <option value="top">Top</option>
        <option value="new">New</option>
        <option value="controversial">Controversial</option>
        <option value="old">Old</option>
      </select>
      <label htmlFor="sort">Default comment sorting</label>
    </div>
  );
};

export default OptionsPage;
