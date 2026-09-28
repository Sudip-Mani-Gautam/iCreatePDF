'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Share2,
  Check,
  Twitter,
  Linkedin,
  ShieldCheck,
  ArrowRight,
  User,
  ChevronDown,
  List,
  HelpCircle,
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

interface TocItem {
  id: string;
  text: string;
  level: number;
}

type Block =
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'h4'; text: string; id: string }
  | { type: 'hr' }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'p'; text: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractToc(content: string, hasFaq = false): TocItem[] {
  const toc: TocItem[] = [];
  for (const line of content.split('\n')) {
    const t = line.trim();
    if (t.startsWith('#### ')) {
      const text = t.slice(5).trim();
      toc.push({ id: slugify(text), text, level: 4 });
    } else if (t.startsWith('### ')) {
      const text = t.slice(4).trim();
      toc.push({ id: slugify(text), text, level: 3 });
    } else if (t.startsWith('## ')) {
      const text = t.slice(3).trim();
      toc.push({ id: slugify(text), text, level: 2 });
    }
  }
  if (hasFaq) {
    toc.push({ id: 'faq-section', text: 'Frequently Asked Questions', level: 2 });
  }
  return toc;
}

function parseBlocks(content: string): Block[] {
  const lines = content.split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const t = raw.trim();
    if (!t) { i++; continue; }
    if (t.startsWith('#### ')) {
      const text = t.slice(5).trim();
      blocks.push({ type: 'h4', text, id: slugify(text) });
      i++; continue;
    }
    if (t.startsWith('### ')) {
      const text = t.slice(4).trim();
      blocks.push({ type: 'h3', text, id: slugify(text) });
      i++; continue;
    }
    if (t.startsWith('## ')) {
      const text = t.slice(3).trim();
      blocks.push({ type: 'h2', text, id: slugify(text) });
      i++; continue;
    }
    if (t === '---') {
      blocks.push({ type: 'hr' });
      i++; continue;
    }
    if (t.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }
    if (/^\s*\d+\.\s/.test(raw)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, '').trim());
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }
    const parts: string[] = [];
    while (i < lines.length) {
      const cur = lines[i].trim();
      if (!cur) { i++; break; }
      if (cur.startsWith('#') || cur === '---' || cur.startsWith('- ') || /^\d+\.\s/.test(cur)) break;
      parts.push(cur);
      i++;
    }
    if (parts.length > 0) {
      blocks.push({ type: 'p', text: parts.join(' ') });
    }
  }
  return blocks;
}

