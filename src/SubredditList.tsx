import * as React from 'react';
import { Item } from './types';

interface ComponentProps {
  items: Item[];
}

const SubredditList = ({ items }: ComponentProps) => (
  <div id="subreddits">
    {items.map((item: Item) => (
      <div className="subreddit">
        {item.name} {item.commentNum}
      </div>
    ))}
  </div>
);

export default SubredditList;
