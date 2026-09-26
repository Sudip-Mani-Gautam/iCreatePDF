'use client';

import React from 'react';
import Link from 'next/link';
import { Newspaper, Download, Mail, ExternalLink } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface PressPageClientProps {
  locale: Locale;
}

export default function PressPageClient({ locale }: PressPageClientProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-3">
              Press & Media Kit
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Brand assets, story highlights, and press contacts for iCreatePDF.
            </p>
          </div>

          <div className="space-y-8 bg-zinc-50/60 dark:bg-zinc-900/40 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <section>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-2">About iCreatePDF</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                iCreatePDF is a privacy-first, client-side PDF document manipulation suite built with modern web technologies (Next.js, WebAssembly, and PDF-lib). By processing all files locally within the user&rsquo;s browser, iCreatePDF completely eliminates server uploads and privacy leakage risks.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-4">Brand Assets</h2>
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-zinc-900 dark:text-white mb-1">
                    Official iCreatePDF Logo & Icon SVG
                  </div>
                  <div className="text-xs text-zinc-500">
                    High-resolution vector assets for print and digital publication.
                  </div>
                </div>
                <a
                  href="/favicon.svg"
                  download="iCreatePDF-logo.svg"
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" /> Download SVG
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-2">Media Inquiries</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                For interview requests, technical commentary on browser-based privacy, or story inquiries, please reach out to our team:
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" /> Contact Media Relations
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
