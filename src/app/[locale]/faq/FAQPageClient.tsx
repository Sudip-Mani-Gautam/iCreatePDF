'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  Search, 
  X,
  HelpCircle, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Globe, 
  Mail, 
  Sparkles,
  Info,
  Wrench,
  FileText,
  Home,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';
import { FAQ_ITEMS, type FAQItem } from '@/config/faqs';

interface FAQPageClientProps {
  locale: Locale;
}

export default function FAQPageClient({ locale }: FAQPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(['general-what-is', 'privacy-server-upload', 'technical-works-offline'])
  );

  const categoryOptions = [
    { key: 'all', label: 'All Questions', icon: HelpCircle },
    { key: 'general', label: 'General', icon: Info },
    { key: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
    { key: 'features', label: 'Features & Tools', icon: Layers },
    { key: 'technical', label: 'Technical & Offline', icon: Cpu },
    { key: 'troubleshooting', label: 'Troubleshooting', icon: Wrench },
    { key: 'languages', label: 'Languages', icon: Globe },
  ];

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: FAQ_ITEMS.length };
    FAQ_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Quick highlight cards
  const highlightCards = [
    {
      icon: ShieldCheck,
      title: '100% Client-Side Privacy',
      desc: 'All operations execute locally via WebAssembly. Your files never leave your device.',
      badge: 'Zero Uploads',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
      icon: Cpu,
      title: 'Works Completely Offline',
      desc: 'Disconnect your internet or use in airplane mode. Zero dependence on remote servers.',
      badge: 'Offline Capable',
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400'
    },
    {
      icon: Sparkles,
      title: 'Free & Open Source',
      desc: 'Licensed under GNU AGPLv3. Free forever with no subscription fees, watermarks, or paywalls.',
      badge: 'AGPL-3.0',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400'
    }
  ];

  // Filter FAQs based on query & category
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FAQ_ITEMS.filter((faq) => {
      const matchesSearch =
        q === '' ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q) ||
        (faq.keywords && faq.keywords.some((kw) => kw.toLowerCase().includes(q)));

      const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredFaqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-6 pb-12 text-center">
          {/* Subtle warm backdrop glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-red-100/40 via-rose-50/20 to-transparent dark:from-red-950/20 dark:via-rose-950/10 blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            {/* Breadcrumb Navigation for SEO & UX */}
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-1.5 text-xs text-[hsl(var(--color-muted-foreground))]">
              <Link href={`/${locale}`} className="hover:text-[hsl(var(--color-foreground))] transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[hsl(var(--color-muted-foreground))/0.6]" />
              <span className="text-[hsl(var(--color-foreground))] font-medium">Help &amp; FAQ</span>
            </nav>

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200/60 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help Center &amp; Knowledge Base</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              Frequently Asked <br />
              <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-8">
              Everything you need to know about iCreatePDF, client-side zero-upload privacy, supported file formats, and offline editing capabilities.
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[hsl(var(--color-muted-foreground))]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., privacy, size limit, offline, compress)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-sm shadow-xs hover:shadow-md focus:shadow-md focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-[hsl(var(--color-muted-foreground))] text-[hsl(var(--color-foreground))]"
                aria-label="Search frequently asked questions"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] p-1 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto mb-10">
              {highlightCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-red-300 dark:hover:border-red-900/60 shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Category Filter Pills with Item Counts */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {categoryOptions.map((cat) => {
                const isActive = selectedCategory === cat.key;
                const Icon = cat.icon;
                const count = categoryCounts[cat.key] || 0;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-105'
                        : 'bg-[hsl(var(--color-card))] text-[hsl(var(--color-muted-foreground))] border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section with Microdata Markup */}
        <section 
          className="container mx-auto px-4 max-w-4xl mt-4 mb-20"
          itemScope 
          itemType="https://schema.org/FAQPage"
        >
          {/* Header row with count & expand/collapse buttons */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[hsl(var(--color-border))]">
            <div className="text-xs font-semibold text-[hsl(var(--color-muted-foreground))]">
              Showing <span className="text-[hsl(var(--color-foreground))] font-bold">{filteredFaqs.length}</span> question{filteredFaqs.length === 1 ? '' : 's'}
              {searchQuery && (
                <span> for &ldquo;{searchQuery}&rdquo;</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="text-xs font-bold text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 px-2.5 py-1 rounded-md hover:bg-[hsl(var(--color-muted))] transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-[hsl(var(--color-border))]">•</span>
              <button
                onClick={collapseAll}
                className="text-xs font-bold text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 px-2.5 py-1 rounded-md hover:bg-[hsl(var(--color-muted))] transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* List of Accordion Items */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-[hsl(var(--color-card))] rounded-3xl border border-dashed border-[hsl(var(--color-border))]">
              <HelpCircle className="w-12 h-12 text-[hsl(var(--color-muted-foreground))] mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-bold text-[hsl(var(--color-foreground))] mb-1">
                No matching questions found
              </h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4 max-w-sm mx-auto">
                We couldn&rsquo;t find any answer matching &ldquo;{searchQuery}&rdquo;. Try another term or contact our support team.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredFaqs.map((faq) => {
                const isOpen = expandedItems.has(faq.id);
                return (
                  <article
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-[hsl(var(--color-card))] border-red-300 dark:border-red-900/60 shadow-md'
                        : 'bg-[hsl(var(--color-card))] border-[hsl(var(--color-border))] hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                    }`}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60">
                          {faq.categoryLabel}
                        </span>
                        <h2 
                          className="font-bold text-base text-[hsl(var(--color-foreground))] leading-snug"
                          itemProp="name"
                        >
                          {faq.question}
                        </h2>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-red-600 text-white rotate-180'
                          : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div 
                        id={`faq-answer-${faq.id}`}
                        className="px-5 pb-5 pt-1 text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed border-t border-[hsl(var(--color-border)/0.6)] mt-1 animate-in fade-in duration-150"
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p itemProp="text">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Still Have Questions CTA Banner */}
        <section className="container mx-auto px-4 max-w-4xl my-12">
          <div className="relative rounded-3xl p-8 sm:p-10 text-center text-white overflow-hidden shadow-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500">
            {/* Subtle background glow */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:40px_40px]" />

            <div className="relative z-10 max-w-xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Still have questions?
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Can&rsquo;t find the answer you are looking for? Contact our community support team or explore our offline toolkit.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="px-6 py-3 rounded-full bg-white text-red-600 font-bold text-xs shadow-lg hover:bg-zinc-100 transition-all flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" /> Contact Us
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="px-6 py-3 rounded-full bg-red-700/80 hover:bg-red-800 text-white font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" /> Explore All 67+ Tools
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
