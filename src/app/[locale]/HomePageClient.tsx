'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations, useMessages } from 'next-intl';
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
import { WorkflowShowcase } from '@/components/workflow';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { getAllTools } from '@/config/tools';
import { getToolIcon } from '@/config/icons';
import { type Locale } from '@/lib/i18n/config';
import { Tool, ToolCategory } from '@/types/tool';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

type FilterCategory = 'all' | 'organize' | 'optimize' | 'convert' | 'edit' | 'security' | 'ai';

export const CATEGORY_CARD_THEMES: Record<
  ToolCategory,
  {
    iconBg: string;
    iconColor: string;
    hoverBorder: string;
    hoverTitle: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  'organize-manage': {
    iconBg: 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
    hoverBorder: 'hover:border-rose-400/70 dark:hover:border-rose-700/70',
    hoverTitle: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/80',
    badgeText: 'text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/50',
  },
  'optimize-repair': {
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBorder: 'hover:border-emerald-400/70 dark:hover:border-emerald-700/70',
    hoverTitle: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    badgeText: 'text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50',
  },
  'convert-to-pdf': {
    iconBg: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    hoverBorder: 'hover:border-blue-400/70 dark:hover:border-blue-700/70',
    hoverTitle: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/80',
    badgeText: 'text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50',
  },
  'convert-from-pdf': {
    iconBg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    hoverBorder: 'hover:border-amber-400/70 dark:hover:border-amber-700/70',
    hoverTitle: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/80',
    badgeText: 'text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50',
  },
  'edit-annotate': {
    iconBg: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
    hoverBorder: 'hover:border-purple-400/70 dark:hover:border-purple-700/70',
    hoverTitle: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/80',
    badgeText: 'text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/50',
  },
  'secure-pdf': {
    iconBg: 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/40',
    iconColor: 'text-teal-600 dark:text-teal-400',
    hoverBorder: 'hover:border-teal-400/70 dark:hover:border-teal-700/70',
    hoverTitle: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/80',
    badgeText: 'text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/50',
  },
};

// Core high-demand most popular tools
const TOP_POPULAR_IDS = new Set([
  'merge-pdf',
  'compress-pdf',
  'split-pdf',
  'pdf-to-docx',
  'jpg-to-pdf',
  'word-to-pdf',
  'edit-pdf',
  'pdf-to-jpg',
  'ocr-pdf',
  'sign-pdf',
]);

// AI & Advanced tools
const AI_TOOL_IDS = new Set([
  'ocr-pdf',
  'ai-pdf-reflower',
  'citation-linker',
  'vector-extractor',
  'deep-sanitize',
  'booklet-folding-simulator',
  'pdf-to-slide',
  'form-logic-designer',
  'eink-optimizer',
  'cert-cryptor',
  'passport-id-composer',
  'annotation-exporter',
  'batch-watermark-remover',
  'smart-data-redactor',
  'bookmarks-auto-generator',
  'batch-barcode-injector',
  'signature-ink-optimizer',
  'dead-link-debugger',
  'interactive-toc-generator',
  'global-invoice-parser',
  'pdf-deskew-aligner',
  'pdf-two-column-reflower',
  'pdf-page-resizer-uniform',
  'handwriting-ink-contrast-booster',
  'pdf-spine-bookbinder',
  'pdf-signature-anchor-helper',
  'pdf-lossless-slicer',
  'pdf-scratchpad-canvas',
  'photo-tiling-prepress',
]);

