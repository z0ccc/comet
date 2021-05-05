chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
  document.getElementById('clickOnly').checked = clickOnly;
});

window.onchange = function change(event) {
  if (event.target.matches('#clickOnly')) {
    chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
      const value = !clickOnly;
      chrome.storage.sync.set({ clickOnly: value });
      if (value === true) {
        chrome.action.setIcon({
          path: {
            16: 'images/reddit_16.png',
          },
        });
      }
    });
  }
};
