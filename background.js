chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    chrome.storage.sync.get(["domains"], (data) => {
      const domains = data.domains || [];
      const url = new URL(tab.url);

      if (domains.includes(url.hostname)) {
        if (confirm("Cookieを削除してリロードしますか？")) {
          chrome.cookies.getAll({ domain: url.hostname }, (cookies) => {
            cookies.forEach((cookie) => {
              chrome.cookies.remove({
                url: `${url.protocol}//${cookie.domain}${cookie.path}`,
                name: cookie.name,
              });
            });
            chrome.tabs.reload(tabId);
          });
        }
      }
    });
  }
});
