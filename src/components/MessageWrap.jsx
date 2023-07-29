/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import YoutubeToggle from './YoutubeToggle'

const MessageWrap = ({ isContent, isComments, children }) => {
  return (
    <Flex
      sx={{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        pt: isContent ? '0' : '14px',
        pb: '14px',
      }}
    >
      <Box />
      <Flex>{children}</Flex>
      <Box>
        <YoutubeToggle isContent={isContent} isComments={isComments} />
      </Box>
    </Flex>
  )
}

export default MessageWrap
