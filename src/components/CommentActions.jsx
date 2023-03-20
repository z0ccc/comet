import React, { useState } from 'react'
import { Button, Link, Flex, Textarea, Text, Box } from 'theme-ui'
import Reply from './Reply'

const CommentActions = ({ permalink, depth, commentId, commentName }) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [newReply, setNewReply] = useState()

  const [errorMessage, setErrorMessage] = useState(null)

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm)
  }

  const handleSubmitReply = (e) => {
    e.preventDefault()

    chrome.runtime.sendMessage(
      {
        replyId: commentName,
        replyText: e.target.reply.value,
      },
      (response) => {
        console.log(response)
        if (response.json.errors.length > 0) {
          console.log(response.json)
          console.log(response.json.errors)
          console.log(response.json.errors[0][1])
          setErrorMessage(response.json.errors[0][1])
        } else {
          console.log(response.json.data.things[0].data)
          setShowReplyForm(false)
          setNewReply(response.json.data.things[0])
        }
      }
    )
  }

  return (
    <>
      <Flex sx={{ gap: '10px', my: '6px' }}>
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
              mt: '10px',
              outline: 'none',
              font: 'inherit',
              resize: 'vertical',
              transition: 'all .15s ease-in-out',
              '&:hover': {
                borderColor: '#4aabe7',
              },
              '&:focus': {
                borderColor: '#4aabe7',
              },
            }}
          />
          <Flex sx={{ gap: '6px', alignItems: 'center' }}>
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
                mt: '8px',
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
            {errorMessage && (
              <Text
                sx={{
                  color: 'red',
                  fontSize: '12px',
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
      {newReply && (
        // <Box sx={{ mt: '8px' }}>
        <Reply child={newReply} permalink={permalink} depth={depth} />
        // </Box>
      )}
    </>
  )
}

export default CommentActions
