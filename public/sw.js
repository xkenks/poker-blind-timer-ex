const CACHE_NAME = 'poker-timer-cache-v1';
const urlsToCache = [
  '/',
  '/timer',
  '/guide',
  '/images/screenshot.png',
  '/images/screenshot-mobile.png',
  '/images/apple-icon.png',
  '/favicon.ico',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュがあればそれを返す
        if (response) {
          return response;
        }

        // キャッシュがなければネットワークから取得
        return fetch(event.request)
          .then((response) => {
            // 有効なレスポンスでなければそのまま返す
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // レスポンスを複製してキャッシュに保存
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
}); 