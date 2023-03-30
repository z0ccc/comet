import React, { useState } from 'react'
import { Button } from 'theme-ui'

const SaveButton = ({ name, isSaved }) => {
  const [saved, setSaved] = useState(isSaved)

  const handleSave = () => {
    const action = saved ? 'unsave' : 'save'
    chrome.runtime.sendMessage({ saveId: name, action }, (response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        setSaved(!saved)
      }
    })
  }

  return (
    <Button onClick={handleSave} variant="action">
      {saved ? 'unsave' : 'save'}
    </Button>
  )
}

export default SaveButton
