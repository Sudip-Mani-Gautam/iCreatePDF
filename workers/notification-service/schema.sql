-- Cloudflare D1 Database Schema for iCreatePDF Notifications
-- Free Tier Optimized

-- Table 1: Subscribers Registry
CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token_hash TEXT UNIQUE NOT NULL,
    token TEXT NOT NULL,
    locale TEXT DEFAULT 'en',
    status TEXT DEFAULT 'active', -- 'active', 'unsubscribed', 'invalid'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_hash ON subscribers(token_hash);

-- Table 2: Durable Ledger for Notification Idempotency
-- Prevents duplicate push notifications across GitHub Actions reruns or multiple deployments
CREATE TABLE IF NOT EXISTS notifications_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_id TEXT UNIQUE NOT NULL, -- e.g. "blog:how-to-merge-pdf" or "tool:pdf-multi-tool"
    content_type TEXT NOT NULL,      -- "blog" or "tool"
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    notified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    recipients_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    failure_count INTEGER DEFAULT 0,
    dry_run BOOLEAN DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_ledger_content_id ON notifications_ledger(content_id);

-- Table 3: Delivery Logs (Pruned automatically, logs generic statuses only, zero PII)
CREATE TABLE IF NOT EXISTS send_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_id TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    status TEXT NOT NULL,            -- 'success', 'failed', 'invalid_token'
    error_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_send_logs_content ON send_logs(content_id);
