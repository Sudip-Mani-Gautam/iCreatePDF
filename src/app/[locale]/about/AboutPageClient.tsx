'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Shield,
  Zap,
  Globe,
  Heart,
  Code,
  Users,
  ArrowRight,
  Cpu,
  Lock,
  Layers,
  Sparkles,
  Server,
  HardDrive,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  FileText,
  Mail,
  Github,
  HelpCircle,
  Calendar,
  Award,
  ChevronRight,
  Quote,
  Laptop,
  Linkedin
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n/config';
import { getAllTools } from '@/config/tools';

interface AboutPageClientProps {
  locale: Locale;
}

export default function AboutPageClient({ locale }: AboutPageClientProps) {
  const t = useTranslations('aboutPage');
  const allTools = getAllTools();
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const handleEmailClick = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('founder@icreatepdf.com').catch(() => { });
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const impactStats = [
    { value: '67+', label: 'Client-Side Tools', sub: 'Comprehensive PDF manipulation' },
    { value: '0 Bytes', label: 'Cloud File Storage', sub: 'Zero server-side retention' },
    { value: '100%', label: 'Offline Capable', sub: 'Runs in airplane mode' },
    { value: 'AGPLv3', label: 'Open Source', sub: 'Fully auditable codebase' },
  ];

  const milestones = [
    {
      period: 'Early 2024',
      title: 'A Philanthropic Purpose & Initial Spark',
      description: 'Driven by deep respect for user privacy and digital sovereignty, engineered the first offline WebAssembly PDF pipeline to guarantee users total ownership over their files.',
      tag: 'Genesis',
    },
    {
      period: 'Mid 2024',
      title: 'Overcoming Browser Limits with Web Workers',
      description: 'Pioneered an asynchronous pipeline using dedicated Web Workers and ArrayBuffer streaming, enabling 300MB+ PDF operations without freezing the browser interface.',
      tag: 'Core Engine',
    },
    {
      period: 'Late 2024',
      title: 'Releasing Under GNU AGPLv3',
      description: 'Committed to permanent open-source stewardship. Invited independent cryptography reviewers to audit the in-browser AES-256 password protection engine.',
      tag: 'Open Source',
    },
    {
      period: '2025',
      title: 'Global Multi-Language & Desktop Reach',
      description: 'Expanded across 18 localized languages with help from community volunteers. Introduced a lightweight native desktop build via Tauri.',
      tag: 'Global Expansion',
    },
    {
      period: '2026',
      title: 'Visual Workflow Builder & Offline OCR',
      description: 'Launched node-based drag-and-drop workflow pipelines and client-side Tesseract.js neural OCR—enabling multi-step document pipelines on user devices.',
      tag: 'Automation Era',
    },
  ];

  const missionPillars = [
    {
      title: '1. Zero-Byte Cloud Footprint',
      subtitle: 'Privacy as a Physical Law, Not a Promise',
      description: 'Your private documents never leave your browser sandbox. We physically cannot read, store, or sell your files because we operate zero server-side storage disks. All transformations execute in local heap memory.',
      icon: ShieldCheck,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60',
    },
    {
      title: '2. Permanent Universal Equity',
      subtitle: 'Utility Software Belongs to Humanity',
      description: 'Merging two pages, converting an image, or filling a tax form is an essential everyday necessity. We believe nobody should ever face an $18/month paywall, artificial file size quotas, or forced registration.',
      icon: Heart,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      title: '3. Radical Transparency & Open Code',
      subtitle: 'Don’t Trust, Verify with Code',
      description: 'Under the GNU AGPL-3.0 license, our entire codebase is open to inspection. Anyone can audit our cryptographic routines, check our WebAssembly binaries, or contribute new tools to benefit the world.',
      icon: Code,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60',
    },
  ];

  const comparisonRows = [
    {
      feature: 'File Privacy & Security',
      traditional: 'Files uploaded to remote cloud VMs & temporary cloud storage disks',
      icreatepdf: '100% local WebAssembly execution; zero files ever leave your device',
    },
    {
      feature: 'Processing Speed',
      traditional: 'Dependent on upload bandwidth, server queue delays, and download speeds',
      icreatepdf: 'Instant client-side speed powered by your own CPU & WebAssembly workers',
    },
    {
      feature: 'Usage Limits & Paywalls',
      traditional: 'Limited free tasks per day; aggressive $12–$20/month subscription gates',
      icreatepdf: 'Completely free with unlimited file sizes and unlimited conversions',
    },
    {
      feature: 'Offline Operation',
      traditional: 'Impossible without an active, uninterrupted internet connection',
      icreatepdf: 'Works completely offline with Wi-Fi disconnected or in airplane mode',
    },
    {
      feature: 'Code Transparency',
      traditional: 'Closed-source proprietary systems with unverified privacy claims',
      icreatepdf: 'Open source under GNU AGPLv3 with fully public, auditable source code',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Privacy by Architecture',
      description: 'Your files never leave your device. All processing happens locally in your browser memory sandbox.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      icon: Zap,
      title: 'Near-Native Performance',
      description: 'Compiled WebAssembly and multi-threaded Web Workers run operations directly on your computer hardware.',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
    },
    {
      icon: Globe,
      title: 'Globally Accessible',
      description: 'Available in 18+ languages and works on any modern device: Windows, macOS, Linux, iOS, and Android.',
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50',
    },
    {
      icon: Heart,
      title: 'Free & Equitable Forever',
      description: 'No paywalls, no artificial file size restrictions, no forced user registration, and no surprise billing.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      icon: Code,
      title: 'Auditable Open Source',
      description: 'Built on open principles. Anyone can inspect our security implementations and verify our privacy guarantees.',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50',
    },
    {
      icon: Users,
      title: 'Community Centered',
      description: 'Continuous feedback-driven improvements developed openly to solve real-world document challenges.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    },
  ];

  const faqs = [
    {
      q: 'How does iCreatePDF remain free without a paid subscription?',
      a: 'Because all processing happens on your own computer’s CPU rather than expensive cloud servers, our infrastructure operational costs are virtually non-existent. We do not have to pay for server storage farms, data transfer egress fees, or heavy backend GPU clusters. That fundamental technical efficiency lets us keep the software permanently free for everyone.',
    },
    {
      q: 'Can anyone at iCreatePDF see the files I upload or manipulate?',
      a: 'No, absolutely not. Your files never touch our servers. In fact, if you turn off your Wi-Fi or disconnect your internet cable, the tools continue running identically. The processing code executes strictly within your browser’s local sandboxed memory.',
    },
    {
      q: 'Can law firms, healthcare clinics, and enterprises safely use iCreatePDF?',
      a: 'Yes. Because zero data leaves your local network or hardware, using iCreatePDF complies naturally with GDPR, HIPAA, and strict client confidentiality standards that forbid uploading sensitive personal identifiable information (PII) to third-party cloud SaaS providers.',
    },
    {
      q: 'How can I contribute to or audit the project?',
      a: 'The entire source code is hosted publicly on GitHub under the GNU AGPL-3.0 license. You are welcome to inspect our cryptographic pipelines, report issues, submit new tool PRs, or help translate the UI into additional languages.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4 pb-14 text-center">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-emerald-500/5 blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Human Story, Mission & Architecture</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-5">
              Democratizing Document Privacy with{' '}
              <span className="text-emerald-700 dark:text-emerald-400">
                Zero Cloud Exposure
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-100 max-w-3xl mx-auto leading-relaxed mb-8">
              iCreatePDF was created by developers who believe your personal contracts, medical records, and tax forms should never be uploaded to remote cloud servers or held hostage behind predatory subscriptions.
            </p>

            {/* In-Page Jump Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 text-xs font-medium">
              <a href="#story" className="px-3.5 py-1.5 rounded-full bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted)/0.8)] text-[hsl(var(--color-foreground))] transition-colors">
                Our Story
              </a>
              <a href="#mission" className="px-3.5 py-1.5 rounded-full bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted)/0.8)] text-[hsl(var(--color-foreground))] transition-colors">
                Our Mission
              </a>
              <a href="#team" className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 hover:bg-emerald-100 transition-colors">
                The Team & Founder
              </a>
              <a href="#milestones" className="px-3.5 py-1.5 rounded-full bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted)/0.8)] text-[hsl(var(--color-foreground))] transition-colors">
                Milestones
              </a>
              <a href="#architecture" className="px-3.5 py-1.5 rounded-full bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted)/0.8)] text-[hsl(var(--color-foreground))] transition-colors">
                Architecture
              </a>
              <a href="#faq" className="px-3.5 py-1.5 rounded-full bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted)/0.8)] text-[hsl(var(--color-foreground))] transition-colors">
                FAQ
              </a>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
              {impactStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[hsl(var(--color-foreground))] mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1: OUR STORY */}
        <section id="story" className="container mx-auto px-4 max-w-5xl mb-20 scroll-mt-28">
          <div className="p-8 sm:p-12 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/70 dark:border-sky-800/50 text-xs font-semibold text-sky-700 dark:text-sky-300">
              <Calendar className="w-3.5 h-3.5" />
              <span>Chapter 1: The Origin</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))]">
              Our Story: Built on Principle, Engineered to Honor User Privacy
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-zinc-900 dark:text-zinc-100 font-normal leading-relaxed text-justify">
              <p>
                In early 2024, iCreatePDF was born out of a philanthropic conviction: that personal data is sacred, and digital privacy is an inalienable human right that developers carry an ethical responsibility to protect.
              </p>
              <p>
                For years, software vendors conditioned the public to believe that basic digital needs—merging contracts, compressing medical forms, or signing identity documents—required surrendering private files to remote servers. Opaque terms and surveillance-driven platforms turned everyday individuals into commodities, demanding payment, email sign-ups, or unverified cloud uploads for essential tools.
              </p>
              <p className="font-semibold text-zinc-950 dark:text-white">
                Why should anyone have to compromise their privacy, personal dignity, and sensitive records just to manipulate a document?
              </p>
              <p>
                As a developer guided by a philanthropic mindset and profound respect for user trust, Sudip believed technology should empower individuals, not extract from them. Harnessing client-side <strong>WebAssembly (WASM)</strong>, multi-threaded <strong>Web Workers</strong>, and hardware-grade <strong>WebCrypto</strong>, iCreatePDF was created as a permanent public utility: a comprehensive, 100% offline document suite where respect for user data isn’t merely promised in marketing—it is guaranteed by open-source architecture.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR MISSION */}
        <section id="mission" className="container mx-auto px-4 max-w-6xl mb-20 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Guiding Creed
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] mt-1">
              Our Mission: Three Inviolable Pillars
            </h2>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 mt-2">
              Every feature, architecture decision, and tool in iCreatePDF is measured against these principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-7 sm:p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-4 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-md hover:shadow-emerald-500/5 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pillar.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide block">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: THE TEAM & FOUNDER SPOTLIGHT */}
        <section id="team" className="container mx-auto px-4 max-w-6xl mb-20 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              The People Behind The Code
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] mt-1">
              Meet The Team & Community
            </h2>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 mt-2">
              No nameless corporations or opaque venture funds. Real developers building open software with care.
            </p>
          </div>

          {/* Founder Feature Card */}
          <div className="p-6 sm:p-8 md:p-9 rounded-3xl bg-[hsl(var(--color-card))] border border-zinc-200 dark:border-zinc-800 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
              {/* Founder Avatar with subtle glowing & zoom animation */}
              <div className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-zinc-200/90 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-emerald-500/25 dark:group-hover:shadow-emerald-400/20 group-hover:border-emerald-500/60 group-hover:ring-4 group-hover:ring-emerald-500/15">
                  <Image
                    src="/images/founder&CEO.png"
                    alt="Sudip Mani Gautam - Founder & CEO"
                    fill
                    sizes="(max-width: 640px) 192px, 224px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Founder & CEO
                </div>
              </div>

              {/* Bio & Links */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[hsl(var(--color-foreground))]">
                    Sudip Mani Gautam
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-zinc-900 dark:text-zinc-100 font-normal leading-relaxed text-justify">
                  Software engineer, systems developer, and privacy advocate. Sudip designed and implemented iCreatePDF’s client-side WebAssembly rendering pipeline, the multi-threaded Web Workers engine, and the visual PDF Workflow Builder.
                </p>

                <div className="relative p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/90 dark:border-zinc-700/60 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                      <Quote className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed text-justify">
                      “When you lock the door of your house, you don’t give a copy of your key to a stranger across the world. Your files deserve that exact same respect.”
                    </p>
                  </div>
                </div>

                {/* Direct Founder Links */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2">
                  <Link
                    href={`/${locale}/about/founder`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <span>Read Full Founder Profile & Q&A</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="https://sudipmanigautam.com.np/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-semibold text-white shadow-xs transition-colors"
                    title="Sudip's Personal Website"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>sudipmanigautam.com.np</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/sudip-mani-gautam-038967285/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] dark:text-[#38a0dc] border border-[#0077b5]/20 text-xs font-semibold transition-colors"
                    title="Sudip's LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/Sudip-Mani-Gautam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted)/0.8)] text-xs font-semibold text-[hsl(var(--color-foreground))] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="mailto:founder@icreatepdf.com?subject=Hello%20Sudip%20-%20iCreatePDF"
                    onClick={handleEmailClick}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors"
                    title="Send email to founder@icreatepdf.com (click to copy)"
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email</span>
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Community & Collaborator Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[hsl(var(--color-foreground))]">
                Open Source Foundations
              </h4>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                iCreatePDF builds upon peer-reviewed open source giants: PDFCraft, BentoPDF, Mozilla’s PDF.js, and Hopding’s pdf-lib, giving back fixes and improvements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[hsl(var(--color-foreground))]">
                Localization Community
              </h4>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                Volunteers and multilingual contributors translated tool labels, descriptions, and user guides into 18+ worldwide languages to ensure digital access for all.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[hsl(var(--color-foreground))]">
                Independent Security Auditors
              </h4>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                Security researchers and privacy enthusiasts who review our cryptographic primitives, test WebAssembly sandbox boundaries, and keep us transparent.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECT MILESTONES TIMELINE */}
        <section id="milestones" className="container mx-auto px-4 max-w-5xl mb-20 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] mt-1">
              Milestones in Client-Side Evolution
            </h2>
          </div>

          <div className="relative border-l-2 border-emerald-500/25 ml-4 sm:ml-8 space-y-8">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[hsl(var(--color-background))] border-2 border-emerald-600 group-hover:scale-125 transition-transform" />

                <div className="p-5 sm:p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-2 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {item.period}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[hsl(var(--color-muted))] text-zinc-700 dark:text-zinc-300">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[hsl(var(--color-foreground))]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: THE ARCHITECTURAL SHIFT */}
        <section id="architecture" className="container mx-auto px-4 max-w-6xl mb-20 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] mt-1">
              Why Browser-Native Architecture Wins
            </h2>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 mt-2">
              How iCreatePDF compares with legacy cloud conversion portals like Smallpdf or iLovePDF.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.5)] p-4 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              <div className="md:col-span-4">Evaluation Metric</div>
              <div className="md:col-span-4 text-rose-600 dark:text-rose-400">Traditional Cloud PDF Services</div>
              <div className="md:col-span-4 text-emerald-600 dark:text-emerald-400">iCreatePDF (Browser-Native)</div>
            </div>

            <div className="divide-y divide-[hsl(var(--color-border))]">
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-5 text-sm gap-3 items-center">
                  <div className="md:col-span-4 font-semibold text-[hsl(var(--color-foreground))]">
                    {row.feature}
                  </div>
                  <div className="md:col-span-4 flex items-start gap-2 text-rose-700 dark:text-rose-300 bg-rose-50/60 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-200/50 dark:border-rose-900/30 text-xs">
                    <XCircle className="w-4 h-4 flex-shrink-0 text-rose-500 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                  <div className="md:col-span-4 flex items-start gap-2 text-emerald-800 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span>{row.icreatepdf}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: CORE VALUES */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              Core Principles Guiding Every Tool
            </h2>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 mt-2">
              Uncompromising standards for user respect, security, and digital freedom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${value.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[hsl(var(--color-foreground))] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: TRANSPARENT FAQ */}
        <section id="faq" className="container mx-auto px-4 max-w-4xl mb-20 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Clear Answers
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <h3 className="font-bold text-base text-[hsl(var(--color-foreground))]">
                    {faq.q}
                  </h3>
                </div>
                <p className="pl-7 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Source AGPL-3.0 License Box */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] text-center shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[hsl(var(--color-foreground))]">
              100% Free & Open Source Software
            </h3>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed max-w-2xl mx-auto">
              iCreatePDF is distributed under the <strong>GNU Affero General Public License v3.0 (AGPL-3.0)</strong>. All code is public, freely auditable, and extensible by developers worldwide.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link href={`/${locale}/license`}>
                <Button variant="outline" size="sm" className="rounded-full">
                  License Terms (AGPL-3.0)
                </Button>
              </Link>
              <Link href={`/${locale}/acknowledgements`}>
                <Button variant="outline" size="sm" className="rounded-full">
                  Credits & Acknowledgements
                </Button>
              </Link>
              <a
                href="https://github.com/Sudip-Mani-Gautam/iCreatePDF"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm" className="gap-2 rounded-full">
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repository
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-emerald-800 text-white shadow-xl text-center relative overflow-hidden">
            <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Experience Private PDF Tools Today
              </h2>
              <p className="text-sm sm:text-base text-white/95 leading-relaxed">
                No account needed. No credit card. Just pure, private document utilities running right on your machine.
              </p>
              <div className="pt-3">
                <Link href={`/${locale}/tools`}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-emerald-800 hover:bg-zinc-100 font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    Explore All {allTools.length}+ Tools <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
