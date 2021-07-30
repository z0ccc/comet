import * as React from 'react';
import { SubredditType } from './types';

interface ComponentProps {
  subreddits: SubredditType[];
  selected: number;
}

const SubredditList = ({ subreddits, selected }: ComponentProps) => (
  <div id="subreddits">
    {subreddits.map((subreddit: SubredditType) => {
      let selectedMatch: boolean = false;
      if (selected === subreddit.id) selectedMatch = true;
      return (
        <div className={`${selectedMatch ? 'selectedPost' : ''} subreddit`}>
          {subreddit.name} {subreddit.commentNum}
        </div>
      );
    })}
  </div>
);

export default SubredditList;
