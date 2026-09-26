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
  const t = useTranslations();
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
      const title = localized?.title || tool.id.replace(/-/g, ' ');
      const desc = localized?.description || tool.features.join(' ');
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

  const categoriesList: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'organize', label: 'Organize' },
    { id: 'optimize', label: 'Optimize' },
    { id: 'convert', label: 'Convert' },
    { id: 'edit', label: 'Edit' },
    { id: 'security', label: 'Security' },
  ];

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
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-12 text-center">
          {/* Subtle warm backdrop glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-red-100/40 via-rose-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.15] mb-4">
              Every PDF Tool You Need, <br />
              <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                Run Privately Offline
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Process your files locally in your browser. No server uploads, no privacy risks. Complete speed and peace of mind.
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tools (e.g., Merge, Protect, Compress)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm shadow-sm hover:shadow-md focus:shadow-md focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-zinc-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1 rounded-full"
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
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-105'
                        : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
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
                +{allTools.length - 12} More
              </Link>
            </div>
          </div>
        </section>

        {/* 5-Column Tools Grid Section */}
        <section className="container mx-auto px-4 max-w-7xl mt-4 mb-20">
          {displayTools.length === 0 ? (
            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 max-w-xl mx-auto">
              <FileText className="w-12 h-12 text-zinc-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold mb-1">No matching tools found</h3>
              <p className="text-sm text-zinc-500 mb-4">
                Try searching for something else or reset your filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-4.5">
              {displayTools.map((tool) => {
                const localized = localizedToolContent?.[tool.id];
                const toolName = localized?.title || tool.id
                  .split('-')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ');

                const description = localized?.description || tool.features.slice(0, 2).map((f) => f.replace(/-/g, ' ')).join(', ');
                const IconComponent = getToolIcon(tool.icon);

                // Highlight special badges
                const isAI = tool.id.includes('ai') || tool.id.includes('summarize');
                const isPro = tool.id.includes('translate') || tool.id.includes('ocr');

                return (
                  <Link
                    key={tool.id}
                    href={`/${locale}/tools/${tool.slug}`}
                    className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-red-300 dark:hover:border-red-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <div>
                      {/* Top icon and badge */}
                      <div className="flex items-start justify-between mb-3.5">
                        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-200 shadow-xs">
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {isAI && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            AI
                          </span>
                        )}
                        {isPro && !isAI && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            PRO
                          </span>
                        )}
                      </div>

                      {/* Tool Title */}
                      <h3 className="font-bold text-[15px] leading-snug text-zinc-900 dark:text-white group-hover:text-red-600 transition-colors mb-1.5 line-clamp-1">
                        {toolName}
                      </h3>

                      {/* Tool Short Description */}
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                        {description}
                      </p>
                    </div>

                    {/* Bottom Action Arrow */}
                    <div className="pt-2 flex items-center justify-between text-zinc-400 group-hover:text-red-600 transition-colors border-t border-zinc-100 dark:border-zinc-800/60 mt-auto">
                      <span className="text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Use Tool
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
        <section className="py-16 bg-zinc-50/70 dark:bg-zinc-900/40 border-y border-zinc-200/60 dark:border-zinc-800/60">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight mb-3">
                Loved by Millions
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                See why users choose iCreatePDF for secure offline editing
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex gap-1 text-amber-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed italic mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                        {item.author}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ready to Secure Your PDF Files (Red Gradient CTA Banner) */}
        <section className="container mx-auto px-4 max-w-5xl my-16">
          <div className="relative rounded-3xl p-8 sm:p-12 text-center text-white overflow-hidden shadow-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500">
            {/* Background subtle geometric rings */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:40px_40px]" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to secure your PDF files?
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                Get started instantly. No accounts required for offline basic conversion.
              </p>
              <div className="pt-4">
                <Link
                  href={`/${locale}/tools`}
                  className="inline-block px-8 py-3.5 rounded-full bg-white text-red-600 font-bold text-sm shadow-xl hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all"
                >
                  Explore All 80+ Tools Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
