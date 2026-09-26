'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
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
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface FAQPageClientProps {
  locale: Locale;
}

interface FAQItem {
  id: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string;
}

export default function FAQPageClient({ locale }: FAQPageClientProps) {
  const t = useTranslations('faqPage');
  const tCommon = useTranslations('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['general-whatIs', 'privacy-uploaded']));

  // Helper to extract FAQ items
  const faqs: FAQItem[] = useMemo(() => {
    const rawFaqs = [
      {
        id: 'general-whatIs',
        category: 'general',
        categoryLabel: 'General',
        question: 'What is iCreatePDF?',
        answer: 'iCreatePDF is a free, privacy-first document suite that operates 100% locally within your web browser. With 67+ professional tools, you can merge, split, compress, edit, convert, and sign PDF documents without ever uploading your files to any remote server.',
      },
      {
        id: 'general-isFree',
        category: 'general',
        categoryLabel: 'General',
        question: 'Is iCreatePDF completely free to use?',
        answer: 'Yes, iCreatePDF is 100% free and open-source under the GNU AGPLv3 license. There are no paywalls, no forced subscriptions, and no hidden trial periods. All core tools are accessible to everyone unconditionally.',
      },
      {
        id: 'general-account',
        category: 'general',
        categoryLabel: 'General',
        question: 'Do I need to create an account or sign up?',
        answer: 'No registration or account is required. You can start editing, converting, or compressing your documents immediately upon opening the website.',
      },
      {
        id: 'privacy-uploaded',
        category: 'privacy',
        categoryLabel: 'Privacy & Security',
        question: 'Are my PDF files uploaded to your servers?',
        answer: 'Never. Unlike traditional online PDF converters, iCreatePDF processes your documents locally on your device using WebAssembly (Wasm) and HTML5 APIs. Your data never traverses the internet or touches our infrastructure.',
      },
      {
        id: 'privacy-safe',
        category: 'privacy',
        categoryLabel: 'Privacy & Security',
        question: 'Is it safe to process confidential and legal documents?',
        answer: 'Yes, absolutely. Because file bytes remain strictly inside your browser sandbox memory and are never transmitted over the network, iCreatePDF is ideal for confidential legal briefs, medical records, financial statements, and proprietary business documents.',
      },
      {
        id: 'privacy-storage',
        category: 'privacy',
        categoryLabel: 'Privacy & Security',
        question: 'What happens to my files after I close the browser?',
        answer: 'When you close the browser tab or finish processing, your browser automatically garbage-collects and flushes all allocated memory buffers. Zero trace remains on disk or in the cloud.',
      },
      {
        id: 'features-operations',
        category: 'features',
        categoryLabel: 'Features',
        question: 'What PDF tools and operations are available?',
        answer: 'iCreatePDF provides over 67+ tools including PDF Merge, Split, Lossless Compression, OCR text recognition, Image conversion (JPG, PNG, WebP), Office documents (Word, Excel, PowerPoint to PDF), Page reordering, Digital Signatures, Watermarking, AES-256 Encryption, and Redaction.',
      },
      {
        id: 'features-merge',
        category: 'features',
        categoryLabel: 'Features',
        question: 'Can I combine and reorder multiple PDFs at once?',
        answer: 'Yes. With the Merge PDF and Organize PDF tools, you can upload dozens of files, drag and drop pages into any custom sequence, rotate individual pages, and merge them into a single high-quality document in seconds.',
      },
      {
        id: 'features-edit',
        category: 'features',
        categoryLabel: 'Features',
        question: 'Can I add text, shapes, or signatures to an existing PDF?',
        answer: 'Yes. Our PDF Editor tool allows you to draw or type text, insert shapes, highlight paragraphs, add watermarks, and stamp legal electronic signatures directly onto any document.',
      },
      {
        id: 'technical-browsers',
        category: 'technical',
        categoryLabel: 'Technical',
        question: 'Which web browsers and operating systems are supported?',
        answer: 'iCreatePDF works seamlessly on all modern browsers (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Brave) across Windows, macOS, Linux, iOS, and Android.',
      },
      {
        id: 'technical-sizeLimit',
        category: 'technical',
        categoryLabel: 'Technical',
        question: 'Is there a file size limit?',
        answer: 'Because processing happens on your local device, file sizes are primarily limited by your available device RAM. In practice, files up to 500MB and batch sets of hundreds of pages process smoothly on standard laptops.',
      },
      {
        id: 'technical-offline',
        category: 'technical',
        categoryLabel: 'Technical',
        question: 'Can I use iCreatePDF without an active internet connection?',
        answer: 'Yes. Once the web application is loaded in your browser or cached via our Service Worker, you can disconnect your Wi-Fi or turn on Airplane Mode and continue processing files completely offline.',
      },
      {
        id: 'languages-supported',
        category: 'languages',
        categoryLabel: 'Languages',
        question: 'What languages does iCreatePDF support?',
        answer: 'iCreatePDF is localized in 15+ major global languages including English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Arabic (with full RTL support), and more.',
      },
    ];

    return rawFaqs;
  }, []);

  const categoryOptions = [
    { key: 'all', label: 'All Questions', icon: HelpCircle },
    { key: 'general', label: 'General', icon: Info },
    { key: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
    { key: 'features', label: 'Features & Tools', icon: Layers },
    { key: 'technical', label: 'Technical & Offline', icon: Cpu },
    { key: 'languages', label: 'Languages', icon: Globe },
  ];

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
      desc: 'Fully licensed under GNU AGPLv3. Free forever with no subscription fees or paywalls.',
      badge: 'AGPL-3.0',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400'
    }
  ];

  // Filter FAQs based on query & category
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return faqs.filter((faq) => {
      const matchesSearch =
        q === '' ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [faqs, searchQuery, selectedCategory]);

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
        <section className="relative overflow-hidden pt-8 pb-12 text-center">
          {/* Subtle warm backdrop glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-red-100/40 via-rose-50/20 to-transparent dark:from-red-950/20 dark:via-rose-950/10 blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200/60 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help &amp; Knowledge Base</span>
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
              Everything you need to know about iCreatePDF, client-side privacy, supported file formats, and offline capabilities.
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[hsl(var(--color-muted-foreground))]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., privacy, size limit, offline)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-sm shadow-xs hover:shadow-md focus:shadow-md focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-[hsl(var(--color-muted-foreground))] text-[hsl(var(--color-foreground))]"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto mb-12">
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

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              {categoryOptions.map((cat) => {
                const isActive = selectedCategory === cat.key;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-105'
                        : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))/0.8] hover:text-[hsl(var(--color-foreground))]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="container mx-auto px-4 max-w-4xl mt-4 mb-20">
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
                className="text-xs font-bold text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 px-2.5 py-1 rounded-md hover:bg-[hsl(var(--color-muted))] transition-colors"
              >
                Expand All
              </button>
              <span className="text-[hsl(var(--color-border))]">•</span>
              <button
                onClick={collapseAll}
                className="text-xs font-bold text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 px-2.5 py-1 rounded-md hover:bg-[hsl(var(--color-muted))] transition-colors"
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
                We couldn&rsquo;t find any answer matching &ldquo;{searchQuery}&rdquo;. Try another term or contact support.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredFaqs.map((faq) => {
                const isOpen = expandedItems.has(faq.id);
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-[hsl(var(--color-card))] border-red-300 dark:border-red-900/60 shadow-md'
                        : 'bg-[hsl(var(--color-card))] border-[hsl(var(--color-border))] hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60">
                          {faq.categoryLabel}
                        </span>
                        <h3 className="font-bold text-base text-[hsl(var(--color-foreground))] leading-snug">
                          {faq.question}
                        </h3>
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
                      <div className="px-5 pb-5 pt-1 text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed border-t border-[hsl(var(--color-border)/0.6)] mt-1 animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
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
