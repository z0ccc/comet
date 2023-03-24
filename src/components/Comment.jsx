/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx, Flex, Button, Box } from 'theme-ui'
import LoadMore from './LoadMore'
import CommentHeader from './CommentHeader'
import CommentActions from './CommentActions'
import VoteButton from './VoteButton'
import { getVote, getScore } from '../utils/voteUtils'
import ReactHtmlParser from 'html-react-parser'

const prepareCommentBody = (body) =>
  ReactHtmlParser(body)
    .replace('<a href=', '<a target="_blank" href=')
    .replace(
      '<a target="_blank" href="/',
      '<a target="_blank" href="https://reddit.com/'
    )

const Comment = ({ comment, permalink, depth }) => {
  console.log(comment)
  const [vote, setVote] = useState(0)
  const [score, setScore] = useState(comment.data.score)
  const [newReply, setNewReply] = useState()

  const newDepth = depth ? depth : comment.data.depth

  useEffect(() => {
    setVote(getVote(comment.data.likes))
  }, [comment.data.likes])

  const handleVote = (voteType) => {
    setScore(getScore(vote, voteType, score))
    const direction = vote === voteType ? 0 : voteType
    setVote(direction)
    chrome.runtime.sendMessage({ voteId: comment.data.name, direction })
  }

  return (
    <>
      {comment.kind === 'more' ? (
        <Box sx={{ mt: '6px', mb: '10px' }}>
          <LoadMore parent={comment} comment={comment} permalink={permalink} />
        </Box>
      ) : (
        <Flex
          key={comment.data.id}
          sx={{
            m: newDepth === 0 ? '0 0 24px 0' : '18px 0 0 22px',
          }}
        >
          <Button
            sx={{
              all: 'unset',
              cursor: 'pointer',
              borderLeft: '1px solid #d1d1d1',
              pl: '8px',
              transition: 'all .15s ease-in-out',
              '&:hover': {
                borderColor: '#4aabe7',
              },
            }}
          />
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Flex>
              <Flex
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  mr: '8px',
                  minWidth: '14px',
                }}
              >
                <VoteButton
                  vote={vote}
                  voteType={1}
                  handleClick={handleVote}
                  size="14px"
                />
                <VoteButton
                  vote={vote}
                  voteType={-1}
                  handleClick={handleVote}
                  size="14px"
                />
              </Flex>
              <Box
                sx={{
                  width: '100%',
                }}
              >
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
                  sx={{ fontSize: '14px', wordBreak: 'break-word' }}
                />
                <CommentActions
                  permalink={permalink}
                  commentId={comment.data.id}
                  commentName={comment.data.name}
                  isSaved={comment.data.saved}
                  setNewReply={setNewReply}
                />
              </Box>
            </Flex>
            {newReply && (
              <Comment
                comment={newReply}
                permalink={permalink}
                depth={newDepth + 1}
              />
            )}
            {comment.data.replies &&
              comment.data.replies.data.children.map((child) => (
                <Box key={child.data.id}>
                  {child.kind === 'more' ? (
                    <LoadMore
                      parent={comment}
                      comment={child}
                      permalink={permalink}
                    />
                  ) : (
                    <Comment
                      comment={child}
                      permalink={permalink}
                      depth={depth}
                    />
                  )}
                </Box>
              ))}
          </Box>
        </Flex>
      )}
    </>
  )
}

export default Comment
