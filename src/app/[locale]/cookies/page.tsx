import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import CookiesPageClient from './CookiesPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Cookie Policy - iCreatePDF',
    description: 'Learn about our cookie-free, privacy-first client-side architecture.',
  };
}

interface CookiesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CookiesPageClient locale={locale as Locale} />;
}
