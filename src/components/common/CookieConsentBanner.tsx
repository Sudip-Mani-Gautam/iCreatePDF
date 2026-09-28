'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Shield, Check, X, ArrowUpRight } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';

export interface CookieConsentBannerProps {
  locale: Locale;
}

const COOKIE_CONSENT_KEY = 'icreatepdf_cookie_consent';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ locale }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Delay slightly for smooth page entrance
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable or restricted
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'essential');
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Cookie consent notification"
      className="fixed bottom-5 left-5 z-50 max-w-sm sm:max-w-md w-[calc(100%-2.5rem)] p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800 shadow-2xl shadow-zinc-900/15 dark:shadow-black/60 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400 shadow-xs">
          <Cookie className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Cookie &amp; Privacy Notice
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                <Shield className="w-2.5 h-2.5" />
                Zero Tracking
              </span>
            </div>
            <button
              onClick={handleEssentialOnly}
              className="p-1 -mr-1 -mt-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
            iCreatePDF processes files <span className="font-semibold text-zinc-800 dark:text-zinc-200">100% locally</span> in your browser. We only use essential local storage to remember your theme and language preferences. No tracking or marketing cookies are ever used.
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px]">
            <Link
              href={`/${locale}/cookies`}
              className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5 font-medium"
            >
              Cookie Policy
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <Link
              href={`/${locale}/privacy`}
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:underline inline-flex items-center gap-0.5"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Essential</span>
            </button>
            <button
              onClick={handleEssentialOnly}
              className="px-3 py-1.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-medium text-xs transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CookieConsentBanner;
