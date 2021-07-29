import * as React from 'react';

// type Item = {
//   name: string;
//   commentNum: string;
// };

// interface ComponentProps {
//   items: Item[];
// }

const SubredditList = ({ items }: any) => (
  <>
    {items.map((item: any) => (
      <div className="subreddit">
        {item.name} {item.commentNum}
      </div>
    ))}
  </>
);

export default SubredditList;
