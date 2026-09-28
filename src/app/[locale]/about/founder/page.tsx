import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateFounderMetadata } from '@/lib/seo';
import FounderPageClient from './FounderPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  return generateFounderMetadata(validLocale);
}

interface FounderPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FounderPage({ params }: FounderPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <FounderPageClient locale={locale as Locale} />;
}
