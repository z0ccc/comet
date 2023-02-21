/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import Comment from './Comment'

const Reply = ({ comment, child, depth, isLoadMore = false }) => {
  const newDepth = depth ? depth : child.data.depth

  console.log(child.data.body, newDepth)
  return (
    <Box
      sx={{
        background: newDepth % 2 === 0 ? '#fff' : '#f8f8f8',
        m: newDepth === 1 ? '6px 0 10px 14px' : '0 0 10px 0',
        border: '1px solid #d1d1d1',
        borderRadius: '3px',
      }}
    >
      <Comment
        comment={child}
        depth={isLoadMore ? depth + 1 : depth}
        loadMore={isLoadMore}
      />
    </Box>
  )
}

export default Reply
