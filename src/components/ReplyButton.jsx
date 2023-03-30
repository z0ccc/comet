import React from 'react'
import { Button } from 'theme-ui'

const ReplyButton = ({ showReplyForm, setShowReplyForm }) => {
  return (
    <Button onClick={() => setShowReplyForm(!showReplyForm)} variant="action">
      {showReplyForm ? 'cancel' : 'reply'}
    </Button>
  )
}

export default ReplyButton
