chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
  const value = !clickOnly;
  document.getElementById('clickOnly').checked = value;
});

window.onchange = function change(event) {
  if (event.target.matches('#clickOnly')) {
    chrome.storage.sync.get('clickOnly', ({ clickOnly }) => {
      const value = !clickOnly;
      chrome.storage.sync.set({ clickOnly: value });
    });
  }
};
