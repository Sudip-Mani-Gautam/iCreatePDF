/**
 * Firebase Cloud Messaging (FCM) Web Push Manager
 * 
 * Handles:
 * - Browser push permission requests and states
 * - Service worker registration for /firebase-messaging-sw.js
 * - FCM registration token retrieval & removal
 * - Foreground notification dispatch
 * - Extensible hook for future backend token registration
 * 
 * Security & Privacy:
 * - Tokens are NEVER sent to analytics, GTM, GA4, or URLs.
 * - Stored locally in localStorage ('icreatepdf_fcm_token') only.
 * - 100% SSR-safe: Uses dynamic import of 'firebase/messaging' only in browser.
 */

import { getFirebaseApp, firebaseConfig, vapidKey, isFirebaseConfigured } from './config';
import { analytics } from '@/lib/analytics';

const FCM_TOKEN_STORAGE_KEY = 'icreatepdf_fcm_token';
const NOTIFICATION_DISMISSED_KEY = 'icreatepdf_notification_prompt_dismissed';

export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

export interface NotificationStatus {
  isSupported: boolean;
  isConfigured: boolean;
  permission: NotificationPermissionState;
  isSubscribed: boolean;
}

/**
 * Dynamically import firebase/messaging only in browser runtime
 */
async function getFirebaseMessagingModule() {
  if (typeof window === 'undefined') return null;
  try {
    return await import('firebase/messaging');
  } catch {
    return null;
  }
}

/**
 * Check browser and environment support for Web Push & FCM
 */
export async function checkNotificationSupport(): Promise<boolean> {
  if (
    typeof window === 'undefined' ||
    !('Notification' in window) ||
    !('serviceWorker' in navigator)
  ) {
    return false;
  }

  try {
    const fcm = await getFirebaseMessagingModule();
    if (!fcm) return false;
    return await fcm.isSupported();
  } catch {
    return false;
  }
}

/**
 * Get current browser notification status
 */
export async function getNotificationStatus(): Promise<NotificationStatus> {
  const supported = await checkNotificationSupport();
  const configured = isFirebaseConfigured();

  if (!supported) {
    return {
      isSupported: false,
      isConfigured: configured,
      permission: 'unsupported',
      isSubscribed: false,
    };
  }

  const currentPermission = Notification.permission as NotificationPermissionState;
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem(FCM_TOKEN_STORAGE_KEY) : null;

  return {
    isSupported: true,
    isConfigured: configured,
    permission: currentPermission,
    isSubscribed: currentPermission === 'granted' && Boolean(storedToken),
  };
}

/**
 * Register Firebase Messaging Service Worker with config parameters
 */
async function registerMessagingServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const queryParams = new URLSearchParams({
      apiKey: firebaseConfig.apiKey || '',
      projectId: firebaseConfig.projectId || '',
      messagingSenderId: firebaseConfig.messagingSenderId || '',
      appId: firebaseConfig.appId || '',
    });

    const swUrl = `/firebase-messaging-sw.js?${queryParams.toString()}`;
    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: '/',
    });

    await navigator.serviceWorker.ready;
    return registration;
  } catch (error) {
    console.warn('[FCM] Service worker registration error:', error);
    return null;
  }
}

/**
 * Future Backend Hook:
 * Stores token in localStorage today, extensible for future backend API.
 */
async function syncTokenWithFutureBackend(token: string, action: 'subscribe' | 'unsubscribe'): Promise<void> {
  if (typeof window !== 'undefined') {
    if (action === 'subscribe') {
      localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(FCM_TOKEN_STORAGE_KEY);
    }
  }

  const apiUrl = process.env.NEXT_PUBLIC_NOTIFICATION_API_URL?.trim();
  if (apiUrl && token) {
    try {
      const endpoint = `${apiUrl.replace(/\/$/, '')}/api/${action}`;
      const locale = typeof document !== 'undefined' ? document.documentElement.lang || 'en' : 'en';

      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, locale }),
      });
    } catch (networkError) {
      console.warn('[FCM] Serverless registration sync note:', networkError);
      // Non-blocking: local subscription still functions
    }
  }
}

/**
 * Request Notification Permission and Subscribe to FCM
 */
