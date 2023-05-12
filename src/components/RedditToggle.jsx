/** @jsx jsx */
import { jsx, Flex, Image, Button } from 'theme-ui'
import { toggleReddit } from '../utils/toggleComments'

const RedditToggle = () => (
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
          d="M28.09 0A3.911 3.911 0 0132 3.91v24.18A3.912 3.912 0 0128.09 32H3.91A3.912 3.912 0 010 28.09V3.91A3.911 3.911 0 013.91 0zm-.215 16.602a2.599 2.599 0 00-4.401-1.87c-1.777-1.281-4.224-2.11-6.95-2.204l1.183-5.57 3.868.822a1.852 1.852 0 003.704-.088 1.85 1.85 0 00-3.514-.82l-4.319-.918a.464.464 0 00-.55.358l-1.322 6.214c-2.766.077-5.253.906-7.053 2.202a2.599 2.599 0 10-2.86 4.244 5.14 5.14 0 00-.062.786c0 3.999 4.654 7.24 10.395 7.24 5.742 0 10.396-3.241 10.396-7.24 0-.263-.022-.524-.06-.78a2.598 2.598 0 001.545-2.376zm-7.467 6.762c-1.267 1.265-3.695 1.364-4.409 1.364s-3.142-.099-4.407-1.364a.481.481 0 01.68-.68c.799.798 2.507 1.082 3.728 1.082 1.22 0 2.928-.284 3.728-1.083a.482.482 0 01.68.681zm-.327-3.048a1.859 1.859 0 01-1.856-1.856 1.86 1.86 0 011.856-1.858 1.86 1.86 0 011.857 1.858 1.859 1.859 0 01-1.857 1.856zm-10.024-1.857a1.86 1.86 0 011.857-1.857c1.023 0 1.856.833 1.856 1.857a1.858 1.858 0 01-1.856 1.856 1.858 1.858 0 01-1.857-1.856z"
        ></path>
      </svg>
    </Button>
  </Flex>
)

export default RedditToggle
