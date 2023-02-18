/** @jsx jsx */
import { jsx, Flex, Button, Link, Box } from 'theme-ui'
import Comment from './Comment'

const Comments = ({ comments }) => {
  console.log(comments)
  // stack grey icons on top of colored icons
  return (
    <Box sx={{ mr: '4px' }}>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.data.id} />
      ))}
    </Box>
  )
}

export default Comments
