/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import getPosts from '../../utils/getPosts'
import { getComments } from '../../utils/getComments'
import Subreddits from '../../components/Subreddits'
import Post from '../../components/Post'
import Comment from '../../components/Comment'

const Popup = () => {
  const [posts, setPosts] = useState()
  const [post, setPost] = useState()
  const [comments, setComments] = useState()

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs[0].url) {
        getPosts('https://www.youtube.com/watch?v=6swmTBVI83k').then(
          (posts) => {
            setPosts(posts)
            setPost(posts[0])
            getComments(posts[0].permalink).then((comments) => {
              setComments(comments)
            })
          }
        )
      }
    })
  }, [])

  return (
    <Box
      sx={{
        color: '#404040',
        pl: 'calc(100vw - 100%)',
      }}
    >
      {posts === undefined ? (
        <Flex
          sx={{
            width: '100%',
            py: '18px',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
          }}
        >
          Loading...
        </Flex>
      ) : (
        <>
          <Subreddits posts={posts} postId={post.id} setPost={setPost} />
          <Post post={post} />
          {comments === undefined ? (
            <Flex
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                pb: '18px',
              }}
            >
              Loading...
            </Flex>
          ) : (
            <Box sx={{ mr: '4px' }}>
              {comments.map((comment) => (
                <Comment comment={comment} key={comment.data.id} />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default Popup
