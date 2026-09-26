'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, HardDrive, Cpu, EyeOff, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface SecurityPageClientProps {
  locale: Locale;
}

export default function SecurityPageClient({ locale }: SecurityPageClientProps) {
  const securityPillars = [
    {
      icon: EyeOff,
      title: 'Zero File Uploads',
      description: 'Your confidential PDF documents never leave your computer. WebAssembly engines run directly in your browser memory.'
    },
    {
      icon: Lock,
      title: 'Client-Side Cryptography',
      description: 'PDF passwords and encryption algorithms utilize WebCrypto API standards (AES-256) locally without transmitting keys.'
    },
    {
      icon: Cpu,
      title: 'Isolated Browser Sandbox',
      description: 'Processing operates inside modern browser sandboxes, preventing external scripts or third parties from accessing file contents.'
    },
    {
      icon: HardDrive,
      title: 'Instant Memory Cleanup',
      description: 'When processing finishes or the browser tab closes, all file buffers are immediately garbage collected and destroyed.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center py-10 max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-3">
              Security Architecture
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
              Designed from first principles for zero-trust environments, legal compliance, and total document privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">100% Offline Verifiable</h2>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
              You can disconnect your internet, turn on airplane mode, and continue merging, splitting, and signing your documents with zero interruption.
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/tools`}
                className="inline-block px-6 py-3 rounded-full bg-white text-red-600 font-bold text-sm shadow hover:bg-zinc-100 transition-all"
              >
                Try Secure Tools Offline
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
