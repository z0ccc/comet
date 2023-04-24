/** @jsx jsx */
import { jsx, Box, Flex, Link, Select, Image, Button } from 'theme-ui'
import React, { useState, useEffect, useCallback } from 'react'
import { getComments } from '../utils/getComments'
import { toggleYoutube } from '../utils/toggleComments'
import Subreddits from './Subreddits'
import Post from './Post'
import Comment from './Comment'
import Error from './Error'
import '../assets/styles.css'

const App = ({ url, isPopup }) => {
  const [posts, setPosts] = useState()
  const [postIndex, setPostIndex] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [postsMessage, setPostsMessage] = useState('Loading...')
  const [newReply, setNewReply] = useState()
  const [commentSort, setCommentSort] = useState('best')

  useEffect(() => {
    if (url) {
      chrome.runtime.sendMessage(
        {
          url,
        },
        (response) => {
          if (response === -1) {
            setPostsMessage(<Error />)
          } else if (response.posts.length === 0) {
            setPostsMessage(
              <>
                No posts found.{' '}
                <Link
                  sx={{
                    color: 'primary',
                    textDecoration: 'none',
                    ml: '4px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  href={`https://www.reddit.com/r/voatme/submit?url=${url}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Submit it
                </Link>
              </>
            )
          } else {
            chrome.storage.local.get(['commentSort'], (storage) => {
              setCommentSort(storage.commentSort)
              setPosts(response.posts)
              setPostIndex(0)
              response.posts[0].sort = storage.commentSort || 'best'
              setIsLoggedIn(!!response.modhash)
            })
          }
        }
      )
    }
  }, [url])

  const handleCommentFetch = useCallback(() => {
    getComments(
      posts[postIndex].permalink +
        `?sort=${posts[postIndex].sort || commentSort}`
    )
      .then((comments) => {
        posts[postIndex].comments = comments === undefined ? null : comments
        setPosts([...posts])
      })
      .catch(() => {
        setPostsMessage(<Error />)
      })
  }, [commentSort, postIndex, posts])

  useEffect(() => {
    if (postIndex !== undefined && posts[postIndex].comments === undefined) {
      handleCommentFetch()
    }
  }, [handleCommentFetch, postIndex, posts])

  return (
    <Box
      sx={{
        color: 'darkText',
        pl: isPopup ? 'calc(100vw - 100%)' : null,
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
          <Flex sx={{ gap: '16px' }}>
            <Subreddits
              posts={posts}
              postIndex={postIndex}
              setPostIndex={setPostIndex}
            />
            {isPopup ? null : (
              <Button
                onClick={toggleYoutube}
                sx={{ all: 'unset', cursor: 'pointer', maxHeight: '34px' }}
              >
                <Image
                  src={chrome.runtime.getURL('/youtube.svg')}
                  alt="Reddit comment toggle"
                  sx={{
                    minWidth: '32px',
                    height: '32px',
                    // '&:hover': {
                    //   fill: 'primary',
                    // },
                  }}
                />
              </Button>
            )}
          </Flex>
          {posts.map((post, i) => (
            <Box
              sx={{
                display: postIndex === i ? 'block' : 'none',
                mx: '30px',
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
                  value={post.sort || commentSort}
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

export default App
