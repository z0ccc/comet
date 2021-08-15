import * as React from 'react';
import { useState, useEffect } from 'react';

const handleCommentDefault = () => {
  chrome.storage.sync.get('commentDefault', ({ commentDefault }) => {
    const value = !commentDefault;
    chrome.storage.sync.set({ commentDefault: value });
  });
};

const OptionsPage = () => {
  const [commentDefaultVal, setCommentDefault] = useState<boolean>();

  useEffect(() => {
    chrome.storage.sync.get('commentDefault', ({ commentDefault }) => {
      setCommentDefault(commentDefault);
    });
  }, []);

  return (
    <div className="optionItemWrap">
      <input
        type="checkbox"
        id="commentDefault"
        name="commentDefault"
        onClick={handleCommentDefault}
        defaultChecked={commentDefaultVal}
      />
      <label htmlFor="commentDefault">Show YouTube comments as default</label>
    </div>
  );
};

export default OptionsPage;
