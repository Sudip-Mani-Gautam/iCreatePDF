'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface TermsPageClientProps {
  locale: Locale;
}

export default function TermsPageClient({ locale }: TermsPageClientProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-16 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center pt-4 pb-8">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-3">
              Terms & Conditions
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Last updated: September 2026
            </p>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 bg-zinc-50/60 dark:bg-zinc-900/40 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <section>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-3">1. Agreement to Terms</h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                By accessing or using iCreatePDF (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the service&rdquo;), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-3">2. Description of Service</h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                iCreatePDF provides client-side document processing tools. All file conversions, manipulations, and editing take place locally within your web browser using WebAssembly and JavaScript. No document files are uploaded to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-3">3. User Responsibility & Content</h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                You retain full ownership and responsibility for the files you process. Because files are processed entirely offline within your local browser sandbox, you must ensure that you hold appropriate rights to any documents processed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-3">4. Open Source & Licensing</h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                iCreatePDF is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). You are free to inspect, modify, and redistribute the source code in accordance with the AGPL-3.0 license terms. See our <Link href={`/${locale}/license`} className="text-red-600 hover:underline font-semibold">License Page</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-3">5. Disclaimer of Warranties</h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                The service is provided &ldquo;as is&rdquo; without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
