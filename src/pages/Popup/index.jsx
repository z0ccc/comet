/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../../theme'
import { createRoot } from 'react-dom/client'
import App from '../../components/App'

const container = document.getElementById('app-container')
const root = createRoot(container)

chrome.tabs.query({ currentWindow: true, active: true }, (tabs) =>
  root.render(
    <ThemeProvider theme={theme}>
      <App url={tabs[0].url} isPopup />
    </ThemeProvider>
  )
)
