/** @jsx jsx */
import { jsx, Flex, Button, Link, Box } from 'theme-ui'
import React from 'react'
import LoadMore from './LoadMore'
import Reply from './Reply'
import ReactHtmlParser from 'html-react-parser'
import convertDate from '../utils/convertDate'
import Upvote from '../assets/upvote.svg'
import UpvoteGrey from '../assets/upvoteGrey.svg'
import Downvote from '../assets/downvote.svg'
import DownvoteGrey from '../assets/downvoteGrey.svg'

const prepareCommentBody = (body) =>
  ReactHtmlParser(body)
    .replace('<a href=', '<a target="_blank" href=')
    .replace(
      '<a target="_blank" href="/',
      '<a target="_blank" href="https://reddit.com/'
    )

const Comment = ({ comment, depth, isLoadMore = false }) => {
  const newDepth = depth ? depth : comment.data.depth

  console.log(comment.data.body, newDepth)
  return (
    <>
      {comment.kind === 'more' ? (
        <div>Load More</div>
      ) : (
        <Box
          key={comment.data.id}
          sx={{
            m: newDepth === 0 ? '18px 8px 8px 14px' : '10px 8px 8px 14px',
          }}
        >
          <Flex sx={{ mb: '8px' }}>
            <Flex
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                mr: '12px',
                minWidth: '14px',
              }}
            >
              <Button sx={{ all: 'unset', cursor: 'pointer' }}>
                <img
                  src={UpvoteGrey}
                  alt="logo"
                  sx={{ width: '14px', height: '14px' }}
                />
              </Button>
              <Button sx={{ all: 'unset', cursor: 'pointer' }}>
                <img
                  src={DownvoteGrey}
                  alt="logo"
                  sx={{ width: '14px', height: '14px' }}
                />
              </Button>
            </Flex>
            <Box>
              <Flex>
                <Link
                  sx={{
                    fontSize: '11px',
                    color: '#4aabe7',
                    fontWeight: '600',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  href={`https://reddit.com/u/${comment.data.author}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {comment.data.author}
                </Link>
                <Flex
                  sx={{
                    fontSize: '11px',
                    color: '#707070',
                    ml: '6px',
                  }}
                >
                  {comment.data.score} posts
                  <Flex
                    sx={{
                      fontSize: '11px',
                      color: '#707070',
                      ml: '4px',
                    }}
                  >
                    {convertDate(comment.data.created_utc)}
                  </Flex>
                </Flex>
              </Flex>
              <Box
                dangerouslySetInnerHTML={{
                  __html: prepareCommentBody(comment.data.body_html),
                }}
                sx={{ fontSize: '13px' }}
              />
            </Box>
          </Flex>
          {comment.data.replies &&
            comment.data.replies.data.children.map((child) => (
              <Box key={child.data.id}>
                {child.kind === 'more' ? (
                  <LoadMore comment={comment} child={child} depth={depth} />
                ) : (
                  <Reply
                    comment={comment}
                    child={child}
                    depth={depth}
                    isLoadMore={isLoadMore}
                  />
                )}
              </Box>
            ))}
        </Box>
      )}
    </>
  )
}

export default Comment
