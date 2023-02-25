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
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  forms: {
    select: {
      cursor: 'pointer',
      borderColor: '#d1d1d1',
      width: 'auto',
      p: '3px 26px 3px 8px',
      borderRadius: '3px',
      '&:hover': {
        borderColor: '#4aabe7',
      },
      '&:focus': {
        outline: 'none',
      },
    },
  },
}
