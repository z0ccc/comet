/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx, useColorMode, Box, Flex } from 'theme-ui'
import { getComments } from '../utils/getComments'
import { toggleYoutube, toggleReddit } from '../utils/toggleComments'
import Subreddits from './Subreddits'
import Post from './Post'
import YoutubeToggle from './YoutubeToggle'
import MessageWrap from './MessageWrap'
import Comments from './Comments'
import SortDropdown from './SortDropdown'
import '../assets/styles.css'

const App = ({ url, isContent, isSidePanel }) => {
  const [posts, setPosts] = useState()
  const [currentPost, setCurrentPost] = useState()
  const [comments, setComments] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [postMessage, setPostMessage] = useState('Loading...')
  const [commentsMessage, setCommentsMessage] = useState('Loading...')
  const [newReply, setNewReply] = useState()
  const [sortType, setSortType] = useState('best')

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
    console.log(isContent, isSidePanel, url)
    if (isSidePanel) {
      setPosts()
      setCurrentPost()
      setComments()
      setIsLoggedIn(false)
      setPostMessage('Loading...')
      setCommentsMessage('Loading...')
      setNewReply()
      setSortType('best')
    }

    if (!url) return

    chrome.runtime.sendMessage(
      {
        url,
      },
      (response) => {
        if (response.error) {
          setPostMessage(`Error: ${response.error}`)
        } else if (response.posts) {
          if (response.posts.length === 0) {
            isContent && toggleYoutube()
            setPostMessage('No posts found.')
          } else {
            chrome.storage.local.get(
              ['commentSort', 'youtubeDefault'],
              (storage) => {
                if (isContent) {
                  storage.youtubeDefault ? toggleYoutube() : toggleReddit()
                }

                setPosts(response.posts)
                setCurrentPost(response.posts[0])
                setIsLoggedIn(!!response.modhash)
              }
            )
          }
        }
      }
    )
  }, [isContent, isSidePanel, url])

  useEffect(() => {
    if (!currentPost) return

    setCommentsMessage('Loading...')
    setComments()

    getComments(currentPost.permalink + `?sort=${sortType}`)
      .then((comments) => {
        setComments(comments)
      })
      .catch((err) => {
        console.log('getComments', err)
        // setMessage(<Error isContent={isContent} message={err.message} />)
      })
  }, [currentPost, sortType])

  return (
    <Box
      sx={{
        color: 'primaryText',
        pl: isContent || isSidePanel ? null : 'calc(100vw - 100%)',
      }}
    >
      {posts && currentPost ? (
        <>
          <Flex sx={{ gap: '16px' }}>
            <Subreddits
              posts={posts}
              currentPost={currentPost}
              setCurrentPost={setCurrentPost}
            />
            <YoutubeToggle isContent={isContent} />
          </Flex>
          <Box
            sx={{
              mx: isContent ? '0' : '12px',
            }}
          >
            <Post
              currentPost={currentPost}
              setNewReply={setNewReply}
              isLoggedIn={isLoggedIn}
            />
            <SortDropdown sortType={sortType} setSortType={setSortType} />
            <Comments
              comments={comments}
              currentPost={currentPost}
              isContent={isContent}
              isLoggedIn={isLoggedIn}
              commentsMessage={commentsMessage}
              newReply={newReply}
            />
          </Box>
        </>
      ) : (
        <MessageWrap isContent={isContent}>{postMessage}</MessageWrap>
      )}
    </Box>
  )
}

export default App
