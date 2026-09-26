import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import PressPageClient from './PressPageClient';

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
    title: 'Press & Media Kit - iCreatePDF',
    description: 'Press releases, brand assets, logos, and media resources for iCreatePDF.',
  };
}

interface PressPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PressPage({ params }: PressPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PressPageClient locale={locale as Locale} />;
}
