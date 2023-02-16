/** @jsx jsx */
import { jsx, Flex, Button, Link, Box, Divider } from 'theme-ui'
import React from 'react'
import Score from './Score'
import ReactHtmlParser from 'html-react-parser'
import convertDate from '../utils/convertDate'
import Upvote from '../assets/upvote.svg'
import UpvoteGrey from '../assets/upvoteGrey.svg'
import Downvote from '../assets/downvote.svg'
import DownvoteGrey from '../assets/downvoteGrey.svg'

const Comments = ({ comments }) => {
  console.log(comments)
  // stack grey icons on top of colored icons
  return (
    <>
      {comments.map((comment) => (
        <Box key={comment.data.id}>
          {comment.kind === 'more' ? (
            // <LoadMore comment={comment} permalink={permalink} />
            <div>Load More</div>
          ) : (
            <Flex sx={{ padding: '0 12px 6px 12px' }}>
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
                  <Box
                    sx={{
                      fontSize: '11px',
                      color: '#4aabe7',
                      fontWeight: '600',
                    }}
                  >
                    {comment.data.author}
                  </Box>
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
                    __html: ReactHtmlParser(comment.data.body_html),
                  }}
                  sx={{ fontSize: '13px' }}
                />
              </Box>
            </Flex>
          )}
        </Box>
      ))}
    </>
  )
}

export default Comments
