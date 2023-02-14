import * as React from 'react';
import { useState, useEffect } from 'react';
import { handleClickOnly } from './main';

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
