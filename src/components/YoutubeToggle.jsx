/** @jsx jsx */
import { jsx, Image, Button } from 'theme-ui'
import { toggleYoutube } from '../utils/toggleComments'

const RedditToggle = ({ isPopup }) =>
  isPopup ? null : (
    <Button
      onClick={toggleYoutube}
      sx={{ all: 'unset', cursor: 'pointer', maxHeight: '34px' }}
    >
      <Image
        src={chrome.runtime.getURL('/youtube.svg')}
        alt="Reddit comment toggle"
        sx={{
          minWidth: '32px',
          height: '32px',
        }}
      />
    </Button>
  )

export default RedditToggle
