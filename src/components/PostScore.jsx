/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx, Flex, Box } from 'theme-ui'
import formatNumber from '../utils/formatNumber'
import VoteButton from './VoteButton'
import { getVote, getScore } from '../utils/voteUtils'

const PostScore = ({ post }) => {
  const [vote, setVote] = useState(0)
  const [score, setScore] = useState(post.score)

  useEffect(() => {
    setVote(getVote(post.likes))
  }, [post.likes])

  const handleVote = (voteType) => {
    setScore(getScore(vote, voteType, score))
    const direction = vote === voteType ? 0 : voteType
    setVote(direction)
    chrome.runtime.sendMessage({ voteId: post.name, direction })
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '28px',
      }}
    >
      <VoteButton
        vote={vote}
        voteType={1}
        handleClick={handleVote}
        size="16px"
      />
      <Box
        sx={{
          color: vote === 1 ? '#4aabe7' : vote === -1 ? '#a696ff' : '#bbb',
          fontWeight: '500',
          fontSize: '14px',
          my: '4px',
        }}
      >
        {formatNumber(score)}
      </Box>
      <VoteButton
        vote={vote}
        voteType={-1}
        handleClick={handleVote}
        size="16px"
      />
    </Flex>
  )
}

export default PostScore
