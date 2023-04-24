/** @jsx jsx */
import { jsx, Flex, Image, Button } from 'theme-ui'
import { toggleReddit } from '../utils/toggleComments'

const CommentToggle = () => (
  <Flex
    sx={{
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      position: 'relative',
    }}
  >
    <Button
      onClick={toggleReddit}
      sx={{
        all: 'unset',
        cursor: 'pointer',
      }}
    >
      <Image
        src={chrome.runtime.getURL('/reddit.svg')}
        alt="Reddit comment toggle"
        sx={{
          minWidth: '32px',
          height: '32px',
          // '&:hover': {
          //   fill: 'primary',
          // },
        }}
      />
    </Button>
  </Flex>
)

export default CommentToggle
