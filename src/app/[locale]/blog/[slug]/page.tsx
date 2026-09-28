import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/config/site';
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/config/blog-posts';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const post of posts) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | iCreatePDF',
    };
  }

  const url = `${siteConfig.url}/${locale}/blog/${post.slug}`;

  return {
    title: `${post.title} | ${siteConfig.name} Blog`,
    description: post.description,
    keywords: [...post.tags, 'PDF tutorial', 'PDF guide', 'iCreatePDF'],
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      locale: locale === 'en' ? 'en_US' : locale,
      url,
      title: post.title,
      description: post.description,
      siteName: siteConfig.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: post.coverImage ? [{ url: `${siteConfig.url}${post.coverImage}`, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      site: siteConfig.seo.twitterHandle,
      images: post.coverImage ? [`${siteConfig.url}${post.coverImage}`] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug, 2);

  return (
    <BlogPostClient
      locale={locale as Locale}
      post={post}
      relatedPosts={relatedPosts}
    />
  );
}