export async function subscribeToNotifications(): Promise<{ success: boolean; error?: string }> {
  const supported = await checkNotificationSupport();
  if (!supported) {
    return { success: false, error: 'Web push notifications are not supported by your browser.' };
  }

  const app = getFirebaseApp();
  if (!app) {
    return {
      success: false,
      error: 'Firebase is not yet configured. Please provide Firebase credentials in your environment.',
    };
  }

  const fcm = await getFirebaseMessagingModule();
  if (!fcm) {
    return { success: false, error: 'Failed to load Firebase Messaging module.' };
  }

  try {
    // 1. Request Browser Permission
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      analytics.notificationPermissionDenied();
      return {
        success: false,
        error: permission === 'denied'
          ? 'Notification permission was denied. You can reset it in your browser settings.'
          : 'Notification permission was dismissed.',
      };
    }

    analytics.notificationPermissionGranted();

    // 2. Register Service Worker
    const swRegistration = await registerMessagingServiceWorker();
    if (!swRegistration) {
      return { success: false, error: 'Failed to initialize notification service worker.' };
    }

    // 3. Get FCM Messaging Instance & Token
    const messaging = fcm.getMessaging(app);
    const tokenOptions: { serviceWorkerRegistration: ServiceWorkerRegistration; vapidKey?: string } = {
      serviceWorkerRegistration: swRegistration,
    };

    if (vapidKey && vapidKey !== 'YOUR_VAPID_KEY') {
      tokenOptions.vapidKey = vapidKey;
    }

    const token = await fcm.getToken(messaging, tokenOptions);

    if (!token) {
      return { success: false, error: 'Failed to generate registration token from Firebase.' };
    }

    // 4. Save Token (never expose in analytics or URLs)
    await syncTokenWithFutureBackend(token, 'subscribe');

    return { success: true };
  } catch (error: any) {
    console.error('[FCM] Subscription error:', error);
    return {
      success: false,
      error: error?.message || 'An error occurred while enabling notifications.',
    };
  }
}

/**
 * Unsubscribe from Notifications
 */
export async function unsubscribeFromNotifications(): Promise<{ success: boolean; error?: string }> {
  try {
    const app = getFirebaseApp();
    const fcm = await getFirebaseMessagingModule();
    if (app && fcm) {
      const messaging = fcm.getMessaging(app);
      await fcm.deleteToken(messaging);
    }

    await syncTokenWithFutureBackend('', 'unsubscribe');
    return { success: true };
  } catch (error: any) {
    console.warn('[FCM] Unsubscribe warning:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FCM_TOKEN_STORAGE_KEY);
    }
    return { success: true };
  }
}

/**
 * Set up foreground message listener
 */
export function setupForegroundMessageListener(
  onNotificationReceived?: (payload: { title: string; body: string; url?: string }) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const app = getFirebaseApp();
  if (!app) return () => {};

  let unsubscribeFn: (() => void) | null = null;

  getFirebaseMessagingModule().then((fcm) => {
    if (!fcm) return;
    try {
      const messaging = fcm.getMessaging(app);
      unsubscribeFn = fcm.onMessage(messaging, (payload) => {
        const title = payload.notification?.title || payload.data?.title || 'iCreatePDF';
        const body = payload.notification?.body || payload.data?.body || 'New announcement available.';
        const url = payload.data?.url || payload.fcmOptions?.link;

        if (onNotificationReceived) {
          onNotificationReceived({ title, body, url });
        }

        if (Notification.permission === 'granted') {
          new Notification(title, {
            body,
            icon: '/favicon.ico',
          });
        }
      });
    } catch {
      // Ignore foreground listener setup errors
    }
  });

  return () => {
    if (unsubscribeFn) {
      unsubscribeFn();
    }
  };
}

/**
 * Dismiss Notification Prompt (stored for 14 days)
 */
export function dismissNotificationPrompt(): void {
  if (typeof window !== 'undefined') {
    const expiry = Date.now() + 14 * 24 * 60 * 60 * 1000;
    localStorage.setItem(NOTIFICATION_DISMISSED_KEY, String(expiry));
  }
}

/**
 * Check if Notification Prompt should be shown
 */
export function shouldShowNotificationPrompt(): boolean {
  if (typeof window === 'undefined') return false;
  if (!('Notification' in window)) return false;
  if (Notification.permission !== 'default') return false;

  const dismissedUntil = localStorage.getItem(NOTIFICATION_DISMISSED_KEY);
  if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
    return false;
  }

  return true;
}
