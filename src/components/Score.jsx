/** @jsx jsx */
import { jsx, Flex, Button, Box } from 'theme-ui'
import React from 'react'
import formatNumber from '../utils/formatNumber'
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
      <Button sx={{ all: 'unset', cursor: 'pointer', height: '16px' }}>
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
          my: '4px',
        }}
      >
        {formatNumber(score)}
      </Box>
      <Button sx={{ all: 'unset', cursor: 'pointer', height: '16px' }}>
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
