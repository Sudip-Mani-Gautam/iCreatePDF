/**
 * iCreatePDF Cloudflare Worker — Serverless Push Notification Backend
 * 
 * Free-Tier Optimized:
 * - Cloudflare Workers (100k requests/day free)
 * - Cloudflare D1 (5M row reads/day, 100k row writes/day free)
 * - Firebase Cloud Messaging HTTP v1
 */

import { sendFCMNotification } from './fcm';

// D1 Database type interface for Cloudflare Worker environment
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<{ success: boolean; meta: any }>;
  all<T = unknown>(): Promise<{ results?: T[]; success: boolean; meta: any }>;
}

export interface Env {
  DB: D1Database;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  WORKER_API_SECRET: string;
  ALLOWED_ORIGIN?: string;
}

interface SubscribeRequest {
  token: string;
  locale?: string;
}

interface UnsubscribeRequest {
  token: string;
}

interface SendNotificationRequest {
  type: 'blog' | 'tool';
  id: string; // e.g. "how-to-merge-pdf" or "pdf-multi-tool"
  title: string;
  body: string;
  url: string;
  dryRun?: boolean;
  force?: boolean;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function getCorsHeaders(request: Request, env: Env): HeadersInit {
  const origin = request.headers.get('Origin') || '';
  const allowed = env.ALLOWED_ORIGIN || 'https://icreatepdf.com';
  const isAllowed = origin === allowed || origin.includes('localhost') || origin.endsWith('.icreatepdf.com');

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const cors = getCorsHeaders(request, env);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    // Health check endpoint
    if (request.method === 'GET' && url.pathname === '/health') {
      return Response.json(
        { status: 'ok', service: 'iCreatePDF Notification Service' },
        { headers: cors }
      );
    }

    // =========================================================================
    // 1. SUBSCRIBE ENDPOINT (Public, called by browser frontend)
    // =========================================================================
    if (request.method === 'POST' && url.pathname === '/api/subscribe') {
      try {
        const body = (await request.json()) as SubscribeRequest;

        if (!body.token || typeof body.token !== 'string' || body.token.length < 20 || body.token.length > 500) {
          return Response.json({ error: 'Invalid FCM token format' }, { status: 400, headers: cors });
        }

        const tokenHash = await sha256(body.token);
        const locale = (body.locale || 'en').slice(0, 10);

        // Upsert into D1 subscribers table
        await env.DB.prepare(
          `INSERT INTO subscribers (token_hash, token, locale, status, updated_at)
           VALUES (?, ?, ?, 'active', CURRENT_TIMESTAMP)
           ON CONFLICT(token_hash) DO UPDATE SET
             token = excluded.token,
             locale = excluded.locale,
             status = 'active',
             updated_at = CURRENT_TIMESTAMP`
        )
          .bind(tokenHash, body.token, locale)
          .run();

        return Response.json({ success: true, message: 'Subscribed successfully' }, { headers: cors });
      } catch (err: any) {
        return Response.json({ error: err?.message || 'Subscription failed' }, { status: 500, headers: cors });
      }
    }

    // =========================================================================
    // 2. UNSUBSCRIBE ENDPOINT (Public, called by browser frontend)
    // =========================================================================
    if (request.method === 'POST' && url.pathname === '/api/unsubscribe') {
      try {
        const body = (await request.json()) as UnsubscribeRequest;

        if (!body.token || typeof body.token !== 'string') {
          return Response.json({ error: 'Invalid token' }, { status: 400, headers: cors });
        }

        const tokenHash = await sha256(body.token);

        await env.DB.prepare(
          `UPDATE subscribers SET status = 'unsubscribed', updated_at = CURRENT_TIMESTAMP WHERE token_hash = ?`
        )
          .bind(tokenHash)
          .run();

        return Response.json({ success: true, message: 'Unsubscribed successfully' }, { headers: cors });
      } catch (err: any) {
        return Response.json({ error: err?.message || 'Unsubscribe failed' }, { status: 500, headers: cors });
      }
    }

    // =========================================================================
    // 3. SEND NOTIFICATION ENDPOINT (Protected, called by GitHub Actions)
    // =========================================================================
    if (request.method === 'POST' && url.pathname === '/api/send') {
      // Authenticate with Bearer token
      const authHeader = request.headers.get('Authorization') || '';
      const secret = authHeader.replace(/^Bearer\s+/i, '').trim();

      if (!env.WORKER_API_SECRET || secret !== env.WORKER_API_SECRET) {
        return Response.json({ error: 'Unauthorized: Invalid or missing API secret' }, { status: 401, headers: cors });
      }

      try {
        const body = (await request.json()) as SendNotificationRequest;

        // Validation
        if (!body.type || !['blog', 'tool'].includes(body.type)) {
          return Response.json({ error: "type must be 'blog' or 'tool'" }, { status: 400, headers: cors });
        }

        if (!body.id || typeof body.id !== 'string') {
          return Response.json({ error: 'Missing content id' }, { status: 400, headers: cors });
        }

        if (!body.title || body.title.length > 100) {
          return Response.json({ error: 'title is required and must be <= 100 characters' }, { status: 400, headers: cors });
        }

        if (!body.body || body.body.length > 250) {
          return Response.json({ error: 'body is required and must be <= 250 characters' }, { status: 400, headers: cors });
        }

        // Domain restriction for click URLs
        const validUrl =
          body.url.startsWith('https://icreatepdf.com/') ||
          body.url.startsWith('http://localhost:3000/');

        if (!validUrl) {
          return Response.json({ error: 'Destination URL must belong to icreatepdf.com' }, { status: 400, headers: cors });
        }

        const contentId = `${body.type}:${body.id}`;

        // Check Idempotency Ledger
        const existingLedger = await env.DB.prepare(
          `SELECT id, notified_at, dry_run FROM notifications_ledger WHERE content_id = ?`
        )
          .bind(contentId)
          .first();

        if (existingLedger && !body.force && !body.dryRun) {
          return Response.json(
            {
              skipped: true,
              reason: 'already_notified',
              content_id: contentId,
              notified_at: existingLedger.notified_at,
            },
            { status: 200, headers: cors }
          );
        }

        // Fetch active subscribers
        const subscribersResult = await env.DB.prepare(
          `SELECT token, token_hash FROM subscribers WHERE status = 'active'`
        ).all<{ token: string; token_hash: string }>();

        const activeSubscribers = subscribersResult.results || [];

        // Dry Run Mode
        if (body.dryRun) {
          return Response.json(
            {
              success: true,
              dryRun: true,
              content_id: contentId,
              subscribersCount: activeSubscribers.length,
              samplePayload: {
                title: body.title,
                body: body.body,
                url: body.url,
              },
            },
            { headers: cors }
          );
        }

        if (activeSubscribers.length === 0) {
          return Response.json(
            {
              success: true,
              message: 'No active subscribers found',
              sentCount: 0,
            },
            { headers: cors }
          );
        }

        // Validate Firebase credentials on worker
        if (!env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
          return Response.json(
            { error: 'Server configuration error: Firebase credentials missing in Worker secrets' },
            { status: 500, headers: cors }
          );
        }

        const credentials = {
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: env.FIREBASE_PRIVATE_KEY,
          projectId: env.FIREBASE_PROJECT_ID || 'icreatepdf',
        };

        // Dispatch notifications in controlled batches
        let successCount = 0;
        let failCount = 0;
        let prunedCount = 0;
        const invalidTokens: string[] = [];

        const BATCH_SIZE = 25;
        for (let i = 0; i < activeSubscribers.length; i += BATCH_SIZE) {
          const batch = activeSubscribers.slice(i, i + BATCH_SIZE);

          const batchPromises = batch.map(async (sub: { token: string; token_hash: string }) => {
            const res = await sendFCMNotification(credentials, {
              token: sub.token,
              title: body.title,
              body: body.body,
              url: body.url,
              type: body.type,
            });

            if (res.success) {
              successCount++;
            } else {
              failCount++;
              if (res.invalidToken) {
                prunedCount++;
                invalidTokens.push(sub.token_hash);
              }
            }
          });

          await Promise.all(batchPromises);
        }

        // Prune dead/unregistered tokens in batch
        if (invalidTokens.length > 0) {
          const placeholders = invalidTokens.map(() => '?').join(',');
          await env.DB.prepare(
            `UPDATE subscribers SET status = 'invalid', updated_at = CURRENT_TIMESTAMP WHERE token_hash IN (${placeholders})`
          )
            .bind(...invalidTokens)
            .run();
        }

        // Record in durable ledger
        await env.DB.prepare(
          `INSERT INTO notifications_ledger (content_id, content_type, title, url, recipients_count, success_count, failure_count, dry_run)
           VALUES (?, ?, ?, ?, ?, ?, ?, 0)
           ON CONFLICT(content_id) DO UPDATE SET
             notified_at = CURRENT_TIMESTAMP,
             recipients_count = excluded.recipients_count,
             success_count = excluded.success_count,
             failure_count = excluded.failure_count`
        )
          .bind(
            contentId,
            body.type,
            body.title,
            body.url,
            activeSubscribers.length,
            successCount,
            failCount
          )
          .run();

        return Response.json(
          {
            success: true,
            content_id: contentId,
            totalSubscribers: activeSubscribers.length,
            sentCount: successCount,
            failedCount: failCount,
            prunedTokensCount: prunedCount,
          },
          { headers: cors }
        );
      } catch (err: any) {
        return Response.json({ error: err?.message || 'Failed to dispatch notifications' }, { status: 500, headers: cors });
      }
    }

    // =========================================================================
    // 4. LEDGER QUERY ENDPOINT (Protected)
    // =========================================================================
    if (request.method === 'GET' && url.pathname === '/api/ledger') {
      const authHeader = request.headers.get('Authorization') || '';
      const secret = authHeader.replace(/^Bearer\s+/i, '').trim();

      if (!env.WORKER_API_SECRET || secret !== env.WORKER_API_SECRET) {
        return Response.json({ error: 'Unauthorized' }, { status: 401, headers: cors });
      }

      const rows = await env.DB.prepare(
        `SELECT content_id, content_type, title, url, notified_at, recipients_count, success_count FROM notifications_ledger ORDER BY notified_at DESC LIMIT 20`
      ).all();

      return Response.json({ ledger: rows.results }, { headers: cors });
    }

    return Response.json({ error: 'Not found' }, { status: 404, headers: cors });
  },
};
