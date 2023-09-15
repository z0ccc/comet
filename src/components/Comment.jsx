/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, Flex, Button, Box } from 'theme-ui'
import LoadMore from './LoadMore'
import InfoHeader from './InfoHeader'
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
  const [hideCommment, setHideComment] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [newReply, setNewReply] = useState()

  const newDepth = depth ? depth : comment.data.depth

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
            m: newDepth ? ['18px 0 0 0', '18px 0 0 12px'] : '0 0 24px 0',
          }}
        >
          <Button
            sx={{
              all: 'unset',
              cursor: 'pointer',
              pl: '12px',
              ml: '-12px',
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
                transition: '.1s linear',
                pl: '4px',
                width: '12px',
              }}
            />
          </Button>
          <Box
            sx={{
              width: '100%',
              ml: '4px',
            }}
          >
            {hideCommment ? (
              <InfoHeader infoSource={comment.data} />
            ) : (
              <>
                <Flex>
                  <Box
                    sx={{
                      width: '100%',
                    }}
                  >
                    <InfoHeader infoSource={comment.data} />
                    <Box
                      className="cometCommentBody"
                      dangerouslySetInnerHTML={{
                        __html: prepareCommentBody(comment.data.body_html),
                      }}
                      sx={{
                        fontSize: '14px',
                        wordBreak: 'break-word',
                        lineHeight: '22px',
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
