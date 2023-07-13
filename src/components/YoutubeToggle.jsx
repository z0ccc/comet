/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { toggleYoutube } from '../utils/toggleComments'

const RedditToggle = ({ isPopup }) =>
  isPopup ? null : (
    <Button
      onClick={toggleYoutube}
      sx={{
        all: 'unset',
        cursor: 'pointer',
        maxHeight: '34px',
        transition: 'all .15s ease-in-out',
        'svg > path': {
          fill: 'button',
        },
        ':hover': {
          opacity: 0.8,
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        version="1.1"
        viewBox="0 0 36 36"
      >
        <path
          strokeWidth="1.125"
          d="M31.601 0A4.4 4.4 0 0136 4.399V31.6A4.401 4.401 0 0131.601 36H4.4A4.401 4.401 0 010 31.601V4.4A4.4 4.4 0 014.399 0zm-1.473 12.35a3.17 3.17 0 00-2.24-2.24C25.916 9.582 18 9.582 18 9.582s-7.915 0-9.889.528a3.17 3.17 0 00-2.239 2.24c-.528 1.974-.528 6.092-.528 6.092s0 4.118.528 6.092a3.17 3.17 0 002.24 2.239c1.973.529 9.888.529 9.888.529s7.915 0 9.889-.53a3.17 3.17 0 002.239-2.238c.528-1.973.528-6.092.528-6.092s0-4.119-.528-6.093zm-14.66 9.888v-7.594l6.578 3.798z"
        ></path>
      </svg>
    </Button>
  )

export default RedditToggle
