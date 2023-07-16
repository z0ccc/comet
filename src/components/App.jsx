/** @jsx jsx */
import React, { useState, useEffect, useCallback } from 'react'
import { jsx, useColorMode, Box, Flex, Select } from 'theme-ui'
import { getComments } from '../utils/getComments'
import { toggleYoutube, toggleReddit } from '../utils/toggleComments'
import Subreddits from './Subreddits'
import Post from './Post'
import Comment from './Comment'
import Error from './Error'
import NoPosts from './NoPosts'
import YoutubeToggle from './YoutubeToggle'
import PostMessageWrap from './PostMessageWrap'
import '../assets/styles.css'

const App = ({ url, isContent, isSidePanel }) => {
  const [posts, setPosts] = useState()
  const [postIndex, setPostIndex] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [postsMessage, setPostsMessage] = useState(
    <PostMessageWrap isContent={isContent}>Loading...</PostMessageWrap>
  )
  const [newReply, setNewReply] = useState()
  const [commentSort, setCommentSort] = useState('best')

  const [, setColorMode] = useColorMode()

  chrome.storage.local.get(['theme'], (storage) => {
    if (storage.theme === 'default') {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setColorMode('dark')
      } else {
        setColorMode('light')
      }
    } else {
      setColorMode(storage.theme)
    }
  })

  useEffect(() => {
    if (url) {
      chrome.runtime.sendMessage(
        {
          url,
        },
        (response) => {
          if (response.posts.error) {
            setPostsMessage(
              <Error isContent={isContent} message={response.posts.message} />
            )
          } else if (response.posts.length === 0) {
            isContent && toggleYoutube()
            setPostsMessage(<NoPosts url={url} isContent={isContent} />)
          } else {
            chrome.storage.local.get(
              ['commentSort', 'youtubeDefault'],
              (storage) => {
                if (isContent) {
                  storage.youtubeDefault ? toggleYoutube() : toggleReddit()
                }
                setCommentSort(storage.commentSort)
                setPosts(response.posts)
                setPostIndex(0)
                response.posts[0].sort = storage.commentSort || 'best'
                setIsLoggedIn(!!response.modhash)
              }
            )
          }
        }
      )
    }
  }, [isContent, url])

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
        setPostsMessage(<Error isContent={isContent} />)
      })
  }, [commentSort, isContent, postIndex, posts])

  useEffect(() => {
    if (postIndex !== undefined && posts[postIndex].comments === undefined) {
      handleCommentFetch()
    }
  }, [handleCommentFetch, postIndex, posts])

  return (
    <Box
      sx={{
        color: 'primaryText',
        pl: isContent || isSidePanel ? null : 'calc(100vw - 100%)',
      }}
    >
      {posts === undefined ? (
        <Flex
          sx={{
            width: '100%',
            pt: isContent ? '0' : '18px',
            pb: '18px',
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
            <YoutubeToggle isContent={isContent} />
          </Flex>
          {posts.map((post, i) => (
            <Box
              sx={{
                display: postIndex === i ? 'block' : 'none',
                mx: isContent ? '0' : '12px',
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
