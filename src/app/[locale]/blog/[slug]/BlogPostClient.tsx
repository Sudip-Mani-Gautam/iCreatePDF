'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check, 
  Twitter, 
  Linkedin, 
  BookOpen, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  User
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';
import { BlogPost } from '@/types/blog';
import { siteConfig } from '@/config/site';

interface BlogPostClientProps {
  locale: Locale;
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({
  locale,
  post,
  relatedPosts,
}: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `${siteConfig.url}/${locale}/blog/${post.slug}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  // JSON-LD Structured Data for Google SEO Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header locale={locale} />

      <main className="flex-1 pt-16 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 max-w-4xl pt-4 pb-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[hsl(var(--color-muted-foreground))]">
            <Link href={`/${locale}`} className="hover:text-[hsl(var(--color-foreground))] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[hsl(var(--color-foreground))] transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[hsl(var(--color-foreground))] truncate max-w-xs md:max-w-md font-medium">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Article Header */}
        <header className="container mx-auto px-4 max-w-4xl py-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))]">
              {post.category}
            </span>
            <span className="text-xs text-[hsl(var(--color-muted-foreground))] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
            <span className="text-xs text-[hsl(var(--color-muted-foreground))] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Published {post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-[hsl(var(--color-muted-foreground))] leading-relaxed mb-8">
            {post.description}
          </p>

          {/* Author bar & Share buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[hsl(var(--color-border))]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--color-primary)/0.15)] flex items-center justify-center text-[hsl(var(--color-primary))]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[hsl(var(--color-foreground))]">
                  {post.author.name}
                </div>
                <div className="text-xs text-[hsl(var(--color-muted-foreground))]">
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[hsl(var(--color-muted-foreground))] mr-1">Share:</span>
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:bg-[hsl(var(--color-muted))] transition-colors"
                title="Copy Article URL"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-500 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="container mx-auto px-4 max-w-4xl py-8">
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-[hsl(var(--color-foreground))] leading-relaxed">
            {post.content.split('\n\n').map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-3">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={index} className="text-xl font-bold text-[hsl(var(--color-foreground))] mt-6 mb-2">
                    {trimmed.replace('#### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('---')) {
                return <hr key={index} className="border-[hsl(var(--color-border))] my-8" />;
              }
              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 pl-2 text-[hsl(var(--color-muted-foreground))]">
                    {items.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span className="text-[hsl(var(--color-foreground))]">
                          {item.replace('- ', '')}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\.\s/.test(trimmed)) {
                const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l));
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 pl-2 text-[hsl(var(--color-muted-foreground))]">
                    {items.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span className="text-[hsl(var(--color-foreground))]">
                          {item.replace(/^\d+\.\s/, '')}
                        </span>
                      </li>
                    ))}
                  </ol>
                );
              }

              return (
                <p key={index} className="text-[hsl(var(--color-foreground))/0.9] text-base md:text-lg leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-[hsl(var(--color-border))] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[hsl(var(--color-muted-foreground))] mr-2">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action CTA Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary)/0.15)] via-[hsl(var(--color-card))] to-[hsl(var(--color-accent)/0.15)] border border-[hsl(var(--color-border))] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Ready to try our 100% Private PDF Tools?
              </h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                No file uploads, no watermarks, and no signups required. Everything processes directly in your browser.
              </p>
            </div>
            <Link
              href={`/${locale}/tools`}
              className="px-6 py-3 rounded-xl bg-[hsl(var(--color-primary))] text-white font-semibold text-sm hover:opacity-90 transition-all shadow-md flex-shrink-0"
            >
              Open Free PDF Tools
            </Link>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto px-4 max-w-4xl mt-16 pt-12 border-t border-[hsl(var(--color-border))]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Related Articles</h2>
              <Link
                href={`/${locale}/blog`}
                className="text-xs font-semibold text-[hsl(var(--color-primary))] hover:underline flex items-center gap-1"
              >
                View all articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.slug}
                  className="p-6 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:shadow-md hover:border-[hsl(var(--color-primary)/0.3)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs text-[hsl(var(--color-primary))] font-semibold uppercase tracking-wider mb-2">
                      {rel.category}
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      <Link href={`/${locale}/blog/${rel.slug}`} className="hover:text-[hsl(var(--color-primary))]">
                        {rel.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))] line-clamp-2 mb-4">
                      {rel.description}
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/blog/${rel.slug}`}
                    className="text-xs font-semibold text-[hsl(var(--color-primary))] flex items-center gap-1 mt-auto"
                  >
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer locale={locale} />
    </div>
  );
}
