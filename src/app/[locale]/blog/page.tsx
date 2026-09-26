import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateBaseMetadata } from '@/lib/seo';
import BlogPageClient from './BlogPageClient';

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
    path: '/blog',
    title: 'Blog & Daily Guides | iCreatePDF',
    description: 'Explore daily guides, tutorials, and document productivity tips. Learn how to merge, edit, compress, and secure your PDF files for free.',
    keywords: ['PDF blog', 'PDF tutorials', 'merge PDF guide', 'compress PDF tips', 'free PDF tools', 'document productivity'],
  });
}

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogPageClient locale={locale as Locale} />;
}
