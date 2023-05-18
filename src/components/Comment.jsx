/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx, Flex, Button, Box } from 'theme-ui'
import LoadMore from './LoadMore'
import CommentHeader from './CommentHeader'
import VoteButton from './VoteButton'
import { getVote, getScore } from '../utils/voteUtils'
import ReactHtmlParser from 'html-react-parser'
import SaveButton from './SaveButton'
import ReplyButton from './ReplyButton'
import ReplyForm from './ReplyForm'

const prepareCommentBody = (body) =>
  ReactHtmlParser(body)
    .replaceAll('<a href=', '<a target="_blank" href=')
    .replaceAll(
      '<a target="_blank" href="/',
      '<a target="_blank" href="https://reddit.com/'
    )

const Comment = ({ comment, permalink, isLoggedIn, depth }) => {
  const [vote, setVote] = useState(0)
  const [score, setScore] = useState(comment.data.score)
  const [hideCommment, setHideComment] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
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
          <LoadMore
            parent={comment}
            comment={comment}
            permalink={permalink}
            isLoggedIn={isLoggedIn}
          />
        </Box>
      ) : (
        <Flex
          key={comment.data.id}
          sx={{
            m: newDepth ? '18px 0 0 22px' : '0 0 24px 0',
          }}
        >
          <Button
            sx={{
              all: 'unset',
              cursor: 'pointer',
              pl: '8px',
              ml: '-8px',
              transition: 'all .15s ease-in-out',
              '&:hover': {
                '> div': {
                  borderColor: 'primary',
                },
              },
            }}
            onClick={() => setHideComment(!hideCommment)}
          >
            <Box
              sx={{
                height: '100%',
                borderLeft: '1px solid',
                borderColor: 'border',
                pl: '8px',
              }}
            />
          </Button>
          <Box
            sx={{
              width: '100%',
            }}
          >
            {hideCommment ? (
              <CommentHeader
                author={comment.data.author}
                score={score}
                created_utc={comment.data.created_utc}
                permalink={permalink}
                commentId={comment.data.id}
              />
            ) : (
              <>
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
                      className="voatCommentBody"
                      dangerouslySetInnerHTML={{
                        __html: prepareCommentBody(comment.data.body_html),
                      }}
                      sx={{
                        fontSize: '14px',
                        wordBreak: 'break-word',
                        mt: '8px',
                      }}
                    />
                    <Flex sx={{ gap: '12px', mt: '6px' }}>
                      <Button
                        onClick={() =>
                          window.open(
                            `https://reddit.com${permalink}${comment.data.id}`
                          )
                        }
                        variant="action"
                      >
                        permanlink
                      </Button>
                      {isLoggedIn && (
                        <>
                          <SaveButton
                            name={comment.data.name}
                            isSaved={comment.data.saved}
                          />
                          <ReplyButton
                            showReplyForm={showReplyForm}
                            setShowReplyForm={setShowReplyForm}
                          />
                        </>
                      )}
                    </Flex>
                    <ReplyForm
                      name={comment.data.name}
                      showReplyForm={showReplyForm}
                      setShowReplyForm={setShowReplyForm}
                      setNewReply={setNewReply}
                    />
                  </Box>
                </Flex>
                {newReply && (
                  <Comment
                    comment={newReply}
                    permalink={permalink}
                    isLoggedIn={isLoggedIn}
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
                          isLoggedIn={isLoggedIn}
                        />
                      ) : (
                        <Comment
                          comment={child}
                          permalink={permalink}
                          isLoggedIn={isLoggedIn}
                          depth={depth}
                        />
                      )}
                    </Box>
                  ))}
              </>
            )}
          </Box>
        </Flex>
      )}
    </>
  )
}

export default Comment
