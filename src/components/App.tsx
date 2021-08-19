import * as React from 'react';
import { useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import {
  toggleYoutube,
  detectTheme,
  getQueries,
  getPostArr,
  getSubreddits,
  getPosts,
  getCommentArr,
} from './main';
import {
  SubredditType,
  PostType,
  CommentType
} from './types';
import Subreddits from './Subreddits';
import Post from './Post';
import Comment from './Comment';
import SortDropDown from './SortDropDown';
import RedditImg from './RedditImg';

import '../styles/App.css';

interface ComponentProps {
  onYoutube: boolean;
  url: string;
}

const App = ({ onYoutube, url }: ComponentProps) => {
  const [firstRender, setfirstRender] = useState<boolean>(true);
  const [subreddits, setSubreddits] = useState<SubredditType[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [sort, setSort] = useState<string>('');
  const [message, setMessage] = useState<string>('loading...');

  useEffect(() => {
    detectTheme();
    setfirstRender(false);
    const queries: string[] = getQueries(url);
    getPostArr(queries).then((postArr) => {
      if (postArr.length !== 0) {
        setSubreddits(getSubreddits(postArr));
        setPosts(getPosts(postArr));
        const firstPost: PostType = getPosts(postArr)[0];
        setPost(firstPost);
        getCommentArr(firstPost.permalink).then((commentArr) => {
          setComments(commentArr);
          setMessage('');
        });
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
      setSort('best');
      setComments([]);
      getCommentArr(posts[selected].permalink).then((commentArr) => {
        setComments(commentArr);
        setMessage('');
      });
    }
  }, [selected]);

  // runs if different sort type is selected
  useEffect(() => {
    if (!firstRender) {
      setMessage('loading...');
      setComments([]);
      getCommentArr(`${post!.permalink}?sort=${sort}`).then((commentArr) => {
        setComments(commentArr);
        setMessage('');
      });
    }
  }, [sort]);

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
          <SortDropDown sort={sort} setSort={setSort} />
          {comments.map((object) => <Comment comment={object} permalink={post.permalink} />)}
        </>
      )}
      <div className="message">{Parser(message)}</div>
    </div>
  );
};

export default App;
