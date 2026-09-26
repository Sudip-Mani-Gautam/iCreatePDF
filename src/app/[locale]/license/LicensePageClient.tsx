'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface LicensePageClientProps {
  locale: Locale;
}

export default function LicensePageClient({ locale }: LicensePageClientProps) {
  const tCommon = useTranslations('common');

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
      <Header locale={locale} />

      <main className="flex-1 pt-16 pb-16">
        {/* Hero Section */}
        <section className="pt-4 pb-10 border-b border-[hsl(var(--color-border))/0.5] bg-gradient-to-b from-[hsl(var(--color-primary)/0.05)] to-transparent">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Open Source & Transparent</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              License & Terms
            </h1>
            <p className="text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto">
              {tCommon('brand')} is dedicated to free, accessible, and privacy-respecting PDF utilities. Learn about your rights, permissions, and conditions.
            </p>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="container mx-auto px-4 max-w-4xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Permissions */}
            <div className="p-6 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))]">
              <div className="flex items-center gap-2 text-green-500 font-bold mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span>Permissions</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[hsl(var(--color-muted-foreground))]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Commercial use allowed
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Modification permitted
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Distribution & sharing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Private & personal use
                </li>
              </ul>
            </div>

            {/* Conditions */}
            <div className="p-6 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))]">
              <div className="flex items-center gap-2 text-blue-500 font-bold mb-4">
                <AlertCircle className="w-5 h-5" />
                <span>Conditions</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[hsl(var(--color-muted-foreground))]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Disclose source code
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  License & copyright notice
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  State changes made
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Same license on forks
                </li>
              </ul>
            </div>

            {/* Limitations */}
            <div className="p-6 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))]">
              <div className="flex items-center gap-2 text-amber-500 font-bold mb-4">
                <XCircle className="w-5 h-5" />
                <span>Limitations</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[hsl(var(--color-muted-foreground))]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  No liability for damages
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  No warranty provided (AS-IS)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Trademark protection
                </li>
              </ul>
            </div>
          </div>

          {/* Full License Text */}
          <div className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-8">
            <div className="flex items-center justify-between border-b border-[hsl(var(--color-border))] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[hsl(var(--color-primary))]" />
                <h2 className="text-xl font-bold">GNU Affero General Public License v3.0 (AGPL-3.0)</h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] font-mono">
                SPDX: AGPL-3.0-only
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[hsl(var(--color-muted)/0.5)] border border-[hsl(var(--color-border))] space-y-2 mb-6 text-xs text-[hsl(var(--color-foreground))]">
              <p className="font-semibold text-sm">
                Upstream Authors & Attribution (AGPL-3.0 Section 4 & 5):
              </p>
              <p>
                • <strong>Original Project</strong>: PDFCraft (<a href="https://github.com/PDFCraftTool/pdfcraft" target="_blank" rel="noopener noreferrer" className="underline text-[hsl(var(--color-primary))]">github.com/PDFCraftTool/pdfcraft</a>) and BentoPDF (<a href="https://github.com/alam00000/bentopdf" target="_blank" rel="noopener noreferrer" className="underline text-[hsl(var(--color-primary))]">github.com/alam00000/bentopdf</a>). Copyright &copy; 2024–2026 PDFCraft &amp; BentoPDF Contributors.
              </p>
              <p>
                • <strong>Modified Distribution</strong>: iCreatePDF (<a href="https://icreatepdf.com" className="underline text-[hsl(var(--color-primary))]">icreatepdf.com</a>). Enhancements and modifications Copyright &copy; 2026 iCreatePDF Contributors.
              </p>
              <p>
                • <strong>Complete Source Code (AGPL-3.0 Section 13)</strong>: The corresponding source code for this application is freely available at <a href="https://github.com/PDFCraftTool/pdfcraft" target="_blank" rel="noopener noreferrer" className="underline text-[hsl(var(--color-primary))]">https://github.com/PDFCraftTool/pdfcraft</a>.
              </p>
            </div>

            <div className="space-y-4 text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed font-sans">
              <p>
                This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
              </p>
              <p>
                This program is distributed in the hope that it will be useful, but <strong>WITHOUT ANY WARRANTY</strong>; without even the implied warranty of <strong>MERCHANTABILITY</strong> or <strong>FITNESS FOR A PARTICULAR PURPOSE</strong>. See the GNU Affero General Public License for more details.
              </p>
              <p>
                You should have received a copy of the GNU Affero General Public License along with this program. If not, see <a href="https://www.gnu.org/licenses/" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--color-primary))] underline">https://www.gnu.org/licenses/</a>.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[hsl(var(--color-border))] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[hsl(var(--color-muted-foreground))]">
                Also see third-party library credits and acknowledgements.
              </div>
              <Link
                href={`/${locale}/acknowledgements`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--color-primary))] hover:underline"
              >
                View Acknowledgements <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
