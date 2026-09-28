#!/usr/bin/env node

/**
 * iCreatePDF Content Notification Dispatcher
 * 
 * Detects genuinely new published blog articles and tool releases from:
 * 1. src/config/blog-posts.ts
 * 2. content/releases/tools.json
 * 
 * Rules:
 * - Never notifies for drafts or future-dated articles
 * - Never notifies for edits or content modifications to existing items
 * - Idempotency guaranteed by Cloudflare Worker D1 ledger
 * - Supports --dry-run mode for safe testing
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, '..');

// CLI Arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || process.env.DRY_RUN === 'true';
const isCheckOnly = args.includes('--check-only');
const forceSend = args.includes('--force');

const workerUrl = (process.env.NOTIFICATION_WORKER_URL || '').replace(/\/$/, '');
const workerSecret = process.env.WORKER_API_SECRET || '';

/**
 * Extract Blog Posts from src/config/blog-posts.ts
 */
function extractBlogPosts(fileContent) {
  const posts = [];
  const postRegex = /{\s*slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*description:\s*['"]([^'"]+)['"],\s*publishedAt:\s*['"]([^'"]+)['"]/g;

  let match;
  while ((match = postRegex.exec(fileContent)) !== null) {
    const [full, slug, title, description, publishedAt] = match;
    // Check if draft: true is present near this block
    const postSnippet = fileContent.slice(match.index, match.index + 800);
    const isDraft = /draft:\s*true/.test(postSnippet);

    posts.push({
      slug,
      title,
      description,
      publishedAt,
      draft: isDraft,
    });
  }

  return posts;
}

/**
 * Extract Tool Releases from content/releases/tools.json
 */
function extractToolReleases(jsonContent) {
  try {
    const list = JSON.parse(jsonContent);
    if (!Array.isArray(list)) return [];
    return list.map((item) => ({
      id: item.id,
      name: item.name,
      url: item.url,
      description: item.description,
      releasedAt: item.releasedAt,
      status: item.status || 'published',
    }));
  } catch {
    return [];
  }
}

/**
 * Detect newly added content comparing git commit or previous state
 */
function detectNewItems() {
  const newItems = [];
  const today = new Date().toISOString().slice(0, 10);

  // 1. Check Blog Posts
  const blogFilePath = resolve(ROOT_DIR, 'src/config/blog-posts.ts');
  if (existsSync(blogFilePath)) {
    const currentBlogContent = readFileSync(blogFilePath, 'utf8');
    const currentPosts = extractBlogPosts(currentBlogContent);

    // Get previous posts from git HEAD~1 if in git repo
    let previousSlugs = new Set();
    try {
      const prevBlogContent = execSync('git show HEAD~1:src/config/blog-posts.ts', {
        cwd: ROOT_DIR,
        stdio: ['pipe', 'pipe', 'ignore'],
      }).toString();
      const prevPosts = extractBlogPosts(prevBlogContent);
      previousSlugs = new Set(prevPosts.map((p) => p.slug));
    } catch {
      // Not in git or initial commit - rely on ledger for deduplication
    }

    for (const post of currentPosts) {
      if (post.draft) continue; // Exclude drafts
      if (post.publishedAt > today) continue; // Exclude future-dated posts

      // If previous git commit existed, only trigger on genuinely new slug
      if (previousSlugs.size > 0 && previousSlugs.has(post.slug)) {
        continue; // Existing post (edit/update), do not notify
      }

      newItems.push({
        type: 'blog',
        id: post.slug,
        title: `New on iCreatePDF: ${post.title}`,
        body: 'Read our latest article on iCreatePDF.',
        url: `https://icreatepdf.com/en/blog/${post.slug}`,
      });
    }
  }

  // 2. Check Tool Releases
  const toolsFilePath = resolve(ROOT_DIR, 'content/releases/tools.json');
  if (existsSync(toolsFilePath)) {
    const currentToolsContent = readFileSync(toolsFilePath, 'utf8');
    const currentTools = extractToolReleases(currentToolsContent);

    let previousToolIds = new Set();
    try {
      const prevToolsContent = execSync('git show HEAD~1:content/releases/tools.json', {
        cwd: ROOT_DIR,
        stdio: ['pipe', 'pipe', 'ignore'],
      }).toString();
      const prevTools = extractToolReleases(prevToolsContent);
      previousToolIds = new Set(prevTools.map((t) => t.id));
    } catch {
      // Ignore git history errors
    }

    for (const tool of currentTools) {
      if (tool.status !== 'published') continue; // Exclude drafts

      if (previousToolIds.size > 0 && previousToolIds.has(tool.id)) {
        continue; // Existing tool, do not notify
      }

      newItems.push({
        type: 'tool',
        id: tool.id,
        title: `New PDF tool: ${tool.name}`,
        body: 'Discover the latest tool on iCreatePDF.',
        url: tool.url || `https://icreatepdf.com/en/tools/${tool.id}`,
      });
    }
  }

  return newItems;
}

async function main() {
  console.log('🔍 Scanning repository for newly published articles & tool releases...');
  const items = detectNewItems();

  console.log(`Found ${items.length} candidate item(s):`);
  items.forEach((item, idx) => {
    console.log(`  [${idx + 1}] (${item.type.toUpperCase()}) ${item.title}`);
    console.log(`      ID:  ${item.id}`);
    console.log(`      URL: ${item.url}`);
  });

  if (items.length === 0) {
    console.log('✅ No new published content detected. Nothing to send.');
    process.exit(0);
  }

  if (isCheckOnly) {
    console.log('Check-only mode requested. Exiting.');
    process.exit(0);
  }

  if (isDryRun) {
    console.log('\n⚠️ DRY-RUN MODE: Simulating notification dispatch...');
  }

  if (!workerUrl) {
    if (isDryRun) {
      console.log('✅ Dry-run simulation completed locally. (NOTIFICATION_WORKER_URL not set).');
      process.exit(0);
    }
    console.error('❌ Error: NOTIFICATION_WORKER_URL environment variable is required to dispatch notifications.');
    process.exit(1);
  }

  for (const item of items) {
    console.log(`\n📨 Dispatching ${item.type} notification for: "${item.id}"...`);

    const payload = {
      type: item.type,
      id: item.id,
      title: item.title,
      body: item.body,
      url: item.url,
      dryRun: isDryRun,
      force: forceSend,
    };

    try {
      const res = await fetch(`${workerUrl}/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${workerSecret}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`❌ Worker rejected notification for "${item.id}":`, data);
        continue;
      }

      if (data.skipped) {
        console.log(`ℹ️ Skipped "${item.id}": ${data.reason} (already recorded in ledger at ${data.notified_at})`);
      } else if (data.dryRun) {
        console.log(`✅ [Dry-Run] Would send to ${data.subscribersCount} subscriber(s). Content ID: ${data.content_id}`);
      } else {
        console.log(`🎉 Notification sent successfully! Sent: ${data.sentCount}, Failed: ${data.failedCount}, Pruned: ${data.prunedTokensCount}`);
      }
    } catch (err) {
      console.error(`❌ Network error contacting notification worker for "${item.id}":`, err.message);
    }
  }

  console.log('\n🏁 Content detection and notification process completed.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
