'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
  Languages
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

export interface HeaderProps {
  locale: Locale;
  showSearch?: boolean;
}

interface ToolItem {
  label: string;
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

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const t = useTranslations('common');
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const productsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsToolsDropdownOpen(false);
        setIsProductsMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 7-Column Layout matching user's exact mockup
  const organizedCategories: CategoryGroup[] = [
    {
      category: 'ORGANIZE',
      isAi: false,
      tools: [
        { label: 'Merge PDF', href: `/${locale}/tools/merge-pdf`, icon: Layers },
        { label: 'Split PDF', href: `/${locale}/tools/split-pdf`, icon: Scissors },
        { label: 'Remove Pages', href: `/${locale}/tools/delete-pages`, icon: FileX },
        { label: 'Extract Pages', href: `/${locale}/tools/extract-pages`, icon: FileCheck2 },
        { label: 'Organize PDF', href: `/${locale}/tools/organize-pdf`, icon: LayoutDashboard },
        { label: 'Scan to PDF', href: `/${locale}/tools/scan-pdf`, icon: Scan },
      ],
    },
    {
      category: 'OPTIMIZE',
      isAi: false,
      tools: [
        { label: 'Compress PDF', href: `/${locale}/tools/compress-pdf`, icon: Minimize2 },
        { label: 'Repair PDF', href: `/${locale}/tools/repair-pdf`, icon: Wrench },
        { label: 'OCR PDF', href: `/${locale}/tools/ocr-pdf`, icon: ScanText },
      ],
    },
    {
      category: 'CONVERT FROM',
      isAi: false,
      tools: [
        { label: 'PDF to JPG', href: `/${locale}/tools/pdf-to-jpg`, icon: FileImage },
        { label: 'PDF to Word', href: `/${locale}/tools/pdf-to-docx`, icon: FileText },
        { label: 'PDF to PPT', href: `/${locale}/tools/pdf-to-pptx`, icon: Presentation },
        { label: 'PDF to Excel', href: `/${locale}/tools/pdf-to-excel`, icon: Sheet },
        { label: 'PDF to PDF/A', href: `/${locale}/tools/pdf-to-pdfa`, icon: FileBadge },
      ],
    },
    {
      category: 'CONVERT TO',
      isAi: false,
      tools: [
        { label: 'JPG to PDF', href: `/${locale}/tools/jpg-to-pdf`, icon: Image },
        { label: 'Word to PDF', href: `/${locale}/tools/word-to-pdf`, icon: FileText },
        { label: 'PPT to PDF', href: `/${locale}/tools/pptx-to-pdf`, icon: Presentation },
        { label: 'Excel to PDF', href: `/${locale}/tools/excel-to-pdf`, icon: Sheet },
        { label: 'HTML to PDF', href: `/${locale}/tools/html-to-pdf`, icon: Code2 },
      ],
    },
    {
      category: 'EDIT PDF',
      isAi: false,
      tools: [
        { label: 'Rotate PDF', href: `/${locale}/tools/rotate-pdf`, icon: RotateCw },
        { label: 'Page Numbers', href: `/${locale}/tools/page-numbers`, icon: Hash },
        { label: 'Watermark', href: `/${locale}/tools/add-watermark`, icon: Stamp },
        { label: 'Crop PDF', href: `/${locale}/tools/crop-pdf`, icon: Crop },
        { label: 'Edit PDF', href: `/${locale}/tools/edit-pdf`, icon: FileEdit },
        { label: 'PDF Forms', href: `/${locale}/tools/form-filler`, icon: FileSignature },
      ],
    },
    {
      category: 'SECURITY',
      isAi: false,
      tools: [
        { label: 'Protect PDF', href: `/${locale}/tools/encrypt-pdf`, icon: Lock },
        { label: 'Unlock PDF', href: `/${locale}/tools/decrypt-pdf`, icon: Unlock },
        { label: 'Sign PDF', href: `/${locale}/tools/sign-pdf`, icon: PenTool },
        { label: 'Redact PDF', href: `/${locale}/tools/redact-pdf`, icon: Eraser },
        { label: 'Compare PDF', href: `/${locale}/tools/compare-pdfs`, icon: GitCompare },
      ],
    },
    {
      category: '✦ AI',
      isAi: true,
      tools: [
        { 
          label: 'AI Summarizer', 
          href: `/${locale}/tools/ai-pdf-reflower`, 
          icon: Sparkles, 
          color: 'text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 font-semibold', 
          iconColor: 'text-amber-500 dark:text-amber-400' 
        },
        { 
          label: 'Translate PDF', 
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
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 shadow-xs'
          : 'bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-2 text-xl font-bold hover:opacity-95 transition-opacity"
              aria-label="iCreatePDF - Home"
            >
              <div className="relative flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-500/25 transition-transform group-hover:scale-105">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight flex items-center" data-testid="brand-name">
                <span className="text-zinc-950 dark:text-white">iCreate</span>
                <span className="text-white bg-red-600 px-1.5 py-0.5 rounded-md ml-1 text-xs font-black shadow-sm">PDF</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-semibold"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href={`/${locale}`}
              className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href={`/${locale}/tools`}
              className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Tools
            </Link>
            <Link
              href={`/${locale}/tools/merge-pdf`}
              className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Merge PDF
            </Link>
            <Link
              href={`/${locale}/tools/split-pdf`}
              className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Split PDF
            </Link>
            <Link
              href={`/${locale}/tools/compress-pdf`}
              className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Compress PDF
            </Link>

            {/* All Tools Mega Dropdown matching user mockup */}
            <div className="relative" ref={toolsDropdownRef}>
              <button
                onClick={() => {
                  setIsToolsDropdownOpen(!isToolsDropdownOpen);
                  setIsProductsMenuOpen(false);
                }}
                className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors py-2"
                aria-expanded={isToolsDropdownOpen}
              >
                <span>All Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180 text-red-600' : ''}`} />
              </button>

              {isToolsDropdownOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[1140px] max-w-[97vw] p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 text-zinc-900 dark:text-zinc-100"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
                    {organizedCategories.map((col) => (
                      <div key={col.category} className="flex flex-col">
                        {/* Column Header with bottom line */}
                        <div className={`text-[11px] font-bold uppercase tracking-wider pb-2 mb-3 border-b border-zinc-100 dark:border-zinc-800/80 ${
                          col.isAi ? 'text-amber-500 dark:text-amber-400' : 'text-zinc-400 dark:text-zinc-500'
                        }`}>
                          {col.category}
                        </div>

                        {/* Tools List */}
                        <ul className="space-y-1">
                          {col.tools.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  onClick={() => setIsToolsDropdownOpen(false)}
                                  className="group flex items-center gap-2.5 py-1.5 px-2 -mx-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                                >
                                  <IconComponent className={`w-4 h-4 flex-shrink-0 transition-colors ${
                                    item.iconColor || 'text-zinc-400 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-400'
                                  }`} />
                                  <span className={`transition-colors whitespace-nowrap ${
                                    item.color || 'text-zinc-700 dark:text-zinc-200 group-hover:text-red-600 dark:group-hover:text-red-400'
                                  }`}>
                                    {item.label}
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
              href={`/${locale}/blog`}
              className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Apps 4-Square Red Icon (Ecosystem Menu Popup) */}
            <div className="relative" ref={productsMenuRef}>
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

              {/* Ecosystem Products Modal Popup (Matches user's screenshot exactly) */}
              {isProductsMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-[740px] max-w-[95vw] p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 text-zinc-900 dark:text-zinc-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Column: OTHER PRODUCTS (5 cols) */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        OTHER PRODUCTS
                      </div>

                      <div className="space-y-2">
                        {/* iCreateIMG */}
                        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-zinc-900 dark:text-white">
                              iCreateIMG
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              Effortless image editing
                            </div>
                          </div>
                        </div>

                        {/* iCreateSign */}
                        <Link
                          href={`/${locale}/tools/sign-pdf`}
                          onClick={() => setIsProductsMenuOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                            <PenTool className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-zinc-900 dark:text-white">
                              iCreateSign
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              e-Signing made simple
                            </div>
                          </div>
                        </Link>

                        {/* iCreateAPI */}
                        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                            <Code2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-zinc-900 dark:text-white">
                              iCreateAPI
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              Document automation for developers
                            </div>
                          </div>
                        </div>

                        {/* Integrations */}
                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Blocks className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                            <span className="font-bold text-sm text-zinc-900 dark:text-white">
                              Integrations
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            Zapier, Make, Wordpress...
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column: SOLUTIONS & APPLICATIONS (4 cols) */}
                    <div className="md:col-span-4 space-y-5">
                      {/* SOLUTIONS */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2.5">
                          SOLUTIONS
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <BarChart3 className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                            <span className="font-bold text-sm text-zinc-900 dark:text-white">
                              Business
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Streamlined PDF workflows for teams
                          </div>
                        </div>
                      </div>

                      {/* APPLICATIONS */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2.5">
                          APPLICATIONS
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                              <Monitor className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                              <span className="font-bold text-sm text-zinc-900 dark:text-white">
                                Desktop App
                              </span>
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              For Mac and Windows
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                              <Smartphone className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                              <span className="font-bold text-sm text-zinc-900 dark:text-white">
                                Mobile App
                              </span>
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              For iOS and Android
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Links (3 cols) with left border */}
                    <div className="md:col-span-3 md:border-l border-zinc-100 dark:border-zinc-800 md:pl-5 space-y-1">
                      <Link
                        href={`/${locale}`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                      >
                        <CreditCard className="w-4 h-4 text-zinc-400" />
                        <span>Pricing</span>
                      </Link>

                      <Link
                        href={`/${locale}/privacy`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                      >
                        <Lock className="w-4 h-4 text-zinc-400" />
                        <span>Security</span>
                      </Link>

                      <Link
                        href={`/${locale}/tools`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                      >
                        <LayoutGrid className="w-4 h-4 text-zinc-400" />
                        <span>Features</span>
                      </Link>

                      <Link
                        href={`/${locale}/about`}
                        onClick={() => setIsProductsMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                      >
                        <Heart className="w-4 h-4 text-zinc-400" />
                        <span>About us</span>
                      </Link>

                      <div className="pt-3 my-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
                        <Link
                          href={`/${locale}/faq`}
                          onClick={() => setIsProductsMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                        >
                          <HelpCircle className="w-4 h-4 text-zinc-400" />
                          <span>Help & FAQ</span>
                        </Link>

                        <div className="px-3 py-1">
                          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" />
                            <span>100% Client-side</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector (Flag/Globe dropdown) */}
            <LanguageSelector currentLocale={locale} />

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
            <Link
              href={`/${locale}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
            >
              Home
            </Link>
            <Link
              href={`/${locale}/tools`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
            >
              Tools
            </Link>
            <Link
              href={`/${locale}/tools/merge-pdf`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
            >
              Merge PDF
            </Link>
            <Link
              href={`/${locale}/tools/split-pdf`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
            >
              Split PDF
            </Link>
            <Link
              href={`/${locale}/tools/compress-pdf`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
            >
              Compress PDF
            </Link>
            <Link
              href={`/${locale}/tools`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
            >
              All 67+ Tools →
            </Link>
            <Link
              href={`/${locale}/blog`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
            >
              Blog & Daily Guides
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
