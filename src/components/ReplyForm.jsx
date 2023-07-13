import React, { useState } from 'react'
import { Button, Flex, Textarea, Text } from 'theme-ui'

const ReplyForm = ({ name, showReplyForm, setShowReplyForm, setNewReply }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmitReply = (e) => {
    e.preventDefault()

    chrome.runtime.sendMessage(
      {
        replyId: name,
        replyText: e.target.reply.value,
      },
      (response) => {
        if (response.json.errors.length > 0) {
          setErrorMessage(response.json.errors[0][1])
        } else {
          setShowReplyForm(false)
          setNewReply(response.json.data.things[0])
        }
      }
    )
  }

  return (
    <>
      {showReplyForm && (
        <form onSubmit={handleSubmitReply}>
          <Textarea
            name="reply"
            sx={{
              border: '1px solid',
              borderColor: 'border',
              height: '120px',
              background: 'transparent',
              mt: '12px',
              outline: 'none',
              font: 'inherit',
              fontSize: '14px',
              resize: 'vertical',
              transition: '.1s linear',
              '&:hover': {
                borderColor: 'primary',
              },
              '&:focus': {
                borderColor: 'primary',
              },
            }}
          />
          <Flex sx={{ gap: '6px', alignItems: 'center' }}>
            <Button
              type="submit"
              sx={{
                all: 'unset',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '13px',
                color: 'textDark',
                p: '4px 8px',
                mt: '8px',
                borderRadius: '3px',
                border: '1px solid',
                borderColor: 'border',
                transition: '.1s linear',
                background: 'button',
                '&:hover': {
                  backgroundColor: 'border',
                },
              }}
            >
              Reply
            </Button>
            {errorMessage && (
              <Text
                sx={{
                  color: 'error',
                  fontSize: '13px',
                  display: 'block',
                  mt: '6px',
                }}
              >
                {errorMessage}
              </Text>
            )}
          </Flex>
        </form>
      )}
    </>
  )
}

export default ReplyForm
