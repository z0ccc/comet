/** @jsx jsx */
import { jsx, Box, Flex, Link } from 'theme-ui'
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
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs[0].url) {
        getPosts('https://www.youtube.com/watch?v=6swmTBVI83k')
          .then((posts) => {
            setPosts(posts)
            setPost(posts[0])
            getComments(posts[0].permalink)
              .then((comments) => {
                setComments(comments)
              })
              .catch(() => {
                setIsError(true)
              })
          })
          .catch(() => {
            setIsError(true)
          })
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
          {isError ? (
            <>
              Error: Reddit API may be down or another extension is blocking
              Voat.
              <Link
                sx={{
                  color: '#4aabe7',
                  textDecoration: 'none',
                  ml: '4px',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                href="https://github.com/z0ccc/voat-extension#troubleshoot"
                target="_blank"
                rel="noreferrer"
              >
                Read More
              </Link>
            </>
          ) : (
            'Loading...'
          )}
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
                <Comment
                  comment={comment}
                  permalink={post.permalink}
                  key={comment.data.id}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default Popup
