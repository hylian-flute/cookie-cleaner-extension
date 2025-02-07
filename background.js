// Webナビゲーションの完了時にリスナーを設定
chrome.webNavigation.onCompleted.addListener(async (details) => {
  const currentUrl = details.url;

  chrome.storage.sync.get(['urls'], (result) => {
    if (result.urls && result.urls.includes(currentUrl)) {
      // フロントエンドで確認ダイアログを出すためにメッセージを送信
      chrome.tabs.sendMessage(details.tabId, { type: 'CONFIRM_COOKIE_DELETE' });
    }
  });
});

// メッセージを受け取り、クッキー削除を実行する
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'DELETE_COOKIES') {
    const url = new URL(message.url);
    const cookies = await chrome.cookies.getAll({ url: url.href });

    for (const cookie of cookies) {
      await chrome.cookies.remove({
        url: `${url.protocol}//${url.hostname}${cookie.path}`,
        name: cookie.name
      });
    }

    // 完了したらフロントエンドに通知
    sendResponse({ success: true });
  }
});
