'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Shield, Lock, FileCheck, Github, Twitter, Mail, Globe } from 'lucide-react';
import { type Locale, locales, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { saveLanguagePreference } from './LanguageSelector';

export interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const footerLinks = [
    { href: `/${locale}/blog`, label: t('navigation.blog') || 'Blog' },
    { href: `/${locale}/about`, label: t('navigation.about') },
    { href: `/${locale}/faq`, label: t('navigation.faq') },
    { href: `/${locale}/privacy`, label: t('navigation.privacy') },
    { href: `/${locale}/license`, label: t('navigation.license') || 'License' },
    { href: `/${locale}/acknowledgements`, label: t('navigation.acknowledgements') || 'Acknowledgements' },
    { href: `/${locale}/contact`, label: t('navigation.contact') },
  ];

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  return (
    <footer
      className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950 pt-16 pb-8"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-2 text-xl font-bold"
              aria-label="iCreatePDF - Home"
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white shadow-md shadow-red-500/25 transition-transform group-hover:scale-105">
                <svg
                  className="h-4.5 w-4.5 text-white"
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
              <span className="text-xl font-extrabold tracking-tight flex items-center" data-testid="footer-brand-name">
                <span className="text-zinc-900 dark:text-white">iCreate</span>
                <span className="text-white bg-red-600 px-1.5 py-0.5 rounded-md ml-1 text-xs font-black shadow-sm">PDF</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Your complete offline PDF toolkit. 100% private, zero uploads, fast and browser-based.
            </p>

            <div className="flex gap-3 pt-2">
              <a href="https://github.com/PDFCraftTool/pdfcraft" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-red-600 hover:text-white transition-all" title="Source Code on GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/icreatepdf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-red-600 hover:text-white transition-all" title="Twitter / X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={`/${locale}/contact`} className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-red-600 hover:text-white transition-all" title="Contact Us">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href={`/${locale}/tools/merge-pdf`} className="hover:text-red-600 transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/split-pdf`} className="hover:text-red-600 transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/compress-pdf`} className="hover:text-red-600 transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/edit-pdf`} className="hover:text-red-600 transition-colors">
                  Edit PDF
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools`} className="hover:text-red-600 transition-colors font-medium">
                  All 67+ PDF Tools →
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/workflow`} className="hover:text-red-600 transition-colors">
                  Workflow Editor
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-red-600 transition-colors font-medium">
                  Blog & Daily Guides
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="hover:text-red-600 transition-colors">
                  FAQ & Help
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-red-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">
              Legal & Open Source
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/license`} className="hover:text-red-600 transition-colors font-medium">
                  License (AGPL-3.0)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/acknowledgements`} className="hover:text-red-600 transition-colors">
                  Acknowledgements & Credits
                </Link>
              </li>
              <li>
                <a href="https://github.com/PDFCraftTool/pdfcraft" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  Source Code (GitHub)
                </a>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-red-600 transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="py-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {t('buttons.selectLanguage')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {locales.map((loc) => {
              const config = localeConfig[loc];
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`
                    px-3 py-1.5 text-xs rounded-full transition-all font-medium
                    ${isActive
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }
                  `}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {config.nativeName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Copyright & AGPL-3.0 Open Source Notice */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
            <p>
              &copy; {currentYear} {t('brand')}. Licensed under{' '}
              <Link href={`/${locale}/license`} className="underline hover:text-zinc-900 dark:hover:text-white">
                GNU AGPLv3
              </Link>.
            </p>
            <p className="text-[11px] opacity-80">
              Based on open-source{' '}
              <a href="https://github.com/PDFCraftTool/pdfcraft" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900 dark:hover:text-white">
                PDFCraft
              </a>{' '}
              & BentoPDF. Free & open-source software.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-5">
            <Link href={`/${locale}/blog`} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Blog</Link>
            <Link href={`/${locale}/privacy`} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Privacy</Link>
            <Link href={`/${locale}/license`} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">License (AGPLv3)</Link>
            <Link href={`/${locale}/acknowledgements`} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Acknowledgements</Link>
            <a href="https://github.com/PDFCraftTool/pdfcraft" target="_blank" rel="noopener noreferrer" className="text-xs text-red-600 dark:text-red-400 hover:underline font-medium">
              Source Code (GitHub)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

