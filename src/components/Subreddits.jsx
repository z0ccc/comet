/** @jsx jsx */
import { jsx, Box, Flex, Button } from 'theme-ui'

const Subreddits = ({ posts, postId, setPost }) => {
  console.log(posts)
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
        {posts.map((post) => (
          <Button
            key={post.id}
            sx={{
              all: 'unset',
              cursor: 'pointer',
              p: '8px 10px',
              fontSize: '12px',
              fontWeight: post.id === postId ? '600' : '400',
              color: post.id === postId ? '#4aabe7' : '#707070',
              transition: 'all .15s ease-in-out',
              borderBottom: '1px solid #d1d1d1',
              mb: '-1px',
              '&:hover': {
                color: '#4aabe7',
              },
            }}
            onClick={() => setPost(post)}
          >
            {post.subreddit}&nbsp;({post.score})
          </Button>
        ))}
      </Flex>
    </Box>
  )
}

export default Subreddits
