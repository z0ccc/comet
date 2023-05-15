import React from 'react'
import { Button } from 'theme-ui'

const VoteButton = ({ vote, voteType, handleClick, size }) => {
  return (
    <Button
      sx={{
        all: 'unset',
        cursor: 'pointer',
        height: size,
        transform: voteType === 1 ? 'none' : 'rotate(180deg)',
        transition: 'all .15s ease-in-out',
        'svg > path': {
          fill:
            vote !== voteType
              ? 'button'
              : voteType === 1
              ? 'primaryLight'
              : 'purple',
          stroke:
            vote !== voteType
              ? 'border'
              : voteType === 1
              ? 'primary'
              : 'purpleDark',
        },
        ':hover': {
          opacity: 0.8,
        },
      }}
      onClick={() => handleClick(voteType)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        version="1.1"
        viewBox="0 0 67.733 67.733"
      >
        <path
          transform="translate(-154.26 -35.414)"
          strokeDasharray="none"
          strokeMiterlimit="4"
          strokeWidth="3.703"
          d="M185.92 42.146l-28.575 48.608c-2.012 3.483-1.67 7.777 1.848 9.81l1.936.731h53.217l3.082-1.148c3.162-1.826 3.436-6.104 1.46-9.524L190.548 42.01c-2.354-3.494-2.291-3.546-4.63.135z"
        ></path>
      </svg>
    </Button>
  )
}

export default VoteButton
