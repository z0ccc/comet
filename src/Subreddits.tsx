import * as React from 'react';
import { useCallback, Dispatch, SetStateAction } from 'react';
import { SubredditType } from './types';

interface ComponentProps {
  subreddits: SubredditType[];
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

const SubredditList = ({
  subreddits,
  selected,
  setSelected,
}: ComponentProps) => {
  const selectPost = useCallback(
    (id: number) => {
      setSelected(id);
    },
    [setSelected]
  );

  return (
    <div id="subreddits">
      {subreddits.map((subreddit: SubredditType) => {
        let selectedMatch: boolean = false;
        if (selected === subreddit.id) selectedMatch = true;
        return (
          <button
            type="submit"
            className={`${selectedMatch ? 'selectedPost' : ''} subreddit`}
            onClick={() => selectPost(subreddit.id)}
          >
            {subreddit.name} {subreddit.commentNum}
          </button>
        );
      })}
    </div>
  );
};

export default SubredditList;
