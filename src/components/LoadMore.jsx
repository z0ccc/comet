/** @jsx jsx */
import { jsx, Button, Box, Link } from 'theme-ui'
import React, { useState } from 'react'
import Comment from './Comment'
import { loadMoreComments } from '../utils/getComments'

const LoadMore = ({ parent, comment, permalink }) => {
  const [replies, setReplies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Box sx={{ mt: '14px' }}>
      {replies.length === 0 ? (
        <Box
          sx={{
            cursor: 'pointer',
            color: '#4aabe7',
            fontSize: '13px',
            mt: '6px',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {comment.data.count === 0 ? (
            <Link
              href={`https://www.reddit.com/${permalink}${parent.data.parent_id.substring(
                3
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Continue this thread
            </Link>
          ) : (
            <Button
              sx={{ all: 'unset' }}
              onClick={() => {
                setIsLoading(true)
                loadMoreComments(comment.data.children, permalink).then(
                  (res) => {
                    setReplies(res)
                    setIsLoading(false)
                  }
                )
              }}
            >
              {isLoading ? 'Loading...' : `Load more (${comment.data.count})`}
            </Button>
          )}
        </Box>
      ) : (
        <>
          {replies.map((children, i) => (
            <Box key={i}>
              {children !== undefined && (
                <>
                  {children.map((child) => (
                    <Box key={child.data.id}>
                      <Comment
                        comment={child}
                        permalink={permalink}
                        depth={parent.data.depth + comment.data.depth}
                      />
                    </Box>
                  ))}
                </>
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  )
}

export default LoadMore
