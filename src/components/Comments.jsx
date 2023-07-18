/** @jsx jsx */
import React from 'react'
import { jsx, Box } from 'theme-ui'
import Comment from './Comment'
import MessageWrap from './MessageWrap'

const Comments = ({
  currentPost,
  comments,
  isContent,
  isLoggedIn,
  commentsMessage,
  newReply,
}) => {
  return (
    <>
      {comments ? (
        <Box sx={{ mt: '14px', mr: '4px' }}>
          {newReply && (
            <Comment
              comment={newReply}
              permalink={currentPost.permalink}
              isLoggedIn={isLoggedIn}
              depth={0}
            />
          )}
          {comments.map((comment) => (
            <Comment
              comment={comment}
              permalink={currentPost.permalink}
              isLoggedIn={isLoggedIn}
              key={comment.data.id}
            />
          ))}
        </Box>
      ) : (
        <MessageWrap isContent={isContent} isComments>
          {commentsMessage}
        </MessageWrap>
      )}
    </>
  )
}

export default Comments
