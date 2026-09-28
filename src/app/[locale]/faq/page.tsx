import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import {
  generateFaqMetadata,
  generateFAQPageSchema,
  generateBreadcrumbSchema,
  serializeStructuredData
} from '@/lib/seo';
import { FAQ_ITEMS } from '@/config/faqs';
import FAQPageClient from './FAQPageClient';

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

  const baseMeta = generateFaqMetadata(validLocale, {
    title: 'Frequently Asked Questions (FAQ) | 100% Private Offline PDF Tools - iCreatePDF',
    description: 'Find answers to common questions about iCreatePDF. Learn about our 100% client-side privacy, zero server uploads, Offline capabilities, file size limits, and 132+ free tools.',
  });

  return {
    ...baseMeta,
    keywords: [
      'PDF FAQ',
      'frequently asked questions',
      'private PDF tools',
      'Offline PDF editor',
      'zero upload PDF',
      'free PDF converter',
      'client-side WebAssembly',
      'merge PDF Offline',
      'compress PDF without losing quality',
      'GDPR compliant PDF editor',
      'HIPAA compliant PDF'
    ],
  };
}

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  // Enable static rendering
  setRequestLocale(locale);

  // Generate SEO-rich Schema.org JSON-LD structured data
  const faqSchema = generateFAQPageSchema(
    FAQ_ITEMS.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Help & FAQ', path: '/faq' },
    ],
    validLocale
  );

  return (
    <>
      {/* Schema.org FAQPage Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
      {/* Schema.org BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumbSchema) }}
      />
      <FAQPageClient locale={validLocale} />
    </>
  );
}
