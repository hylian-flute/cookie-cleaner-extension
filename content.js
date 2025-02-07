// バックグラウンドからのメッセージを待機
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'CONFIRM_COOKIE_DELETE') {
    if (confirm('Cookieを削除してリロードしますか？')) {
      // バックグラウンドに削除リクエストを送信
      chrome.runtime.sendMessage(
        { type: 'DELETE_COOKIES', url: window.location.href },
        (response) => {
          if (response && response.success) {
            // 削除完了後にページをリロード
            location.reload();
          }
        }
      );
    }
  }
});
