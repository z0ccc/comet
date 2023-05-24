/** @jsx jsx */
import React from 'react'
import { jsx, Box, Flex } from 'theme-ui'
import YoutubeToggle from './YoutubeToggle'

const PostMessageWrap = ({ isPopup, children }) => {
  return (
    <Flex
      sx={{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box />
      <Flex>{children}</Flex>
      <Box>
        <YoutubeToggle isPopup={isPopup} />
      </Box>
    </Flex>
  )
}

export default PostMessageWrap
