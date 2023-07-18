/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../../theme'
import { createRoot } from 'react-dom/client'
import App from '../../components/App'

const container = document.getElementById('app-container')
const root = createRoot(container)

const loadSidePanel = (url) => {
  return root.render(
    <ThemeProvider theme={theme}>
      <App url={url} isSidePanel />
    </ThemeProvider>
  )
}

const handleWebNavigation = (e) => {
  if (e.frameType === 'outermost_frame' || e.frameId === 0) {
    loadSidePanel(e.url)
  }
}

const queryTabs = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    loadSidePanel(tabs[0].url)
  })
}

chrome.webNavigation.onHistoryStateUpdated.addListener(handleWebNavigation)
chrome.webNavigation.onBeforeNavigate.addListener(handleWebNavigation)
chrome.tabs.onActivated.addListener(queryTabs)

queryTabs()
