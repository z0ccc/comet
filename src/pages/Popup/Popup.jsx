/** @jsx jsx */
import { jsx, Box, Flex, Link, Select } from 'theme-ui'
import React, { useState, useEffect, useCallback } from 'react'
import { getComments } from '../../utils/getComments'
import Subreddits from '../../components/Subreddits'
import Post from '../../components/Post'
import Comment from '../../components/Comment'
import Error from '../../components/Error'

const Popup = () => {
  const [posts, setPosts] = useState()
  const [postIndex, setPostIndex] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [postsMessage, setPostsMessage] = useState('Loading...')
  const [newReply, setNewReply] = useState()

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs[0].url) {
        chrome.runtime.sendMessage(
          {
            url: tabs[0].url,
          },
          (response) => {
            console.log(response.modhash)
            if (response === -1) {
              setPostsMessage(<Error />)
            } else if (response.posts.length === 0) {
              setPostsMessage(
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
              setPosts(response.posts)
              setPostIndex(0)
              response.posts[0].sort = 'best'
              setIsLoggedIn(!!response.modhash)
            }
          }
        )
      }
    })
  }, [])

  const handleCommentFetch = useCallback(() => {
    getComments(posts[postIndex].permalink + `?sort=${posts[postIndex].sort}`)
      .then((comments) => {
        posts[postIndex].comments = comments === undefined ? null : comments
        setPosts([...posts])
      })
      .catch(() => {
        setPostsMessage(<Error />)
      })
  }, [postIndex, posts])

  useEffect(() => {
    if (postIndex !== undefined && posts[postIndex].comments === undefined) {
      handleCommentFetch()
    }
  }, [handleCommentFetch, postIndex, posts])

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
          {postsMessage}
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
                mx: '12px',
              }}
              key={post.id}
            >
              <Post
                post={post}
                setNewReply={setNewReply}
                isLoggedIn={isLoggedIn}
              />
              <Box sx={{ my: '14px' }}>
                <Select
                  onChange={(e) => {
                    post.sort = e.target.value
                    post.comments = undefined
                    setPosts([...posts])
                  }}
                >
                  <option value="best">Best</option>
                  <option value="top">Top</option>
                  <option value="new">New</option>
                  <option value="old">Old</option>
                  <option value="controversial">Controversial</option>
                </Select>
              </Box>
              {post.comments !== undefined ? (
                <>
                  {post.comments && (
                    <Box sx={{ mr: '4px' }}>
                      {newReply && (
                        <Comment
                          comment={newReply}
                          permalink={post.permalink}
                          isLoggedIn={isLoggedIn}
                          depth={0}
                        />
                      )}
                      {post.comments.map((comment) => (
                        <Comment
                          comment={comment}
                          permalink={post.permalink}
                          isLoggedIn={isLoggedIn}
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
