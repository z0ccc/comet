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
      p: '4px 8px',
      '&:focus': {
        borderColor: 'primaryDark',
        outline: 'none',
      },
    },
  },
}
