import React from 'react'
import { Button, Image } from 'theme-ui'

const VoteButton = ({ vote, voteType, handleClick, size }) => {
  const upvote = chrome.runtime.getURL('/upvote.svg')
  const upvoteGrey = chrome.runtime.getURL('/upvoteGrey.svg')
  const downvote = chrome.runtime.getURL('/downvote.svg')
  const downvoteGrey = chrome.runtime.getURL('/downvoteGrey.svg')

  const activeIcon = voteType === 1 ? upvote : downvote
  const inactiveIcon = voteType === 1 ? upvoteGrey : downvoteGrey

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
