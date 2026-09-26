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
  LayoutGrid,
  Heart,
  HelpCircle,
  Globe
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

export interface HeaderProps {
  locale: Locale;
  showSearch?: boolean;
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

  // Comprehensive categorized list of tools for the "All Tools ▾" mega menu
  const toolColumns = [
    {
      title: 'Organize & Manage',
      tools: [
        { label: 'Merge PDF', href: `/${locale}/tools/merge-pdf`, desc: 'Combine multiple PDFs into one document' },
        { label: 'Split PDF', href: `/${locale}/tools/split-pdf`, desc: 'Separate pages into individual files' },
        { label: 'Remove Pages', href: `/${locale}/tools/remove-pages`, desc: 'Delete unwanted pages instantly' },
        { label: 'Extract Pages', href: `/${locale}/tools/extract-pages`, desc: 'Pull specific pages into a new file' },
        { label: 'Organize PDF', href: `/${locale}/tools/organize-pdf`, desc: 'Sort, reorder, rotate or remove pages' },
        { label: 'Scan to PDF', href: `/${locale}/tools/scan-pdf`, desc: 'Capture documents using your camera' },
        { label: 'Alternate Merge', href: `/${locale}/tools/alternate-merge`, desc: 'Collate odd and even page scans' },
      ],
    },
    {
      title: 'Optimize & Convert To PDF',
      tools: [
        { label: 'Compress PDF', href: `/${locale}/tools/compress-pdf`, desc: 'Reduce file size with optimum quality' },
        { label: 'Repair PDF', href: `/${locale}/tools/repair-pdf`, desc: 'Recover damaged or unreadable PDFs' },
        { label: 'OCR PDF', href: `/${locale}/tools/ocr-pdf`, desc: 'Turn scanned documents into searchable text' },
        { label: 'JPG to PDF', href: `/${locale}/tools/jpg-to-pdf`, desc: 'Convert JPG/PNG images to PDF' },
        { label: 'Word to PDF', href: `/${locale}/tools/word-to-pdf`, desc: 'Convert DOCX documents to PDF format' },
        { label: 'PowerPoint to PDF', href: `/${locale}/tools/powerpoint-to-pdf`, desc: 'Convert PPTX presentations to PDF' },
        { label: 'Excel to PDF', href: `/${locale}/tools/excel-to-pdf`, desc: 'Convert spreadsheets to PDF sheets' },
        { label: 'HTML to PDF', href: `/${locale}/tools/html-to-pdf`, desc: 'Save webpages directly to PDF' },
      ],
    },
    {
      title: 'Convert From PDF & Edit',
      tools: [
        { label: 'PDF to JPG', href: `/${locale}/tools/pdf-to-jpg`, desc: 'Extract pages as high-resolution images' },
        { label: 'PDF to Word', href: `/${locale}/tools/pdf-to-word`, desc: 'Convert PDF into editable DOCX' },
        { label: 'PDF to PowerPoint', href: `/${locale}/tools/pdf-to-powerpoint`, desc: 'Turn slides into PPTX decks' },
        { label: 'PDF to Excel', href: `/${locale}/tools/pdf-to-excel`, desc: 'Extract tabular data to spreadsheets' },
        { label: 'PDF to PDF/A', href: `/${locale}/tools/pdf-to-pdfa`, desc: 'Convert to ISO archiving standard' },
        { label: 'Rotate PDF', href: `/${locale}/tools/rotate-pdf`, desc: 'Rotate portrait and landscape pages' },
        { label: 'Add Page Numbers', href: `/${locale}/tools/page-numbers`, desc: 'Insert custom headers and numbering' },
        { label: 'Add Watermark', href: `/${locale}/tools/watermark`, desc: 'Stamp text or image watermarks' },
        { label: 'Edit PDF', href: `/${locale}/tools/edit-pdf`, desc: 'Add text, shapes, and annotations' },
      ],
    },
    {
      title: 'Security & Sign',
      tools: [
        { label: 'Unlock PDF', href: `/${locale}/tools/unlock-pdf`, desc: 'Remove password and restrictions' },
        { label: 'Protect PDF', href: `/${locale}/tools/protect-pdf`, desc: 'Encrypt with military-grade AES-256' },
        { label: 'Sign PDF', href: `/${locale}/tools/sign-pdf`, desc: 'Add digital or typed signatures' },
        { label: 'Redact PDF', href: `/${locale}/tools/redact-pdf`, desc: 'Black out sensitive text and figures' },
        { label: 'Compare PDF', href: `/${locale}/tools/compare-pdf`, desc: 'Highlight visual differences side-by-side' },
        { label: 'Flatten PDF', href: `/${locale}/tools/flatten-pdf`, desc: 'Merge form fields and layers into one' },
        { label: 'Grayscale PDF', href: `/${locale}/tools/grayscale-pdf`, desc: 'Convert color PDFs to black & white' },
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

            {/* All Tools Mega Dropdown */}
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
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[860px] max-w-[95vw] max-h-[85vh] overflow-y-auto p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
                    {toolColumns.map((col) => (
                      <div key={col.title} className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                          {col.title}
                        </div>
                        <ul className="space-y-1.5">
                          {col.tools.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setIsToolsDropdownOpen(false)}
                                className="block group p-1.5 -mx-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors"
                              >
                                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                  {item.label}
                                </div>
                                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                  {item.desc}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Over 67+ tools running 100% offline in your browser.
                    </span>
                    <Link
                      href={`/${locale}/tools`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                      className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 flex items-center gap-1 hover:gap-1.5 transition-all"
                    >
                      Explore All 67+ Tools <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
