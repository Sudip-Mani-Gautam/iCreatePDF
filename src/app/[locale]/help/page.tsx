import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import {
  generateBaseMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  serializeStructuredData,
} from '@/lib/seo';
import HelpPageClient from './HelpPageClient';

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
    path: '/help',
    title: 'Help Center & Documentation | iCreatePDF — Free PDF Tools',
    description:
      'Complete guide to iCreatePDF: learn how to use 67+ PDF tools, understand our zero-upload privacy architecture, explore workflows, and get support. All processing is 100% client-side and offline-capable.',
    keywords: [
      'iCreatePDF help',
      'PDF tools guide',
      'how to use PDF editor',
      'PDF merge tutorial',
      'PDF compress help',
      'offline PDF tools',
      'PDF privacy',
      'browser PDF processing',
      'PDF workflow',
      'PDF documentation',
    ],
  });
}

interface HelpPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HelpPage({ params }: HelpPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  setRequestLocale(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Help Center', path: '/help' },
    ],
    validLocale
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'Are my PDF files uploaded to a server?',
      answer:
        'No — never. iCreatePDF processes 100% of your documents directly inside your own web browser using WebAssembly. Your files are loaded into local RAM, processed, and saved back to your device without ever leaving your computer.',
    },
    {
      question: 'Do I need to create an account or log in?',
      answer:
        'No. iCreatePDF is entirely free to use with no account registration, no email requirement, and no login of any kind.',
    },
    {
      question: 'What are the file size limits?',
      answer:
        'There are no imposed file size limits because processing happens locally on your device. The practical limit is determined by your device\'s available RAM.',
    },
    {
      question: 'Can I use iCreatePDF without an internet connection?',
      answer:
        'Yes! Once the page has loaded in your browser, all PDF tools work fully offline. You can turn on airplane mode, disconnect Wi-Fi, or use it in environments with no internet.',
    },
    {
      question: 'Is iCreatePDF really 100% free?',
      answer:
        'Yes, completely. There are no paywalls, no credits system, no daily usage caps, and no premium tier. All 67+ tools are available at no cost.',
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
      <HelpPageClient locale={validLocale} />
    </>
  );
}
