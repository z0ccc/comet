export const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    primary: '#4aabe7',
    border: '#d1d1d1',
    darkText: '#404040',
    lightText: '#7e7e7e',
    button: '#e6e6e6',
    purple: '#a696ff',
    error: '#eb3b5a',
  },
  links: {
    nav: {
      textDecoration: 'none',
      transition: 'all 0.15s ease-in-out',
      fontSize: '12px',
      color: 'darkText',
      '&:hover': {
        color: 'primary',
      },
    },
  },
  buttons: {
    action: {
      all: 'unset',
      cursor: 'pointer',
      fontSize: '13px',
      color: 'lightText',
      transition: 'all .15s ease-in-out',
      '&:hover': {
        color: 'primary',
      },
    },
  },
  forms: {
    label: {
      width: 'auto',
      alignItems: 'center',
      mb: '6px',
      color: 'darkText',
    },
    select: {
      cursor: 'pointer',
      borderColor: 'border',
      background: 'transparent',
      width: 'auto',
      p: '3px 26px 3px 8px',
      borderRadius: '3px',
      transition: 'all .15s ease-in-out',
      '&:hover': {
        borderColor: 'primary',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    checkbox: {
      outline: 'none',
      color: 'lightText',
      cursor: 'pointer',
    },
  },
}
