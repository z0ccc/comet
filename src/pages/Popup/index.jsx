/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../../theme'
import { createRoot } from 'react-dom/client'

import Popup from './Popup'
import './index.css'

const container = document.getElementById('app-container')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <ThemeProvider theme={theme}>
    <Popup />
  </ThemeProvider>
)
