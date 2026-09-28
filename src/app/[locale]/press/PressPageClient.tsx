'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Newspaper,
  Download,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Globe2,
  Sparkles,
  Layers,
  FileCheck2,
  ArrowRight,
  Share2,
  Calendar,
  Building2,
  Palette
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface PressPageClientProps {
  locale: Locale;
}

export default function PressPageClient({ locale }: PressPageClientProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const brandColors = [
    { name: 'Crimson Red (Primary)', hex: '#DC2626', rgb: 'rgb(220, 38, 38)', usage: 'Brand logo, primary buttons, accents' },
    { name: 'Rose Red (Gradients)', hex: '#E11D48', rgb: 'rgb(225, 29, 72)', usage: 'Gradient overlays, hover highlights' },
    { name: 'Cobalt Blue (Secondary)', hex: '#2563EB', rgb: 'rgb(37, 99, 235)', usage: 'Direct editor tools, links' },
    { name: 'Zinc 950 (Dark Mode Base)', hex: '#09090B', rgb: 'rgb(9, 9, 11)', usage: 'Dark background, headers' },
    { name: 'Pure White (Light Mode Base)', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', usage: 'Cards, clean surfaces' },
  ];

  const fastFacts = [
    {
      label: 'Client-Side Tools',
      value: '67+',
      desc: 'Full-featured suite covering merge, compress, edit, OCR, sign, & convert',
      icon: Layers,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40',
    },
    {
      label: 'Files Uploaded',
      value: '0',
      desc: '100% local WebAssembly execution with zero cloud storage or server risk',
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      label: 'Global Languages',
      value: '18+',
      desc: 'Localized interfaces across English, Spanish, Hindi, Nepali, Chinese, etc.',
      icon: Globe2,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40',
    },
    {
      label: 'Software Freedom',
      value: '100% Free',
      desc: 'Open Source licensed under AGPLv3 with zero paywalls or subscription fees',
      icon: Sparkles,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40',
    },
  ];

  const milestones = [
    {
      date: 'September 2026',
      title: 'Direct Content In-Place PDF Editor Launched',
      desc: 'Introduced direct vector text editing, font replacement, paragraph reflow, and image modification completely inside the browser.',
    },
    {
      date: 'August 2026',
      title: 'Cross-Platform Desktop & Offline PWA Suite',
      desc: 'Packaged lightweight native desktop editions via Tauri for Windows, macOS, and Linux with full offline hardware acceleration.',
    },
    {
      date: 'June 2026',
      title: 'Multi-Step Visual Batch Workflow Engine',
      desc: 'Unveiled automated visual node pipelines allowing users to chain compress, redact, watermark, and convert tasks in a single pass.',
    },
    {
      date: 'January 2026',
      title: 'iCreatePDF 2.0 Open Source Release',
      desc: 'Refactored entire architecture to zero-server WebAssembly engines under the GNU Affero General Public License v3.0.',
    },
  ];

  const boilerplate = `iCreatePDF (https://icreatepdf.com) is an open-source, privacy-first PDF utility suite engineered to run entirely within the user's web browser. Powered by WebAssembly, Web Workers, and modern client-side cryptographic standards, iCreatePDF allows individuals and enterprise teams to merge, split, compress, edit, redact, and convert sensitive documents with zero server uploads, zero subscription costs, and total data confidentiality.`;

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4 pb-14 text-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-red-500/10 via-rose-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200/80 dark:border-red-900/60 text-xs font-semibold text-red-600 dark:text-red-400 mb-6 shadow-xs">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Press & Media Kit • Newsroom</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              Everything You Need to Cover{' '}
              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                iCreatePDF
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-8">
              Official press releases, downloadable brand assets, company fast facts, executive bios, and direct media relations contacts.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="/favicon.svg"
                download="iCreatePDF-Brand-Kit.svg"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" /> Download Logo Assets (SVG)
              </a>
              <button
                onClick={() => copyToClipboard(boilerplate, 'boilerplate-hero')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[hsl(var(--color-card))] hover:bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))] border border-[hsl(var(--color-border))] font-semibold text-sm shadow-xs transition-all hover:scale-[1.02]"
              >
                {copiedKey === 'boilerplate-hero' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" /> Copied Boilerplate!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[hsl(var(--color-muted-foreground))]" /> Copy Bio Boilerplate
                  </>
                )}
              </button>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm shadow-xs transition-all"
              >
                <Mail className="w-4 h-4" /> Media Inquiries
              </Link>
            </div>
          </div>
        </section>

        {/* Fast Facts Grid */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              Fast Facts & At-A-Glance Metrics
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">
              Verified figures for journalistic citations and industry research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fastFacts.map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${fact.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight mb-1">
                    {fact.value}
                  </div>
                  <div className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">
                    {fact.label}
                  </div>
                  <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                    {fact.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Brand Assets Showcase */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="p-8 sm:p-10 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[hsl(var(--color-border))]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                  <Palette className="w-3.5 h-3.5" /> Official Assets
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--color-foreground))]">
                  Logos & Visual Identity
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">
                  High-resolution vector artwork, typography, and standard brand guidelines for press publications.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href="/favicon.svg"
                  download="iCreatePDF-Logo.svg"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> SVG Vector Logo
                </a>
                <a
                  href="/images/logo.png"
                  download="iCreatePDF-Logo-512.png"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted))/80] text-[hsl(var(--color-foreground))] text-xs font-bold border border-[hsl(var(--color-border))] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> High-Res PNG
                </a>
              </div>
            </div>

            {/* Asset Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {/* Light Mode Preview */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-xs">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-4">
                  Light Background
                </span>
                <div className="h-24 flex items-center justify-center mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo.png" alt="iCreatePDF Light Logo" className="h-10 w-auto object-contain" />
                </div>
                <p className="text-xs text-gray-500">
                  Primary full-color logo on white or light surfaces.
                </p>
              </div>

              {/* Dark Mode Preview */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center shadow-xs">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-4">
                  Dark Background
                </span>
                <div className="h-24 flex items-center justify-center mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo.png" alt="iCreatePDF Dark Logo" className="h-10 w-auto object-contain" />
                </div>
                <p className="text-xs text-zinc-400">
                  Contrast-optimized logo for dark themes and media.
                </p>
              </div>

              {/* App Icon Preview */}
              <div className="p-6 rounded-2xl bg-[hsl(var(--color-muted)/0.4)] border border-[hsl(var(--color-border))] text-center shadow-xs">
                <span className="text-[11px] font-semibold text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider block mb-4">
                  Icon Mark (Favicon)
                </span>
                <div className="h-24 flex items-center justify-center mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/favicon.svg" alt="iCreatePDF Icon" className="w-12 h-12 object-contain" />
                </div>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                  Square app icon for toolbars, avatars, and favicons.
                </p>
              </div>
            </div>

            {/* Brand Colors Palette with Click-to-Copy */}
            <div className="pt-6 border-t border-[hsl(var(--color-border))]">
              <h3 className="text-sm font-bold text-[hsl(var(--color-foreground))] mb-4 uppercase tracking-wider">
                Official Color Palette
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {brandColors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(color.hex, `color-${idx}`)}
                    className="p-3.5 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:border-red-400 dark:hover:border-red-600 transition-all text-left group cursor-pointer"
                  >
                    <div
                      className="w-full h-8 rounded-lg mb-2.5 shadow-inner border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[hsl(var(--color-foreground))]">
                        {color.hex}
                      </span>
                      {copiedKey === `color-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-[hsl(var(--color-muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <span className="text-[11px] text-[hsl(var(--color-muted-foreground))] block truncate mt-0.5">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Bio & Boilerplate */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
                    About iCreatePDF (Boilerplate)
                  </h2>
                  <button
                    onClick={() => copyToClipboard(boilerplate, 'boilerplate-box')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted))/80] text-xs font-semibold text-[hsl(var(--color-foreground))] border border-[hsl(var(--color-border))] transition-colors"
                  >
                    {copiedKey === 'boilerplate-box' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Text
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm sm:text-base text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  {boilerplate}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                    Founded: 2024
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                    License: GNU AGPLv3
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                    Architecture: 100% Client-Side WASM
                  </span>
                </div>
              </div>

              {/* Story Highlights */}
              <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs">
                <h3 className="text-lg font-bold text-[hsl(var(--color-foreground))] mb-3">
                  Why iCreatePDF is Different
                </h3>
                <div className="space-y-3.5 text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  <p>
                    Most popular online PDF services operate on an outdated client-server model: users upload private tax returns, healthcare records, and confidential contracts to remote cloud VMs. This exposes individuals and enterprises to server-side data leaks, man-in-the-middle vulnerabilities, and costly monthly subscriptions.
                  </p>
                  <p>
                    iCreatePDF inverts this paradigm entirely. By compiling high-performance C++ and Rust PDF rendering libraries directly into <strong>WebAssembly</strong>, all operations happen inside the user&rsquo;s browser sandbox on their own processor. Nothing is uploaded, nothing is stored, and files can even be processed with the Wi-Fi completely turned off.
                  </p>
                </div>
              </div>
            </div>

            {/* News & Release Milestones */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))]">
                  Product Milestones
                </h3>
              </div>

              <div className="relative pl-6 border-l-2 border-red-200 dark:border-red-900/60 space-y-6">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle marker */}
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-zinc-900 border-2 border-red-600 dark:border-red-400 group-hover:scale-125 transition-transform" />
                    <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
                      {milestone.date}
                    </span>
                    <h4 className="text-sm font-bold text-[hsl(var(--color-foreground))] mb-1">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Contact Card */}
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-2xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
                <Building2 className="w-3.5 h-3.5" /> Media Relations Office
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Need an Interview, Quote, or Custom Demo?
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Our founders and core engineering contributors are available for commentary on browser-based privacy, WebAssembly in production, and zero-knowledge web application architecture.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:sudipmanigautam3@gmail.com?subject=Press%20Inquiry%20-%20iCreatePDF"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-red-600 font-bold text-sm shadow hover:bg-zinc-100 transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
                Typical press response turnaround: Under 24 hours.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
