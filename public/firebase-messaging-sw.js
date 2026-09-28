/**
 * Firebase Cloud Messaging Service Worker for iCreatePDF
 * Handles background push notifications when the application tab is closed or in background.
 */

/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Parse configuration from URL search params if passed during registration
const swUrl = new URL(self.location.href);
const apiKey = swUrl.searchParams.get('apiKey');
const projectId = swUrl.searchParams.get('projectId');
const messagingSenderId = swUrl.searchParams.get('messagingSenderId');
const appId = swUrl.searchParams.get('appId');

// Initialize Firebase in the service worker if config parameters exist
if (apiKey && projectId && messagingSenderId && appId) {
  firebase.initializeApp({
    apiKey,
    projectId,
    messagingSenderId,
    appId,
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const notificationTitle =
      payload?.notification?.title ||
      payload?.data?.title ||
      'iCreatePDF Notification';

    const notificationOptions = {
      body:
        payload?.notification?.body ||
        payload?.data?.body ||
        'New update available on iCreatePDF.',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: {
        url: payload?.data?.url || payload?.fcmOptions?.link || '/',
        type: payload?.data?.notification_type || 'general',
      },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

// Notification Click Handler: Opens or focuses iCreatePDF window
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification?.data?.url || '/';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // If window already open, focus it
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }
        // Otherwise, open new window
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
