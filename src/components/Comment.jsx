/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx, Flex, Button, Box, Image } from 'theme-ui'
import LoadMore from './LoadMore'
import Reply from './Reply'
import CommentHeader from './CommentHeader'
import CommentActions from './CommentActions'
import ReactHtmlParser from 'html-react-parser'
import Upvote from '../assets/upvote.svg'
import UpvoteGrey from '../assets/upvoteGrey.svg'
import Downvote from '../assets/downvote.svg'
import DownvoteGrey from '../assets/downvoteGrey.svg'

const prepareCommentBody = (body) =>
  ReactHtmlParser(body)
    .replace('<a href=', '<a target="_blank" href=')
    .replace(
      '<a target="_blank" href="/',
      '<a target="_blank" href="https://reddit.com/'
    )

const getVote = (likes) => {
  if (likes) return 1 // if upvote
  if (likes === false) return -1 // if downvote
  return 0 // if no vote
}

const Comment = ({ comment, permalink, depth, isLoadMore = false }) => {
  const [vote, setVote] = useState(0)
  const [score, setScore] = useState(comment.data.score)

  const newDepth = depth ? depth : comment.data.depth

  useEffect(() => {
    setVote(getVote(comment.data.likes))
  }, [comment.data.likes])

  const handleVote = (voteType) => {
    if (vote === voteType) {
      setScore(score - voteType)
    } else if (vote + voteType === 0) {
      setScore(score + voteType * 2)
    } else {
      setScore(score + voteType)
    }

    const direction = vote === voteType ? 0 : voteType
    setVote(direction)

    chrome.runtime.sendMessage({ voteId: comment.data.name, direction })
  }

  return (
    <>
      {comment.kind === 'more' ? (
        <Box sx={{ mt: '6px', mb: '10px' }}>
          <LoadMore
            comment={comment}
            child={comment}
            permalink={permalink}
            depth={depth}
            isTopLevel
          />
        </Box>
      ) : (
        <Box
          key={comment.data.id}
          sx={{
            m: newDepth === 0 ? '0 0px 18px 0' : '10px 8px 8px 14px',
          }}
        >
          <Flex sx={{ mb: '8px' }}>
            <Flex
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                mr: '12px',
                minWidth: '14px',
              }}
            >
              <Button
                sx={{ all: 'unset', cursor: 'pointer' }}
                onClick={() => handleVote(1)}
              >
                <Image
                  src={vote === 1 ? Upvote : UpvoteGrey}
                  alt="logo"
                  sx={{ width: '14px', height: '14px' }}
                />
              </Button>
              <Button
                sx={{ all: 'unset', cursor: 'pointer' }}
                onClick={() => handleVote(-1)}
              >
                <Image
                  src={vote === -1 ? Downvote : DownvoteGrey}
                  alt="logo"
                  sx={{ width: '14px', height: '14px' }}
                />
              </Button>
            </Flex>
            <Box sx={{ width: '100%' }}>
              <CommentHeader
                author={comment.data.author}
                score={score}
                created_utc={comment.data.created_utc}
                permalink={permalink}
                commentId={comment.data.id}
              />
              <Box
                dangerouslySetInnerHTML={{
                  __html: prepareCommentBody(comment.data.body_html),
                }}
                sx={{ fontSize: '13px', wordBreak: 'break-word' }}
              />
              <CommentActions
                permalink={permalink}
                commentId={comment.data.id}
                commentName={comment.data.name}
              />
            </Box>
          </Flex>
          {comment.data.replies &&
            comment.data.replies.data.children.map((child) => (
              <Box key={child.data.id}>
                {child.kind === 'more' ? (
                  <LoadMore
                    comment={comment}
                    child={child}
                    permalink={permalink}
                    depth={depth}
                  />
                ) : (
                  <Reply
                    child={child}
                    permalink={permalink}
                    depth={depth}
                    isLoadMore={isLoadMore}
                  />
                )}
              </Box>
            ))}
        </Box>
      )}
    </>
  )
}

export default Comment
