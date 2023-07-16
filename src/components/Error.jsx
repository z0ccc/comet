/** @jsx jsx */
import { jsx, Link } from 'theme-ui'
import PostMessageWrap from './PostMessageWrap'

const Error = ({ isContent, message }) => {
  return (
    <PostMessageWrap isContent={isContent}>
      Error:{' '}
      {message ? (
        message
      ) : (
        <>
          Reddit API may be down or another extension is blocking Voat.
          <Link
            sx={{
              color: 'primary',
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
      )}
    </PostMessageWrap>
  )
}

export default Error
