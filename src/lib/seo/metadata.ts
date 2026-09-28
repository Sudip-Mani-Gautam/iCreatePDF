/**
 * SEO Metadata Generation Utilities
 * Provides functions for generating meta tags, Open Graph, and Twitter Card data
 * 
 * @module lib/seo/metadata
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { type Locale, localeConfig, locales } from '@/lib/i18n/config';
import type { Tool, ToolContent } from '@/types/tool';
import { getBasePath } from '@/lib/utils/path';

/**
 * Base metadata configuration
 */
export interface BaseMetadataOptions {
  locale: Locale;
  path?: string;
}

/**
 * Page-specific metadata options
 */
export interface PageMetadataOptions extends BaseMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

/**
 * Tool page metadata options
 */
export interface ToolMetadataOptions extends BaseMetadataOptions {
  tool: Tool;
  content: ToolContent;
}

/**
 * Generate the canonical URL for a page
 */
export function getCanonicalUrl(locale: Locale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const basePath = getBasePath().replace(/\/$/, '');
  return `${siteConfig.url}${basePath}/${locale}${cleanPath}`;
}

/**
 * Generate alternate language URLs for hreflang tags
 */
export function getAlternateUrls(path: string = ''): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const alternates: Record<string, string> = {};
  const basePath = getBasePath().replace(/\/$/, '');

  for (const locale of locales) {
    alternates[locale] = `${siteConfig.url}${basePath}/${locale}${cleanPath}`;
  }

  // Add x-default pointing to English
  alternates['x-default'] = `${siteConfig.url}${basePath}/en${cleanPath}`;

  return alternates;
}

/**
 * Generate base metadata for any page
 */
export function generateBaseMetadata(options: PageMetadataOptions): Metadata {
  const { locale, path = '', title, description, keywords = [], image, noIndex = false } = options;

  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const canonicalUrl = getCanonicalUrl(locale, path);
  const ogImage = image || siteConfig.ogImage;
  const ogLocale = getOpenGraphLocale(locale);

  // Ensure description is optimal length (150-160 characters)
  const optimizedDescription = description.length > 160
    ? description.substring(0, 157) + '...'
    : description;

  return {
    title: fullTitle,
    description: optimizedDescription,
    keywords: [...new Set([...keywords, 'PDF', 'PDF tools', 'free', 'online', siteConfig.name])],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    robots: noIndex
      ? { index: false, follow: false }
      : {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateUrls(path),
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined,
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonicalUrl,
      title: fullTitle,
      description: optimizedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: optimizedDescription,
      images: [ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`],
      creator: siteConfig.creator,
    },
    category: 'technology',
  };
}

/**
 * Generate metadata for tool pages
 */
export function generateToolMetadata(options: ToolMetadataOptions): Metadata {
  const { locale, tool, content } = options;
  const path = `/tools/${tool.slug}`;

  // Enhance keywords with common PDF-related terms
  const enhancedKeywords = [
    ...content.keywords,
    'free',
    'online',
    'no registration',
    'browser-based',
    'secure',
    'private',
  ];

  return generateBaseMetadata({
    locale,
    path,
    title: content.title,
    description: content.metaDescription,
    keywords: enhancedKeywords,
  });
}

/**
 * Generate metadata for the homepage
 */
export function generateHomeMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const defaultTitle = `${siteConfig.name} - Professional PDF Tools`;
  const defaultDescription = siteConfig.description;

  return generateBaseMetadata({
    locale,
    path: '',
    title: translations?.title || defaultTitle,
    description: translations?.description || defaultDescription,
    keywords: ['PDF tools', 'merge PDF', 'split PDF', 'compress PDF', 'convert PDF', 'free PDF tools', 'online PDF editor'],
  });
}

/**
 * Generate metadata for the tools listing page
 */
export function generateToolsListMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/tools',
    title: translations?.title || 'All PDF Tools',
    description: translations?.description || 'Browse all 132+ professional PDF tools. Merge, split, compress, convert, edit, and secure your PDF files for free directly in your browser.',
    keywords: ['PDF tools', 'all PDF tools', 'PDF editor', 'PDF converter', 'PDF merger', 'PDF splitter'],
  });
}

/**
 * Generate metadata for a category page
 */
export function generateCategoryMetadata(
  locale: Locale,
  category: string,
  categoryTitle: string,
  description?: string
): Metadata {
  return generateBaseMetadata({
    locale,
    path: `/tools/category/${category}`,
    title: `${categoryTitle} Tools`,
    description: description || `Free online ${categoryTitle} PDF tools. Private, fast, and 100% client-side processing in your browser with ${siteConfig.name}.`,
    keywords: [`${categoryTitle} PDF tools`, category, 'PDF tools', 'free PDF tools', 'online PDF editor'],
  });
}

/**
 * Generate metadata for the workflow page
 */
export function generateWorkflowMetadata(locale: Locale): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/workflow',
    title: 'PDF Workflow Builder',
    description: `Automate multi-step PDF tasks with our visual pipeline builder on ${siteConfig.name}. Chain together merge, compress, protect, watermark, and conversion tools directly in your browser.`,
    keywords: ['PDF workflow', 'PDF automation', 'batch PDF processing', 'PDF pipeline', 'workflow builder'],
  });
}

/**
 * Generate metadata for the terms page
 */
export function generateTermsMetadata(locale: Locale): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/terms',
    title: 'Terms of Service',
    description: `Terms and conditions for using ${siteConfig.name} client-side PDF tools and document processing utilities.`,
    keywords: ['terms of service', 'terms and conditions', 'legal', siteConfig.name],
  });
}

/**
 * Generate metadata for the security page
 */
export function generateSecurityMetadata(locale: Locale): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/security',
    title: 'Security Architecture',
    description: `Learn how ${siteConfig.name} provides zero-upload, 100% client-side local PDF processing security and sandbox isolation.`,
    keywords: ['security', 'PDF security', 'client-side privacy', 'zero upload', 'WebAssembly security'],
  });
}

/**
 * Generate metadata for the cookie policy page
 */
export function generateCookiesMetadata(locale: Locale): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/cookies',
    title: 'Cookie Policy',
    description: `Learn about ${siteConfig.name}'s cookie-free, privacy-first client-side architecture. No tracking cookies or advertising pixels.`,
    keywords: ['cookie policy', 'cookies', 'privacy', 'no tracking'],
  });
}

/**
 * Generate metadata for the press & media kit page
 */
export function generatePressMetadata(locale: Locale): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/press',
    title: 'Press & Media Kit',
    description: `Press releases, brand assets, logos, and media resources for ${siteConfig.name}.`,
    keywords: ['press kit', 'media kit', 'brand assets', 'logos', siteConfig.name],
  });
}

