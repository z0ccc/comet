/** @jsx jsx */
import React from 'react'
import { jsx, Link } from 'theme-ui'

const NoPosts = ({ url }) => {
  return (
    <>
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
        href={`https://www.reddit.com/submit?url=${url}`}
        rel="noreferrer"
        target="_blank"
      >
        Submit it
      </Link>
    </>
  )
}

export default NoPosts
