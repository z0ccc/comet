import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../../theme'
import Options from './Options'

const container = document.getElementById('app-container')
const root = createRoot(container)
root.render(
  <ThemeProvider theme={theme}>
    <Options />
  </ThemeProvider>
)