/**
 * Generate metadata for the about page
 */
export function generateAboutMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/about',
    title: translations?.title || 'About',
    description: translations?.description || `Learn about ${siteConfig.name} - your free, private, and powerful PDF toolkit. All processing happens in your browser.`,
    keywords: ['about', 'PDF tools', 'privacy', 'browser-based'],
  });
}

/**
 * Generate metadata for the founder profile page
 */
export function generateFounderMetadata(locale: Locale): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/about/founder',
    title: 'Meet the Founder - Sudip Mani Gautam',
    description: `Learn about Sudip Mani Gautam, the software engineer  behind ${siteConfig.name}, building 100% client-side WebAssembly PDF utilities.`,
    keywords: ['Sudip Mani Gautam', 'founder', 'iCreatePDF founder', 'privacy advocate', 'open source', 'WebAssembly engineer'],
  });
}

/**
 * Generate metadata for the FAQ page
 */
export function generateFaqMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/faq',
    title: translations?.title || 'Frequently Asked Questions',
    description: translations?.description || `Find answers to common questions about ${siteConfig.name}. Learn how to use our PDF tools effectively.`,
    keywords: ['FAQ', 'help', 'questions', 'PDF tools help'],
  });
}

/**
 * Generate metadata for the privacy page
 */
export function generatePrivacyMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/privacy',
    title: translations?.title || 'Privacy Policy',
    description: translations?.description || `${siteConfig.name} privacy policy. Your files never leave your device - all processing happens locally in your browser.`,
    keywords: ['privacy', 'security', 'data protection', 'local processing'],
  });
}

/**
 * Generate metadata for the contact page
 */
export function generateContactMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/contact',
    title: translations?.title || 'Contact Us',
    description: translations?.description || `Get in touch with ${siteConfig.name} team. We'd love to hear from you.`,
    keywords: ['contact', 'support', 'help', 'feedback'],
  });
}

/**
 * Convert locale to Open Graph locale format
 */
export function getOpenGraphLocale(locale: Locale): string {
  const ogLocaleMap: Record<Locale, string> = {
    en: 'en_US',
    ja: 'ja_JP',
    ko: 'ko_KR',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    zh: 'zh_CN',
    'zh-TW': 'zh_TW',
    pt: 'pt_BR',
    ar: 'ar_AR',
    it: 'it_IT',
    id: 'id_ID',
    vi: 'vi_VN',
    ro: 'ro_RO',
    pl: 'pl_PL',
    ne: 'ne_NP',
    hi: 'hi_IN',
    ms: 'ms_MY',
  };
  return ogLocaleMap[locale] || 'en_US';
}

/**
 * Check if metadata contains all required fields
 */
export function validateMetadata(metadata: Metadata): {
  valid: boolean;
  missingFields: string[];
} {
  const requiredFields = ['title', 'description'];
  const requiredOgFields = ['title', 'description'];
  const requiredTwitterFields = ['card', 'title', 'description'];

  const missingFields: string[] = [];

  // Check base fields
  for (const field of requiredFields) {
    if (!metadata[field as keyof Metadata]) {
      missingFields.push(field);
    }
  }

  // Check Open Graph fields
  if (metadata.openGraph) {
    for (const field of requiredOgFields) {
      if (!metadata.openGraph[field as keyof typeof metadata.openGraph]) {
        missingFields.push(`og:${field}`);
      }
    }
  } else {
    missingFields.push('openGraph');
  }

  // Check Twitter Card fields
  if (metadata.twitter) {
    for (const field of requiredTwitterFields) {
      if (!metadata.twitter[field as keyof typeof metadata.twitter]) {
        missingFields.push(`twitter:${field}`);
      }
    }
  } else {
    missingFields.push('twitter');
  }

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