// Market-demand practical ordering requested by user
const MARKET_DEMAND_TOOL_ORDER: string[] = [
  // Tier 1 — Core high-demand tools
  'merge-pdf',
  'compress-pdf',
  'split-pdf',
  'pdf-to-docx',
  'jpg-to-pdf',
  'word-to-pdf',
  'edit-pdf',
  'pdf-to-jpg',
  'ocr-pdf',
  'sign-pdf',
  'organize-pdf',
  'extract-pages',
  'excel-to-pdf',
  'pdf-to-excel',
  'rotate-pdf',
  'delete-pages',
  'add-watermark',
  'encrypt-pdf',
  'redact-pdf',
  'page-numbers',

  // Tier 2 — Very useful/common tools
  'image-to-pdf',
  'pdf-to-pptx',
  'pptx-to-pdf',
  'pdf-to-png',
  'png-to-pdf',
  'crop-pdf',
  'repair-pdf',
  'form-filler',
  'remove-blank-pages',
  'flatten-pdf',
  'add-blank-page',
  'reverse-pages',
  'pdf-multi-tool',
  'add-stamps',
  'remove-annotations',
  'edit-metadata',
  'remove-metadata',
  'compare-pdfs',
  'pdf-reader',
  'extract-images',

  // Tier 3 — Specialized conversion tools
  'webp-to-pdf',
  'heic-to-pdf',
  'svg-to-pdf',
  'tiff-to-pdf',
  'bmp-to-pdf',
  'txt-to-pdf',
  'markdown-to-pdf',
  'json-to-pdf',
  'rtf-to-pdf',
  'epub-to-pdf',
  'mobi-to-pdf',
  'djvu-to-pdf',
  'fb2-to-pdf',
  'psd-to-pdf',
  'xps-to-pdf',
  'pdf-to-webp',
  'pdf-to-tiff',
  'pdf-to-bmp',
  'pdf-to-svg',
  'pdf-to-markdown',

  // Tier 4 — Advanced PDF utilities
  'pdf-to-pdfa',
  'pdf-to-greyscale',
  'deskew-pdf',
  'rasterize-pdf',
  'sanitize-pdf',
  'linearize-pdf',
  'fix-page-size',
  'page-dimensions',
  'n-up-pdf',
  'overlay-pdf',
  'add-page-labels',
  'view-metadata',
  'change-permissions',
  'decrypt-pdf',
  'remove-restrictions',
  'digital-sign-pdf',
  'validate-signature',
  'timestamp-pdf',
  'pdf-booklet',
  'posterize-pdf',

  // Tier 5 — Niche / advanced features
  'extract-tables',
  'pdf-to-json',
  'pdf-to-slide',
  'bookmarks-auto-generator',
  'interactive-toc-generator',
  'table-of-contents',
  'bookmark',
  'add-attachments',
  'extract-attachments',
  'edit-attachments',
  'divide-pages',
  'combine-single-page',
  'grid-combine',
  'alternate-merge',
  'pdf-to-zip',
  'email-to-pdf',
  'cbz-to-pdf',
  'pdf-to-cbz',
  'font-to-outline',
  'ocg-manager',

  // AI & Experimental tools
  'ai-pdf-reflower',
  'citation-linker',
  'vector-extractor',
  'deep-sanitize',
  'booklet-folding-simulator',
  'form-logic-designer',
  'eink-optimizer',
  'cert-cryptor',
  'passport-id-composer',
  'annotation-exporter',
  'batch-watermark-remover',
  'smart-data-redactor',
  'batch-barcode-injector',
  'signature-ink-optimizer',
  'dead-link-debugger',
  'global-invoice-parser',
  'pdf-deskew-aligner',
  'pdf-two-column-reflower',
  'pdf-page-resizer-uniform',
  'handwriting-ink-contrast-booster',
  'pdf-spine-bookbinder',
  'pdf-signature-anchor-helper',
  'pdf-lossless-slicer',
  'pdf-scratchpad-canvas',
  'photo-tiling-prepress',

  // Additional utilities
  'header-footer',
  'invert-colors',
  'background-color',
  'text-color',
  'form-creator',
  'rotate-custom',
  'find-and-redact',
];

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const messages = useMessages();
  const tHome = useTranslations('home');
  const tCommon = useTranslations('common');
  const tTools = useTranslations('toolsPage');
  const allTools = useMemo(() => getAllTools(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const searchPlaceholder = (() => {
    try {
      const text = tTools('searchPlaceholder');
      if (text && !text.includes('toolsPage.searchPlaceholder') && !text.includes('searchPlaceholder')) {
        return text;
      }
    } catch { }
    return locale === 'ne'
      ? 'उपकरणहरू खोज्नुहोस् (जस्तै: मर्ज, कम्प्रेस, हस्ताक्षर)...'
      : locale === 'hi'
        ? 'टूल्स खोजें (जैसे: मर्ज, कंप्रेस, साइन)...'
        : locale === 'ms'
          ? 'Cari alatan (cth: gabung, mampat, tandatangan)...'
          : 'Search for tools (e.g., merge, compress, sign)...';
  })();

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
      } else if (activeCategory === 'ai') {
        matchesCategory = AI_TOOL_IDS.has(tool.id);
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

  // Sort tools to match market-demand ranking when on 'all'
  const displayTools = useMemo(() => {
    if (activeCategory !== 'all' || searchQuery.trim() !== '') {
      return filteredTools;
    }
    return [...filteredTools].sort((a, b) => {
      const indexA = MARKET_DEMAND_TOOL_ORDER.indexOf(a.id);
      const indexB = MARKET_DEMAND_TOOL_ORDER.indexOf(b.id);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  }, [filteredTools, activeCategory, searchQuery]);

  const categoriesList: { id: FilterCategory; label: string; activeColor: string }[] = useMemo(() => [
    { id: 'all', label: tCommon('navigation.tools') || 'All Tools', activeColor: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' },
    { id: 'organize', label: tHome('categories.organizeManage') || 'Organize', activeColor: 'bg-rose-600 text-white shadow-md shadow-rose-500/25' },
    { id: 'optimize', label: tHome('categories.optimizeRepair') || 'Optimize', activeColor: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25' },
    { id: 'convert', label: tHome('categories.convertToPdf') || 'Convert', activeColor: 'bg-blue-600 text-white shadow-md shadow-blue-500/25' },
    { id: 'edit', label: tHome('categories.editAnnotate') || 'Edit', activeColor: 'bg-purple-600 text-white shadow-md shadow-purple-500/25' },
    { id: 'security', label: tHome('categories.securePdf') || 'Security', activeColor: 'bg-teal-600 text-white shadow-md shadow-teal-500/25' },
    { id: 'ai', label: 'AI & Advanced', activeColor: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25' },
  ], [tCommon, tHome]);

  return (
    <div suppressHydrationWarning className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-1 pb-2 text-center">
          {/* Subtle warm backdrop glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-red-100/40 via-rose-50/20 to-transparent dark:from-red-950/20 dark:via-rose-950/10 blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-2.5">
              {locale === 'en' ? (
                <>
                  Every PDF Tool You Need, <br />
                  <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                    Run Privately On Your Browser
                  </span>
                </>
              ) : (
                <>
                  {tHome('hero.title')} <br />
                  <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                    {tHome('hero.highlight') || tHome('features.privacy.title')}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-3xl lg:max-w-4xl mx-auto leading-relaxed mb-4.5 md:whitespace-nowrap">
              {locale === 'en'
                ? 'Process your files locally in your browser. Complete speed and peace of mind.'
                : (tHome('hero.subtitle') || tHome('features.privacy.description'))}
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto mb-3.5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[hsl(var(--color-muted-foreground))]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-sm shadow-xs hover:shadow-md focus:shadow-md focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-[hsl(var(--color-muted-foreground))] text-[hsl(var(--color-foreground))]"
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
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto">
              {categoriesList.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${isActive
                      ? `${cat.activeColor} scale-105`
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
                +{allTools.length - 12} {tCommon('buttons.more') || 'More'}
              </Link>
            </div>
          </div>
        </section>

        {/* 5-Column Tools Grid Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 mt-2 mb-16">
          {displayTools.length === 0 ? (
            <div className="text-center py-20 bg-[hsl(var(--color-card))] rounded-3xl border border-dashed border-[hsl(var(--color-border))] max-w-xl mx-auto">
              <FileText className="w-12 h-12 text-[hsl(var(--color-muted-foreground))] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold mb-1">
                {locale === 'ne' ? 'कुनै मिल्दो उपकरण फेला परेन' : locale === 'hi' ? 'कोई मेल खाता टूल नहीं मिला' : locale === 'ms' ? 'Tiada alatan sepadan ditemui' : (tHome('popularTools.description') || 'No matching tools found')}
              </h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                {locale === 'ne' ? 'कृपया अन्य शब्द खोजी हेर्नुहोस् वा फिल्टर रिसेट गर्नुहोस्।' : locale === 'hi' ? 'कृपया कुछ और खोजें या अपना फ़िल्टर रीसेट करें।' : locale === 'ms' ? 'Cuba cari kata kunci lain atau set semula penapis anda.' : (tCommon('buttons.clearAll') || 'Try searching for something else or reset your filter.')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
              >
                {locale === 'ne' ? 'फिल्टर रिसेट गर्नुहोस्' : locale === 'hi' ? 'फ़िल्टर रीसेट करें' : locale === 'ms' ? 'Set Semula Penapis' : (tCommon('buttons.reset') || 'Reset Filter')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {displayTools.map((tool) => {
                const IconComponent = getToolIcon(tool.icon || tool.id);
                const localized = localizedToolContent?.[tool.id];
                const toolName = localized?.title || tool.slug;
                const description = localized?.description || '';
                const isPopular = TOP_POPULAR_IDS.has(tool.id);
                const isAI = AI_TOOL_IDS.has(tool.id);
                const theme = CATEGORY_CARD_THEMES[tool.category] || CATEGORY_CARD_THEMES['edit-annotate'];

                return (
                  <Link
                    key={tool.id}
                    href={`/${locale}/tools/${tool.slug}`}
                    className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] ${theme.hoverBorder} shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer min-h-[225px]`}
                  >
                    <div>
                      {/* Top icon and badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${theme.iconBg}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isPopular && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText}`}>
                              {tHome('popularTools.badge') || 'MOST POPULAR'}
                            </span>
                          )}
                          {isAI && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-700 dark:text-pink-300 border border-purple-200/60 dark:border-purple-800/40">
                              AI
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Tool Title */}
                      <h3 className={`font-bold text-[16px] leading-snug text-[hsl(var(--color-foreground))] ${theme.hoverTitle} transition-colors mb-2 line-clamp-1`}>
                        {toolName}
                      </h3>

                      {/* Tool Short Description */}
                      <p className="text-[13px] text-[hsl(var(--color-muted-foreground))] line-clamp-3 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    {/* Bottom Action Arrow */}
                    <div className={`pt-2 flex items-center justify-end text-[hsl(var(--color-muted-foreground))] ${theme.hoverTitle} transition-colors mt-auto`}>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Visual Workflow Automation Section */}
        <WorkflowShowcase locale={locale} />

        {/* Dynamic Global Testimonials Section */}
        <TestimonialsSection locale={locale} />

        {/* Feature Pillars: 100% Client-Side */}
        <section className="py-20 w-full max-w-[1440px] mx-auto px-6">
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
