'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('faqPage');
  const tCommon = useTranslations('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(['general-whatIs', 'general-what-is', 'privacy-uploaded', 'privacy-server-upload'])
  );

  // Dynamically load localized FAQs from messages translation dictionary
  const localizedFaqs: FAQItem[] = useMemo(() => {
    try {
      const rawSections = t.raw('sections') as Record<string, Record<string, { question: string; answer: string }>> | undefined;
      if (!rawSections || typeof rawSections !== 'object') {
        return FAQ_ITEMS;
      }

      const items: FAQItem[] = [];

      // Extract translated questions from messages
      Object.entries(rawSections).forEach(([catKey, sectionMap]) => {
        if (!sectionMap || typeof sectionMap !== 'object') return;
        
        let catLabel = catKey;
        try {
          catLabel = t(`categories.${catKey}` as any);
        } catch {
          catLabel = catKey.charAt(0).toUpperCase() + catKey.slice(1);
        }

        Object.entries(sectionMap).forEach(([itemKey, qa]) => {
          if (qa && qa.question && qa.answer) {
            items.push({
              id: `${catKey}-${itemKey}`,
              category: catKey as any,
              categoryLabel: catLabel,
              question: qa.question.replace(/PDFCraft/g, 'iCreatePDF'),
              answer: qa.answer.replace(/PDFCraft/g, 'iCreatePDF'),
            });
          }
        });
      });

      // If user language is English or if additional extended items exist, supplement with extended config
      if (locale === 'en' || items.length === 0) {
        return FAQ_ITEMS;
      }

      return items;
    } catch {
      return FAQ_ITEMS;
    }
  }, [t, locale]);

  // Category navigation options using localized labels
  const categoryOptions = useMemo(() => {
    const getCatLabel = (key: string, fallback: string) => {
      try {
        return t(`categories.${key}` as any) || fallback;
      } catch {
        return fallback;
      }
    };

    return [
      { key: 'all', label: getCatLabel('all', 'All Questions'), icon: HelpCircle },
      { key: 'general', label: getCatLabel('general', 'General'), icon: Info },
      { key: 'privacy', label: getCatLabel('privacy', 'Privacy & Security'), icon: ShieldCheck },
      { key: 'features', label: getCatLabel('features', 'Features & Tools'), icon: Layers },
      { key: 'technical', label: getCatLabel('technical', 'Technical & Offline'), icon: Cpu },
      { key: 'languages', label: getCatLabel('languages', 'Languages'), icon: Globe },
    ];
  }, [t]);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: localizedFaqs.length };
    localizedFaqs.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [localizedFaqs]);

  // Filter FAQs based on query & category
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return localizedFaqs.filter((faq) => {
      const matchesSearch =
        q === '' ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q) ||
        (faq.keywords && faq.keywords.some((kw) => kw.toLowerCase().includes(q)));

      const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [localizedFaqs, searchQuery, selectedCategory]);

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
                <span>{tCommon('navigation.home') || 'Home'}</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[hsl(var(--color-muted-foreground))/0.6]" />
              <span className="text-[hsl(var(--color-foreground))] font-medium">
                {tCommon('navigation.faq') || t('title') || 'Help & FAQ'}
              </span>
            </nav>

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200/60 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{tCommon('navigation.faq') || 'Help Center & Knowledge Base'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              {t('title') || 'Frequently Asked Questions'}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-8">
              {t('subtitle', { brand: 'iCreatePDF' }) || 'Find answers to common questions about iCreatePDF, client-side privacy, and offline capabilities.'}
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[hsl(var(--color-muted-foreground))]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder') || 'Search FAQs...'}
                className="w-full pl-11 pr-10 py-3.5 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-sm shadow-xs hover:shadow-md focus:shadow-md focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-[hsl(var(--color-muted-foreground))] text-[hsl(var(--color-foreground))]"
                aria-label="Search frequently asked questions"
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
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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
                {t('expandAll') || 'Expand All'}
              </button>
              <span className="text-[hsl(var(--color-border))]">•</span>
              <button
                onClick={collapseAll}
                className="text-xs font-bold text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 px-2.5 py-1 rounded-md hover:bg-[hsl(var(--color-muted))] transition-colors cursor-pointer"
              >
                {t('collapseAll') || 'Collapse All'}
              </button>
            </div>
          </div>

          {/* List of Accordion Items */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-[hsl(var(--color-card))] rounded-3xl border border-dashed border-[hsl(var(--color-border))]">
              <HelpCircle className="w-12 h-12 text-[hsl(var(--color-muted-foreground))] mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-bold text-[hsl(var(--color-foreground))] mb-1">
                {t('noResults') || 'No matching questions found'}
              </h3>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4 max-w-sm mx-auto">
                {searchQuery ? `"${searchQuery}"` : ''}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
              >
                {tCommon('buttons.reset') || 'Reset'}
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
                {t('cta.title') || 'Still have questions?'}
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                {t('cta.description') || "Can't find the answer you are looking for? Contact our community support team or explore our offline toolkit."}
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="px-6 py-3 rounded-full bg-white text-red-600 font-bold text-xs shadow-lg hover:bg-zinc-100 transition-all flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" /> {t('cta.button') || 'Contact Us'}
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="px-6 py-3 rounded-full bg-red-700/80 hover:bg-red-800 text-white font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" /> {tCommon('navigation.tools') || 'All Tools'}
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
