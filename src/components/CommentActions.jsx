import React, { useState } from 'react'
import { Button, Link, Flex, Textarea } from 'theme-ui'

const CommentActions = ({ permalink, commentId, commentName }) => {
  const [showReplyForm, setShowReplyForm] = useState(false)

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm)
  }

  const handleSubmitReply = (e) => {
    e.preventDefault()

    chrome.runtime.sendMessage({
      replyId: commentName,
      replyText: e.target.reply.value,
    })

    setShowReplyForm(false)
  }

  return (
    <>
      <Flex sx={{ gap: '10px' }}>
        <Link
          href={`https://reddit.com${permalink}${commentId}`}
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
          {showReplyForm ? 'cancel' : 'reply'}
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
        </form>
      )}
    </>
  )
}

export default CommentActions
