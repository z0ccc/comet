// Retrieves stored data from Chrome's local storage
const readStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (storage) => {
      resolve(storage[key])
    })
  })
}

export { readStorage }
