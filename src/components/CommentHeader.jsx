import React from 'react'
import { Flex, Link } from 'theme-ui'
import convertDate from '../utils/convertDate'
import formatNumber from '../utils/formatNumber'

const CommentHeader = ({ author, score, created_utc }) => {
  return (
    <Flex>
      <Link
        sx={{
          fontSize: '11px',
          color: '#4aabe7',
          fontWeight: '600',
          textDecoration: 'none',

          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        href={`https://reddit.com/u/${author}`}
        target="_blank"
        rel="noreferrer"
      >
        {author}
      </Link>
      <Flex
        sx={{
          fontSize: '11px',
          color: '#707070',
          ml: '6px',
        }}
      >
        {formatNumber(score)} points
        <Flex
          sx={{
            fontSize: '11px',
            color: '#707070',
            ml: '4px',
          }}
        >
          {convertDate(created_utc)}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CommentHeader
