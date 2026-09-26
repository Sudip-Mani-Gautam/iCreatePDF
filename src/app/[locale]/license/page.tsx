import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateBaseMetadata } from '@/lib/seo';
import LicensePageClient from './LicensePageClient';

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

  return generateBaseMetadata({
    locale: validLocale,
    path: '/license',
    title: 'Open Source License & Terms | iCreatePDF',
    description: 'Review the licensing terms and conditions for iCreatePDF, including open-source rights, permissions, warranties, and third-party software notices.',
    keywords: ['iCreatePDF license', 'open source', 'AGPL', 'software license', 'terms'],
  });
}

interface LicensePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LicensePage({ params }: LicensePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LicensePageClient locale={locale as Locale} />;
}
