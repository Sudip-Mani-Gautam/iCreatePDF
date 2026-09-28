'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Twitter, Mail, Globe, Linkedin } from 'lucide-react';
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
      className="w-full border-t border-zinc-700 bg-[#323232] pt-10 sm:pt-14 pb-8 text-zinc-300"
      role="contentinfo"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 sm:gap-8 md:gap-10 mb-10">
          {/* Brand Column - full width on mobile */}
          <div className="flex flex-col gap-3.5 col-span-2 md:col-span-1">
            <Link
              href={`/${locale}`}
              className="group inline-flex items-center hover:opacity-90 transition-opacity"
              aria-label="iCreatePDF - Home"
            >
              <span className="flex items-center" data-testid="footer-brand-name">
                <img
                  src="/images/logo-dark.png"
                  alt="iCreatePDF"
                  className="h-10 sm:h-12 md:h-16 w-auto object-contain max-w-[170px] sm:max-w-none"
                />
                <span className="sr-only">iCreatePDF</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {t('footer.tagline') || t('tagline') || 'Your complete Offline PDF toolkit. 100% private, zero uploads, fast and browser-based.'}
            </p>

            <div className="flex gap-2.5 pt-1">
              <a
                href="https://sudipmanigautam.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-[#3e3e3e] border border-zinc-600 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Website: sudipmanigautam.com.np"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sudip-mani-gautam-038967285/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-[#3e3e3e] border border-zinc-600 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="LinkedIn: Sudip Mani Gautam"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/icreatepdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-[#3e3e3e] border border-zinc-600 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Twitter / X"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:sudipmanigautam3@gmail.com"
                className="p-2 sm:p-2.5 rounded-lg bg-[#3e3e3e] border border-zinc-600 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Email: sudipmanigautam3@gmail.com"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Resources Column */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
              {t('footer.resources') || 'Resources'}
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-zinc-400">
              <li>
                <Link href={`/${locale}/tools/merge-pdf`} className="hover:text-white transition-colors py-0.5 block">
                  {mergeTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/split-pdf`} className="hover:text-white transition-colors py-0.5 block">
                  {splitTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/compress-pdf`} className="hover:text-white transition-colors py-0.5 block">
                  {compressTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/edit-pdf`} className="hover:text-white transition-colors py-0.5 block">
                  {editTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/workflow`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.workflow') || 'Workflow Editor'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/help`} className="hover:text-white transition-colors py-0.5 block font-medium">
                  {t('navigation.faq') || 'Help Center'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
              {t('footer.company') || 'Company'}
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-zinc-400">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.about') || 'About us'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.contact') || 'Contact us'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.blog') || 'Blog'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/press`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.press') || 'Press'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
              {t('footer.legal') || 'Legal'}
            </h3>
            <ul className="grid grid-cols-2 sm:flex sm:flex-col gap-2 text-xs text-zinc-400">
              <li>
                <Link href={`/${locale}/security`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.security') || 'Security'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.privacy') || 'Privacy policy'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.terms') || 'Terms & conditions'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.cookies') || 'Cookies'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/license`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.license') || 'License (AGPL-3.0)'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/acknowledgements`} className="hover:text-white transition-colors py-0.5 block">
                  {t('navigation.acknowledgements') || 'Acknowledgements'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="py-5 sm:py-6 border-t border-zinc-700">
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <Globe className="h-4 w-4 text-zinc-400" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              {t('buttons.selectLanguage') || 'Select Language'}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {locales.map((loc) => {
              const config = localeConfig[loc];
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`
                    px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs rounded-full transition-all font-medium cursor-pointer
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
        <div className="pt-6 border-t border-zinc-700 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
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
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-xs">
            <Link href={`/${locale}/blog`} className="text-zinc-400 hover:text-white transition-colors py-0.5">{t('navigation.blog') || 'Blog'}</Link>
            <Link href={`/${locale}/privacy`} className="text-zinc-400 hover:text-white transition-colors py-0.5">{t('navigation.privacy') || 'Privacy'}</Link>
            <Link href={`/${locale}/license`} className="text-zinc-400 hover:text-white transition-colors py-0.5">{t('navigation.license') || 'License (AGPL-3.0)'}</Link>
            <Link href={`/${locale}/acknowledgements`} className="text-zinc-400 hover:text-white transition-colors py-0.5">{t('navigation.acknowledgements') || 'Acknowledgements'}</Link>
            <a href="https://github.com/Sudip-Mani-Gautam/iCreatePDF" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 hover:underline font-medium py-0.5">
              {locale === 'ne' ? 'स्रोत कोड (GitHub)' : locale === 'hi' ? 'स्रोत कोड (GitHub)' : locale === 'ms' ? 'Kod Sumber (GitHub)' : 'Source Code (GitHub)'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
