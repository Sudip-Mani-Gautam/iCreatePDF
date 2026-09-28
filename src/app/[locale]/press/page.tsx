import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import PressPageClient from './PressPageClient';

import { generatePressMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePressMetadata(locale as Locale);
}

interface PressPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PressPage({ params }: PressPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PressPageClient locale={locale as Locale} />;
}
