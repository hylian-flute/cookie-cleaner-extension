// ページロード時に実行
window.onload = () => {
  // 現在のページの URL を取得
  const currentUrl = window.location.href;

  // ストレージから保存された URL リストを取得
  chrome.storage.sync.get(['urls'], (result) => {
    const urls = result.urls || [];
    // 現在の URL が保存されている URL リストに含まれているかを確認
    if (urls.includes(currentUrl)) {
      if (confirm('Cookieを削除してリロードしますか？')) {
        // バックグラウンドに削除リクエストを送信
        chrome.runtime.sendMessage(
          { type: 'DELETE_COOKIES', url: currentUrl },
          (response) => {
            if (response && response.success) {
              // クッキー削除完了後にページをリロード
              location.reload();
            }
          }
        );
      }
    }
  });
};
