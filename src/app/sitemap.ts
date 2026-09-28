/**
 * Sitemap Generation
 * Generates sitemap.xml for all pages across all locales
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { locales, type Locale } from '@/lib/i18n/config';
import { getAllTools } from '@/config/tools';
import { getAllBlogPosts } from '@/config/blog-posts';
import { TOOL_CATEGORIES } from '@/types/tool';

// Required for static export
export const dynamic = 'force-static';

/**
 * Priority values for different page types
 */
const PRIORITY = {
  home: 1.0,
  tools: 0.9,
  workflow: 0.9,
  category: 0.85,
  blog: 0.9,
  blogPost: 0.8,
  toolPage: 0.8,
  static: 0.6,
} as const;

/**
 * Change frequency for different page types
 */
const CHANGE_FREQUENCY = {
  home: 'daily',
  tools: 'weekly',
  workflow: 'weekly',
  category: 'weekly',
  blog: 'daily',
  blogPost: 'weekly',
  toolPage: 'weekly',
  static: 'monthly',
} as const;

/**
 * Static pages that exist for all locales
 */
const STATIC_PAGES = [
  { path: '', priority: PRIORITY.home, changeFrequency: CHANGE_FREQUENCY.home },
  { path: '/tools', priority: PRIORITY.tools, changeFrequency: CHANGE_FREQUENCY.tools },
  { path: '/workflow', priority: PRIORITY.workflow, changeFrequency: CHANGE_FREQUENCY.workflow },
  { path: '/blog', priority: PRIORITY.blog, changeFrequency: CHANGE_FREQUENCY.blog },
  { path: '/about', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/about/founder', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/faq', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/privacy', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/terms', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/security', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/cookies', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/press', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/license', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/acknowledgements', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/contact', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/help', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
];

function getAlternateLanguages(path: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const loc of locales) {
    result[loc] = `${siteConfig.url}/${loc}${path}`;
  }
  result['x-default'] = `${siteConfig.url}/en${path}`;
  return result;
}

/**
 * Generate sitemap entries for a specific locale
 */
function generateLocaleEntries(locale: Locale, lastModified: Date): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  
  // Add static pages
  for (const page of STATIC_PAGES) {
    entries.push({
      url: `${siteConfig.url}/${locale}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency as 'daily' | 'weekly' | 'monthly',
      priority: page.priority,
      alternates: {
        languages: getAlternateLanguages(page.path),
      },
    });
  }

  // Add category pages
  for (const category of TOOL_CATEGORIES) {
    const categoryPath = `/tools/category/${category}`;
    entries.push({
      url: `${siteConfig.url}/${locale}${categoryPath}`,
      lastModified,
      changeFrequency: CHANGE_FREQUENCY.category,
      priority: PRIORITY.category,
      alternates: {
        languages: getAlternateLanguages(categoryPath),
      },
    });
  }

  // Add blog posts
  const blogPosts = getAllBlogPosts();
  for (const post of blogPosts) {
    const postPath = `/blog/${post.slug}`;
    entries.push({
      url: `${siteConfig.url}/${locale}${postPath}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: CHANGE_FREQUENCY.blogPost,
      priority: PRIORITY.blogPost,
      alternates: {
        languages: getAlternateLanguages(postPath),
      },
    });
  }
  
  // Add tool pages
  const tools = getAllTools();
  for (const tool of tools) {
    const toolPath = `/tools/${tool.slug}`;
    entries.push({
      url: `${siteConfig.url}/${locale}${toolPath}`,
      lastModified,
      changeFrequency: CHANGE_FREQUENCY.toolPage,
      priority: PRIORITY.toolPage,
      alternates: {
        languages: getAlternateLanguages(toolPath),
      },
    });
  }
  
  return entries;
}

/**
 * Generate the complete sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const allEntries: MetadataRoute.Sitemap = [];
  
  // Generate entries for each locale
  for (const locale of locales) {
    const localeEntries = generateLocaleEntries(locale, lastModified);
    allEntries.push(...localeEntries);
  }
  
  return allEntries;
}

/**
 * Get total number of URLs in sitemap
 * Useful for testing and validation
 */
export function getSitemapUrlCount(): number {
  const tools = getAllTools();
  const staticPagesCount = STATIC_PAGES.length;
  const toolPagesCount = tools.length;
  const localesCount = locales.length;
  
  return (staticPagesCount + toolPagesCount) * localesCount;
}
