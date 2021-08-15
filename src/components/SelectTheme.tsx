import * as React from 'react';
import { useState, useEffect } from 'react';

const OptionsPage = () => {
  const [themeVal, setTheme] = useState<string>('');

  useEffect(() => {
    chrome.storage.sync.get('theme', ({ theme }) => {
      setTheme(theme);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ theme: themeVal });
  }, [themeVal]);

  return (
    <div className="optionItemWrap">
      <select
        className="selectBoxWrap"
        name="theme"
        onChange={(e) => setTheme(e.target.value)}
        value={themeVal}
      >
        <option value="default">Default</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <label htmlFor="theme">Extension theme</label>
    </div>
  );
};

export default OptionsPage;
