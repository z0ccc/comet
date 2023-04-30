/** @jsx jsx */
import React from 'react'
import { jsx, Box, Flex, Link, Image, Button } from 'theme-ui'
import YoutubeToggle from './YoutubeToggle'
import '../assets/styles.css'

const NoPosts = ({ url, isPopup }) => {
  return (
    <Flex
      sx={{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box />
      <Flex>
        No posts found.{' '}
        <Link
          sx={{
            color: 'primary',
            textDecoration: 'none',
            ml: '4px',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          href={`https://www.reddit.com/r/voatme/submit?url=${url}`}
          rel="noreferrer"
          target="_blank"
        >
          Submit it
        </Link>
      </Flex>
      <Box>
        <YoutubeToggle isPopup={isPopup} />
      </Box>
    </Flex>
  )
}

export default NoPosts
