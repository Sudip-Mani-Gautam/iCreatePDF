'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  HardDrive,
  Cpu,
  EyeOff,
  CheckCircle2,
  XCircle,
  WifiOff,
  Terminal,
  FileKey2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Check,
  FileCheck,
  Building2,
  Mail
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface SecurityPageClientProps {
  locale: Locale;
}

export default function SecurityPageClient({ locale }: SecurityPageClientProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const securityPillars = [
    {
      icon: EyeOff,
      title: 'Zero File Uploads (Zero-Knowledge)',
      badge: 'Architecture',
      description: 'Your confidential PDF documents never travel over the network. WebAssembly engines run directly inside your browser memory heap.',
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50',
    },
    {
      icon: Lock,
      title: 'Hardware-Accelerated WebCrypto',
      badge: 'Cryptography',
      description: 'PDF passwords and encryption algorithms utilize native WebCrypto API standards (AES-256-GCM / PBKDF2) without ever transmitting keys.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      icon: Cpu,
      title: 'Isolated Web Worker Sandbox',
      badge: 'Memory Safety',
      description: 'Document processing runs within segregated Web Worker threads with strictly partitioned memory, preventing script interference.',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50',
    },
    {
      icon: HardDrive,
      title: 'Ephemeral RAM Destruction',
      badge: 'Data Lifecycle',
      description: 'No files are ever persisted to disk. All binary buffers are cleared and garbage collected the millisecond processing finishes or when the tab closes.',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50',
    },
  ];

  const verificationSteps = [
    {
      step: '01',
      title: 'Open Browser Developer Tools',
      desc: 'Press F12 or Ctrl+Shift+I (Cmd+Option+I on macOS) in Chrome, Edge, Firefox, or Safari, and navigate to the Network tab.',
    },
    {
      step: '02',
      title: 'Filter for External Requests',
      desc: 'Ensure the Network recording filter is enabled and check the "Preserve Log" option to trace all outbound network packets.',
    },
    {
      step: '03',
      title: 'Process Any Confidential PDF',
      desc: 'Upload a 20MB+ document to any tool (Merge, Compress, Encrypt, or Redact) and execute the operation.',
    },
    {
      step: '04',
      title: 'Verify 0 Outbound File Bytes',
      desc: 'Observe the network stream: 0 bytes of your file leave your machine. You can even toggle Airplane Mode and it completes seamlessly.',
    },
  ];

  const threatComparisons = [
    {
      vector: 'File Transit over Public Internet',
      cloud: 'Yes — files travel across multiple network hops and intermediate proxies',
      icreatepdf: 'Never — 100% of data remains inside local computer memory',
    },
    {
      vector: 'Server-Side Cloud Storage Breaches',
      cloud: 'High Risk — stored on cloud buckets (S3/GCS) where misconfigurations cause leaks',
      icreatepdf: 'Zero Risk — we operate 0 storage servers and hold 0 bytes of user documents',
    },
    {
      vector: 'Subpoenas & Government Data Requests',
      cloud: 'Provider can be legally compelled to turn over stored user documents',
      icreatepdf: 'Technically impossible — we have no data or custody to provide',
    },
    {
      vector: 'HIPAA & GDPR Art. 25 Suitability',
      cloud: 'Requires executing complex Business Associate Agreements (BAAs) and DPAs',
      icreatepdf: 'Inherent compliance by design — no Protected Health Information (PHI) is processed off-premises',
    },
    {
      vector: 'Offline Continuity (Air-Gapped Systems)',
      cloud: 'Inoperable — halts completely without active external internet connection',
      icreatepdf: 'Fully functional — complete offline operation for defense, finance, and secure air-gapped labs',
    },
  ];

  const securityFaqs = [
    {
      q: 'Can browser extensions or third parties intercept my PDF files?',
      a: 'iCreatePDF enforces a strict Content Security Policy (CSP) and runs document engines inside isolated WebAssembly heaps. However, as with all web applications, we recommend disabling untrusted or suspicious third-party browser extensions when handling classified or highly sensitive data.',
    },
    {
      q: 'Does iCreatePDF collect telemetry, analytics, or document metadata?',
      a: 'No. We do not track document filenames, text contents, page counts, or user document metadata. All processing is completely anonymous, and no document telemetry exists.',
    },
    {
      q: 'Is iCreatePDF safe for legal, medical, and NDA-bound documents?',
      a: 'Yes. Because your files never leave your machine or transmit across the internet, processing a file with iCreatePDF is equivalent to opening it in a local desktop PDF reader like Adobe Acrobat or Preview.',
    },
    {
      q: 'What happens to my document if the browser tab unexpectedly closes?',
      a: 'All processing takes place in transient RAM. When the tab or browser process terminates, the operating system immediately reclaims all memory buffers. Nothing remains on disk.',
    },
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
              <span>Zero-Trust Architecture • Cryptographically Isolated</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              Bank-Grade Security with{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Zero Cloud Uploads
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-8">
              Engineered from first principles for legal firms, healthcare providers, financial analysts, and privacy-conscious users who cannot compromise on confidentiality.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#verification"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Terminal className="w-4 h-4" /> How to Verify in DevTools
              </a>
              <Link
                href={`/${locale}/tools`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[hsl(var(--color-card))] hover:bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))] border border-[hsl(var(--color-border))] font-semibold text-sm shadow-xs transition-all hover:scale-[1.02]"
              >
                <Lock className="w-4 h-4 text-emerald-600" /> Launch Secure Tools
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Client-Side Protection */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              Four Core Layers of Document Protection
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2">
              How iCreatePDF guarantees security at the hardware, binary, and network levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${pillar.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[hsl(var(--color-foreground))] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive DevTools Verification Checklist */}
        <section id="verification" className="container mx-auto px-4 max-w-5xl mb-20 scroll-mt-24">
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 text-white shadow-xl border border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Terminal className="w-4 h-4" /> Transparency Audit
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              Don&rsquo;t Trust Us — Verify in 60 Seconds
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl mb-8">
              You do not need to rely on marketing claims. Anyone with a web browser can inspect our network calls in real time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {verificationSteps.map((step, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      STEP {step.step}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <WifiOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Airplane Mode Verifiable</h4>
                  <p className="text-[11px] text-zinc-300">
                    Disconnect your Wi-Fi or router right now: iCreatePDF will still merge, compress, and edit files without interruption.
                  </p>
                </div>
              </div>
              <Link
                href={`/${locale}/tools`}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold shadow-sm transition-all"
              >
                Test Offline Now
              </Link>
            </div>
          </div>
        </section>

        {/* Security Threat Model Comparison */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              Threat Model & Risk Vector Comparison
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2">
              Comparing client-side memory execution with traditional cloud conversion portals.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.5)] p-4 text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">
              <div className="md:col-span-4">Security Threat Vector</div>
              <div className="md:col-span-4 text-rose-600 dark:text-rose-400">Cloud PDF Services</div>
              <div className="md:col-span-4 text-emerald-600 dark:text-emerald-400">iCreatePDF Zero-Knowledge</div>
            </div>

            <div className="divide-y divide-[hsl(var(--color-border))]">
              {threatComparisons.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-5 text-sm gap-3 items-center">
                  <div className="md:col-span-4 font-semibold text-[hsl(var(--color-foreground))]">
                    {item.vector}
                  </div>
                  <div className="md:col-span-4 flex items-start gap-2 text-rose-700 dark:text-rose-300 bg-rose-50/60 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-200/50 dark:border-rose-900/30 text-xs">
                    <XCircle className="w-4 h-4 flex-shrink-0 text-rose-500 mt-0.5" />
                    <span>{item.cloud}</span>
                  </div>
                  <div className="md:col-span-4 flex items-start gap-2 text-emerald-800 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span>{item.icreatepdf}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security FAQ Accordion */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              Security & Compliance Questions
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">
              Common questions from Chief Information Security Officers (CISOs), auditors, and legal counsels.
            </p>
          </div>

          <div className="space-y-3.5">
            {securityFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted)/0.3)] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[hsl(var(--color-muted-foreground))] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.1)]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Responsible Disclosure & Security Contact */}
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
                <FileKey2 className="w-3.5 h-3.5" /> Vulnerability Disclosure
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Report a Security Finding
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                We take security bugs seriously. If you believe you have discovered a vulnerability in our client-side implementation, please contact our security team directly:
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:sudipmanigautam3@gmail.com?subject=Security%20Vulnerability%20Report"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-emerald-700 font-bold text-sm shadow hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" /> sudipmanigautam3@gmail.com
                </a>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/25 hover:bg-black/40 text-white font-semibold text-sm border border-white/20 backdrop-blur transition-all"
                >
                  Contact Form <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-xs text-white/75 pt-1">
                We acknowledge all security reports within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
