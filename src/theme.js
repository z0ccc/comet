export const theme = {
  breakpoints: ['550px'],
  config: {
    useBorderBox: false,
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    primary: '#4aabe7',
    primaryLight: '#77cdff',
    border: '#d1d1d1',
    primaryText: '#4f4f4f',
    secondaryText: '#909090',
    background: '#fff',
    button: '#e6e6e6',
    purple: '#a696ff',
    purpleDark: '#8b74ff',
    error: '#eb3b5a',
    modes: {
      dark: {
        primary: '#4aabe7',
        primaryLight: '#77cdff',
        border: '#565656',
        primaryText: '#f0f3f4',
        secondaryText: '#909090',
        background: '#0f0f0f',
        button: '#333333',
        purple: '#a696ff',
        purpleDark: '#8b74ff',
        error: '#eb3b5a',
      },
    },
  },
  links: {
    nav: {
      textDecoration: 'none',
      transition: '.1s linear',
      fontSize: '12px',
      color: 'primaryText',
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
      color: 'secondaryText',
      transition: '.1s linear',
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
      color: 'primaryText',
    },
    select: {
      fontSize: '12px',
      cursor: 'pointer',
      borderColor: 'border',
      background: 'background',
      color: 'primaryText',
      width: 'auto',
      p: '3px 26px 3px 8px',
      borderRadius: '3px',
      transition: '.1s linear',
      '&:hover': {
        borderColor: 'primary',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    checkbox: {
      outline: 'none',
      color: 'secondaryText',
      cursor: 'pointer',
    },
  },
}
