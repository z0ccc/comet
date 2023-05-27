const setIcon = (icon) => {
  const iconDetails = {
    path: {
      48: icon,
    },
  }

  try {
    chrome.action.setIcon(iconDetails)
  } catch (e) {
    chrome.browserAction.setIcon(iconDetails)
  }
}

export { setIcon }
