'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Shield,
  Lock,
  Eye,
  Server,
  Trash2,
  Cookie,
  Globe,
  Mail,
  CheckCircle2,
  XCircle,
  FileText,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  HardDrive
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface PrivacyPageClientProps {
  locale: Locale;
}

export default function PrivacyPageClient({ locale }: PrivacyPageClientProps) {
  const tCommon = useTranslations('common');

  const executiveTakeaways = [
    {
      icon: Server,
      title: 'Zero File Collection',
      desc: 'Your documents never touch our servers. WebAssembly executes 100% inside your local web browser.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      icon: Cookie,
      title: 'No Tracking Cookies',
      desc: 'We do not profile your behavior, run advertising cookies, or deploy cross-site tracking pixels.',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50',
    },
    {
      icon: Trash2,
      title: 'Instant Memory Purge',
      desc: 'All file buffers are destroyed and garbage collected the moment your task completes or the tab closes.',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50',
    },
    {
      icon: Scale,
      title: 'GDPR & CCPA Aligned',
      desc: 'Built in compliance with Art. 25 GDPR (Data Protection by Design and by Default) and California privacy standards.',
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50',
    },
  ];

  const dataInventory = [
    {
      category: 'PDF Document Contents & Text',
      collected: false,
      location: 'Local Computer RAM',
      retention: 'Immediate disposal upon task completion or tab close',
      shared: 'Never shared with any party',
    },
    {
      category: 'Document Passwords & Encryption Keys',
      collected: false,
      location: 'Browser WebCrypto volatile memory',
      retention: 'Cleared immediately following cryptographic operation',
      shared: 'Never transmitted over network',
    },
    {
      category: 'Personal User Account Information',
      collected: false,
      location: 'None (no registration or login required)',
      retention: 'None',
      shared: 'None',
    },
    {
      category: 'UI Preferences (Theme, Language)',
      collected: false,
      location: 'Browser localStorage & essential cookie',
      retention: 'Persistent on device until cleared by user',
      shared: 'Never transmitted to third parties',
    },
  ];

  const tableOfContents = [
    { id: 'section-1', title: '1. Architecture & Privacy by Design' },
    { id: 'section-2', title: '2. Information We Never Collect' },
    { id: 'section-3', title: '3. Local Storage & Client State' },
    { id: 'section-4', title: '4. Third-Party Infrastructure & CDN' },
    { id: 'section-5', title: '5. GDPR, CCPA & Global Compliance' },
    { id: 'section-6', title: '6. Your Rights & Data Sovereignty' },
    { id: 'section-7', title: '7. Policy Updates & Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900/60 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-6 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy By Design • GDPR & CCPA Aligned</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              Our Privacy Policy is Simple:{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                We Never See Your Files
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-4">
              Your confidential documents never touch our servers. Every byte is processed locally within your web browser&rsquo;s isolated sandbox.
            </p>

            <span className="text-xs text-[hsl(var(--color-muted-foreground))] block">
              Last Updated & Formally Reviewed: September 2026
            </span>
          </div>
        </section>

        {/* Executive TL;DR Highlights */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {executiveTakeaways.map((item, idx) => {
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

        {/* Data Inventory Matrix */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              Comprehensive Data Inventory
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2">
              Full transparency regarding every category of data when you use iCreatePDF.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.5)] p-4 text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">
              <div className="md:col-span-4">Data Classification</div>
              <div className="md:col-span-2">Uploaded to Us?</div>
              <div className="md:col-span-3">Where It Lives</div>
              <div className="md:col-span-3">Retention / Deletion</div>
            </div>

            <div className="divide-y divide-[hsl(var(--color-border))]">
              {dataInventory.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-5 text-sm gap-3 items-center">
                  <div className="md:col-span-4 font-semibold text-[hsl(var(--color-foreground))]">
                    {row.category}
                  </div>
                  <div className="md:col-span-2 flex items-center gap-1.5 font-bold text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>NO (0%)</span>
                  </div>
                  <div className="md:col-span-3 text-xs text-[hsl(var(--color-muted-foreground))]">
                    {row.location}
                  </div>
                  <div className="md:col-span-3 text-xs text-[hsl(var(--color-muted-foreground))]">
                    {row.retention}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Legal Sections with Quick-Nav */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Quick Navigation Sticky Sidebar */}
            <aside className="lg:col-span-4 sticky top-28 hidden lg:block p-6 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                Quick Navigation
              </h3>
              <nav className="space-y-1">
                {tableOfContents.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.id}`}
                    className="block text-xs font-medium text-[hsl(var(--color-muted-foreground))] hover:text-emerald-600 dark:hover:text-emerald-400 py-1.5 transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Policy Content Clauses */}
            <div className="lg:col-span-8 space-y-8">
              {/* Clause 1 */}
              <div id="section-1" className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs scroll-mt-28 space-y-3">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Section 01
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  1. Architecture & Privacy by Design
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  iCreatePDF operates on a zero-upload, client-side execution paradigm. Unlike conventional PDF portals that send your tax documents, contracts, medical forms, and bank statements to remote cloud servers, our platform executes all document manipulation within your web browser via <strong>WebAssembly (WASM)</strong> and <strong>HTML5 Web Workers</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/30 text-xs text-emerald-900 dark:text-emerald-300 font-medium">
                  Key Guarantee: We maintain no centralized file storage, no cloud database of documents, and zero intermediate processing servers. We cannot access your files even if legally requested, because we do not have custody of them.
                </div>
              </div>

              {/* Clause 2 */}
              <div id="section-2" className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs scroll-mt-28 space-y-3">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Section 02
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  2. Information We Never Collect
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  To protect user dignity and eliminate surveillance risk, we explicitly do not collect:
                </p>
                <ul className="list-disc pl-5 text-sm text-[hsl(var(--color-muted-foreground))] space-y-2">
                  <li><strong>Document Content:</strong> Text, images, annotations, form field inputs, or metadata embedded within your PDFs.</li>
                  <li><strong>Encryption Keys & Passwords:</strong> Passwords entered to unlock or encrypt PDFs are evaluated locally using the browser&rsquo;s native WebCrypto APIs.</li>
                  <li><strong>Personally Identifiable Information (PII):</strong> We do not require account registration, email addresses, phone numbers, or billing info.</li>
                  <li><strong>Third-Party Advertising IDs:</strong> We do not deploy advertising tracking scripts or behavioral profilers.</li>
                </ul>
              </div>

              {/* Clause 3 */}
              <div id="section-3" className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs scroll-mt-28 space-y-3">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Section 03
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  3. Local Storage & Client State
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  We use your browser&rsquo;s <code className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">localStorage</code> and an essential first-party cookie solely for user interface ergonomics:
                </p>
                <ul className="list-disc pl-5 text-sm text-[hsl(var(--color-muted-foreground))] space-y-1.5">
                  <li><strong>Theme Selection:</strong> Preserving your preferred Light Mode or Dark Mode view across sessions.</li>
                  <li><strong>Language Preference:</strong> Remembering your selected localization (e.g. English, Spanish, Hindi, Nepali).</li>
                  <li><strong>Transient Tool History (Optional):</strong> If you use our visual batch workflow creator, node configurations are stored locally on your device only.</li>
                </ul>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                  You can purge this data at any time via your browser settings or on our <Link href={`/${locale}/cookies`} className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">Cookie Policy Page</Link>.
                </p>
              </div>

              {/* Clause 4 */}
              <div id="section-4" className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs scroll-mt-28 space-y-3">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Section 04
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  4. Third-Party Infrastructure & CDN
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  When you visit iCreatePDF, your browser downloads static web assets (HTML, CSS, JavaScript, WebAssembly binaries, and web fonts) from our content delivery network (CDN). Like all standard web servers, the CDN automatically logs technical network metadata (IP address, user-agent, timestamp) strictly for DDoS mitigation, performance caching, and operational reliability. These server logs never contain file contents.
                </p>
              </div>

              {/* Clause 5 */}
              <div id="section-5" className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs scroll-mt-28 space-y-3">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Section 05
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  5. Global Privacy Compliance (GDPR, CCPA, HIPAA)
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  Because iCreatePDF does not transmit, store, or process personal data on external servers:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-4 rounded-2xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))]">
                    <h4 className="font-bold text-xs text-[hsl(var(--color-foreground))] mb-1">GDPR (EU/EEA)</h4>
                    <p className="text-[11px] text-[hsl(var(--color-muted-foreground))]">
                      Complies with Article 25 (Data Protection by Design & Default). No cross-border data transfer occurs.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))]">
                    <h4 className="font-bold text-xs text-[hsl(var(--color-foreground))] mb-1">CCPA / CPRA</h4>
                    <p className="text-[11px] text-[hsl(var(--color-muted-foreground))]">
                      We do not sell, share, or monetize consumer personal data in any capacity.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))]">
                    <h4 className="font-bold text-xs text-[hsl(var(--color-foreground))] mb-1">HIPAA Suitability</h4>
                    <p className="text-[11px] text-[hsl(var(--color-muted-foreground))]">
                      No electronic Protected Health Information (ePHI) leaves the covered entity&rsquo;s local device.
                    </p>
                  </div>
                </div>
              </div>

              {/* Clause 6 */}
              <div id="section-6" className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs scroll-mt-28 space-y-3">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Section 06
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  6. Your Rights & Data Sovereignty
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  Under global privacy frameworks, you have rights to access, rectify, erase, or restrict processing of your data. Because iCreatePDF does not store user records or file contents, there is no centralized database to delete from — your data sovereignty is complete and maintained entirely in your own hands.
                </p>
              </div>

              {/* Clause 7 */}
              <div id="section-7" className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs scroll-mt-28 space-y-3">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Section 07
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  7. Policy Inquiries & Data Protection Contact
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  For formal data protection queries, compliance verification, or questions regarding this Privacy Policy, please reach out to our team:
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="mailto:sudipmanigautam3@gmail.com?subject=Privacy%20Inquiry%20-%20iCreatePDF"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Contact Privacy Officer
                  </a>
                  <Link
                    href={`/${locale}/security`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted))/80] text-xs font-semibold text-[hsl(var(--color-foreground))] border border-[hsl(var(--color-border))] transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Read Security Whitepaper
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
