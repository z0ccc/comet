import React from 'react'
import { Flex, Button } from 'theme-ui'
import Upvote from '../assets/upvote.svg'
import UpvoteGrey from '../assets/upvoteGrey.svg'
import Downvote from '../assets/downvote.svg'
import DownvoteGrey from '../assets/downvoteGrey.svg'

const VoteButtons = ({ vote, onVote }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        mr: '12px',
        minWidth: '14px',
      }}
    >
      <Button
        sx={{ all: 'unset', cursor: 'pointer' }}
        onClick={() => onVote(1)}
      >
        <img
          src={vote === 1 ? Upvote : UpvoteGrey}
          alt="logo"
          sx={{ width: '14px', height: '14px' }}
        />
      </Button>
      <Button
        sx={{ all: 'unset', cursor: 'pointer' }}
        onClick={() => onVote(-1)}
      >
        <img
          src={vote === -1 ? Downvote : DownvoteGrey}
          alt="logo"
          sx={{ width: '14px', height: '14px' }}
        />
      </Button>
    </Flex>
  )
}

export default VoteButtons
