import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import DmcaPageClient from './DmcaPageClient';
import { generateDmcaMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateDmcaMetadata(locale as Locale);
}

interface DmcaPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DmcaPage({ params }: DmcaPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DmcaPageClient locale={locale as Locale} />;
}
