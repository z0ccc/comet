/** @jsx jsx */
import { jsx, Flex, Button, Link, Box, Divider } from 'theme-ui'
import React from 'react'
import convertDate from '../utils/convertDate'
import Upvote from '../assets/upvote.svg'
import UpvoteGrey from '../assets/upvoteGrey.svg'
import Downvote from '../assets/downvote.svg'
import DownvoteGrey from '../assets/downvoteGrey.svg'

const Score = ({ score }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '28px',
      }}
    >
      <Button sx={{ all: 'unset', cursor: 'pointer' }}>
        <img
          src={UpvoteGrey}
          alt="logo"
          sx={{ width: '16px', height: '16px' }}
        />
      </Button>
      <Box
        sx={{
          color: '#bbb',
          fontWeight: '600',
          fontSize: '13px',
          mt: '1px',
          mb: '4px',
        }}
      >
        {score}
      </Box>
      <Button sx={{ all: 'unset', cursor: 'pointer' }}>
        <img
          src={DownvoteGrey}
          alt="logo"
          sx={{ width: '16px', height: '16px' }}
        />
      </Button>
    </Flex>
  )
}

export default Score
