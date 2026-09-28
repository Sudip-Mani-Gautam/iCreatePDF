'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, ArrowRight, Languages } from 'lucide-react';
import { type Locale, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { detectBrowserLanguage } from '@/lib/i18n/detectBrowserLanguage';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getLanguageByCode } from '@/config/languages';
import { saveLanguagePreference, getLanguagePreference } from '@/components/layout/LanguageSelector';

export interface LanguageSuggestionBannerProps {
  currentLocale: Locale;
}

export const LanguageSuggestionBanner: React.FC<LanguageSuggestionBannerProps> = ({
  currentLocale,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showSwitchToEnglish, setShowSwitchToEnglish] = useState(false);
  const [autoConvertedNotice, setAutoConvertedNotice] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const stored = getLanguagePreference();

      // 1. AUTO-CONVERSION:
      // If user hasn't set an explicit language preference yet,
      // and their browser is set to a supported non-English language (e.g. Nepali 'ne'),
      // automatically convert/redirect from English to their detected language!
      if (!stored && currentLocale === 'en') {
        const detected = detectBrowserLanguage();
        if (detected && detected !== 'en') {
          // Mark that this was auto-converted so the destination page knows
          sessionStorage.setItem('icreatepdf_auto_converted', detected);
          const newPath = getLocalizedPath(pathname, detected);
          router.replace(newPath);
          return;
        }
      }

      // 2. "SWITCH TO ENGLISH?" PROMPT:
      // When on a non-English locale, check if user dismissed the prompt
      if (currentLocale !== 'en') {
        const dismissed = sessionStorage.getItem('dismissed-switch-to-en');
        if (dismissed) return;

        // Check if this was just auto-converted or if user might want English
        const wasAutoConverted = sessionStorage.getItem('icreatepdf_auto_converted') === currentLocale;
        if (wasAutoConverted) {
          setAutoConvertedNotice(true);
        }

        // Display after slight delay
        const timer = setTimeout(() => setShowSwitchToEnglish(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if browser environment restrictions
    }
  }, [currentLocale, pathname, router]);

  if (!showSwitchToEnglish || currentLocale === 'en') {
    return null;
  }

  const currentConfig = localeConfig[currentLocale];
  const currentLangInfo = getLanguageByCode(currentLocale);
  const englishLangInfo = getLanguageByCode('en');

  const handleSwitchToEnglish = () => {
    saveLanguagePreference('en');
    sessionStorage.setItem('dismissed-switch-to-en', 'true');
    setShowSwitchToEnglish(false);
    const newPath = getLocalizedPath(pathname, 'en');
    router.push(newPath);
  };

  const handleStayInCurrent = () => {
    saveLanguagePreference(currentLocale);
    sessionStorage.setItem('dismissed-switch-to-en', 'true');
    setShowSwitchToEnglish(false);
  };

  // Localized texts based on current language
  const isNepali = currentLocale === 'ne';

  return (
    <aside
      aria-label="Language switch recommendation"
      className="fixed bottom-5 right-5 z-40 max-w-sm sm:max-w-md p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800 shadow-2xl shadow-zinc-900/15 dark:shadow-black/60 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5">
          <Languages className="w-4 h-4" />
        </div>

        <div className="flex-1 text-xs">
          <div className="flex items-center gap-1.5 mb-1">
            <CountryFlag
              countryCode={englishLangInfo.countryCode}
              className="w-4 h-3 rounded-xs shadow-2xs flex-shrink-0"
            />
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              {isNepali ? 'अंग्रेजी (English) मा हेर्न चाहनुहुन्छ?' : 'Would you like to switch to English?'}
            </p>
          </div>

          <p className="text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
            {autoConvertedNotice ? (
              isNepali ? (
                <>तपाईंको ब्राउजर अनुसार <span className="font-medium text-zinc-800 dark:text-zinc-200">नेपाली</span> मा देखाइएको छ। के तपाईं अंग्रेजीमा बदल्न चाहनुहुन्छ?</>
              ) : (
                <>Automatically switched to <span className="font-medium text-zinc-800 dark:text-zinc-200">{currentConfig?.nativeName || currentLocale}</span> based on your browser. Switch to English anytime.</>
              )
            ) : (
              isNepali ? (
                <>iCreatePDF लाई अंग्रेजी भाषामा पनि चलाउन सक्नुहुन्छ।</>
              ) : (
                <>You are currently viewing iCreatePDF in <span className="font-medium text-zinc-800 dark:text-zinc-200">{currentConfig?.nativeName || currentLocale}</span>. Would you prefer English?</>
              )
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwitchToEnglish}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>{isNepali ? 'अंग्रेजीमा बदल्नुहोस्' : 'Switch to English'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleStayInCurrent}
              className="px-3 py-1.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-medium text-xs transition-colors cursor-pointer"
            >
              {isNepali ? 'नेपालीमै राख्नुहोस्' : `Stay in ${currentConfig?.nativeName || currentLocale}`}
            </button>
          </div>
        </div>

        <button
          onClick={handleStayInCurrent}
          className="p-1 -mr-1 -mt-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Dismiss language suggestion"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default LanguageSuggestionBanner;
