/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import React from 'react'
import { useState, useEffect } from 'react'
import getPosts from '../../utils/getPosts'
import Subreddits from '../../components/Subreddits'
import Post from '../../components/Post'

const Popup = () => {
  const [posts, setPosts] = useState()
  const [post, setPost] = useState()

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs[0].url) {
        getPosts('https://www.youtube.com/watch?v=6swmTBVI83k').then(
          (posts) => {
            console.log(posts)
            setPosts(posts)
            setPost(posts[0])
          }
        )
      }
    })
  }, [])

  return (
    <Box
      sx={{
        color: '#404040',
      }}
    >
      {posts === undefined ? (
        <p>loading...</p>
      ) : (
        <>
          <Subreddits posts={posts} postId={post.id} setPost={setPost} />
          <Post post={post} />
        </>
      )}
    </Box>
  )
}

export default Popup
