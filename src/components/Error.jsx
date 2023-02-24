/** @jsx jsx */
import { jsx, Link } from 'theme-ui'
import React from 'react'

const Error = () => {
  return (
    <>
      Error: Reddit API may be down or another extension is blocking Voat.
      <Link
        sx={{
          color: '#4aabe7',
          textDecoration: 'none',
          ml: '4px',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        href="https://github.com/z0ccc/voat-extension#troubleshoot"
        target="_blank"
        rel="noreferrer"
      >
        Read More
      </Link>
    </>
  )
}

export default Error
