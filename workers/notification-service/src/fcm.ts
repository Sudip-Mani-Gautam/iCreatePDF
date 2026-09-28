/**
 * Google OAuth2 & Firebase Cloud Messaging (FCM) HTTP v1 Client
 * Native Web Crypto Implementation for Cloudflare Workers (No external dependencies)
 */

interface ServiceAccountCredentials {
  clientEmail: string;
  privateKey: string;
  projectId: string;
}

interface FCMNotificationPayload {
  token: string;
  title: string;
  body: string;
  url: string;
  type: string;
}

export interface FCMSendResult {
  success: boolean;
  invalidToken?: boolean;
  error?: string;
}

// Cached Google OAuth Access Token
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

function base64UrlEncode(data: string | Uint8Array): string {
  let base64: string;
  if (typeof data === 'string') {
    base64 = btoa(data);
  } else {
    let binary = '';
    const bytes = new Uint8Array(data);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    base64 = btoa(binary);
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToBinary(pem: string): Uint8Array {
  const cleanPem = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\\n/g, '')
    .replace(/\s+/g, '');

  const raw = atob(cleanPem);
  const buffer = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    buffer[i] = raw.charCodeAt(i);
  }
  return buffer;
}

async function getGoogleAccessToken(credentials: ServiceAccountCredentials): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60) {
    return cachedAccessToken.token;
  }

  const binaryKey = pemToBinary(credentials.privateKey);
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey.buffer as ArrayBuffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const claims = {
    iss: credentials.clientEmail,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaims = base64UrlEncode(JSON.stringify(claims));
  const unsignedToken = `${encodedHeader}.${encodedClaims}`;

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const signedJwt = `${unsignedToken}.${base64UrlEncode(new Uint8Array(signature))}`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: signedJwt,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Failed to obtain Google OAuth access token: ${errorText}`);
  }

  const tokenData = (await tokenResponse.json()) as { access_token: string; expires_in: number };
  cachedAccessToken = {
    token: tokenData.access_token,
    expiresAt: now + (tokenData.expires_in || 3600),
  };

  return cachedAccessToken.token;
}

export async function sendFCMNotification(
  credentials: ServiceAccountCredentials,
  payload: FCMNotificationPayload
): Promise<FCMSendResult> {
  try {
    const accessToken = await getGoogleAccessToken(credentials);
    const endpoint = `https://fcm.googleapis.com/v1/projects/${credentials.projectId}/messages:send`;

    const fcmMessage = {
      message: {
        token: payload.token,
        notification: {
          title: payload.title,
          body: payload.body,
        },
        data: {
          url: payload.url,
          notification_type: payload.type,
        },
        webpush: {
          fcm_options: {
            link: payload.url,
          },
        },
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fcmMessage),
    });

    if (response.ok) {
      return { success: true };
    }

    const errorBody = await response.text();

    // Check for invalid or unregistered device token to clean up
    if (
      response.status === 404 ||
      errorBody.includes('UNREGISTERED') ||
      errorBody.includes('INVALID_ARGUMENT') ||
      errorBody.includes('registration-token-not-registered')
    ) {
      return {
        success: false,
        invalidToken: true,
        error: 'Token expired or unregistered',
      };
    }

    return {
      success: false,
      error: `FCM error (${response.status}): ${errorBody.slice(0, 150)}`,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Unknown network error sending push notification',
    };
  }
}
