chrome.webNavigation.onCompleted.addListener(async (details) => {
  const currentUrl = details.url;

  chrome.storage.sync.get(['urls'], (result) => {
    if (result.urls && result.urls.includes(currentUrl)) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        function: askToDeleteCookies
      });
    }
  });
});

async function askToDeleteCookies() {
  if (confirm('Cookieを削除してリロードしますか？')) {
    const url = new URL(window.location.href);
    const cookies = await chrome.cookies.getAll({ url: url.href });
    for (const cookie of cookies) {
      await chrome.cookies.remove({
        url: url.protocol + "//" + url.hostname + cookie.path,
        name: cookie.name
      });
    }
    location.reload();
  }
}
