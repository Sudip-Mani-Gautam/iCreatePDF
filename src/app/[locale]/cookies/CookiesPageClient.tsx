'use client';

import React from 'react';
import Link from 'next/link';
import { Cookie, CheckCircle2, Shield } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface CookiesPageClientProps {
  locale: Locale;
}

export default function CookiesPageClient({ locale }: CookiesPageClientProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-16 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center pt-4 pb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Cookie className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-3">
              Cookie Policy
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Zero Tracking Cookies. 100% Privacy by Design.
            </p>
          </div>

          <div className="space-y-6 bg-zinc-50/60 dark:bg-zinc-900/40 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div>
                <p className="font-bold text-sm mb-0.5">No Tracking or Third-Party Advertising Cookies</p>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  iCreatePDF does not use cookies to track your behavior, profile your identity, or serve targeted advertisements.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">1. Local Storage for User Preferences</h2>
              <p>
                We use browser <code className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">localStorage</code> exclusively for essential UI preferences on your device:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong className="text-zinc-800 dark:text-zinc-200">Theme preference:</strong> Remembering your selection of Light Mode or Dark Mode.</li>
                <li><strong className="text-zinc-800 dark:text-zinc-200">Language preference:</strong> Remembering your chosen display language.</li>
              </ul>
              <p className="mt-2 text-xs text-zinc-500">
                This data stays on your machine and is never transmitted to any external server.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">2. Managing Local Storage</h2>
              <p>
                You can clear your local preferences at any time using your browser&rsquo;s &ldquo;Clear Site Data&rdquo; or &ldquo;Clear Browsing History&rdquo; settings.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
