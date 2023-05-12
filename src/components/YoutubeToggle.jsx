/** @jsx jsx */
import { jsx, Image, Button } from 'theme-ui'
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
        width="32"
        height="32"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        clipRule="evenodd"
        version="1.1"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
      >
        <path
          fillOpacity="1"
          strokeWidth="0.063"
          d="M28.09 0A3.911 3.911 0 0132 3.91v24.18A3.912 3.912 0 0128.09 32H3.91A3.912 3.912 0 010 28.09V3.91A3.911 3.911 0 013.91 0zm-1.31 10.977a2.817 2.817 0 00-1.99-1.99c-1.754-.47-8.79-.47-8.79-.47s-7.036 0-8.79.47a2.818 2.818 0 00-1.99 1.99c-.47 1.755-.47 5.416-.47 5.416s0 3.66.47 5.415a2.818 2.818 0 001.99 1.99c1.754.47 8.79.47 8.79.47s7.036 0 8.79-.47a2.818 2.818 0 001.99-1.99c.47-1.754.47-5.415.47-5.415s0-3.661-.47-5.416zm-13.03 8.79v-6.75l5.846 3.376z"
        ></path>
      </svg>
    </Button>
  )

export default RedditToggle
