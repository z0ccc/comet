export const theme = {
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
    primaryText: '#404040',
    secondaryText: '#7e7e7e',
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
      transition: 'all 0.15s ease-in-out',
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
      color: 'primaryText',
    },
    select: {
      cursor: 'pointer',
      borderColor: 'border',
      background: 'background',
      color: 'primaryText',
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
      color: 'secondaryText',
      cursor: 'pointer',
    },
  },
}
