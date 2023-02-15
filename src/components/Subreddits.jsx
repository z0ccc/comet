/** @jsx jsx */
import { jsx, Flex, Button } from 'theme-ui'

const Subreddits = ({ posts, postId, setPost }) => {
  console.log(posts)
  return (
    <Flex
      sx={{
        borderBottom: '1px solid #d1d1d1',
      }}
    >
      {posts.map((post) => (
        <Button
          key={post.id}
          sx={{
            all: 'unset',
            cursor: 'pointer',
            p: post.id === postId ? '8px 9px' : '8px 10px',
            fontSize: '12px',
            fontWeight: post.id === postId ? '500' : '400',
            color: post.id === postId ? '#4aabe7' : '#818181',
            transition: 'all .15s ease-in-out',
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
  )
}

export default Subreddits
