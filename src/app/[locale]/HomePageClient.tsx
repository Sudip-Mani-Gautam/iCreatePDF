'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Search, 
  X, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Zap, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllTools } from '@/config/tools';
import { getToolIcon } from '@/config/icons';
import { type Locale } from '@/lib/i18n/config';
import { Tool, ToolCategory } from '@/types/tool';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

type FilterCategory = 'all' | 'organize' | 'optimize' | 'convert' | 'edit' | 'security';

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const tHome = useTranslations('home');
  const tCommon = useTranslations('common');
  const allTools = useMemo(() => getAllTools(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  // Filter tools based on category pill and search query
  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      // Category match
      let matchesCategory = true;
      if (activeCategory === 'organize') {
        matchesCategory = tool.category === 'organize-manage';
      } else if (activeCategory === 'optimize') {
        matchesCategory = tool.category === 'optimize-repair';
      } else if (activeCategory === 'convert') {
        matchesCategory = tool.category === 'convert-to-pdf' || tool.category === 'convert-from-pdf';
      } else if (activeCategory === 'edit') {
        matchesCategory = tool.category === 'edit-annotate';
      } else if (activeCategory === 'security') {
        matchesCategory = tool.category === 'secure-pdf';
      }

      // Search match
      const localized = localizedToolContent?.[tool.id];
      const title = localized?.title || tool.slug;
      const desc = localized?.description || '';
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        query === '' ||
        title.toLowerCase().includes(query) ||
        desc.toLowerCase().includes(query) ||
        tool.slug.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [allTools, activeCategory, searchQuery, localizedToolContent]);

  // Priority curated tools to showcase like the screenshot
  const priorityOrder = [
    'merge-pdf', 'split-pdf', 'remove-pages', 'extract-pages', 'organize-pdf',
    'scan-pdf', 'compress-pdf', 'repair-pdf', 'ocr-pdf', 'jpg-to-pdf',
    'word-to-pdf', 'powerpoint-to-pdf', 'excel-to-pdf', 'html-to-pdf', 'pdf-to-jpg',
    'pdf-to-word', 'pdf-to-powerpoint', 'pdf-to-excel', 'pdf-to-pdfa', 'rotate-pdf',
    'page-numbers', 'watermark', 'crop-pdf', 'edit-pdf', 'fill-form',
    'unlock-pdf', 'protect-pdf', 'sign-pdf', 'redact-pdf', 'compare-pdf',
    'pdf-multi-tool', 'alternate-merge', 'extract-images', 'grayscale-pdf', 'flatten-pdf'
  ];

  // Sort tools to match screenshot order when on 'all'
  const displayTools = useMemo(() => {
    if (activeCategory !== 'all' || searchQuery.trim() !== '') {
      return filteredTools;
    }
    return [...filteredTools].sort((a, b) => {
      const indexA = priorityOrder.indexOf(a.id);
      const indexB = priorityOrder.indexOf(b.id);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  }, [filteredTools, activeCategory, searchQuery]);

  const categoriesList: { id: FilterCategory; label: string }[] = useMemo(() => [
    { id: 'all', label: tCommon('navigation.tools') || 'All Tools' },
    { id: 'organize', label: tHome('categories.organizeManage') || 'Organize' },
    { id: 'optimize', label: tHome('categories.optimizeRepair') || 'Optimize' },
    { id: 'convert', label: tHome('categories.convertToPdf') || 'Convert' },
    { id: 'edit', label: tHome('categories.editAnnotate') || 'Edit' },
    { id: 'security', label: tHome('categories.securePdf') || 'Security' },
  ], [tCommon, tHome]);

  const testimonials = [
    {
      quote: "The fastest and safest PDF editor I've ever used. All processing occurs locally without risking confidential client documents.",
      author: 'Sarah Jenkins',
      role: 'Security Auditor',
      initials: 'SJ',
      color: 'bg-rose-100 text-rose-600',
    },
    {
      quote: "100 percent offline processing. Our sensitive legal audits never leave our local memory. Zero uploads and total speed.",
      author: 'Michael Davis',
      role: 'Compliance Officer',
      initials: 'MD',
      color: 'bg-red-100 text-red-600',
    },
    {
      quote: "Eliminated expensive recurring subscription costs for our entire team. Merge, compress, and sign files instantly.",
      author: 'Emily Duran',
      role: 'Project Manager',
      initials: 'ED',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      quote: "The visual batch workflows and zero-server architecture saved our engineering team dozens of hours every month.",
      author: 'David Chen',
      role: 'Operations Director',
      initials: 'DC',
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-12 text-center">
          {/* Subtle warm backdrop glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-red-100/40 via-rose-50/20 to-transparent dark:from-red-950/20 dark:via-rose-950/10 blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              {locale === 'en' ? (
                <>
                  Every PDF Tool You Need, <br />
                  <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                    Run Privately Offline
                  </span>
                </>
              ) : (
                <>
                  {tHome('hero.title') || 'Strumenti PDF professionali'} <br />
                  <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                    {tHome('features.privacy.title') || '100% Privato'}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-8">
              {locale === 'en'
                ? 'Process your files locally in your browser. No server uploads, no privacy risks. Complete speed and peace of mind.'
                : tHome('hero.subtitle') || tHome('features.privacy.description')}
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[hsl(var(--color-muted-foreground))]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'en' ? 'Search for tools (e.g., Merge, Protect, Compress)...' : `${tCommon('navigation.tools')}...`}
                className="w-full pl-11 pr-10 py-3.5 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-sm shadow-xs hover:shadow-md focus:shadow-md focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-[hsl(var(--color-muted-foreground))] text-[hsl(var(--color-foreground))]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] p-1 rounded-full cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
              {categoriesList.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-105'
                        : 'bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}

              <Link
                href={`/${locale}/tools`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 transition-colors border border-amber-200/60 dark:border-amber-800/40"
              >
                +{allTools.length - 12} {tCommon('navigation.tools') || 'More'}
              </Link>
            </div>
          </div>
        </section>

        {/* 5-Column Tools Grid Section */}
        <section className="container mx-auto px-4 max-w-7xl mt-4 mb-20">
          {displayTools.length === 0 ? (
            <div className="text-center py-20 bg-[hsl(var(--color-card))] rounded-3xl border border-dashed border-[hsl(var(--color-border))] max-w-xl mx-auto">
              <FileText className="w-12 h-12 text-[hsl(var(--color-muted-foreground))] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold mb-1">{tHome('popularTools.description') || 'No matching tools found'}</h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                {tCommon('buttons.clearAll') || 'Try searching for something else or reset your filter.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
              >
                {tCommon('buttons.reset') || 'Reset Filter'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayTools.map((tool) => {
                const IconComponent = getToolIcon(tool.id);
                const localized = localizedToolContent?.[tool.id];
                const toolName = localized?.title || tool.slug;
                const description = localized?.description || '';
                const isPopular = ['merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-word', 'word-to-pdf', 'edit-pdf', 'sign-pdf', 'protect-pdf', 'jpg-to-pdf', 'ocr-pdf'].includes(tool.id);
                const isAI = ['ocr-pdf', 'summarize-pdf'].includes(tool.id);

                return (
                  <Link
                    key={tool.id}
                    href={`/${locale}/tools/${tool.slug}`}
                    className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-red-300 dark:hover:border-red-900 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <div>
                      {/* Top icon and badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        {isPopular && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400">
                            {tHome('popularTools.badge') || 'Hot'}
                          </span>
                        )}
                        {isAI && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                            AI
                          </span>
                        )}
                      </div>

                      {/* Tool Title */}
                      <h3 className="font-bold text-[15px] leading-snug text-[hsl(var(--color-foreground))] group-hover:text-red-600 transition-colors mb-1.5 line-clamp-1">
                        {toolName}
                      </h3>

                      {/* Tool Short Description */}
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] line-clamp-2 leading-relaxed mb-4">
                        {description}
                      </p>
                    </div>

                    {/* Bottom Action Arrow */}
                    <div className="pt-2 flex items-center justify-between text-[hsl(var(--color-muted-foreground))] group-hover:text-red-600 transition-colors border-t border-[hsl(var(--color-border)/0.6)] mt-auto">
                      <span className="text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {tCommon('buttons.process') || 'Use Tool'}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Loved by Millions (Testimonials Section) */}
        <section className="py-16 bg-[hsl(var(--color-muted)/0.4)] border-y border-[hsl(var(--color-border))]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--color-foreground))] tracking-tight mb-3">
                {tHome('popularTools.title') || 'Loved by Millions'}
              </h2>
              <p className="text-sm sm:text-base text-[hsl(var(--color-muted-foreground))]">
                {tHome('popularTools.description') || 'See why users choose iCreatePDF for secure offline editing'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex gap-1 text-amber-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-[hsl(var(--color-foreground))] leading-relaxed italic mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[hsl(var(--color-border))]">
                    <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[hsl(var(--color-foreground))] leading-tight">
                        {item.author}
                      </div>
                      <div className="text-[11px] text-[hsl(var(--color-muted-foreground))]">
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Pillars: 100% Client-Side */}
        <section className="py-20 container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[hsl(var(--color-foreground))] mb-1.5">
                  {tHome('features.privacy.title') || '100% Private & Client-Side'}
                </h3>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  {tHome('features.privacy.description') || 'All operations run in your browser sandbox using WebAssembly. Files never touch any remote server.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[hsl(var(--color-foreground))] mb-1.5">
                  {tHome('features.powerful.title') || 'Lightning Fast Performance'}
                </h3>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  {tHome('features.powerful.description') || 'No waiting for network uploads or downloads. Instant file manipulation powered by your device.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[hsl(var(--color-foreground))] mb-1.5">
                  {tHome('features.free.title') || 'Completely Free & Open'}
                </h3>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  {tHome('features.free.description') || 'No subscriptions, watermarks, or account registration required. Open source under GNU AGPLv3.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
