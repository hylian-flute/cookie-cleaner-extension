// メッセージを受け取り、クッキー削除を実行する
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'DELETE_COOKIES') {
    const url = new URL(message.url);
    
    // URLに対応するすべてのクッキーを取得
    const cookies = await chrome.cookies.getAll({ url: url.href });

    for (const cookie of cookies) {
      // クッキーを1つずつ削除
      await chrome.cookies.remove({
        url: `${url.protocol}//${url.hostname}${cookie.path}`,
        name: cookie.name
      });
    }

    // 完了したらフロントエンドに成功レスポンスを返す
    sendResponse({ success: true });
  }
});
