/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx, Flex, Button, Link, Box, Textarea } from 'theme-ui'
import LoadMore from './LoadMore'
import Reply from './Reply'
import ReactHtmlParser from 'html-react-parser'
import convertDate from '../utils/convertDate'
import formatNumber from '../utils/formatNumber'
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
  const [showReplyForm, setShowReplyForm] = useState(false)

  const newDepth = depth ? depth : comment.data.depth

  useEffect(() => {
    setVote(getVote(comment.data.likes))
  }, [comment.data.likes])

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm)
  }

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

  const handleSubmitReply = (e) => {
    e.preventDefault()

    chrome.runtime.sendMessage({
      replyId: comment.data.name,
      replyText: e.target.reply.value,
    })

    setShowReplyForm(false)
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
                <img
                  src={vote === 1 ? Upvote : UpvoteGrey}
                  alt="logo"
                  sx={{ width: '14px', height: '14px' }}
                />
              </Button>
              <Button
                sx={{ all: 'unset', cursor: 'pointer' }}
                onClick={() => handleVote(-1)}
              >
                <img
                  src={vote === -1 ? Downvote : DownvoteGrey}
                  alt="logo"
                  sx={{ width: '14px', height: '14px' }}
                />
              </Button>
            </Flex>
            <Box sx={{ width: '100%' }}>
              <Flex>
                <Link
                  sx={{
                    fontSize: '11px',
                    color: '#4aabe7',
                    fontWeight: '600',
                    textDecoration: 'none',

                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  href={`https://reddit.com/u/${comment.data.author}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {comment.data.author}
                </Link>
                <Flex
                  sx={{
                    fontSize: '11px',
                    color: '#707070',
                    ml: '6px',
                  }}
                >
                  {formatNumber(score)} points
                  <Flex
                    sx={{
                      fontSize: '11px',
                      color: '#707070',
                      ml: '4px',
                    }}
                  >
                    {convertDate(comment.data.created_utc)}
                  </Flex>
                </Flex>
              </Flex>
              <Box
                dangerouslySetInnerHTML={{
                  __html: prepareCommentBody(comment.data.body_html),
                }}
                sx={{ fontSize: '13px', wordBreak: 'break-word' }}
              />
              <Flex sx={{ gap: '10px' }}>
                <Link
                  href={`https://reddit.com${permalink}${comment.data.id}`}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    all: 'unset',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '11px',
                    color: '#6a6a6a',
                    my: '6px',
                    transition: 'all .15s ease-in-out',
                    '&:hover': {
                      color: '#4aabe7',
                    },
                  }}
                >
                  permanlink
                </Link>
                <Link
                  href={`https://reddit.com${permalink}`}
                  sx={{
                    all: 'unset',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '11px',
                    color: '#6a6a6a',
                    my: '6px',
                    transition: 'all .15s ease-in-out',
                    '&:hover': {
                      color: '#4aabe7',
                    },
                  }}
                >
                  save
                </Link>
                <Button
                  onClick={toggleReplyForm}
                  sx={{
                    all: 'unset',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '11px',
                    color: '#6a6a6a',
                    my: '6px',
                    transition: 'all .15s ease-in-out',
                    '&:hover': {
                      color: '#4aabe7',
                    },
                  }}
                >
                  reply
                </Button>
              </Flex>
              {showReplyForm && (
                <form onSubmit={handleSubmitReply}>
                  <Textarea
                    name="reply"
                    sx={{
                      border: '1px solid #d1d1d1',
                      height: '100px',
                      backgroundColor: '#fff',
                      mt: '6px',
                      outline: 'none',
                      font: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                  <Flex sx={{ gap: '10px' }}>
                    <Button
                      type="submit"
                      sx={{
                        all: 'unset',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '11px',
                        color: '#6a6a6a',
                        backgroundColor: '#e6e6e6',
                        p: '4px 8px',
                        my: '6px',
                        borderRadius: '3px',
                        border: '1px solid #d1d1d1',
                        transition: 'all .15s ease-in-out',

                        '&:hover': {
                          backgroundColor: '#4aabe7',
                          color: '#fff',
                        },
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={toggleReplyForm}
                      sx={{
                        all: 'unset',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '11px',
                        color: '#6a6a6a',
                        my: '6px',
                        transition: 'all .15s ease-in-out',
                        '&:hover': {
                          color: '#4aabe7',
                        },
                      }}
                    >
                      cancel
                    </Button>
                  </Flex>
                </form>
              )}
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
