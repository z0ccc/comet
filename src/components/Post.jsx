/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, Flex, Link, Box, Divider } from 'theme-ui'
import SaveButton from './SaveButton'
import ReplyButton from './ReplyButton'
import ReplyForm from './ReplyForm'
import InfoHeader from './InfoHeader'

const Post = ({ currentPost, setNewReply, isLoggedIn }) => {
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <>
      <Box sx={{ mt: '18px' }}>
        <Link
          sx={{
            display: 'block',
            color: 'primaryText',
            fontSize: '16px',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: '.1s linear',
            lineHeight: '22px',
            mb: '8px',
            '&:hover': {
              color: 'primary',
            },
          }}
          href={`https://reddit.com${currentPost.permalink}`}
          target="_blank"
          rel="noreferrer"
          dangerouslySetInnerHTML={{
            __html: currentPost.title,
          }}
        />
        <Flex
          sx={{
            gap: '12px',
          }}
        >
          <InfoHeader infoSource={currentPost} />
          {isLoggedIn && (
            <>
              <SaveButton name={currentPost.name} isSaved={currentPost.saved} />
              <ReplyButton
                showReplyForm={showReplyForm}
                setShowReplyForm={setShowReplyForm}
              />
            </>
          )}
        </Flex>
      </Box>
      <ReplyForm
        name={currentPost.name}
        showReplyForm={showReplyForm}
        setShowReplyForm={setShowReplyForm}
        setNewReply={setNewReply}
      />
      <Divider sx={{ color: 'border', mt: '18px' }} />
    </>
  )
}

export default Post
