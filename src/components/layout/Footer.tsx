'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Shield, Lock, FileCheck, Github, Twitter, Mail, Globe } from 'lucide-react';
import { type Locale, locales, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { saveLanguagePreference } from './LanguageSelector';
import { getToolContent } from '@/config/tool-content';

export interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  // Localized tool titles
  const mergeTitle = getToolContent(locale, 'merge-pdf')?.title || 'Merge PDF';
  const splitTitle = getToolContent(locale, 'split-pdf')?.title || 'Split PDF';
  const compressTitle = getToolContent(locale, 'compress-pdf')?.title || 'Compress PDF';
  const editTitle = getToolContent(locale, 'edit-pdf')?.title || 'Edit PDF';

  return (
    <footer
      className="w-full border-t border-zinc-700 bg-[#323232] pt-16 pb-8 text-zinc-300"
      role="contentinfo"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6">
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M9 15h6" />
                  <path d="M12 12v6" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight flex items-center" data-testid="footer-brand-name">
                <span className="text-white">iCreate</span>
                <span className="text-white bg-red-600 px-1.5 py-0.5 rounded-md ml-1 text-xs font-black shadow-sm">PDF</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
              {t('footer.tagline') || t('tagline') || 'Your complete offline PDF toolkit. 100% private, zero uploads, fast and browser-based.'}
            </p>

            <div className="flex gap-3 pt-2">
              <a href="https://github.com/Sudip-Mani-Gautam/iCreatePDF" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#3e3e3e] border border-zinc-600 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all" title="Source Code on GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/icreatepdf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#3e3e3e] border border-zinc-600 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all" title="Twitter / X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:sudipmanigautam3@gmail.com" className="p-2 rounded-lg bg-[#3e3e3e] border border-zinc-600 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all" title="Email: sudipmanigautam3@gmail.com">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('footer.resources') || 'Resources'}
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <Link href={`/${locale}/tools/merge-pdf`} className="hover:text-white transition-colors">
                  {mergeTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/split-pdf`} className="hover:text-white transition-colors">
                  {splitTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/compress-pdf`} className="hover:text-white transition-colors">
                  {compressTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/edit-pdf`} className="hover:text-white transition-colors">
                  {editTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/workflow`} className="hover:text-white transition-colors">
                  {t('navigation.workflow') || 'Workflow Editor'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="hover:text-white transition-colors font-medium">
                  {t('navigation.faq') || 'Help & FAQ'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('footer.company') || 'Company'}
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                  {t('navigation.about') || 'About us'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                  {t('navigation.contact') || 'Contact us'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
                  {t('navigation.blog') || 'Blog'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/press`} className="hover:text-white transition-colors">
                  {t('navigation.press') || 'Press'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('footer.legal') || 'Legal'}
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <Link href={`/${locale}/security`} className="hover:text-white transition-colors">
                  {t('navigation.security') || 'Security'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                  {t('navigation.privacy') || 'Privacy policy'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
                  {t('navigation.terms') || 'Terms & conditions'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">
                  {t('navigation.cookies') || 'Cookies'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/license`} className="hover:text-white transition-colors">
                  {t('navigation.license') || 'License (AGPL-3.0)'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/acknowledgements`} className="hover:text-white transition-colors">
                  {t('navigation.acknowledgements') || 'Acknowledgements'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="py-6 border-t border-zinc-700">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-semibold text-white">
              {t('buttons.selectLanguage') || 'Select Language'}
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
                    px-3 py-1.5 text-xs rounded-full transition-all font-medium cursor-pointer
                    ${isActive
                      ? 'bg-red-600 text-white shadow-sm font-bold'
                      : 'bg-[#3e3e3e] border border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white'
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
        <div className="pt-8 border-t border-zinc-700 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-xs text-zinc-400 space-y-1">
            <p>
              &copy; {currentYear} {t('brand') || 'iCreatePDF'}. {locale === 'ne' ? 'इजाजतपत्र: ' : locale === 'hi' ? 'लाइसेंस: ' : locale === 'ms' ? 'Dilesenkan di bawah ' : 'Licensed under '}
              <Link href={`/${locale}/license`} className="underline hover:text-white text-zinc-300">
                GNU AGPLv3
              </Link>.
            </p>
            <p className="text-[11px] text-zinc-400">
              {locale === 'ne'
                ? 'खुला स्रोत PDFCraft र BentoPDF मा आधारित। निःशुल्क र खुला स्रोत सफ्टवेयर।'
                : locale === 'hi'
                ? 'ओपन-सोर्स PDFCraft और BentoPDF पर आधारित। निःशुल्क और खुला स्रोत सॉफ़्टवेयर।'
                : locale === 'ms'
                ? 'Berasaskan sumber terbuka PDFCraft & BentoPDF. Perisian percuma & sumber terbuka.'
                : 'Based on open-source PDFCraft & BentoPDF. Free & open-source software.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-5">
            <Link href={`/${locale}/blog`} className="text-xs text-zinc-400 hover:text-white transition-colors">{t('navigation.blog') || 'Blog'}</Link>
            <Link href={`/${locale}/privacy`} className="text-xs text-zinc-400 hover:text-white transition-colors">{t('navigation.privacy') || 'Privacy'}</Link>
            <Link href={`/${locale}/license`} className="text-xs text-zinc-400 hover:text-white transition-colors">{t('navigation.license') || 'License (AGPL-3.0)'}</Link>
            <Link href={`/${locale}/acknowledgements`} className="text-xs text-zinc-400 hover:text-white transition-colors">{t('navigation.acknowledgements') || 'Acknowledgements'}</Link>
            <a href="https://github.com/Sudip-Mani-Gautam/iCreatePDF" target="_blank" rel="noopener noreferrer" className="text-xs text-red-400 hover:text-red-300 hover:underline font-medium">
              {locale === 'ne' ? 'स्रोत कोड (GitHub)' : locale === 'hi' ? 'स्रोत कोड (GitHub)' : locale === 'ms' ? 'Kod Sumber (GitHub)' : 'Source Code (GitHub)'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
