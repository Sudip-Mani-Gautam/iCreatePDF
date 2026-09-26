'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { type Locale, locales, getLocalizedPath } from '@/lib/i18n/config';
import { Button } from '@/components/ui/Button';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { ALL_LANGUAGES, getLanguageByCode, LanguageItem } from '@/config/languages';

export interface LanguageSelectorProps {
  currentLocale: Locale;
}

// Storage key for language preference
const LANGUAGE_PREFERENCE_KEY = 'icreatepdf-language-preference';

/**
 * Save language preference to localStorage
 */
export function saveLanguagePreference(locale: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_PREFERENCE_KEY, locale);
    try {
      document.documentElement.lang = locale;
    } catch {
      // Ignore if document not available
    }
  }
}

/**
 * Get language preference from localStorage
 */
export function getLanguagePreference(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  }
  return null;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLocale }) => {
  const t = useTranslations('common.buttons');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Get current language details
  const currentLang = useMemo(() => getLanguageByCode(currentLocale), [currentLocale]);

  // Group languages into 3 columns matching the reference layout
  const columns = useMemo(() => {
    return [
      ALL_LANGUAGES.filter((l) => l.column === 1),
      ALL_LANGUAGES.filter((l) => l.column === 2),
      ALL_LANGUAGES.filter((l) => l.column === 3),
    ];
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Focus option when focusedIndex changes
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        const currentIndex = ALL_LANGUAGES.findIndex((l) => l.code === currentLocale);
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      } else {
        setFocusedIndex(-1);
      }
      return !prev;
    });
  }, [currentLocale]);

  const handleButtonKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        const currentIndex = ALL_LANGUAGES.findIndex((l) => l.code === currentLocale);
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
    },
    [isOpen, currentLocale]
  );

  const handleLanguageSelect = useCallback(
    (lang: LanguageItem) => {
      saveLanguagePreference(lang.code);

      // If the selected language has a dedicated static route in locales, navigate to it
      if (locales.includes(lang.code as Locale)) {
        const newPath = getLocalizedPath(pathname, lang.code as Locale);
        router.push(newPath);
      } else {
        // For extended languages, update language preference and fallback smoothly
        const newPath = getLocalizedPath(pathname, 'en');
        router.push(newPath);
      }

      setIsOpen(false);
      setFocusedIndex(-1);
    },
    [pathname, router]
  );

  const handleOptionKeyDown = useCallback(
    (event: React.KeyboardEvent, lang: LanguageItem, index: number) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          handleLanguageSelect(lang);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => (prev < ALL_LANGUAGES.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : ALL_LANGUAGES.length - 1));
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(ALL_LANGUAGES.length - 1);
          break;
        case 'Escape':
        case 'Tab':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [handleLanguageSelect]
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button in Nav Bar */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        onKeyDown={handleButtonKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('selectLanguage') || 'Select Language'}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-all shadow-2xs hover:shadow-xs"
      >
        {/* National Flag Icon */}
        <CountryFlag
          countryCode={currentLang.countryCode}
          className="w-4.5 h-3.2 shadow-2xs"
          title={currentLang.name}
        />
        
        {/* Language Name */}
        <span className="hidden sm:inline text-xs font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {currentLang.nativeName}
        </span>

        {/* Chevron Indicator */}
        <ChevronDown
          className={`h-3 w-3 text-zinc-500 dark:text-zinc-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </Button>

      {/* Multi-Column Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2.5 w-[680px] max-w-[94vw] p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-3xl shadow-2xl shadow-zinc-900/15 dark:shadow-black/60 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="listbox"
          aria-label={t('selectLanguage') || 'Select Language'}
          aria-activedescendant={
            focusedIndex >= 0 ? `language-option-${ALL_LANGUAGES[focusedIndex]?.code}` : undefined
          }
        >
          {/* Top Header inside dropdown */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              <span>Select Your Language</span>
            </div>
            <div className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              {ALL_LANGUAGES.length} Languages Available
            </div>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-1">
            {columns.map((colLangs, colIdx) => (
              <div key={colIdx} className="flex flex-col space-y-0.5">
                {colLangs.map((lang) => {
                  const globalIndex = ALL_LANGUAGES.findIndex((l) => l.code === lang.code);
                  const isSelected = lang.code === currentLocale;

                  return (
                    <button
                      key={lang.code}
                      id={`language-option-${lang.code}`}
                      ref={(el) => {
                        optionRefs.current[globalIndex] = el;
                      }}
                      onClick={() => handleLanguageSelect(lang)}
                      onKeyDown={(e) => handleOptionKeyDown(e, lang, globalIndex)}
                      className={`
                        group flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-xl text-left text-sm transition-all
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600
                        ${
                          isSelected
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-950 dark:hover:text-white'
                        }
                      `}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={focusedIndex === globalIndex ? 0 : -1}
                    >
                      {/* Checkmark slot - ensures consistent alignment */}
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-zinc-950 dark:text-white" strokeWidth={2.5} aria-hidden="true" />
                        ) : null}
                      </div>

                      {/* Country Flag Badge */}
                      <CountryFlag
                        countryCode={lang.countryCode}
                        className="w-4.5 h-3.2 flex-shrink-0 transition-transform group-hover:scale-105"
                        title={lang.name}
                      />

                      {/* Native Language Label */}
                      <span className="truncate tracking-tight font-medium text-[13.5px]">
                        {lang.nativeName}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
