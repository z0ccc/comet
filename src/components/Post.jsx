/** @jsx jsx */
import { jsx, Flex, Button, Link, Box, Divider } from 'theme-ui'
import React from 'react'
import convertDate from '../utils/convertDate'
import Upvote from '../assets/upvote.svg'
import UpvoteGrey from '../assets/upvoteGrey.svg'
import Downvote from '../assets/downvote.svg'
import DownvoteGrey from '../assets/downvoteGrey.svg'

const Post = ({ post }) => {
  console.log(post)
  // stack grey icons on top of colored icons
  return (
    <>
      <Flex sx={{ padding: '18px 12px', alignItems: 'center' }}>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button sx={{ all: 'unset', cursor: 'pointer' }}>
            <img
              src={UpvoteGrey}
              alt="logo"
              sx={{ width: '18px', height: '18px' }}
            />
          </Button>
          <Box sx={{ color: '#bbb', fontWeight: '600', my: '4px' }}>
            {post.score}
          </Box>
          <Button sx={{ all: 'unset', cursor: 'pointer' }}>
            <img
              src={DownvoteGrey}
              alt="logo"
              sx={{ width: '18px', height: '18px' }}
            />
          </Button>
        </Flex>
        <Box sx={{ ml: '20px' }}>
          <Link
            sx={{
              color: '#4a4a4a',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all .15s ease-in-out',
              '&:hover': {
                color: '#4aabe7',
              },
            }}
            href={`https://reddit.com/u/${post.author}`}
            target="_blank"
            rel="noreferrer"
          >
            {post.title}
          </Link>
          <Box sx={{ color: '#707070', fontSize: '12px', mt: '10px' }}>
            {convertDate(post.created_utc)} by{' '}
            <Link
              sx={{
                color: '#4aabe7',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              href={`https://reddit.com/u/${post.author}`}
              target="_blank"
              rel="noreferrer"
            >
              {post.author}
            </Link>
          </Box>
        </Box>
      </Flex>
      <Divider sx={{ color: '#d1d1d1', m: '0 12px' }} />
    </>
  )
}

export default Post