export default function BlogPostClient({ locale, post, relatedPosts }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [openFaqSet, setOpenFaqSet] = useState<Set<number>>(() => new Set([0])); // First FAQ open by default
  const [imgError, setImgError] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `${siteConfig.url}/${locale}/blog/${post.slug}`;

  const hasFaq = Boolean(post.faq && post.faq.length > 0);
  const tocItems = extractToc(post.content, hasFaq);
  const blocks = parseBlocks(post.content);

  useEffect(() => {
    if (tocItems.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: post.coverImage ? `${siteConfig.url}${post.coverImage}` : undefined,
      author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: { '@type': 'ImageObject', url: `${siteConfig.url}/favicon.svg` },
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      mainEntityOfPage: { '@type': 'WebPage', '@id': currentUrl },
      keywords: post.tags.join(', '),
    },
    ...(post.faq && post.faq.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];

  const renderInline = (text: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    const pattern =
      /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\(((?:https?:\/\/|\/)[^\s)]+)\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;
    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
      if (match[2]) {
        nodes.push(<strong key={key++} className="font-bold text-[hsl(var(--color-foreground))]">{match[2]}</strong>);
      } else if (match[3]) {
        nodes.push(<em key={key++} className="italic">{match[3]}</em>);
      } else if (match[4]) {
        nodes.push(
          <code key={key++} className="px-1.5 py-0.5 rounded bg-[hsl(var(--color-muted))] text-[hsl(var(--color-primary))] text-sm font-mono">
            {match[4]}
          </code>
        );
      } else if (match[5] && match[6]) {
        const href = match[6];
        const isExternal = href.startsWith('http');
        nodes.push(
          isExternal ? (
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer"
              className="text-[hsl(var(--color-primary))] underline underline-offset-2 hover:opacity-80 transition-opacity">
              {match[5]}
            </a>
          ) : (
            <Link key={key++} href={`/${locale}${href}`}
              className="text-[hsl(var(--color-primary))] underline underline-offset-2 hover:opacity-80 transition-opacity">
              {match[5]}
            </Link>
          )
        );
      }
      lastIndex = pattern.lastIndex;
    }
    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
  };

  const renderBlock = (block: Block, index: number): React.ReactNode => {
    switch (block.type) {
      case 'h2':
        return (
          <h2 key={index} id={block.id}
            className="text-2xl md:text-3xl font-extrabold text-[hsl(var(--color-foreground))] mt-10 mb-3 tracking-tight scroll-mt-28 pb-2 border-b border-[hsl(var(--color-border))]">
            {renderInline(block.text)}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={index} id={block.id}
            className="text-xl md:text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-2 scroll-mt-28">
            {renderInline(block.text)}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={index} id={block.id}
            className="text-base md:text-lg font-semibold text-[hsl(var(--color-foreground))] mt-6 mb-1.5 scroll-mt-28">
            {renderInline(block.text)}
          </h4>
        );
      case 'hr':
        return <hr key={index} className="border-[hsl(var(--color-border))] my-8" />;
      case 'ul':
        return (
          <ul key={index} className="list-none space-y-2.5 my-4 pl-1">
            {block.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[hsl(var(--color-foreground))] text-base md:text-lg leading-relaxed">
                <span className="mt-2.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(var(--color-primary))]" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={index} className="list-none space-y-3.5 my-4 pl-1">
            {block.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[hsl(var(--color-foreground))] text-base md:text-lg leading-relaxed">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[hsl(var(--color-primary)/0.12)] text-[hsl(var(--color-primary))] text-sm font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{renderInline(item)}</span>
              </li>
            ))}
          </ol>
        );
      case 'p':
        return (
          <p key={index} className="text-[hsl(var(--color-foreground))] text-base md:text-lg leading-8 my-4">
            {renderInline(block.text)}
          </p>
        );
    }
  };

  const tocNav = (
    <nav aria-label="Table of contents">
      <ul className="space-y-0.5">
        {tocItems.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 14}px` }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTocOpen(false);
              }}
              className={`block text-sm py-1.5 px-2.5 rounded-lg transition-all duration-150 ${
                activeId === item.id
                  ? 'bg-[hsl(var(--color-primary)/0.12)] text-[hsl(var(--color-primary))] font-semibold'
                  : 'text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))]'
              }`}
            >
              {item.level === 4 && <span className="mr-1.5 opacity-40 text-xs">&#8627;</span>}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-22 md:pt-24 pb-16">

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-6xl pt-4 pb-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[hsl(var(--color-muted-foreground))]">
            <Link href={`/${locale}`} className="hover:text-[hsl(var(--color-foreground))] transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[hsl(var(--color-foreground))] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[hsl(var(--color-foreground))] truncate max-w-xs md:max-w-md font-medium">{post.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <header className="container mx-auto px-4 max-w-6xl py-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))]">
              {post.category}
            </span>
            <span className="text-xs text-[hsl(var(--color-muted-foreground))] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />{post.readingTime}
            </span>
            <span className="text-xs text-[hsl(var(--color-muted-foreground))] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />Published {post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">{post.title}</h1>
          <p className="text-lg md:text-xl text-[hsl(var(--color-muted-foreground))] leading-relaxed mb-8">{post.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[hsl(var(--color-border))]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--color-primary)/0.15)] flex items-center justify-center text-[hsl(var(--color-primary))]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold">{post.author.name}</div>
                <div className="text-xs text-[hsl(var(--color-muted-foreground))]">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[hsl(var(--color-muted-foreground))] mr-1">Share:</span>
              <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all" title="Share on X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all" title="Share on LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <button onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:bg-[hsl(var(--color-muted))] transition-colors"
                title="Copy Article URL">
                {copied ? (
                  <><Check className="w-3.5 h-3.5 text-green-500" /><span className="text-green-500 font-semibold">Copied!</span></>
                ) : (
                  <><Share2 className="w-3.5 h-3.5" /><span>Copy Link</span></>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image / Visual Banner */}
        <div className="container mx-auto px-4 max-w-6xl mb-8">
          <div className="relative w-full h-64 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden border border-[hsl(var(--color-border))] shadow-sm bg-[hsl(var(--color-card))]">
            {post.coverImage && !imgError ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${post.coverGradient || 'from-blue-600 via-indigo-600 to-purple-700'} flex flex-col items-center justify-center text-white px-6 text-center relative overflow-hidden`}>
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                    <svg viewBox="0 0 40 48" fill="none" className="w-12 h-14" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="36" height="44" rx="4" fill="white" fillOpacity="0.95" />
                      <path d="M24 2v10h10" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <rect x="8" y="16" width="24" height="2.5" rx="1.25" fill="rgba(0,0,0,0.25)" />
                      <rect x="8" y="22" width="18" height="2" rx="1" fill="rgba(0,0,0,0.2)" />
                      <rect x="8" y="28" width="21" height="2" rx="1" fill="rgba(0,0,0,0.18)" />
                      <rect x="8" y="34" width="14" height="2" rx="1" fill="rgba(0,0,0,0.12)" />
                    </svg>
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm border border-white/30 tracking-wider uppercase">
                    {post.category} Guide
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile TOC accordion */}
        {tocItems.length > 0 && (
          <div className="lg:hidden container mx-auto px-4 max-w-6xl mb-6">
            <div className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] overflow-hidden shadow-sm">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))] transition-colors"
                aria-expanded={tocOpen}
              >
                <span className="flex items-center gap-2">
                  <List className="w-4 h-4 text-[hsl(var(--color-primary))]" />
                  Table of Contents
                  <span className="text-xs font-normal text-[hsl(var(--color-muted-foreground))]">({tocItems.length} sections)</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-[hsl(var(--color-muted-foreground))] transition-transform duration-200 ${tocOpen ? 'rotate-180' : ''}`} />
              </button>
              {tocOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[hsl(var(--color-border))]">
                  {tocNav}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main: Article + Desktop TOC sidebar */}
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex gap-10 items-start">

            {/* Article body */}
            <article className="flex-1 min-w-0 py-2">
              <div className="space-y-0">
                {blocks.map((block, index) => renderBlock(block, index))}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-6 border-t border-[hsl(var(--color-border))] flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[hsl(var(--color-muted-foreground))] mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <span key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))] font-medium hover:bg-[hsl(var(--color-primary)/0.1)] hover:text-[hsl(var(--color-primary))] transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* FAQ Accordion Section */}
              {hasFaq && post.faq && post.faq.length > 0 && (
                <section
                  id="faq-section"
                  className="mt-14 scroll-mt-28"
                  itemScope
                  itemType="https://schema.org/FAQPage"
                >
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[hsl(var(--color-border))]">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--color-primary)/0.12)] text-[hsl(var(--color-primary))] flex items-center justify-center font-bold text-sm">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight">
                        Frequently Asked Questions
                      </h2>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-0.5">
                        Helpful answers related to this article and workflow
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {post.faq.map((item, idx) => {
                      const isOpen = openFaqSet.has(idx);
                      return (
                        <div
                          key={idx}
                          className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? 'border-[hsl(var(--color-primary)/0.4)] bg-[hsl(var(--color-card))] shadow-sm'
                              : 'border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:border-[hsl(var(--color-primary)/0.3)]'
                          }`}
                          itemScope
                          itemProp="mainEntity"
                          itemType="https://schema.org/Question"
                        >
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-base md:text-lg text-[hsl(var(--color-foreground))] hover:text-[hsl(var(--color-primary))] transition-colors"
                            aria-expanded={isOpen}
                          >
                            <span itemProp="name" className="leading-snug">{item.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 flex-shrink-0 text-[hsl(var(--color-muted-foreground))] transition-transform duration-200 ${
                                isOpen ? 'rotate-180 text-[hsl(var(--color-primary))]' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div
                              className="px-5 pb-5 pt-1 text-sm md:text-base leading-relaxed text-[hsl(var(--color-muted-foreground))] border-t border-[hsl(var(--color-border)/0.6)]"
                              itemScope
                              itemProp="acceptedAnswer"
                              itemType="https://schema.org/Answer"
                            >
                              <p itemProp="text">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* CTA Banner */}
              <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary)/0.15)] via-[hsl(var(--color-card))] to-[hsl(var(--color-accent)/0.15)] border border-[hsl(var(--color-border))] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    Ready to try our 100% Private PDF Tools?
                  </h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    No file uploads, no watermarks, and no signups required. Everything processes directly in your browser.
                  </p>
                </div>
                <Link href={`/${locale}/tools`}
                  className="px-6 py-3 rounded-xl bg-[hsl(var(--color-primary))] text-white font-semibold text-sm hover:opacity-90 transition-all shadow-md flex-shrink-0">
                  Open Free PDF Tools
                </Link>
              </div>
            </article>

            {/* Desktop sticky TOC sidebar */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block w-60 xl:w-72 flex-shrink-0">
                <div className="sticky top-24 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[hsl(var(--color-border))]">
                    <List className="w-4 h-4 text-[hsl(var(--color-primary))]" />
                    <span className="text-sm font-bold text-[hsl(var(--color-foreground))]">Table of Contents</span>
                  </div>
                  {tocNav}
                  <div className="mt-4 pt-3 border-t border-[hsl(var(--color-border))]">
                    <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                      {tocItems.findIndex(t => t.id === activeId) + 1 || 0} / {tocItems.length} sections
                    </span>
                  </div>
                </div>
              </aside>
            )}

          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto px-4 max-w-6xl mt-16 pt-12 border-t border-[hsl(var(--color-border))]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Related Articles</h2>
              <Link href={`/${locale}/blog`} className="text-xs font-semibold text-[hsl(var(--color-primary))] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div key={rel.slug}
                  className="p-6 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:shadow-md hover:border-[hsl(var(--color-primary)/0.3)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[hsl(var(--color-primary))] font-semibold uppercase tracking-wider mb-2">{rel.category}</div>
                    <h3 className="text-lg font-bold mb-2">
                      <Link href={`/${locale}/blog/${rel.slug}`} className="hover:text-[hsl(var(--color-primary))]">{rel.title}</Link>
                    </h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))] line-clamp-2 mb-4">{rel.description}</p>
                  </div>
                  <Link href={`/${locale}/blog/${rel.slug}`}
                    className="text-xs font-semibold text-[hsl(var(--color-primary))] flex items-center gap-1 mt-auto">
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
