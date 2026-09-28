import React, { Suspense } from 'react';
import type { Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { localeConfig, type Locale, locales } from '@/lib/i18n/config';
import { fontVariables } from '@/lib/fonts';
import { SkipLink } from '@/components/common/SkipLink';
import { LanguageSuggestionBanner } from '@/components/common/LanguageSuggestionBanner';
import { CookieConsentBanner } from '@/components/common/CookieConsentBanner';
import { AnalyticsPageViewTracker } from '@/components/analytics';
import { NotificationPrompt } from '@/components/notifications/NotificationPrompt';
import '@/app/globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Viewport configuration for performance
 * Requirements: 8.1 - Lighthouse performance score 90+
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  // Get direction for the locale
  const direction = localeConfig[locale as Locale]?.direction || 'ltr';

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = ${JSON.stringify(locale)}; document.documentElement.dir = ${JSON.stringify(direction)};`,
        }}
      />
      <div lang={locale} dir={direction} suppressHydrationWarning className={`${fontVariables} min-h-screen bg-background text-foreground antialiased font-sans`}>
        <SkipLink targetId="main-content">Skip to main content</SkipLink>
        <Suspense fallback={null}>
          <AnalyticsPageViewTracker />
        </Suspense>
        {children}
        <LanguageSuggestionBanner currentLocale={locale as Locale} />
        <CookieConsentBanner locale={locale as Locale} />
        <NotificationPrompt />
      </div>
    </NextIntlClientProvider>
  );
}
