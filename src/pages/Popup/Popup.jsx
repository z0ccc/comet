import React from 'react'
import getPosts from '../../utils/getPosts'
import './Popup.css'

const Popup = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    tabs[0].url && getPosts(tabs[0].url)
  })

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  )
}

export default Popup
