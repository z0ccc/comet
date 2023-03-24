/** @jsx jsx */
import { jsx, Flex, Link, Box, Divider } from 'theme-ui'
import React from 'react'
import Score from './Score'
import convertDate from '../utils/convertDate'

const Post = ({ post }) => {
  return (
    <>
      <Flex sx={{ my: '18px', alignItems: 'center' }}>
        <Score post={post} />
        <Box sx={{ ml: '20px' }}>
          <Link
            sx={{
              color: '#4a4a4a',
              fontSize: '16px',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all .15s ease-in-out',
              lineHeight: '1.4',
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
          <Flex
            sx={{ color: '#707070', fontSize: '13px', mt: '8px', gap: '12px' }}
          >
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
            {convertDate(post.created_utc)}
          </Flex>
        </Box>
      </Flex>
      <Divider sx={{ color: '#d1d1d1' }} />
    </>
  )
}

export default Post
