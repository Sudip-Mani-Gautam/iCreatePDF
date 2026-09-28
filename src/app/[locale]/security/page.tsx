import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import SecurityPageClient from './SecurityPageClient';

import { generateSecurityMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSecurityMetadata(locale as Locale);
}

interface SecurityPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SecurityPage({ params }: SecurityPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SecurityPageClient locale={locale as Locale} />;
}
