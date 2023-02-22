/** @jsx jsx */
import { jsx, Button, Box } from 'theme-ui'
import React, { useState } from 'react'
import Reply from './Reply'
import { loadMoreComments } from '../utils/getComments'

const LoadMore = ({ comment, child, permalink, depth }) => {
  const [replies, setReplies] = useState([])

  return (
    <>
      {replies.length === 0 ? (
        <Button
          sx={{
            all: 'unset',
            cursor: 'pointer',
            color: '#4aabe7',
            fontSize: '11px',
            ml: (depth ? depth : comment.data.depth) === 0 ? '14px' : 0,
            my: '4px',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() =>
            loadMoreComments(child.data.children, permalink).then((res) =>
              setReplies(res)
            )
          }
        >
          Load More ({child.data.count})
        </Button>
      ) : (
        <>
          {replies.map((children, i) => (
            <Box key={i}>
              {children !== undefined && (
                <>
                  {children.map((child) => (
                    <Reply
                      child={child}
                      permalink={permalink}
                      depth={comment.data.depth + (child.data.depth + 1)}
                      isLoadMore
                      key={child.data.id}
                    />
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
