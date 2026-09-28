import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Home, FileText } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { locales, type Locale } from '@/lib/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Thank You | iCreatePDF',
  description: 'Thank you for contacting iCreatePDF. We have received your message.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={validLocale} />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xl text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              Message Sent!
            </h1>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              Thank you for contacting iCreatePDF. We have received your message and will respond as soon as possible.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/${validLocale}/contact`}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] text-xs font-bold text-[hsl(var(--color-foreground))] transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Contact
            </Link>
            <Link
              href={`/${validLocale}`}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20"
            >
              <Home className="w-3.5 h-3.5" /> Explore Tools
            </Link>
          </div>
        </div>
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}
