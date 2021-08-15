import * as React from 'react';
import { useState, useEffect } from 'react';

const handleClickOnly = () => {
  chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
    const value = !clickOnly;
    chrome.storage.sync.set({ clickOnly: value });
    if (value === true) {
      chrome.action.setIcon({
        path: {
          16: '../images/reddit_16.png',
        },
      });
    }
  });
};

const OptionsPage = () => {
  const [clickOnlyVal, setClickOnly] = useState<boolean>();

  useEffect(() => {
    chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
      setClickOnly(clickOnly);
    });
  }, []);

  return (
    <div className="optionItemWrap">
      <input
        type="checkbox"
        id="clickOnly"
        name="clickOnly"
        onClick={handleClickOnly}
        defaultChecked={clickOnlyVal}
      />
      <label htmlFor="clickOnly">
        Run browser popup only when icon is clicked
      </label>
    </div>
  );
};

export default OptionsPage;
