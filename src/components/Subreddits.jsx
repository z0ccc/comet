/** @jsx jsx */
import { jsx, Box, Flex, Button } from 'theme-ui'

const Subreddits = ({ posts, currentPost, setCurrentPost }) => {
  return (
    <Box
      id="subreddits"
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
        {posts.map((post) => (
          <Button
            key={post.id}
            sx={{
              all: 'unset',
              cursor: 'pointer',
              p: '8px',
              fontSize: '13px',
              color: currentPost.id === post.id ? 'primary' : 'secondaryText',
              transition: '.1s linear',
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
              setCurrentPost(post)
            }}
          >
            {post.subreddit}&nbsp;({post.num_comments})
          </Button>
        ))}
      </Flex>
    </Box>
  )
}

export default Subreddits
