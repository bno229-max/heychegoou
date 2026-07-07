const CACHE_NAME = 'hey-chegoou-v3';
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
        if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});