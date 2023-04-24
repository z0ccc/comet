/** @jsx jsx */
import { jsx, Box, Flex, Button } from 'theme-ui'

const Subreddits = ({ posts, postIndex, setPostIndex }) => {
  return (
    <Box
      sx={{
        overflow: 'auto',
        scrollbarWidth: 'thin',
        width: '100%',
      }}
    >
      <Flex
        sx={{
          width: '100%',
          borderBottom: '1px solid',
          borderColor: 'border',
        }}
      >
        {posts.map((post, i) => (
          <Button
            key={post.id}
            sx={{
              all: 'unset',
              cursor: 'pointer',
              p: '8px',
              fontSize: '13px',
              fontWeight: postIndex === i ? '500' : '400',
              color: postIndex === i ? 'primary' : 'lightText',
              transition: 'all .15s ease-in-out',
              borderBottom: '1px solid',
              borderColor: 'border',
              mb: '-1px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              '&:hover': {
                color: 'primary',
              },
            }}
            onClick={() => {
              setPostIndex(i)
            }}
          >
            {post.subreddit}&nbsp;({post.num_comments})
            <Box
              sx={{
                fontSize: '13px',
                fontWeight: '500',
                color: 'transparent',
                whiteSpace: 'nowrap',
                mt: '-14px',
              }}
            >
              {post.subreddit}&nbsp;({post.num_comments})
            </Box>
          </Button>
        ))}
      </Flex>
    </Box>
  )
}

export default Subreddits
