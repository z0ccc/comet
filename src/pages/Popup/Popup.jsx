/** @jsx jsx */
import { jsx, Box, Flex, Link } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import getPosts from '../../utils/getPosts'
import { getComments } from '../../utils/getComments'
import Subreddits from '../../components/Subreddits'
import Post from '../../components/Post'
import Comment from '../../components/Comment'
import Error from '../../components/Error'

const Popup = () => {
  const [posts, setPosts] = useState()
  const [postIndex, setPostIndex] = useState()
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs[0].url) {
        getPosts(tabs[0].url)
          .then((posts) => {
            if (posts.length === 0) {
              setMessage(
                <>
                  No posts found.{' '}
                  <Link
                    sx={{
                      color: '#4aabe7',
                      textDecoration: 'none',
                      ml: '4px',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                    href={`https://www.reddit.com/r/voatme/submit?url=${tabs[0].url}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Submit it
                  </Link>
                </>
              )
            } else {
              setPosts(posts)
              setPostIndex(0)
            }
          })
          .catch(() => {
            setMessage(<Error />)
          })
      }
    })
  }, [])

  useEffect(() => {
    if (
      postIndex !== undefined &&
      !posts[postIndex].hasOwnProperty('comments')
    ) {
      getComments(posts[postIndex].permalink)
        .then((comments) => {
          posts[postIndex].comments = comments
          setPosts([...posts])
        })
        .catch(() => {
          setMessage(<Error />)
        })
    }
  }, [postIndex, posts])

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
          {message}
        </Flex>
      ) : (
        <>
          <Subreddits
            posts={posts}
            postIndex={postIndex}
            setPostIndex={setPostIndex}
          />
          {posts.map((post, i) => (
            <Box
              sx={{
                display: postIndex === i ? 'block' : 'none',
              }}
              key={post.id}
            >
              <Post post={post} />

              {post.hasOwnProperty('comments') ? (
                <>
                  {post.comments && (
                    <Box sx={{ mr: '4px' }}>
                      {post.comments.map((comment) => (
                        <Comment
                          comment={comment}
                          permalink={post.permalink}
                          key={comment.data.id}
                        />
                      ))}
                    </Box>
                  )}
                </>
              ) : (
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
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  )
}

export default Popup
