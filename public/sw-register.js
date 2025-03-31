if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker登録成功: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker登録失敗: ', err);
    });
  });
} 