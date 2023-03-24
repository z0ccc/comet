import React from 'react'
import { Button, Image } from 'theme-ui'
import Upvote from '../assets/upvote.svg'
import UpvoteGrey from '../assets/upvoteGrey.svg'
import Downvote from '../assets/downvote.svg'
import DownvoteGrey from '../assets/downvoteGrey.svg'

const VoteButton = ({ vote, voteType, handleClick, size }) => {
  const activeIcon = voteType === 1 ? Upvote : Downvote
  const inactiveIcon = voteType === 1 ? UpvoteGrey : DownvoteGrey

  return (
    <Button
      sx={{ all: 'unset', cursor: 'pointer', height: size }}
      onClick={() => handleClick(voteType)}
    >
      <Image
        src={vote === voteType ? activeIcon : inactiveIcon}
        alt={voteType === 1 ? 'upvote' : 'downvote'}
        sx={{ width: size, height: size }}
      />
    </Button>
  )
}

export default VoteButton
