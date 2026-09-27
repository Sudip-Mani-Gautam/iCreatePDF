import { locales, defaultLocale, type Locale, isValidLocale } from './config';
import { getLanguagePreference } from '@/components/layout/LanguageSelector';

/**
 * Maps complex browser language tags (e.g. zh-HK, pt-PT) to supported locales
 */
const REGIONAL_LOCALE_MAP: Record<string, Locale> = {
  'zh-tw': 'zh-TW',
  'zh-hk': 'zh-TW',
  'zh-mo': 'zh-TW',
  'zh-hant': 'zh-TW',
  'zh-cn': 'zh',
  'zh-sg': 'zh',
  'zh-hans': 'zh',
  'ne-np': 'ne',
  'ne': 'ne',
  'hi-in': 'hi',
  'hi': 'hi',
  'ms-my': 'ms',
  'ms': 'ms',
  'en-us': 'en',
  'en-gb': 'en',
  'en-au': 'en',
  'en-ca': 'en',
  'es-es': 'es',
  'es-mx': 'es',
  'fr-fr': 'fr',
  'de-de': 'de',
  'pt-br': 'pt',
  'pt-pt': 'pt',
  'it-it': 'it',
  'ja-jp': 'ja',
  'ko-kr': 'ko',
  'ar-sa': 'ar',
  'ar-ae': 'ar',
  'ar-eg': 'ar',
  'id-id': 'id',
  'vi-vn': 'vi',
  'ro-ro': 'ro',
  'pl-pl': 'pl',
};

/**
 * Match a raw browser language tag to a supported application locale
 */
export function matchLocale(tag: string): Locale | null {
  if (!tag) return null;
  const normalized = tag.trim().toLowerCase();

  // 1. Direct regional map match
  if (REGIONAL_LOCALE_MAP[normalized]) {
    return REGIONAL_LOCALE_MAP[normalized];
  }

  // 2. Direct exact match in locales
  const directMatch = locales.find((l) => l.toLowerCase() === normalized);
  if (directMatch) return directMatch;

  // 3. Primary language code match (e.g. "ne-NP" -> "ne", "es-AR" -> "es")
  const primaryLang = normalized.split('-')[0];
  const primaryMatch = locales.find((l) => l.toLowerCase() === primaryLang);
  if (primaryMatch) return primaryMatch;

  return null;
}

/**
 * Detect the best matching locale for the user based on:
 * 1. Saved localStorage language preference
 * 2. navigator.languages array (user's ordered preferred languages in browser settings)
 * 3. navigator.language (primary browser language)
 * 4. Fallback to defaultLocale ('en')
 */
export function detectBrowserLanguage(): Locale {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return defaultLocale;
  }

  try {
    // 1. Check user's stored preference first
    const stored = getLanguagePreference();
    if (stored && isValidLocale(stored)) {
      return stored as Locale;
    }

    // 2. Check navigator.languages list
    const candidateLanguages: string[] = [];
    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      candidateLanguages.push(...navigator.languages);
    }
    if (navigator.language) {
      candidateLanguages.push(navigator.language);
    }

    for (const rawTag of candidateLanguages) {
      const matched = matchLocale(rawTag);
      if (matched) {
        return matched;
      }
    }
  } catch (err) {
    console.warn('[i18n] Error during browser language detection:', err);
  }

  return defaultLocale;
}
