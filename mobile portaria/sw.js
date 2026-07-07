const CACHE_NAME = 'portaria-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png?v=2',
  './icon-512.png?v=2',
  './icon-192-maskable.png?v=2',
  './icon-512-maskable.png?v=2'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(cacheNames.map(cacheName => {
        // Só apaga caches DESTE app (prefixo portaria-), nunca os do morador
        if (cacheName.startsWith('portaria-') && cacheName !== CACHE_NAME) {
          return caches.delete(cacheName);
        }
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
