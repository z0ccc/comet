/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx, Flex, Button, Box } from 'theme-ui'
import React from 'react'
import formatNumber from '../utils/formatNumber'
import Upvote from '../assets/upvote.svg'
import UpvoteGrey from '../assets/upvoteGrey.svg'
import Downvote from '../assets/downvote.svg'
import DownvoteGrey from '../assets/downvoteGrey.svg'

const getVote = (likes) => {
  if (likes) return 1 // if upvote
  if (likes === false) return -1 // if downvote
  return 0 // if no vote
}

const Score = ({ post }) => {
  const [vote, setVote] = useState(0)
  const [score, setScore] = useState(post.score)

  useEffect(() => {
    setVote(getVote(post.likes))
  }, [post.likes])

  const handleVote = (voteType) => {
    // const direction = vote
    if (vote === voteType) {
      setScore(score - voteType)
    } else if (vote + voteType === 0) {
      setScore(score + voteType * 2)
    } else {
      setScore(score + voteType)
    }

    const direction = vote === voteType ? 0 : voteType
    setVote(direction)

    chrome.runtime.sendMessage({ id: post.name, direction })
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '28px',
      }}
    >
      <Button
        sx={{ all: 'unset', cursor: 'pointer', height: '16px' }}
        onClick={() => handleVote(1)}
      >
        <img
          src={vote === 1 ? Upvote : UpvoteGrey}
          alt="logo"
          sx={{ width: '16px', height: '16px' }}
        />
      </Button>
      <Box
        sx={{
          color: vote === 1 ? '#4aabe7' : vote === -1 ? '#a696ff' : '#bbb',
          fontWeight: '600',
          fontSize: '13px',
          my: '4px',
        }}
      >
        {formatNumber(score)}
      </Box>
      <Button
        sx={{ all: 'unset', cursor: 'pointer', height: '16px' }}
        onClick={() => handleVote(-1)}
      >
        <img
          src={vote === -1 ? Downvote : DownvoteGrey}
          alt="logo"
          sx={{ width: '16px', height: '16px' }}
        />
      </Button>
    </Flex>
  )
}

export default Score
