export interface LanguageItem {
  code: string;
  name: string;
  nativeName: string;
  countryCode: string;
  direction?: 'ltr' | 'rtl';
  column: 1 | 2 | 3;
}

export const ALL_LANGUAGES: LanguageItem[] = [
  // Column 1
  { code: 'en', name: 'English', nativeName: 'English', countryCode: 'US', direction: 'ltr', column: 1 },
  { code: 'es', name: 'Spanish', nativeName: 'Español', countryCode: 'ES', direction: 'ltr', column: 1 },
  { code: 'fr', name: 'French', nativeName: 'Français', countryCode: 'FR', direction: 'ltr', column: 1 },
  { code: 'de', name: 'German', nativeName: 'Deutsch', countryCode: 'DE', direction: 'ltr', column: 1 },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', countryCode: 'IT', direction: 'ltr', column: 1 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', countryCode: 'PT', direction: 'ltr', column: 1 },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', countryCode: 'JP', direction: 'ltr', column: 1 },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', countryCode: 'RU', direction: 'ltr', column: 1 },
  { code: 'ko', name: 'Korean', nativeName: '한국어', countryCode: 'KR', direction: 'ltr', column: 1 },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', countryCode: 'CN', direction: 'ltr', column: 1 },

  // Column 2
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文 (繁體)', countryCode: 'TW', direction: 'ltr', column: 2 },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', countryCode: 'SA', direction: 'rtl', column: 2 },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', countryCode: 'BG', direction: 'ltr', column: 2 },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', countryCode: 'CA', direction: 'ltr', column: 2 },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', countryCode: 'NL', direction: 'ltr', column: 2 },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', countryCode: 'GR', direction: 'ltr', column: 2 },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', countryCode: 'IN', direction: 'ltr', column: 2 },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', countryCode: 'ID', direction: 'ltr', column: 2 },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', countryCode: 'MY', direction: 'ltr', column: 2 },

  // Column 3
  { code: 'pl', name: 'Polish', nativeName: 'Polski', countryCode: 'PL', direction: 'ltr', column: 3 },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', countryCode: 'SE', direction: 'ltr', column: 3 },
  { code: 'th', name: 'Thai', nativeName: 'ภาษาไทย', countryCode: 'TH', direction: 'ltr', column: 3 },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', countryCode: 'TR', direction: 'ltr', column: 3 },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', countryCode: 'UA', direction: 'ltr', column: 3 },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', countryCode: 'VN', direction: 'ltr', column: 3 },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', countryCode: 'RO', direction: 'ltr', column: 3 },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', countryCode: 'KE', direction: 'ltr', column: 3 },
];

export const getLanguageByCode = (code: string): LanguageItem => {
  const found = ALL_LANGUAGES.find((lang) => lang.code === code);
  return (
    found || {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      countryCode: 'US',
      direction: 'ltr',
      column: 1,
    }
  );
};
