'use client';

import React from 'react';

export interface CountryFlagProps {
  countryCode: string;
  className?: string;
  title?: string;
}

/**
 * Universal SVG Country Flag component.
 * Renders authentic vector flags with crisp national colors that work
 * identically across Windows, macOS, iOS, Android, and Linux (bypassing
 * the Windows lack of emoji flags).
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  className = 'w-5 h-3.5',
  title,
}) => {
  const code = (countryCode || '').toUpperCase();

  const renderFlagContent = () => {
    switch (code) {
      // 1. United States (English)
      case 'US':
        return (
          <>
            <rect width="20" height="14" fill="#B22234" />
            <rect y="1.08" width="20" height="1.08" fill="#FFFFFF" />
            <rect y="3.24" width="20" height="1.08" fill="#FFFFFF" />
            <rect y="5.4" width="20" height="1.08" fill="#FFFFFF" />
            <rect y="7.56" width="20" height="1.08" fill="#FFFFFF" />
            <rect y="9.72" width="20" height="1.08" fill="#FFFFFF" />
            <rect y="11.88" width="20" height="1.08" fill="#FFFFFF" />
            <rect width="8" height="7.56" fill="#3C3B6E" />
            {/* Stars representation */}
            <circle cx="2" cy="1.6" r="0.5" fill="#FFFFFF" />
            <circle cx="4" cy="1.6" r="0.5" fill="#FFFFFF" />
            <circle cx="6" cy="1.6" r="0.5" fill="#FFFFFF" />
            <circle cx="3" cy="2.8" r="0.5" fill="#FFFFFF" />
            <circle cx="5" cy="2.8" r="0.5" fill="#FFFFFF" />
            <circle cx="2" cy="4" r="0.5" fill="#FFFFFF" />
            <circle cx="4" cy="4" r="0.5" fill="#FFFFFF" />
            <circle cx="6" cy="4" r="0.5" fill="#FFFFFF" />
            <circle cx="3" cy="5.2" r="0.5" fill="#FFFFFF" />
            <circle cx="5" cy="5.2" r="0.5" fill="#FFFFFF" />
            <circle cx="2" cy="6.4" r="0.5" fill="#FFFFFF" />
            <circle cx="4" cy="6.4" r="0.5" fill="#FFFFFF" />
            <circle cx="6" cy="6.4" r="0.5" fill="#FFFFFF" />
          </>
        );

      // 2. Spain (Español)
      case 'ES':
        return (
          <>
            <rect width="20" height="3.5" fill="#AA151B" />
            <rect y="3.5" width="20" height="7" fill="#F1BF00" />
            <rect y="10.5" width="20" height="3.5" fill="#AA151B" />
            {/* Coat of arms */}
            <rect x="4" y="5.2" width="2.4" height="3.6" rx="0.8" fill="#AA151B" />
            <circle cx="5.2" cy="4.5" r="0.7" fill="#F1BF00" />
            <rect x="4.4" y="5.8" width="1.6" height="2.2" fill="#F1BF00" />
          </>
        );

      // 3. France (Français)
      case 'FR':
        return (
          <>
            <rect width="6.67" height="14" fill="#002654" />
            <rect x="6.67" width="6.66" height="14" fill="#FFFFFF" />
            <rect x="13.33" width="6.67" height="14" fill="#CE1126" />
          </>
        );

      // 4. Germany (Deutsch)
      case 'DE':
        return (
          <>
            <rect width="20" height="4.67" fill="#000000" />
            <rect y="4.67" width="20" height="4.66" fill="#DD0000" />
            <rect y="9.33" width="20" height="4.67" fill="#FFCC00" />
          </>
        );

      // 5. Italy (Italiano)
      case 'IT':
        return (
          <>
            <rect width="6.67" height="14" fill="#009246" />
            <rect x="6.67" width="6.66" height="14" fill="#FFFFFF" />
            <rect x="13.33" width="6.67" height="14" fill="#CE2B37" />
          </>
        );

      // 6. Portugal (Português)
      case 'PT':
        return (
          <>
            <rect width="8" height="14" fill="#006600" />
            <rect x="8" width="12" height="14" fill="#FF0000" />
            <circle cx="8" cy="7" r="2.8" fill="#FFCC00" />
            <circle cx="8" cy="7" r="2" fill="#FFFFFF" />
            <rect x="7" y="5.8" width="2" height="2.4" rx="0.5" fill="#003399" />
          </>
        );

      // 7. Japan (日本語)
      case 'JP':
        return (
          <>
            <rect width="20" height="14" fill="#FFFFFF" />
            <circle cx="10" cy="7" r="4.2" fill="#BC002D" />
          </>
        );

      // 8. Russia (Русский)
      case 'RU':
        return (
          <>
            <rect width="20" height="4.67" fill="#FFFFFF" />
            <rect y="4.67" width="20" height="4.66" fill="#0039A6" />
            <rect y="9.33" width="20" height="4.67" fill="#D52B1E" />
          </>
        );

      // 9. South Korea (한국어)
      case 'KR':
        return (
          <>
            <rect width="20" height="14" fill="#FFFFFF" />
            {/* Taegeuk */}
            <circle cx="10" cy="7" r="3.2" fill="#0047A0" />
            <path d="M10 3.8 A3.2 3.2 0 0 1 10 10.2 A1.6 1.6 0 0 1 10 7 A1.6 1.6 0 0 0 10 3.8" fill="#CD2E3A" />
            {/* Trigram indications */}
            <rect x="2.8" y="2.8" width="1.8" height="0.6" transform="rotate(45 3.7 3.1)" fill="#000000" />
            <rect x="15.4" y="10.6" width="1.8" height="0.6" transform="rotate(45 16.3 10.9)" fill="#000000" />
            <rect x="15.4" y="2.8" width="1.8" height="0.6" transform="rotate(-45 16.3 3.1)" fill="#000000" />
            <rect x="2.8" y="10.6" width="1.8" height="0.6" transform="rotate(-45 3.7 10.9)" fill="#000000" />
          </>
        );

      // 10. China (中文 简体)
      case 'CN':
        return (
          <>
            <rect width="20" height="14" fill="#DE2910" />
            {/* Large 5-point star */}
            <polygon
              points="4,1.8 4.6,3.4 6.2,3.4 4.9,4.4 5.4,6 4,5 2.6,6 3.1,4.4 1.8,3.4 3.4,3.4"
              fill="#FFDE00"
            />
            {/* Small stars */}
            <circle cx="7.2" cy="2.2" r="0.6" fill="#FFDE00" />
            <circle cx="8.4" cy="3.6" r="0.6" fill="#FFDE00" />
            <circle cx="8.4" cy="5.4" r="0.6" fill="#FFDE00" />
            <circle cx="7.2" cy="6.8" r="0.6" fill="#FFDE00" />
          </>
        );

      // 11. Taiwan (中文 繁體)
      case 'TW':
        return (
          <>
            <rect width="20" height="14" fill="#FE0000" />
            <rect width="10" height="7" fill="#000095" />
            <circle cx="5" cy="3.5" r="1.8" fill="#FFFFFF" />
            <circle cx="5" cy="3.5" r="1.1" fill="#000095" />
            <circle cx="5" cy="3.5" r="0.9" fill="#FFFFFF" />
          </>
        );

      // 12. Saudi Arabia / Arab World (العربية)
      case 'SA':
        return (
          <>
            <rect width="20" height="14" fill="#006C35" />
            {/* White script / sword symbolic representation */}
            <rect x="4" y="8.2" width="12" height="0.9" rx="0.4" fill="#FFFFFF" />
            <rect x="5.5" y="5.2" width="9" height="1.4" rx="0.5" fill="#FFFFFF" />
          </>
        );

      // 13. Bulgaria (Български)
      case 'BG':
        return (
          <>
            <rect width="20" height="4.67" fill="#FFFFFF" />
            <rect y="4.67" width="20" height="4.66" fill="#00966E" />
            <rect y="9.33" width="20" height="4.67" fill="#D62612" />
          </>
        );

      // 14. Catalonia / Andorra (Català)
      case 'CA':
      case 'AD':
        return (
          <>
            <rect width="20" height="14" fill="#FFD100" />
            <rect y="1.5" width="20" height="1.6" fill="#ED1B24" />
            <rect y="4.7" width="20" height="1.6" fill="#ED1B24" />
            <rect y="7.9" width="20" height="1.6" fill="#ED1B24" />
            <rect y="11.1" width="20" height="1.6" fill="#ED1B24" />
          </>
        );

      // 15. Netherlands (Nederlands)
      case 'NL':
        return (
          <>
            <rect width="20" height="4.67" fill="#AE1C28" />
            <rect y="4.67" width="20" height="4.66" fill="#FFFFFF" />
            <rect y="9.33" width="20" height="4.67" fill="#21468B" />
          </>
        );

      // 16. Greece (Ελληνικά)
      case 'GR':
      case 'EL':
        return (
          <>
            <rect width="20" height="14" fill="#0D5EAF" />
            <rect y="1.55" width="20" height="1.55" fill="#FFFFFF" />
            <rect y="4.66" width="20" height="1.55" fill="#FFFFFF" />
            <rect y="7.77" width="20" height="1.55" fill="#FFFFFF" />
            <rect y="10.88" width="20" height="1.55" fill="#FFFFFF" />
            <rect width="7.7" height="7.7" fill="#0D5EAF" />
            <rect x="3.1" width="1.5" height="7.7" fill="#FFFFFF" />
            <rect y="3.1" width="7.7" height="1.5" fill="#FFFFFF" />
          </>
        );

      // 17. India (हिन्दी)
      case 'IN':
      case 'HI':
        return (
          <>
            <rect width="20" height="4.67" fill="#FF9933" />
            <rect y="4.67" width="20" height="4.66" fill="#FFFFFF" />
            <rect y="9.33" width="20" height="4.67" fill="#128807" />
            {/* Ashoka Chakra */}
            <circle cx="10" cy="7" r="1.8" stroke="#000080" strokeWidth="0.5" fill="none" />
            <circle cx="10" cy="7" r="0.4" fill="#000080" />
            <line x1="10" y1="5.2" x2="10" y2="8.8" stroke="#000080" strokeWidth="0.3" />
            <line x1="8.2" y1="7" x2="11.8" y2="7" stroke="#000080" strokeWidth="0.3" />
            <line x1="8.7" y1="5.7" x2="11.3" y2="8.3" stroke="#000080" strokeWidth="0.3" />
            <line x1="8.7" y1="8.3" x2="11.3" y2="5.7" stroke="#000080" strokeWidth="0.3" />
          </>
        );

      // 18. Indonesia (Bahasa Indonesia)
      case 'ID':
        return (
          <>
            <rect width="20" height="7" fill="#CE1126" />
            <rect y="7" width="20" height="7" fill="#FFFFFF" />
          </>
        );

      // 19. Malaysia (Bahasa Melayu)
      case 'MY':
      case 'MS':
        return (
          <>
            <rect width="20" height="14" fill="#CC0000" />
            <rect y="1.2" width="20" height="1.2" fill="#FFFFFF" />
            <rect y="3.6" width="20" height="1.2" fill="#FFFFFF" />
            <rect y="6.0" width="20" height="1.2" fill="#FFFFFF" />
            <rect y="8.4" width="20" height="1.2" fill="#FFFFFF" />
            <rect y="10.8" width="20" height="1.2" fill="#FFFFFF" />
            <rect width="9" height="7.2" fill="#000066" />
            <circle cx="4.5" cy="3.6" r="2.2" fill="#FFCC00" />
            <circle cx="5.2" cy="3.6" r="1.8" fill="#000066" />
            <circle cx="6.5" cy="3.6" r="0.9" fill="#FFCC00" />
          </>
        );

      // 20. Poland (Polski)
      case 'PL':
        return (
          <>
            <rect width="20" height="7" fill="#FFFFFF" />
            <rect y="7" width="20" height="7" fill="#DC143C" />
          </>
        );

      // 21. Sweden (Svenska)
      case 'SE':
      case 'SV':
        return (
          <>
            <rect width="20" height="14" fill="#006AA7" />
            <rect x="6" width="2.6" height="14" fill="#FECC00" />
            <rect y="5.7" width="20" height="2.6" fill="#FECC00" />
          </>
        );

      // 22. Thailand (ภาษาไทย)
      case 'TH':
        return (
          <>
            <rect width="20" height="2.33" fill="#A51931" />
            <rect y="2.33" width="20" height="2.33" fill="#F4F5F8" />
            <rect y="4.66" width="20" height="4.68" fill="#2D2A4A" />
            <rect y="9.34" width="20" height="2.33" fill="#F4F5F8" />
            <rect y="11.67" width="20" height="2.33" fill="#A51931" />
          </>
        );

      // 23. Turkey (Türkçe)
      case 'TR':
        return (
          <>
            <rect width="20" height="14" fill="#E30A17" />
            <circle cx="8" cy="7" r="3.4" fill="#FFFFFF" />
            <circle cx="8.9" cy="7" r="2.7" fill="#E30A17" />
            <polygon
              points="12.2,7 13.8,7.5 12.8,8.8 13.2,10.4 11.8,9.6 10.4,10.4 10.8,8.8 9.8,7.5 11.4,7"
              transform="scale(0.55) translate(8, 2.5)"
              fill="#FFFFFF"
            />
          </>
        );

      // 24. Ukraine (Українська)
      case 'UA':
      case 'UK':
        return (
          <>
            <rect width="20" height="7" fill="#0057B7" />
            <rect y="7" width="20" height="7" fill="#FFD700" />
          </>
        );

      // 25. Vietnam (Tiếng Việt)
      case 'VN':
      case 'VI':
        return (
          <>
            <rect width="20" height="14" fill="#DA251D" />
            <polygon
              points="10,2.8 11.5,6.8 15.6,6.8 12.3,9.2 13.5,13.2 10,10.8 6.5,13.2 7.7,9.2 4.4,6.8 8.5,6.8"
              fill="#FFFF00"
            />
          </>
        );

      // 26. Romania (Română)
      case 'RO':
        return (
          <>
            <rect width="6.67" height="14" fill="#002B7F" />
            <rect x="6.67" width="6.66" height="14" fill="#FCD116" />
            <rect x="13.33" width="6.67" height="14" fill="#CE1126" />
          </>
        );

      // 27. Kenya / East Africa (Kiswahili)
      case 'KE':
      case 'SW':
        return (
          <>
            <rect width="20" height="3.8" fill="#000000" />
            <rect y="3.8" width="20" height="1" fill="#FFFFFF" />
            <rect y="4.8" width="20" height="4.4" fill="#BB0000" />
            <rect y="9.2" width="20" height="1" fill="#FFFFFF" />
            <rect y="10.2" width="20" height="3.8" fill="#006600" />
            <ellipse cx="10" cy="7" rx="1.8" ry="3.2" fill="#BB0000" stroke="#FFFFFF" strokeWidth="0.4" />
            <circle cx="10" cy="7" r="0.6" fill="#FFFFFF" />
          </>
        );

      default:
        return (
          <>
            <rect width="20" height="14" fill="#E4E4E7" />
            <circle cx="10" cy="7" r="4" fill="#A1A1AA" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 20 14"
      className={`inline-block flex-shrink-0 rounded-[2.5px] overflow-hidden shadow-xs border border-black/10 dark:border-white/20 ${className}`}
      aria-hidden="true"
      role="img"
    >
      {title && <title>{title}</title>}
      {renderFlagContent()}
    </svg>
  );
};

export default CountryFlag;
