// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA-NsOSEHJC8MPXEhAzbsVcDj2Z9lkQkFs",
  projectId: "hey-chegoou",
  messagingSenderId: "481787472500",
  appId: "1:481787472500:web:16955771ee845086173f21"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida em background ', payload);

  const notificationTitle = (payload.notification && payload.notification.title) || 'Hey Chegoou';
  const notificationOptions = {
    body: (payload.notification && payload.notification.body) || '',
    icon: '/morador/icon-192.png?v=2',
    badge: '/morador/icon-192.png?v=2',
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Ao tocar na notificação, foca/abre o app do morador
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/morador/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('/morador/');
    })
  );
});
