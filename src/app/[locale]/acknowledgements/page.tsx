import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateBaseMetadata } from '@/lib/seo';
import AcknowledgementsPageClient from './AcknowledgementsPageClient';

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
    path: '/acknowledgements',
    title: 'Acknowledgements & Credits | iCreatePDF',
    description: 'We gratefully acknowledge the open-source libraries, contributors, and core technologies that empower iCreatePDF client-side document processing.',
    keywords: ['iCreatePDF credits', 'acknowledgements', 'open source libraries', 'pdf.js', 'pdf-lib', 'wasm'],
  });
}

interface AcknowledgementsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AcknowledgementsPage({ params }: AcknowledgementsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AcknowledgementsPageClient locale={locale as Locale} />;
}
