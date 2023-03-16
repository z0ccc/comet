/** @jsx jsx */
import { jsx, Box, Flex, Button } from 'theme-ui'

const Subreddits = ({ posts, postIndex, setPostIndex }) => {
  return (
    <Box
      sx={{
        overflow: 'auto',
        scrollbarWidth: 'thin',
      }}
    >
      <Flex
        sx={{
          width: '100%',
          borderBottom: '1px solid #d1d1d1',
        }}
      >
        {posts.map((post, i) => (
          <Button
            key={post.id}
            sx={{
              all: 'unset',
              cursor: 'pointer',
              p: '8px',
              fontSize: '12px',
              fontWeight: postIndex === i ? '600' : '400',
              color: postIndex === i ? '#4aabe7' : '#707070',
              transition: 'all .15s ease-in-out',
              borderBottom: '1px solid #d1d1d1',
              mb: '-1px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              '&:hover': {
                color: '#4aabe7',
              },
            }}
            onClick={() => {
              setPostIndex(i)
            }}
          >
            {post.subreddit}&nbsp;({post.num_comments})
            <Box
              sx={{
                fontSize: '12px',
                fontWeight: '600',
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
