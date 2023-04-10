/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx, Flex, Link, Box, Divider, Text } from 'theme-ui'
import convertDate from '../utils/convertDate'
import formatNumber from '../utils/formatNumber'
import VoteButton from './VoteButton'
import SaveButton from './SaveButton'
import { getVote, getScore } from '../utils/voteUtils'
import ReplyButton from './ReplyButton'
import ReplyForm from './ReplyForm'

const Post = ({ post, setNewReply, isLoggedIn }) => {
  const [vote, setVote] = useState(0)
  const [score, setScore] = useState(post.score)
  const [showReplyForm, setShowReplyForm] = useState(false)

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
    <>
      <Flex sx={{ mt: '18px', alignItems: 'center' }}>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            minWidth: '16px',
          }}
        >
          <VoteButton
            vote={vote}
            voteType={1}
            handleClick={handleVote}
            size="16px"
          />
          <VoteButton
            vote={vote}
            voteType={-1}
            handleClick={handleVote}
            size="16px"
          />
        </Flex>
        <Box sx={{ ml: '12px' }}>
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
            sx={{ color: '#7e7e7e', fontSize: '13px', mt: '6px', gap: '12px' }}
          >
            <Text
              sx={{
                fontWeight: '500',
                color:
                  vote === 1 ? '#4aabe7' : vote === -1 ? '#a696ff' : '#7e7e7e',
              }}
            >
              {formatNumber(score)} points
            </Text>
            <Link
              sx={{
                color: '#7e7e7e',
                textDecoration: 'none',
                '&:hover': {
                  color: '#4aabe7',
                },
              }}
              href={`https://reddit.com/u/${post.author}`}
              target="_blank"
              rel="noreferrer"
            >
              {post.author}
            </Link>
            <Text>{convertDate(post.created_utc)}</Text>
            {isLoggedIn && (
              <>
                <SaveButton name={post.name} isSaved={post.saved} />
                <ReplyButton
                  showReplyForm={showReplyForm}
                  setShowReplyForm={setShowReplyForm}
                />
              </>
            )}
          </Flex>
        </Box>
      </Flex>
      <Box sx={{ ml: '28px' }}>
        <ReplyForm
          name={post.name}
          showReplyForm={showReplyForm}
          setShowReplyForm={setShowReplyForm}
          setNewReply={setNewReply}
        />
      </Box>
      <Divider sx={{ color: '#d1d1d1', mt: '18px' }} />
    </>
  )
}

export default Post
