'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Copyright,
  FileCheck2,
  Mail,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Server,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface DmcaPageClientProps {
  locale: Locale;
}

export default function DmcaPageClient({ locale }: DmcaPageClientProps) {
  const compliancePillars = [
    {
      icon: Server,
      title: 'Zero-Host Architecture',
      desc: 'iCreatePDF never stores, hosts, caches, or distributes user documents on central servers. All processing executes 100% client-side in volatile browser RAM.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      icon: Copyright,
      title: 'Strict IP Respect',
      desc: 'We fully comply with the Digital Millennium Copyright Act (17 U.S.C. § 512) and international intellectual property protection directives.',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50',
    },
    {
      icon: Clock,
      title: 'Rapid Verification',
      desc: 'Valid infringement notices or legal inquiries sent to our designated agent are acknowledged and investigated within 24 to 48 business hours.',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
    },
    {
      icon: ShieldCheck,
      title: 'Repeat Infringer Ban',
      desc: 'We enforce zero tolerance for malicious actors who attempt to utilize software tools to bypass digital rights management or infringe copyrights.',
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50',
    },
  ];

  const noticeChecklist = [
    'A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.',
    'Clear identification of the copyrighted work claimed to have been infringed.',
    'Specific identification of the material claimed to be infringing, including full URL links where applicable.',
    'Your full contact details, including legal name, physical mailing address, telephone number, and official email address.',
    'A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.',
    'A statement, made under penalty of perjury, that the information in the notification is accurate, and that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-xs font-semibold text-blue-700 dark:text-blue-400 mb-6 shadow-xs">
              <Copyright className="w-3.5 h-3.5" />
              <span>DMCA & Intellectual Property Compliance</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              DMCA & Copyright{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-4">
              iCreatePDF respects the intellectual property rights of creators and copyright holders. Learn how our privacy architecture operates and how to submit legal notices.
            </p>

            <span className="text-xs text-[hsl(var(--color-muted-foreground))] block">
              Last Updated: November 2026
            </span>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {compliancePillars.map((item, idx) => {
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

        {/* Technical Architecture Statement */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <Server className="w-3.5 h-3.5" />
              <span>Important Architecture Disclosure for Rights Holders</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              1. We Do Not Host, Store, or Distribute User Files
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              Unlike cloud-based PDF conversion portals, <strong>iCreatePDF is an offline-capable client-side web application</strong>. All document transformations (merging, compressing, splitting, editing, or OCR) execute strictly in the end-user&rsquo;s local browser memory using WebAssembly.
            </p>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              Because user documents are never transmitted across the network or written to our servers:
            </p>
            <ul className="list-disc pl-5 text-sm text-[hsl(var(--color-muted-foreground))] space-y-1.5">
              <li>iCreatePDF maintains <strong>no public directory, catalog, or database</strong> of user documents.</li>
              <li>iCreatePDF has <strong>no technical custody, possession, or control</strong> over the PDF files processed by individual users on their devices.</li>
              <li>We cannot delete or modify files residing on a user&rsquo;s local machine or personal browser cache.</li>
            </ul>
          </div>
        </section>

        {/* Takedown Notice Procedure */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Section 02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))] mt-1">
                2. Filing a Formal DMCA Takedown Notice
              </h2>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2 leading-relaxed">
                If you believe that any editorial guide, article, graphic, or site element published directly on <code className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">icreatepdf.com</code> infringes upon your copyright, please deliver a formal written notice containing the following mandatory elements:
              </p>
            </div>

            <div className="space-y-3">
              {noticeChecklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))] text-xs text-[hsl(var(--color-foreground))]">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-300 font-medium">
              Notice: Under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages, including court costs and attorneys&rsquo; fees.
            </div>
          </div>
        </section>

        {/* Designated Agent Contact */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[hsl(var(--color-card))] to-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))] shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Section 03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))] mt-1">
                3. Designated Copyright Agent Contact
              </h2>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2 leading-relaxed">
                Formal copyright notices, licensing inquiries, and legal notifications must be directed to our designated copyright compliance desk:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-1">
                <span className="text-xs text-[hsl(var(--color-muted-foreground))] block">Designated Agent</span>
                <span className="text-sm font-bold text-[hsl(var(--color-foreground))] block">Copyright Compliance Officer</span>
                <span className="text-xs text-[hsl(var(--color-muted-foreground))] block">iCreatePDF Legal Team</span>
              </div>
              <div className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-1">
                <span className="text-xs text-[hsl(var(--color-muted-foreground))] block">Direct Email Notification</span>
                <a
                  href="mailto:sudipmanigautam3@gmail.com?subject=DMCA%20Notice%20-%20iCreatePDF"
                  className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline block break-all"
                >
                  sudipmanigautam3@gmail.com
                </a>
                <span className="text-xs text-[hsl(var(--color-muted-foreground))] block">Response Window: 24–48 Business Hours</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="mailto:sudipmanigautam3@gmail.com?subject=DMCA%20Notice%20-%20iCreatePDF"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <Mail className="w-4 h-4" /> Send Official DMCA Notice
              </a>
            </div>
          </div>
        </section>

        {/* Counter-Notification & Policy */}
        <section className="container mx-auto px-4 max-w-4xl mb-20 space-y-8">
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Section 04
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              4. Counter-Notification Procedure
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              If you believe that your content was removed or access was disabled as a result of mistake or misidentification, you may send a written counter-notification to our Designated Agent. The counter-notice must include your contact info, identification of the material, a statement under penalty of perjury of good faith mistake, and your consent to federal jurisdiction.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Section 05
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              5. Repeat Infringer Policy
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              In accordance with the DMCA and other applicable international intellectual property laws, iCreatePDF maintains a policy of terminating, in appropriate circumstances, access for users or automated agents deemed to be repeat infringers of intellectual property rights.
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
