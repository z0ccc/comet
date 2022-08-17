import * as React from 'react';
import { useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import { toggleYoutube, detectTheme, getQueries, getSubreddits } from './main';
import { SubredditType, DataType } from './types';
import Subreddits from './Subreddits';
import Post from './Post';
import Comment from './Comment';
import SortDropDown from './SortDropDown';
import RedditImg from './RedditImg';

import '../styles/App.css';

interface ComponentProps {
  onYoutube: boolean;
  sortSetting: string;
  url: string;
}

const App = ({ onYoutube, sortSetting, url }: ComponentProps) => {
  const [firstRender, setfirstRender] = useState<boolean>(true);
  const [subreddits, setSubreddits] = useState<SubredditType[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [posts, setPosts] = useState<DataType[]>([]);
  const [post, setPost] = useState<DataType | null>(null);
  const [comments, setComments] = useState<DataType[]>([]);
  const [currentSort, setSort] = useState<string>(sortSetting);
  const [message, setMessage] = useState<string>('loading...');

  useEffect(() => {
    detectTheme();
    setfirstRender(false);
    const queries: string[] = getQueries(url);
    chrome.runtime.sendMessage({ queries }, (response) => {
      if (response === 'err') {
        setMessage(
          'Error: Reddit might be down or another extension is blocking Upvote Anywhere. <a class="submit" target="_blank" href="https://github.com/z0ccc/Upvote-Anywhere#troubleshoot">Read more</a>'
        );
      } else if (response.postArr.length !== 0) {
        setSubreddits(getSubreddits(response.postArr));
        setPosts(response.postArr);
        const firstPost: DataType = response.postArr[0];
        setPost(firstPost);
        chrome.runtime.sendMessage(
          { permalink: `${firstPost.data.permalink}?sort=${currentSort}` },
          (res) => {
            setComments(res.commentArr);
            setMessage('');
          }
        );
      } else {
        if (onYoutube) toggleYoutube();
        setMessage(
          `No posts found. <a class="submit" target="_blank" href="https://www.reddit.com/submit?url=${url}">Submit it</a>`
        );
      }
    });
  }, []);

  // runs if different post is selected
  useEffect(() => {
    if (!firstRender) {
      setMessage('loading...');
      setPost(posts[selected]);
      setSort(currentSort);
      setComments([]);
      chrome.runtime.sendMessage(
        { permalink: `${posts[selected].data.permalink}?sort=${currentSort}` },
        (res) => {
          setComments(res.commentArr);
          setMessage('');
        }
      );
    }
  }, [selected]);

  // runs if different sort type is selected
  useEffect(() => {
    if (!firstRender) {
      setMessage('loading...');
      setComments([]);
      chrome.runtime.sendMessage(
        { permalink: `${post!.data.permalink}?sort=${currentSort}` },
        (res) => {
          setComments(res.commentArr);
          setMessage('');
        }
      );
    }
  }, [currentSort]);

  return (
    <div className="App">
      <div className="subredditContainer">
        <Subreddits
          subreddits={subreddits}
          selected={selected}
          setSelected={setSelected}
        />
        {onYoutube && <RedditImg />}
      </div>
      {post !== null && (
        <>
          <Post post={post} />
          <SortDropDown sort={currentSort} setSort={setSort} />
          {comments.map((object) => (
            <Comment comment={object} permalink={post.data.permalink} />
          ))}
        </>
      )}
      <div className="message">{Parser(message)}</div>
    </div>
  );
};

export default App;
