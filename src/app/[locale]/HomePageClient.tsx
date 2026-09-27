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
    } catch {}
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

  const testimonials = useMemo(() => {
    const rawItems = (messages as any)?.home?.testimonials;
    if (Array.isArray(rawItems) && rawItems.length > 0) {
      const colors = [
        'bg-rose-100 text-rose-600',
        'bg-red-100 text-red-600',
        'bg-orange-100 text-orange-600',
        'bg-pink-100 text-pink-600',
      ];
      return rawItems.map((item: any, idx: number) => ({
        ...item,
        color: colors[idx % colors.length],
      }));
    }

    if (locale === 'ne') {
      return [
        {
          quote: "मैले प्रयोग गरेको सबैभन्दा छिटो र सुरक्षित PDF सम्पादक। सबै प्रशोधन कुनै गोपनीयता जोखिम बिना सिधै उपकरणमा हुन्छ।",
          author: "Sarah Jenkins",
          role: "सुरक्षा परीक्षक",
          initials: "SJ",
          color: "bg-rose-100 text-rose-600"
        },
        {
          quote: "१००% अफलाइन प्रशोधन। हाम्रा संवेदनशील कानुनी कागजातहरू कहिल्यै स्थानीय उपकरणबाट बाहिर जाँदैनन्। शून्य अपलोड र उच्च गति।",
          author: "Michael Davis",
          role: "अनुपालन अधिकारी",
          initials: "MD",
          color: "bg-red-100 text-red-600"
        },
        {
          quote: "हाम्रो सम्पूर्ण टोलीका लागि महँगो मासिक सदस्यता खर्च हटायो। फाइलहरू तुरुन्तै मर्ज, कम्प्रेस र हस्ताक्षर गर्नुहोस्।",
          author: "Emily Duran",
          role: "परियोजना प्रबन्धक",
          initials: "ED",
          color: "bg-orange-100 text-orange-600"
        },
        {
          quote: "उत्कृष्ट दृश्य ब्याच कार्यप्रवाह र शून्य-सर्भर प्रविधिले हाम्रो इन्जिनियरिङ टोलीको हरेक महिना दर्जनौं घण्टा बचत गर्यो।",
          author: "David Chen",
          role: "सञ्चालन निर्देशक",
          initials: "DC",
          color: "bg-pink-100 text-pink-600"
        }
      ];
    } else if (locale === 'hi') {
      return [
        {
          quote: "अब तक का सबसे तेज़ और सुरक्षित PDF संपादक। सभी प्रोसेसिंग बिना किसी सर्वर जोखिम के स्थानीय रूप से होती है।",
          author: "Sarah Jenkins",
          role: "सुरक्षा लेखा परीक्षक",
          initials: "SJ",
          color: "bg-rose-100 text-rose-600"
        },
        {
          quote: "100% ऑफ़लाइन प्रोसेसिंग। हमारे संवेदनशील कानूनी दस्तावेज़ कभी स्थानीय डिवाइस से बाहर नहीं जाते। शून्य अपलोड।",
          author: "Michael Davis",
          role: "अनुपालन अधिकारी",
          initials: "MD",
          color: "bg-red-100 text-red-600"
        },
        {
          quote: "हमारी पूरी टीम के लिए महंगे सब्सक्रिप्शन खर्च को समाप्त कर दिया। फाइलें तुरंत मर्ज, कंप्रेस और साइन करें।",
          author: "Emily Duran",
          role: "प्रोजेक्ट मैनेजर",
          initials: "ED",
          color: "bg-orange-100 text-orange-600"
        },
        {
          quote: "शानदार बैच वर्कफ़्लो और ज़ीरो-सर्वर तकनीक ने हमारी इंजीनियरिंग टीम के हर महीने दर्जनों घंटे बचाए।",
          author: "David Chen",
          role: "संचालन निदेशक",
          initials: "DC",
          color: "bg-pink-100 text-pink-600"
        }
      ];
    } else if (locale === 'ms') {
      return [
        {
          quote: "Editor PDF terpantas dan paling selamat yang pernah saya gunakan. Semua pemprosesan berlaku setempat tanpa risiko privasi.",
          author: "Sarah Jenkins",
          role: "Juruaudit Keselamatan",
          initials: "SJ",
          color: "bg-rose-100 text-rose-600"
        },
        {
          quote: "100% pemprosesan luar talian. Audit undang-undang sensitif kami tidak pernah meninggalkan memori setempat.",
          author: "Michael Davis",
          role: "Pegawai Pematuhan",
          initials: "MD",
          color: "bg-red-100 text-red-600"
        },
        {
          quote: "Menghapuskan kos langganan mahal untuk seluruh pasukan kami. Gabung, mampat dan tandatangan fail serta-merta.",
          author: "Emily Duran",
          role: "Pengurus Projek",
          initials: "ED",
          color: "bg-orange-100 text-orange-600"
        },
        {
          quote: "Aliran kerja kelompok visual dan seni bina sifar pelayan menjimatkan puluhan jam pasukan kejuruteraan kami.",
          author: "David Chen",
          role: "Pengarah Operasi",
          initials: "DC",
          color: "bg-pink-100 text-pink-600"
        }
      ];
    }

    return [
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
  }, [messages, locale]);

  return (
    <div suppressHydrationWarning className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-16 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-3 pb-8 text-center">
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
                  {tHome('hero.title')} <br />
                  <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                    {tHome('hero.highlight') || tHome('features.privacy.title')}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-8">
              {locale === 'en'
                ? 'Process your files locally in your browser. No server uploads, no privacy risks. Complete speed and peace of mind.'
                : (tHome('hero.subtitle') || tHome('features.privacy.description'))}
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[hsl(var(--color-muted-foreground))]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
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
                +{allTools.length - 12} {tCommon('buttons.more') || 'More'}
              </Link>
            </div>
          </div>
        </section>

        {/* 5-Column Tools Grid Section */}
        <section className="w-full max-w-[1440px] mx-auto px-6 mt-4 mb-20">
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
                const isPopular = ['merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-word', 'word-to-pdf', 'edit-pdf', 'sign-pdf', 'protect-pdf', 'jpg-to-pdf', 'ocr-pdf'].includes(tool.id);
                const isAI = ['ocr-pdf', 'summarize-pdf'].includes(tool.id);

                return (
                  <Link
                    key={tool.id}
                    href={`/${locale}/tools/${tool.slug}`}
                    className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-red-300 dark:hover:border-red-900 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer min-h-[225px]"
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
                      <h3 className="font-bold text-[16px] leading-snug text-[hsl(var(--color-foreground))] group-hover:text-red-600 transition-colors mb-2 line-clamp-1">
                        {toolName}
                      </h3>

                      {/* Tool Short Description */}
                      <p className="text-[13px] text-[hsl(var(--color-muted-foreground))] line-clamp-3 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    {/* Bottom Action Arrow */}
                    <div className="pt-2 flex items-center justify-end text-[hsl(var(--color-muted-foreground))] group-hover:text-red-600 transition-colors mt-auto">
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Loved by Millions (Testimonials Section) */}
        <section suppressHydrationWarning className="py-16 bg-[hsl(var(--color-muted)/0.4)] border-y border-[hsl(var(--color-border))]">
          <div className="w-full max-w-[1440px] mx-auto px-6">
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
