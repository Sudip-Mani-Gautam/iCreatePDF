import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import DisclaimerPageClient from './DisclaimerPageClient';
import { generateDisclaimerMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateDisclaimerMetadata(locale as Locale);
}

interface DisclaimerPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DisclaimerPage({ params }: DisclaimerPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DisclaimerPageClient locale={locale as Locale} />;
}
