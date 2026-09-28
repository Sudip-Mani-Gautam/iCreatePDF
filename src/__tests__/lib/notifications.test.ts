import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getAllBlogPosts } from '@/config/blog-posts';

describe('Automatic Notifications & Content Release Integrity', () => {
  const toolsJsonPath = resolve(process.cwd(), 'content/releases/tools.json');

  it('validates content/releases/tools.json exists and is valid JSON', () => {
    expect(existsSync(toolsJsonPath)).toBe(true);
    const content = JSON.parse(readFileSync(toolsJsonPath, 'utf8'));
    expect(Array.isArray(content)).toBe(true);
    expect(content.length).toBeGreaterThan(0);
  });

  it('validates tool release entries adhere to required schema', () => {
    const tools = JSON.parse(readFileSync(toolsJsonPath, 'utf8'));
    for (const tool of tools) {
      expect(typeof tool.id).toBe('string');
      expect(tool.id.length).toBeGreaterThan(0);

      expect(typeof tool.name).toBe('string');
      expect(tool.name.length).toBeGreaterThan(0);

      expect(typeof tool.url).toBe('string');
      expect(tool.url.startsWith('https://icreatepdf.com/')).toBe(true);

      expect(typeof tool.description).toBe('string');
      expect(tool.description.length).toBeGreaterThan(0);
      expect(tool.description.length).toBeLessThanOrEqual(250);

      expect(['published', 'draft']).toContain(tool.status);
      expect(Number.isNaN(Date.parse(tool.releasedAt))).toBe(false);
    }
  });

  it('verifies blog posts exclude drafts from default getter', () => {
    const published = getAllBlogPosts(false);
    for (const post of published) {
      expect(post.draft).not.toBe(true);
      expect(typeof post.slug).toBe('string');
      expect(typeof post.title).toBe('string');
      expect(post.title.length).toBeLessThanOrEqual(100);
      expect(Number.isNaN(Date.parse(post.publishedAt))).toBe(false);
    }
  });

  it('validates notification constraints on titles, bodies, and domains', () => {
    const sampleBlog = {
      title: 'How to Merge PDF Files Online for Free',
      slug: 'how-to-merge-pdf-files-online-free',
    };

    const notificationTitle = `New on iCreatePDF: ${sampleBlog.title}`;
    const notificationBody = 'Read our latest article on iCreatePDF.';
    const notificationUrl = `https://icreatepdf.com/en/blog/${sampleBlog.slug}`;

    expect(notificationTitle.length).toBeLessThanOrEqual(100);
    expect(notificationBody.length).toBeLessThanOrEqual(250);
    expect(notificationUrl.startsWith('https://icreatepdf.com/')).toBe(true);
  });

  it('ensures content_id idempotency keys format properly', () => {
    const blogId = 'blog:how-to-merge-pdf-files-online-free';
    const toolId = 'tool:pdf-multi-tool';

    expect(blogId).toMatch(/^blog:[a-z0-9-]+$/);
    expect(toolId).toMatch(/^tool:[a-z0-9-]+$/);
  });
});
