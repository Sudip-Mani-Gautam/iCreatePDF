'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Scale,
  Shield,
  FileText,
  ExternalLink,
  CheckCircle2,
  Info,
  BadgeAlert,
  Server,
  Sparkles,
  HelpCircle,
  Megaphone
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface DisclaimerPageClientProps {
  locale: Locale;
}

export default function DisclaimerPageClient({ locale }: DisclaimerPageClientProps) {
  const disclaimerCards = [
    {
      icon: Scale,
      title: 'Trademark Disclosures',
      desc: 'All product names, trademarks, and registered trademarks belong to their respective holders. Mentioning them does not imply affiliation or endorsement.',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
    },
    {
      icon: AlertTriangle,
      title: '"As-Is" Provision',
      desc: 'In accordance with AGPL-3.0, the software tools are provided "as-is", without express or implied warranty of any kind regarding merchantability or fitness.',
      color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50',
    },
    {
      icon: Server,
      title: 'Data Responsibility',
      desc: 'All file processing executes locally within your browser sandbox. Users are strongly advised to keep master backups of critical documents.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      icon: Megaphone,
      title: 'Third-Party Advertising',
      desc: 'Advertisements served through Google AdSense are delivered dynamically and do not constitute an endorsement or guarantee by iCreatePDF.',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-900/60 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-6 shadow-xs">
              <BadgeAlert className="w-3.5 h-3.5" />
              <span>Legal Disclaimers & Warranties</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              Website & Service{' '}
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                Disclaimer
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-4">
              Important information regarding software warranties, trademark notices, and third-party advertising disclosures on iCreatePDF.
            </p>

            <span className="text-xs text-[hsl(var(--color-muted-foreground))] block">
              Last Formally Reviewed: November 2026
            </span>
          </div>
        </section>

        {/* Highlights Grid */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {disclaimerCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[hsl(var(--color-foreground))] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Legal Clauses */}
        <section className="container mx-auto px-4 max-w-4xl space-y-8 mb-20">
          {/* Section 1: Trademarks */}
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Section 01
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              1. Trademark & Intellectual Property Disclosures
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              <strong>Adobe Systems Inc.:</strong> &ldquo;Portable Document Format&rdquo; (PDF), Adobe, Acrobat, and related logos are trademarks or registered trademarks of Adobe Systems Incorporated in the United States and other jurisdictions. iCreatePDF is an independent open-source web application and is <strong>neither affiliated with, endorsed by, sponsored by, nor certified by Adobe Systems Incorporated</strong>.
            </p>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              <strong>Microsoft Corporation:</strong> Microsoft, Word, Excel, and PowerPoint are registered trademarks of Microsoft Corporation. Any references made to Office file extensions (.docx, .xlsx, .pptx) are solely intended to describe functional file conversion capabilities.
            </p>
          </div>

          {/* Section 2: As-Is Provision */}
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Section 02
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              2. No Warranty & Limitation of Liability
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              In accordance with Sections 15 and 16 of the GNU Affero General Public License (AGPL-3.0), all tools, converters, scripts, and documentation on iCreatePDF are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              In no event shall iCreatePDF, its contributors, or maintainers be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services, loss of data, loss of profits, or business interruption) arising in any way out of the use or inability to use this software.
            </p>
          </div>

          {/* Section 3: Data Safety */}
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Section 03
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              3. User Data Safety & Master Backup Notice
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              Because all document operations (merging, splitting, compressing, rotating, editing, or OCR conversion) compute locally within your device&rsquo;s browser sandbox, iCreatePDF has no access to your documents and maintains zero recovery backups. 
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-300 font-medium">
              Recommendation: Users are strictly advised to retain pristine master backups of all essential, legal, tax, or financial documents prior to executing irreversible in-browser transformations.
            </div>
          </div>

          {/* Section 4: Advertising */}
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Section 04
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              4. Third-Party Advertising & External Links
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              iCreatePDF may display commercial advertisements served through Google AdSense to maintain free public access to our services. The presence of any advertisement, promotional banner, or external hyperlink does not constitute an endorsement, recommendation, or validation of the advertised third-party products, services, or claims.
            </p>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              Please review our <Link href={`/${locale}/privacy`} className="text-amber-600 dark:text-amber-400 underline font-semibold">Privacy Policy</Link> and <Link href={`/${locale}/cookies`} className="text-amber-600 dark:text-amber-400 underline font-semibold">Cookie Policy</Link> for detailed disclosures on advertising cookies and opt-out controls.
            </p>
          </div>

          {/* Section 5: Professional Advice */}
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Section 05
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              5. No Professional or Legal Advice
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              All guides, blog articles, and instructional content published on iCreatePDF are for general informational and educational purposes only. Nothing on this website constitutes legal, accounting, tax, or certified archival advice. For specific compliance with jurisdictional document retention rules or formal court filings, consult a qualified legal or records management professional.
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
