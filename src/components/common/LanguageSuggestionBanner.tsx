'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Globe, ArrowRight } from 'lucide-react';
import { type Locale, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { detectBrowserLanguage } from '@/lib/i18n/detectBrowserLanguage';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getLanguageByCode } from '@/config/languages';
import { saveLanguagePreference } from '@/components/layout/LanguageSelector';

export interface LanguageSuggestionBannerProps {
  currentLocale: Locale;
}

export const LanguageSuggestionBanner: React.FC<LanguageSuggestionBannerProps> = ({
  currentLocale,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [suggestedLocale, setSuggestedLocale] = useState<Locale | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      // Check session storage to see if user already dismissed
      const dismissed = sessionStorage.getItem('dismissed-lang-suggestion');
      if (dismissed) return;

      const detected = detectBrowserLanguage();

      // Only suggest if detected locale is different from current URL locale
      if (detected && detected !== currentLocale) {
        setSuggestedLocale(detected);
        // Small delay so it smoothly slides in without layout thrashing
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if browser environment restrictions
    }
  }, [currentLocale]);

  if (!suggestedLocale || !isVisible) {
    return null;
  }

  const detectedConfig = localeConfig[suggestedLocale];
  const detectedLangInfo = getLanguageByCode(suggestedLocale);

  const handleSwitch = () => {
    saveLanguagePreference(suggestedLocale);
    sessionStorage.setItem('dismissed-lang-suggestion', suggestedLocale);
    setIsVisible(false);
    const newPath = getLocalizedPath(pathname, suggestedLocale);
    router.push(newPath);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('dismissed-lang-suggestion', suggestedLocale);
    setIsVisible(false);
  };

  return (
    <aside
      aria-label="Language suggestion"
      className="fixed bottom-5 right-5 z-50 max-w-sm sm:max-w-md p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-900/20 dark:shadow-black/60 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <CountryFlag
          countryCode={detectedLangInfo.countryCode}
          className="w-6 h-4.5 mt-0.5 shadow-2xs flex-shrink-0"
        />

        <div className="flex-1 text-xs">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            {detectedConfig.nativeName} ({detectedConfig.name}) मा हेर्न चाहनुहुन्छ?
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
            We detected that your browser language is set to{' '}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {detectedConfig.nativeName}
            </span>
            . Switch to view iCreatePDF in your preferred language.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwitch}
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>{detectedConfig.nativeName} मा बदल्नुहोस्</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium text-xs transition-colors"
            >
              Stay in {localeConfig[currentLocale]?.nativeName || currentLocale}
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 -mr-1 -mt-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Dismiss language suggestion"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default LanguageSuggestionBanner;
