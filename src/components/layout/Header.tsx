'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Menu, 
  X, 
  ChevronDown, 
  LayoutGrid, 
  ArrowRight,
  Combine,
  Scissors,
  Minimize2,
  FileEdit,
  Lock,
  Layers
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close tools dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const featuredToolCategories = [
    {
      name: 'Organize',
      tools: [
        { label: 'Merge PDF', href: `/${locale}/tools/merge-pdf`, desc: 'Combine multiple PDFs into one' },
        { label: 'Split PDF', href: `/${locale}/tools/split-pdf`, desc: 'Separate pages into distinct files' },
        { label: 'Organize PDF', href: `/${locale}/tools/organize-pdf`, desc: 'Reorder, rotate, or delete pages' },
      ],
    },
    {
      name: 'Optimize & Convert',
      tools: [
        { label: 'Compress PDF', href: `/${locale}/tools/compress-pdf`, desc: 'Shrink file size without losing quality' },
        { label: 'Word to PDF', href: `/${locale}/tools/word-to-pdf`, desc: 'Convert DOCX documents to PDF' },
        { label: 'PDF to Word', href: `/${locale}/tools/pdf-to-word`, desc: 'Convert PDF back into editable Word' },
      ],
    },
    {
      name: 'Edit & Security',
      tools: [
        { label: 'Edit PDF', href: `/${locale}/tools/edit-pdf`, desc: 'Add text, drawings, and annotations' },
        { label: 'Protect PDF', href: `/${locale}/tools/protect-pdf`, desc: 'Encrypt files with AES-256 password' },
        { label: 'Sign PDF', href: `/${locale}/tools/sign-pdf`, desc: 'Draw, type, or upload digital signature' },
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors py-2"
                aria-expanded={isToolsDropdownOpen}
              >
                <span>All Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180 text-red-600' : ''}`} />
              </button>

              {isToolsDropdownOpen && (
                <div
                  onMouseLeave={() => setIsToolsDropdownOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[600px] p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="grid grid-cols-3 gap-6 mb-4">
                    {featuredToolCategories.map((cat) => (
                      <div key={cat.name} className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-red-600">
                          {cat.name}
                        </div>
                        <ul className="space-y-2">
                          {cat.tools.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setIsToolsDropdownOpen(false)}
                                className="block group p-1.5 -mx-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                              >
                                <div className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-red-600 transition-colors">
                                  {item.label}
                                </div>
                                <div className="text-[11px] text-zinc-400 line-clamp-1">
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
                    <span className="text-xs text-zinc-500">Over 80+ tools running 100% offline.</span>
                    <Link
                      href={`/${locale}/tools`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 hover:gap-1.5 transition-all"
                    >
                      Browse All Tools <ArrowRight className="w-3.5 h-3.5" />
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
            {/* Apps 9-Dot Grid Icon */}
            <Link
              href={`/${locale}/tools`}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              title="All 80+ PDF Tools Grid"
              aria-label="Open Tools Grid"
            >
              <LayoutGrid className="w-5 h-5" />
            </Link>

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
              All 80+ Tools →
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
