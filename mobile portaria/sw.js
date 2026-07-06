const CACHE_NAME = 'hey-chegoou-v2';
const urlsToCache = [ './', './index.html', './manifest.json', './icon-192.png', './icon-512.png' ];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
      }));
    })
  );
  self.clients.claim();
});

// Intercepta a rede e busca sempre a versão mais nova se houver internet
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});