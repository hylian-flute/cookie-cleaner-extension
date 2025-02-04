document.getElementById('save').addEventListener('click', () => {
  const urlText = document.getElementById('urls').value;
  const urls = urlText.split('\n').map(url => url.trim()).filter(url => url);
  chrome.storage.sync.set({ urls: urls }, () => {
    alert('URLが保存されました');
  });
});

window.onload = () => {
  chrome.storage.sync.get(['urls'], (result) => {
    if (result.urls) {
      document.getElementById('urls').value = result.urls.join('\n');
    }
  });
};
