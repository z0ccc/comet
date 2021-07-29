import * as React from 'react';
import { Item } from './types';

interface ComponentProps {
  items: Item[];
}

const SubredditList = ({ items }: ComponentProps) => (
  <>
    {items.map((item: Item) => (
      <div className="subreddit">
        {item.name} {item.commentNum}
      </div>
    ))}
  </>
);

export default SubredditList;
