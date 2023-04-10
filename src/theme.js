export const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
  },
  links: {
    nav: {
      textDecoration: 'none',
      transition: 'all 0.15s ease-in-out',
      fontSize: '12px',
      color: '#404040',
      '&:hover': {
        color: '#4aabe7',
      },
    },
  },
  buttons: {
    action: {
      all: 'unset',
      cursor: 'pointer',
      // fontWeight: '500',
      fontSize: '13px',
      color: '#7e7e7e',
      transition: 'all .15s ease-in-out',
      '&:hover': {
        color: '#4aabe7',
      },
    },
  },
  forms: {
    label: { width: 'auto', alignItems: 'center', mb: '6px', color: '#404040' },
    select: {
      cursor: 'pointer',
      borderColor: '#d1d1d1',
      width: 'auto',
      p: '3px 26px 3px 8px',
      borderRadius: '3px',
      transition: 'all .15s ease-in-out',
      '&:hover': {
        borderColor: '#4aabe7',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    checkbox: {
      outline: 'none',
      color: '#7e7e7e',
      cursor: 'pointer',
    },
  },
}
