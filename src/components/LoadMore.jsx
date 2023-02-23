/** @jsx jsx */
import { jsx, Button, Box, Link } from 'theme-ui'
import React, { useState } from 'react'
import Reply from './Reply'
import Comment from './Comment'
import { loadMoreComments } from '../utils/getComments'

const LoadMore = ({ comment, child, permalink, depth, isTopLevel }) => {
  const [replies, setReplies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {replies.length === 0 ? (
        <Box
          sx={{
            cursor: 'pointer',
            color: '#4aabe7',
            fontSize: '11px',
            ml: (depth ? depth : comment.data.depth) === 0 ? '14px' : 0,
            my: '4px',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {child.data.count === 0 ? (
            <Link
              href={`https://www.reddit.com/${permalink}${comment.data.parent_id.substring(
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
                loadMoreComments(child.data.children, permalink).then((res) => {
                  setReplies(res)
                  setIsLoading(false)
                })
              }}
            >
              {isLoading ? 'Loading...' : `Load more (${child.data.count})`}
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
                      {isTopLevel ? (
                        <Comment comment={child} permalink={permalink} />
                      ) : (
                        <Reply
                          child={child}
                          permalink={permalink}
                          depth={comment.data.depth + (child.data.depth + 1)}
                          isLoadMore
                        />
                      )}
                    </Box>
                  ))}
                </>
              )}
            </Box>
          ))}
        </>
      )}
    </>
  )
}

export default LoadMore
