/**
 * Firebase Client SDK Configuration for iCreatePDF
 * 
 * Architecture:
 * - 100% Client-Side.
 * - ZERO Firebase Admin SDK, ZERO private keys, ZERO service account JSON.
 * - Uses only public Next.js NEXT_PUBLIC_* variables.
 * - Safely handles missing/unconfigured credentials without crashing the app.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

export interface FirebaseClientConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const firebaseConfig: FirebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim(),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim(),
};

export const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY?.trim();

/**
 * Checks if real Firebase credentials are provided in the environment.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== 'YOUR_PROJECT_ID' &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
}

/**
 * Returns initialized FirebaseApp instance, or null if not configured.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isFirebaseConfigured()) {
    return null;
  }

  try {
    if (getApps().length > 0) {
      return getApp();
    }
    return initializeApp(firebaseConfig as Record<string, string>);
  } catch (error) {
    console.warn('[Firebase] Initialization error:', error);
    return null;
  }
}
