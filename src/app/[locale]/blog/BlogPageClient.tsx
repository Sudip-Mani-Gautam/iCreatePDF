'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Calendar, 
  Clock, 
  Search, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Filter 
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';
import { getAllBlogPosts, getBlogCategories } from '@/config/blog-posts';

interface BlogPageClientProps {
  locale: Locale;
}

export default function BlogPageClient({ locale }: BlogPageClientProps) {
  const tCommon = useTranslations('common');
  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const categories = useMemo(() => ['All', ...getBlogCategories()], []);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return allPosts.find((p) => p.featured) || allPosts[0];
  }, [allPosts]);

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-22 md:pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4 pb-10 border-b border-[hsl(var(--color-border))/0.4] bg-gradient-to-b from-[hsl(var(--color-primary)/0.05)] to-transparent">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Updated Daily with Tutorials & Guides</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                {tCommon('brand')} Knowledge & Blog
              </h1>
              <p className="text-lg text-[hsl(var(--color-muted-foreground))]">
                Daily guides, step-by-step tutorials, and industry insights on PDF workflows, privacy, and document productivity.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--color-muted-foreground))]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, keywords, topics..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))] transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[hsl(var(--color-primary))] text-white shadow-sm'
                      : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-border))]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <section className="container mx-auto px-4 max-w-6xl mt-12 mb-12">
            <div className="rounded-xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] overflow-hidden flex flex-col md:flex-row shadow-sm">
                {/* Left: Text content (75%) */}
                <div className="flex-1 p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[hsl(var(--color-primary))] text-white">
                      Featured
                    </span>
                    <span className="text-xs text-[hsl(var(--color-muted-foreground))] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readingTime}
                    </span>
                    <span className="text-xs text-[hsl(var(--color-muted-foreground))] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishedAt}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] hover:text-[hsl(var(--color-primary))] transition-colors">
                    <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-[hsl(var(--color-muted-foreground))] leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-[hsl(var(--color-muted-foreground))]">
                      By <span className="font-semibold text-[hsl(var(--color-foreground))]">{featuredPost.author.name}</span>
                    </div>
                    <Link
                      href={`/${locale}/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--color-primary))] hover:gap-2.5 transition-all"
                    >
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: Featured image panel (~38%) */}
                <div className={`hidden md:flex md:w-[38%] flex-shrink-0 bg-gradient-to-br ${featuredPost.coverGradient || 'from-indigo-500 to-blue-700'} items-center justify-center relative overflow-hidden`}>
                  {/* Background decorative shapes */}
                  <div className="absolute inset-0">
                    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
                    <div className="absolute -bottom-12 -left-8 w-56 h-56 rounded-full bg-white/8" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/5" />
                  </div>
                  {/* Stacked paper effect */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="w-20 h-26 bg-white/15 rounded-lg rotate-[-8deg] absolute -left-3 -top-2" />
                    <div className="w-20 h-26 bg-white/20 rounded-lg rotate-[4deg] absolute left-1 top-1" />
                  </div>
                  {/* Main content */}
                  <div className="relative z-10 flex flex-col items-center gap-4 px-8 py-10 text-center">
                    <div className="w-20 h-24 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/40 shadow-2xl">
                      <svg viewBox="0 0 40 48" fill="none" className="w-12 h-14" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="36" height="44" rx="4" fill="white" fillOpacity="0.95" />
                        <path d="M24 2v10h10" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <rect x="8" y="16" width="24" height="2.5" rx="1.25" fill="rgba(0,0,0,0.25)" />
                        <rect x="8" y="22" width="18" height="2" rx="1" fill="rgba(0,0,0,0.2)" />
                        <rect x="8" y="28" width="21" height="2" rx="1" fill="rgba(0,0,0,0.18)" />
                        <rect x="8" y="34" width="14" height="2" rx="1" fill="rgba(0,0,0,0.12)" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-white/60 text-[10px] font-medium uppercase tracking-widest mb-1">Category</span>
                      <span className="text-white text-sm font-bold tracking-wide">
                        {featuredPost.category}
                      </span>
                    </div>
                    <div className="w-12 h-0.5 bg-white/30 rounded-full" />
                    <span className="text-white/70 text-xs">{featuredPost.readingTime}</span>
                  </div>
                </div>
              </div>
            </section>
        )}


        {/* Posts Grid */}
        <section className="container mx-auto px-4 max-w-6xl mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {selectedCategory === 'All' ? 'Latest Posts' : `${selectedCategory} Articles`}
            </h2>
            <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 px-4 border border-dashed border-[hsl(var(--color-border))] rounded-2xl bg-[hsl(var(--color-card))]">
              <BookOpen className="w-12 h-12 mx-auto text-[hsl(var(--color-muted-foreground))] mb-3 opacity-60" />
              <h3 className="text-lg font-semibold mb-1">No articles found</h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                Try searching with different terms or selecting another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg bg-[hsl(var(--color-primary))] text-white text-xs font-semibold hover:opacity-90"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] overflow-hidden hover:shadow-lg hover:border-[hsl(var(--color-primary)/0.4)] transition-all duration-200 group"
                >
                  {/* Card thumbnail header */}
                  <div className={`relative h-52 bg-gradient-to-br ${post.coverGradient || 'from-indigo-500 to-blue-700'} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                    {/* BG circles */}
                    <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
                    <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/10" />
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5" />
                    {/* Doc icon */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-20 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                        <svg viewBox="0 0 40 48" fill="none" className="w-10 h-12" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="36" height="44" rx="4" fill="white" fillOpacity="0.95" />
                          <path d="M24 2v10h10" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                          <rect x="8" y="17" width="24" height="2" rx="1" fill="rgba(0,0,0,0.2)" />
                          <rect x="8" y="23" width="18" height="2" rx="1" fill="rgba(0,0,0,0.15)" />
                          <rect x="8" y="29" width="20" height="2" rx="1" fill="rgba(0,0,0,0.15)" />
                          <rect x="8" y="35" width="13" height="2" rx="1" fill="rgba(0,0,0,0.1)" />
                        </svg>
                      </div>
                      <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">{post.category}</span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs text-[hsl(var(--color-muted-foreground))] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                      <span className="text-xs text-[hsl(var(--color-muted-foreground))] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.publishedAt}
                      </span>
                    </div>

                    <h3 className="text-base font-bold tracking-tight text-[hsl(var(--color-foreground))] group-hover:text-[hsl(var(--color-primary))] transition-colors mb-2 leading-snug">
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed line-clamp-2 mb-3 flex-1">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--color-muted)/0.6)] text-[hsl(var(--color-muted-foreground))]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[hsl(var(--color-border))/0.6] flex items-center justify-between mt-auto">
                      <div className="text-xs text-[hsl(var(--color-muted-foreground))]">
                        By <span className="font-medium text-[hsl(var(--color-foreground))]">{post.author.name.split(' ')[0]}</span>
                      </div>
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="text-xs font-semibold text-[hsl(var(--color-primary))] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Daily Updates Callout */}
        <section className="container mx-auto px-4 max-w-6xl mt-16">
          <div className="rounded-2xl p-8 bg-gradient-to-r from-[hsl(var(--color-primary)/0.1)] via-[hsl(var(--color-card))] to-[hsl(var(--color-accent)/0.1)] border border-[hsl(var(--color-border))] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Write & Publish Daily with iCreatePDF</h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] max-w-xl">
                Bookmark this page to get fresh daily tutorials, productivity hacks, and file security guidelines. All tools are 100% free with no signup needed.
              </p>
            </div>
            <Link
              href={`/${locale}/tools`}
              className="px-6 py-3 rounded-xl bg-[hsl(var(--color-primary))] text-white font-semibold text-sm hover:opacity-90 transition-all shadow-md flex-shrink-0"
            >
              Explore All 67+ Tools
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
