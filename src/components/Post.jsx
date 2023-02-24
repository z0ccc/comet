/** @jsx jsx */
import { jsx, Flex, Link, Box, Divider } from 'theme-ui'
import React from 'react'
import Score from './Score'
import convertDate from '../utils/convertDate'

const Post = ({ post }) => {
  return (
    <>
      <Flex sx={{ padding: '18px 12px', alignItems: 'center' }}>
        <Score score={post.score} />
        <Box sx={{ ml: '20px' }}>
          <Link
            sx={{
              color: '#4a4a4a',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all .15s ease-in-out',
              lineHeight: '20px',
              '&:hover': {
                color: '#4aabe7',
              },
            }}
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noreferrer"
          >
            {post.title}
          </Link>
          <Box sx={{ color: '#707070', fontSize: '12px', mt: '8px' }}>
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
      <Divider sx={{ color: '#d1d1d1', m: '0 12px 18px 12px' }} />
    </>
  )
}

export default Post
