import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateWorkflowMetadata } from '@/lib/seo';
import WorkflowPageClient from './WorkflowPageClient';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface WorkflowPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
    return generateWorkflowMetadata(validLocale);
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    return <WorkflowPageClient locale={locale as Locale} />;
}
