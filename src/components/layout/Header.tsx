'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ImageIcon,
  PenTool,
  Code2,
  Blocks,
  BarChart3,
  Monitor,
  Smartphone,
  CreditCard,
  Lock,
  Unlock,
  LayoutGrid,
  Heart,
  HelpCircle,
  Globe,
  Layers,
  Scissors,
  FileX,
  FileCheck2,
  LayoutDashboard,
  Scan,
  Minimize2,
  Wrench,
  ScanText,
  FileImage,
  FileText,
  Presentation,
  Sheet,
  FileBadge,
  Image,
  RotateCw,
  Hash,
  Stamp,
  Crop,
  FileEdit,
  FileSignature,
  Eraser,
  GitCompare,
  Sparkles,
  Languages,
  Search,
  Github,
  ShieldCheck,
  Gauge
} from 'lucide-react';
import { type Locale, locales, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
const NotificationBell = dynamic(
  () => import('@/components/notifications/NotificationBell').then((mod) => mod.NotificationBell),
  { ssr: false }
);
import { LanguageSelector, saveLanguagePreference } from './LanguageSelector';
import { RecentFilesDropdown } from '@/components/common/RecentFilesDropdown';
import { UpdateCheckButton } from '@/components/common/UpdateCheckButton';
import { searchTools, SearchResult } from '@/lib/utils/search';
import { tools } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import { getToolIcon as getLucideToolIcon } from '@/config/icons';

export interface HeaderProps {
  locale: Locale;
  showSearch?: boolean;
}

interface ToolItem {
  label: string;
  toolId?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  iconColor?: string;
}

interface CategoryGroup {
  category: string;
  isAi: boolean;
  tools: ToolItem[];
}

export const Header: React.FC<HeaderProps> = ({ locale, showSearch = true }) => {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [localizedTools, setLocalizedTools] = useState<Record<string, { title: string; description: string }>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Localized tool titles
  const mergeTitle = getToolContent(locale, 'merge-pdf')?.title || 'Merge PDF';
  const splitTitle = getToolContent(locale, 'split-pdf')?.title || 'Split PDF';
  const compressTitle = getToolContent(locale, 'compress-pdf')?.title || 'Compress PDF';
  const editTitle = getToolContent(locale, 'edit-pdf')?.title || 'Edit PDF';

  const allToolsLabel = (() => {
    try {
      const text = t('navigation.allTools');
      if (text && !text.includes('navigation.allTools') && !text.includes('common.')) return text;
    } catch { }
    return locale === 'ne' ? 'सबै PDF उपकरणहरू' : locale === 'hi' ? 'सभी PDF टूल्स' : locale === 'ms' ? 'Semua Alatan PDF' : 'All PDF Tools';
  })();

  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const productsMenuRef = useRef<HTMLDivElement>(null);

  // Load localized tool content for search
  useEffect(() => {
    const contentMap: Record<string, { title: string; description: string }> = {};
    tools.forEach((tool) => {
      const content = getToolContent(locale, tool.id);
      if (content) {
        contentMap[tool.id] = {
          title: content.title,
          description: content.metaDescription || '',
        };
      }
    });
    setLocalizedTools(contentMap);
  }, [locale]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchTools(searchQuery, localizedTools);
      setSearchResults(results.slice(0, 8));
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
      setSelectedIndex(-1);
    }
  }, [searchQuery, localizedTools]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen]);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => {
          if (!prev) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
          }
          return true;
        });
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Handle search keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          navigateToTool(searchResults[selectedIndex].tool.slug);
        } else if (searchResults.length > 0) {
          navigateToTool(searchResults[0].tool.slug);
        }
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    },
    [searchResults, selectedIndex]
  );

  const navigateToTool = useCallback(
    (slug: string) => {
      router.push(`/${locale}/tools/${slug}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
    },
    [locale, router]
  );

  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      } else {
        setSearchQuery('');
        setSearchResults([]);
      }
      return next;
    });
  }, []);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'edit-annotate':
        return {
          bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
          badge: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40',
          label: 'Edit',
        };
      case 'convert-to-pdf':
      case 'convert-from-pdf':
        return {
          bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
          badge: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40',
          label: 'Convert',
        };
      case 'organize-manage':
        return {
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
          badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40',
          label: 'Organize',
        };
      case 'optimize-repair':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
          badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40',
          label: 'Optimize',
        };
      case 'secure-pdf':
        return {
          bg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
          badge: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900/40',
          label: 'Security',
        };
      default:
        return {
          bg: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
          badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
          label: 'PDF',
        };
    }
  };

  const searchPlaceholder =
    locale === 'ne'
      ? 'उपकरणहरू खोज्नुहोस्...'
      : locale === 'hi'
        ? 'टूल्स खोजें...'
        : locale === 'ms'
          ? 'Cari alatan...'
          : 'Search tools...';

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(target)) {
        setIsToolsDropdownOpen(false);
      }
      if (productsMenuRef.current && !productsMenuRef.current.contains(target)) {
        setIsProductsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsToolsDropdownOpen(false);
        setIsProductsMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  // 7-Column Layout matching user's exact mockup
  const organizedCategories: CategoryGroup[] = [
    {
      category: t('categories.organize') || 'ORGANIZE',
      isAi: false,
      tools: [
        { label: 'Merge PDF', toolId: 'merge-pdf', href: `/${locale}/tools/merge-pdf`, icon: Layers },
        { label: 'Split PDF', toolId: 'split-pdf', href: `/${locale}/tools/split-pdf`, icon: Scissors },
        { label: 'Remove Pages', toolId: 'delete-pages', href: `/${locale}/tools/delete-pages`, icon: FileX },
        { label: 'Extract Pages', toolId: 'extract-pages', href: `/${locale}/tools/extract-pages`, icon: FileCheck2 },
        { label: 'Organize PDF', toolId: 'organize-pdf', href: `/${locale}/tools/organize-pdf`, icon: LayoutDashboard },
        { label: 'Scan to PDF', toolId: 'scan-pdf', href: `/${locale}/tools/scan-pdf`, icon: Scan },
      ],
    },
    {
      category: t('categories.optimize') || 'OPTIMIZE',
      isAi: false,
      tools: [
        { label: 'Compress PDF', toolId: 'compress-pdf', href: `/${locale}/tools/compress-pdf`, icon: Minimize2 },
        { label: 'Repair PDF', toolId: 'repair-pdf', href: `/${locale}/tools/repair-pdf`, icon: Wrench },
        { label: 'OCR PDF', toolId: 'ocr-pdf', href: `/${locale}/tools/ocr-pdf`, icon: ScanText },
        { label: 'Flatten PDF', toolId: 'flatten-pdf', href: `/${locale}/tools/flatten-pdf`, icon: Layers },
        { label: 'Linearize PDF', toolId: 'linearize-pdf', href: `/${locale}/tools/linearize-pdf`, icon: Gauge },
      ],
    },
    {
      category: t('categories.convertFrom') || 'CONVERT FROM',
      isAi: false,
      tools: [
        { label: 'PDF to JPG', toolId: 'pdf-to-jpg', href: `/${locale}/tools/pdf-to-jpg`, icon: FileImage },
        { label: 'PDF to Word', toolId: 'pdf-to-docx', href: `/${locale}/tools/pdf-to-docx`, icon: FileText },
        { label: 'PDF to PPT', toolId: 'pdf-to-pptx', href: `/${locale}/tools/pdf-to-pptx`, icon: Presentation },
        { label: 'PDF to Excel', toolId: 'pdf-to-excel', href: `/${locale}/tools/pdf-to-excel`, icon: Sheet },
        { label: 'PDF to PDF/A', toolId: 'pdf-to-pdfa', href: `/${locale}/tools/pdf-to-pdfa`, icon: FileBadge },
      ],
    },
    {
      category: t('categories.convertTo') || 'CONVERT TO',
      isAi: false,
      tools: [
        { label: 'JPG to PDF', toolId: 'jpg-to-pdf', href: `/${locale}/tools/jpg-to-pdf`, icon: Image },
        { label: 'Word to PDF', toolId: 'word-to-pdf', href: `/${locale}/tools/word-to-pdf`, icon: FileText },
        { label: 'PPT to PDF', toolId: 'pptx-to-pdf', href: `/${locale}/tools/pptx-to-pdf`, icon: Presentation },
        { label: 'Excel to PDF', toolId: 'excel-to-pdf', href: `/${locale}/tools/excel-to-pdf`, icon: Sheet },
        { label: 'HTML to PDF', toolId: 'html-to-pdf', href: `/${locale}/tools/html-to-pdf`, icon: Code2 },
      ],
    },
    {
      category: t('categories.edit') || 'EDIT PDF',
      isAi: false,
      tools: [
        { label: 'Rotate PDF', toolId: 'rotate-pdf', href: `/${locale}/tools/rotate-pdf`, icon: RotateCw },
        { label: 'Page Numbers', toolId: 'page-numbers', href: `/${locale}/tools/page-numbers`, icon: Hash },
        { label: 'Watermark', toolId: 'add-watermark', href: `/${locale}/tools/add-watermark`, icon: Stamp },
        { label: 'Crop PDF', toolId: 'crop-pdf', href: `/${locale}/tools/crop-pdf`, icon: Crop },
        { label: 'Edit PDF', toolId: 'edit-pdf', href: `/${locale}/tools/edit-pdf`, icon: FileEdit },
        { label: 'PDF Forms', toolId: 'form-filler', href: `/${locale}/tools/form-filler`, icon: FileSignature },
      ],
    },
    {
      category: t('categories.security') || 'SECURITY',
      isAi: false,
      tools: [
        { label: 'Protect PDF', toolId: 'encrypt-pdf', href: `/${locale}/tools/encrypt-pdf`, icon: Lock },
        { label: 'Unlock PDF', toolId: 'decrypt-pdf', href: `/${locale}/tools/decrypt-pdf`, icon: Unlock },
        { label: 'Sign PDF', toolId: 'sign-pdf', href: `/${locale}/tools/sign-pdf`, icon: PenTool },
        { label: 'Redact PDF', toolId: 'redact-pdf', href: `/${locale}/tools/redact-pdf`, icon: Eraser },
        { label: 'Compare PDF', toolId: 'compare-pdfs', href: `/${locale}/tools/compare-pdfs`, icon: GitCompare },
      ],
    },
    {
      category: '✦ AI',
      isAi: true,
      tools: [
        {
          label: locale === 'ne' ? 'AI सारांशकर्ता' : locale === 'hi' ? 'AI सारांशकर्ता' : locale === 'ms' ? 'Penyusun AI' : 'AI Summarizer',
          toolId: 'ai-pdf-reflower',
          href: `/${locale}/tools/ai-pdf-reflower`,
          icon: Sparkles,
          color: 'text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 font-semibold',
          iconColor: 'text-amber-500 dark:text-amber-400'
        },
        {
          label: locale === 'ne' ? 'PDF पाठक' : locale === 'hi' ? 'PDF पाठक' : locale === 'ms' ? 'Pembaca PDF' : 'Translate PDF',
          toolId: 'pdf-reader',
          href: `/${locale}/tools/pdf-reader`,
          icon: Languages,
          color: 'text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold',
          iconColor: 'text-emerald-500 dark:text-emerald-400'
        },
      ],
    },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${scrolled
        ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 shadow-xs'
        : 'bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900'
        }`}
      role="banner"
    >
      <div className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between gap-2 sm:gap-4">
          {/* Logo and Brand + Desktop Navigation (together on the left, NOT centered) */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 min-w-0">
            <Link
              href={`/${locale}`}
              className="group flex items-center hover:opacity-90 transition-opacity flex-shrink-0"
              aria-label="iCreatePDF - Home"
            >
              <span className="flex items-center" data-testid="brand-name">
                <img
                  src="/images/logo-light.png"
                  alt="iCreatePDF"
                  className="h-8.5 sm:h-11 md:h-14 w-auto max-w-[140px] sm:max-w-none dark:hidden object-contain"
                />
                <img
                  src="/images/logo-dark.png"
                  alt="iCreatePDF"
                  className="h-8.5 sm:h-11 md:h-14 w-auto max-w-[140px] sm:max-w-none hidden dark:block object-contain"
                />
                <span className="sr-only">iCreatePDF</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-semibold"
              role="navigation"
              aria-label="Main navigation"
            >
              <Link
                href={`/${locale}`}
                className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                {t('navigation.home') || 'Home'}
              </Link>
              <Link
                href={`/${locale}/tools`}
                className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                {t('navigation.tools') || 'Tools'}
              </Link>
              <Link
                href={`/${locale}/tools/merge-pdf`}
                className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                {mergeTitle}
              </Link>

              {/* All Tools Mega Dropdown matching user mockup */}
              <div className="relative" ref={toolsDropdownRef}>
                <button
                  onClick={() => {
                    setIsToolsDropdownOpen(!isToolsDropdownOpen);
                    setIsProductsMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors py-2 cursor-pointer font-semibold"
                  aria-expanded={isToolsDropdownOpen}
                >
                  <span>{allToolsLabel}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180 text-red-600' : ''}`} />
                </button>

                {isToolsDropdownOpen && (
                  <div
                    className="absolute left-0 md:-left-28 lg:-left-44 top-full mt-2 w-[1140px] max-w-[94vw] p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 text-zinc-900 dark:text-zinc-100"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
                      {organizedCategories.map((col) => (
                        <div key={col.category} className="flex flex-col">
                          {/* Column Header with bottom line - Disambiguated category title */}
                          <div
                            className={`text-[11px] font-extrabold uppercase tracking-widest pb-2 mb-2.5 border-b select-none cursor-default ${
                              col.isAi
                                ? 'text-amber-600 dark:text-amber-400 border-amber-300/70 dark:border-amber-800/60'
                                : 'text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700/80'
                            }`}
                          >
                            <span>{col.category}</span>
                          </div>

                          {/* Tools List */}
                          <ul className="space-y-1">
                            {col.tools.map((item) => {
                              const IconComponent = item.icon;
                              const localizedTitle = item.toolId ? (getToolContent(locale, item.toolId)?.title || item.label) : item.label;
                              return (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsToolsDropdownOpen(false)}
                                    className="group flex items-center gap-2.5 py-1.5 px-2 -mx-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                                  >
                                    <IconComponent className={`w-4 h-4 flex-shrink-0 transition-colors ${item.iconColor || 'text-zinc-400 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-400'
                                      }`} />
                                    <span className={`transition-colors whitespace-nowrap ${item.color || 'text-zinc-700 dark:text-zinc-200 group-hover:text-red-600 dark:group-hover:text-red-400'
                                      }`}>
                                      {localizedTitle}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={`/${locale}/workflow`}
                className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                {t('navigation.workflow') || 'Workflow'}
              </Link>

              <Link
                href={`/${locale}/blog`}
                className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                {t('navigation.blog') || 'Blog'}
              </Link>
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            {showSearch && (
              <div className="relative" ref={searchContainerRef}>
                {isSearchOpen ? (
                  <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 top-3 md:top-1/2 md:-translate-y-1/2 z-50 md:origin-right animate-in fade-in slide-in-from-right-4 duration-200">
                    <div className="relative w-full md:w-80 lg:w-96">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" aria-hidden="true" />
                      <input
                        ref={searchInputRef}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={searchPlaceholder}
                        className="w-full pl-9 pr-9 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
                        aria-label="Search tools"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={handleSearchToggle}
                        aria-label="Close search"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>

                      {/* Search Results Dropdown */}
                      {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 max-h-[65vh] overflow-y-auto z-50">
                          <div className="px-3.5 py-2 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                            <span>{searchResults.length} {searchResults.length === 1 ? 'tool' : 'tools'}</span>
                            <span className="hidden sm:inline">Use ↑ ↓ to navigate</span>
                          </div>
                          <ul className="p-1.5 space-y-0.5" role="listbox">
                            {searchResults.map((result, index) => {
                              const localized = localizedTools[result.tool.id];
                              const toolName = localized?.title || result.tool.id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                              const toolDescription = localized?.description || result.tool.features.slice(0, 3).join(' • ');
                              const ToolIcon = getLucideToolIcon(result.tool.icon || result.tool.id);
                              const style = getCategoryBadge(result.tool.category);

                              return (
                                <li key={result.tool.id}>
                                  <button
                                    onClick={() => navigateToTool(result.tool.slug)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`w-full px-3 py-2.5 text-left rounded-xl flex items-center gap-3 transition-all group cursor-pointer ${index === selectedIndex
                                      ? 'bg-red-50/80 dark:bg-red-950/30 text-zinc-950 dark:text-white shadow-xs'
                                      : 'hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 text-zinc-800 dark:text-zinc-200'
                                      }`}
                                    role="option"
                                    aria-selected={index === selectedIndex}
                                  >
                                    <div className={`w-8.5 h-8.5 rounded-lg ${style.bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-xs`}>
                                      <ToolIcon className="w-4.5 h-4.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold text-sm text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                                        {toolName}
                                      </div>
                                      <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                        {toolDescription}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${style.badge}`}>
                                        {style.label}
                                      </span>
                                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleSearchToggle}
                    aria-label="Open search"
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Search (⌘K)"
                  >
                    <Search className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden lg:inline-block text-[11px] font-medium text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 leading-none">
                      ⌘K
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Recent Files Dropdown - desktop only */}
            <div className="hidden md:block">
              <RecentFilesDropdown
                locale={locale}
                translations={{
                  title: t('recentFiles.title') || (locale === 'ne' ? 'भर्खरका फाइलहरू' : 'Recent Files'),
                  empty: t('recentFiles.empty') || (locale === 'ne' ? 'कुनै भर्खरका फाइलहरू छैनन्' : 'No recent files'),
                  clearAll: t('recentFiles.clearAll') || (locale === 'ne' ? 'सबै हटाउनुहोस्' : 'Clear all'),
                  processedWith: t('recentFiles.processedWith') || (locale === 'ne' ? 'सँग प्रशोधित' : 'Processed with'),
                }}
              />
            </div>

            {/* Update Check Button - large desktop only */}
            <div className="hidden lg:block">
              <UpdateCheckButton />
            </div>

            {/* GitHub Repository Link */}
            <a
              href="https://github.com/Sudip-Mani-Gautam/iCreatePDF"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center justify-center w-8.5 h-8.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="GitHub Repository"
              title="GitHub Repository"
            >
              <Github className="h-4.5 w-4.5" aria-hidden="true" />
            </a>

            {/* Apps 4-Square Red Icon (Ecosystem Menu Popup) */}
            <div className="relative hidden sm:block" ref={productsMenuRef}>
              <button
                onClick={() => {
                  setIsProductsMenuOpen(!isProductsMenuOpen);
                  setIsToolsDropdownOpen(false);
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all text-red-600 focus:outline-none"
                title="iCreatePDF Products & Solutions"
                aria-label="Open Products and Solutions Menu"
                aria-expanded={isProductsMenuOpen}
              >
                {/* 4 Red Rounded Squares Icon matching user's image */}
                <svg
                  className="w-5 h-5 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5" />
                  <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.5" />
                  <rect x="14" y="14" width="6.5" height="6.5" rx="1.5" />
                  <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.5" />
                </svg>
              </button>

              {/* Ecosystem Products Modal Popup */}
              {isProductsMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2.5 w-[590px] max-w-[94vw] p-4.5 sm:p-5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 text-zinc-900 dark:text-zinc-100"
                >
                  {/* Header Title */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-red-600/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5" />
                          <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.5" />
                          <rect x="14" y="14" width="6.5" height="6.5" rx="1.5" />
                          <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.5" />
                        </svg>
                      </div>
                      <span className="font-extrabold text-sm text-zinc-950 dark:text-white tracking-tight">
                        {locale === 'ne' ? 'iCreate सुइट' : locale === 'hi' ? 'iCreate सुइट' : locale === 'ms' ? 'Suit iCreate' : 'iCreate Suite'}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                      {locale === 'ne' ? 'उत्पादकता अनुप्रयोगहरूको समूह' : locale === 'hi' ? 'उत्पादकता ऐप्स का समूह' : locale === 'ms' ? 'Aplikasi produktiviti terhubung' : 'Connected productivity apps'}
                    </span>
                  </div>

                  {/* Top Section: 4 Core Suite Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* iCreatePDF (Current Active App) */}
                    <Link
                      href={`/${locale}`}
                      onClick={() => setIsProductsMenuOpen(false)}
                      className="group relative flex items-start gap-3 p-2.5 rounded-xl border border-red-500/25 bg-red-50/25 dark:bg-red-950/20 hover:bg-red-50/50 dark:hover:bg-red-950/35 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-red-500/20">
                        <FileText className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-zinc-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            iCreatePDF
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-red-600 text-white">
                            {locale === 'ne' ? 'सक्रिय' : locale === 'hi' ? 'सक्रिय' : locale === 'ms' ? 'Aktif' : 'Active'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {locale === 'ne' ? 'सबै-मा-एक PDF उपकरण र सम्पादक' : locale === 'hi' ? 'ऑल-इन-वन PDF उपकरण और संपादक' : locale === 'ms' ? 'Alat & editor PDF lengkap' : 'All-in-one PDF tools & editor'}
                        </p>
                      </div>
                    </Link>

                    {/* iCreateSign */}
                    <Link
                      href={`/${locale}/tools/sign-pdf`}
                      onClick={() => setIsProductsMenuOpen(false)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <PenTool className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-sm text-zinc-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                          iCreateSign
                        </span>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {locale === 'ne' ? 'सजिलो डिजिटल हस्ताक्षर र साइनिङ' : locale === 'hi' ? 'सरल डिजिटल हस्ताक्षर और साइनिंग' : locale === 'ms' ? 'Tandatangan digital & e-sign' : 'Digital signatures & e-sign'}
                        </p>
                      </div>
                    </Link>

                    {/* iCreateIMG */}
                    <div
                      className="group flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0">
                        <ImageIcon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-sm text-zinc-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors block">
                          iCreateIMG
                        </span>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {locale === 'ne' ? 'सहज तस्बिर सम्पादन र रूपान्तरण' : locale === 'hi' ? 'सरल छवि संपादन और रूपांतरण' : locale === 'ms' ? 'Penyuntingan & penukaran imej' : 'Effortless image conversion & editing'}
                        </p>
                      </div>
                    </div>

                    {/* iCreateAPI */}
                    <div
                      className="group flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Code2 className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-sm text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">
                          iCreateAPI
                        </span>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {locale === 'ne' ? 'विकासकर्ताहरूका लागि कागजात स्वचालन' : locale === 'hi' ? 'डेवलपर्स के लिए दस्तावेज़ स्वचालन' : locale === 'ms' ? 'Automasi dokumen untuk pembangun' : 'Document automation for developers'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: Platforms & Solutions (Clean 3-Card Row) */}
                  <div className="pt-3 mt-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 px-0.5">
                      {locale === 'ne' ? 'प्लेटफर्म र समाधानहरू' : locale === 'hi' ? 'प्लेटफ़ॉर्म और समाधान' : locale === 'ms' ? 'Platform & Penyelesaian' : 'Platforms & Solutions'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {/* Desktop App */}
                      <a
                        href="https://github.com/Sudip-Mani-Gautam/iCreatePDF/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all flex items-center gap-2.5 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0 group-hover:text-red-600 transition-colors">
                          <Monitor className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-zinc-900 dark:text-white block truncate">
                            {locale === 'ne' ? 'डेस्कटप एप' : locale === 'hi' ? 'डेस्कटॉप ऐप' : locale === 'ms' ? 'Aplikasi Desktop' : 'Desktop App'}
                          </span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block truncate">
                            {locale === 'ne' ? 'म्याक र विन्डोज अफलाइन' : locale === 'hi' ? 'Mac और Windows ऑफ़लाइन' : locale === 'ms' ? 'Luar talian Mac & Win' : 'Mac & Windows Offline'}
                          </span>
                        </div>
                      </a>

                      {/* Mobile App */}
                      <Link
                        href={`/${locale}/about`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all flex items-center gap-2.5 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0 group-hover:text-blue-600 transition-colors">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-zinc-900 dark:text-white block truncate">
                            {locale === 'ne' ? 'मोबाइल एप' : locale === 'hi' ? 'मोबाइल ऐप' : locale === 'ms' ? 'Aplikasi Mudah Alih' : 'Mobile App'}
                          </span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block truncate">
                            {locale === 'ne' ? 'iOS र एन्ड्रोइड PWA' : locale === 'hi' ? 'iOS और Android PWA' : locale === 'ms' ? 'PWA iOS & Android' : 'iOS & Android PWA'}
                          </span>
                        </div>
                      </Link>

                      {/* Business & Integrations */}
                      <Link
                        href={`/${locale}/about`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all flex items-center gap-2.5 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0 group-hover:text-emerald-600 transition-colors">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-zinc-900 dark:text-white block truncate">
                            {locale === 'ne' ? 'व्यवसायिक' : locale === 'hi' ? 'व्यापार और टीम' : locale === 'ms' ? 'Perniagaan' : 'Business & Teams'}
                          </span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block truncate">
                            {locale === 'ne' ? 'कार्यप्रवाह र एकीकरण' : locale === 'hi' ? 'वर्कफ़्लो और इंटीग्रेशन' : locale === 'ms' ? 'Aliran kerja berpasukan' : 'Workflows & tools'}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Section: Quick Links & Security Trust Bar */}
                  <div className="mt-3.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400 flex-wrap">
                      <Link
                        href={`/${locale}`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                      >
                        {locale === 'ne' ? 'मूल्य निर्धारण' : locale === 'hi' ? 'मूल्य निर्धारण' : locale === 'ms' ? 'Harga' : 'Pricing'}
                      </Link>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <Link
                        href={`/${locale}/privacy`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                      >
                        {t('navigation.security') || 'Security'}
                      </Link>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <Link
                        href={`/${locale}/tools`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                      >
                        {locale === 'ne' ? 'विशेषताहरू' : locale === 'hi' ? 'विशेषताएं' : locale === 'ms' ? 'Ciri-ciri' : 'Features'}
                      </Link>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <Link
                        href={`/${locale}/help`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                      >
                        {t('navigation.faq') || 'Help Center'}
                      </Link>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <Link
                        href={`/${locale}/about`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                      >
                        {t('navigation.about') || 'About'}
                      </Link>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-0.8 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{locale === 'ne' ? '१००% क्लाइन्ट-साइड' : locale === 'hi' ? '100% क्लाइंट-साइड' : locale === 'ms' ? '100% Bahagian Klien' : '100% Client-Side'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector (Flag/Globe dropdown) - tablet & desktop */}
            <div className="hidden sm:block">
              <LanguageSelector currentLocale={locale} />
            </div>

            {/* Notification Subscription Bell */}
            <NotificationBell />

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-1 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 max-h-[calc(100vh-4.5rem)] overflow-y-auto space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                aria-label="Search tools"
              />
            </div>

            {/* Mobile Search Results (if searching) */}
            {searchQuery.trim().length > 0 && searchResults.length > 0 && (
              <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-xl p-2 border border-zinc-200 dark:border-zinc-800 max-h-60 overflow-y-auto">
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 py-1">
                  Search Results ({searchResults.length})
                </div>
                <div className="space-y-1">
                  {searchResults.slice(0, 6).map((result) => {
                    const localized = localizedTools[result.tool.id];
                    const toolName = localized?.title || result.tool.id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                    const ToolIcon = getLucideToolIcon(result.tool.icon || result.tool.id);
                    const style = getCategoryBadge(result.tool.category);
                    return (
                      <button
                        key={result.tool.id}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateToTool(result.tool.slug);
                        }}
                        className="w-full px-2.5 py-2 text-left rounded-lg text-sm text-zinc-800 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 flex items-center gap-2.5 transition-colors"
                      >
                        <div className={`w-7 h-7 rounded-md ${style.bg} flex items-center justify-center shrink-0`}>
                          <ToolIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium truncate flex-1">{toolName}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Primary Nav Links */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold text-sm text-zinc-900 dark:text-white flex items-center justify-between"
              >
                <span>{t('navigation.home') || 'Home'}</span>
              </Link>
              <Link
                href={`/${locale}/tools`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl border border-red-500/20 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100/50 dark:hover:bg-red-950/40 font-semibold text-sm text-red-600 dark:text-red-400 flex items-center justify-between"
              >
                <span>{t('navigation.tools') || 'All Tools'}</span>
                <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full">132+</span>
              </Link>
            </div>

            {/* Popular Tools Quick Grid */}
            <div className="pt-1">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 px-1">
                {locale === 'ne' ? 'लोकप्रिय उपकरणहरू' : locale === 'hi' ? 'लोकप्रिय उपकरण' : locale === 'ms' ? 'Alatan Popular' : 'Popular Tools'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/${locale}/tools/merge-pdf`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-red-500/30"
                >
                  <Layers className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="truncate">{mergeTitle}</span>
                </Link>
                <Link
                  href={`/${locale}/tools/split-pdf`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-red-500/30"
                >
                  <Scissors className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="truncate">{splitTitle}</span>
                </Link>
                <Link
                  href={`/${locale}/tools/compress-pdf`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-red-500/30"
                >
                  <Minimize2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{compressTitle}</span>
                </Link>
                <Link
                  href={`/${locale}/tools/edit-pdf`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-red-500/30"
                >
                  <FileEdit className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="truncate">{editTitle}</span>
                </Link>
              </div>
            </div>

            {/* Other Navigation Links */}
            <div className="space-y-1">
              <Link
                href={`/${locale}/workflow`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <span>{t('navigation.workflow') || 'Workflow Editor'}</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded">PRO</span>
              </Link>
              <Link
                href={`/${locale}/blog`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <span>{t('navigation.blog') || 'Blog'}</span>
              </Link>
            </div>

            {/* Mobile Language Switcher */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 sm:hidden">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 px-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>{locale === 'ne' ? 'भाषा' : locale === 'hi' ? 'भाषा' : locale === 'ms' ? 'Bahasa' : 'Language'}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                {locales.map((loc) => {
                  const config = localeConfig[loc];
                  const isActive = loc === locale;
                  return (
                    <button
                      key={loc}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLocaleChange(loc);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left truncate flex items-center justify-between ${isActive
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                        }`}
                    >
                      <span className="truncate">{config.nativeName}</span>
                      {isActive && <span className="text-[10px] ml-1">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Security & Privacy Bar */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Private Offline</span>
              </div>
              <a
                href="https://github.com/Sudip-Mani-Gautam/iCreatePDF"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
