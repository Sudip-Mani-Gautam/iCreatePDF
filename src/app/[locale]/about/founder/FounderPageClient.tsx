'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Github,
  Mail,
  ShieldCheck,
  Cpu,
  Terminal,
  Heart,
  ExternalLink,
  BookOpen,
  Code2,
  CheckCircle2,
  Laptop,
  Layers,
  ArrowRight,
  Quote,
  Globe,
  Linkedin
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { type Locale } from '@/lib/i18n/config';

interface FounderPageClientProps {
  locale: Locale;
}

export default function FounderPageClient({ locale }: FounderPageClientProps) {
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const handleEmailClick = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('founder@icreatepdf.com').catch(() => { });
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const philosophies = [
    {
      title: 'Local First, Cloud Never',
      desc: 'If a calculation can happen on the user’s processor, routing it through a data center is an architectural failure and a privacy compromise.',
      icon: Laptop,
    },
    {
      title: 'No Artificial Paywalls on Utility',
      desc: 'Merging two sheets of paper or compressing an invoice shouldn’t cost a monthly subscription. Basic digital utilities belong to everyone.',
      icon: Heart,
    },
    {
      title: 'Radical Auditability',
      desc: 'Security isn’t a marketing badge. If you can’t inspect the source code running on your machine, you don’t own your privacy.',
      icon: ShieldCheck,
    },
  ];

  const interviewQuestions = [
    {
      q: 'What originally sparked you to create iCreatePDF?',
      a: 'I have always held a deep philanthropic conviction that digital privacy is an essential human right, and that developers carry an ethical responsibility to protect the public. For years, document platforms treated private records as commercial commodities—forcing unverified cloud uploads, demanding recurring subscriptions, and tracking personal files. I believed people deserved complete respect and absolute data sovereignty. With modern browser technologies like WebAssembly, multi-core Web Workers, and WebCrypto, I set out to engineer a free public utility that empowers everyone while ensuring their files never touch an external server.',
    },
    {
      q: 'Why did you choose WebAssembly and client-side processing over a standard cloud backend?',
      a: 'Traditional SaaS companies build backends because backends enable vendor lock-in, recurring subscriptions, and data harvesting. Client-side WebAssembly flips the script. By compiling native C++ and Rust PDF processing engines directly into browser bytecode, we achieve near-instant execution speed without running server farms. This means zero hosting overhead for storage, zero risk of data leaks from our end, and guaranteed privacy for users.',
    },
    {
      q: 'What was the toughest technical hurdle in making 67+ tools work completely in-browser?',
      a: 'Memory management and thread responsiveness. When someone drops a 300MB scanned PDF with hundreds of pages into a browser tab, a naïve JavaScript implementation will instantly choke and crash the tab. We had to architect an asynchronous Web Worker pipeline that streams binary byte arrays, manages ArrayBuffers cleanly, and uses OffscreenCanvas for rendering. The result is that heavy operations run smoothly in the background while the UI remains buttery smooth at 60 FPS.',
    },
    {
      q: 'Why release iCreatePDF under the AGPL-3.0 open source license?',
      a: 'Trust is not something you can demand with a fancy privacy policy statement written by lawyers. You have to prove it with code. Under AGPL-3.0, anyone in the world can inspect our repository, audit every single line of code, run it locally, or contribute improvements. It ensures that iCreatePDF remains forever free, transparent, and owned by the community rather than venture capitalists.',
    },
    {
      q: 'What is your vision for the future of document tools?',
      a: 'We are expanding beyond simple one-off file tools into comprehensive, autonomous workflows. With our new node-based PDF Workflow Builder, users can visually construct complex pipelines—like deskewing scanned pages, running offline OCR, applying dynamic watermarks, and packaging encrypted archives—all executed entirely on their device without a single API key or subscription.',
    },
  ];

  const techArsenal = [
    { name: 'WebAssembly (WASM)', role: 'Near-native speed computation' },
    { name: 'TypeScript & Next.js', role: 'Type-safe reactive architecture' },
    { name: 'Rust & C++ Tooling', role: 'Underlying document manipulators' },
    { name: 'Web Workers API', role: 'Multi-threaded background compute' },
    { name: 'WebCrypto (AES-256-GCM)', role: 'Hardware-grade client encryption' },
    { name: 'Tauri / Rust Bridge', role: 'Lightweight native desktop runtime' },
    { name: 'pdf-lib & PDF.js', role: 'Vector stream & font parsing' },
    { name: 'Tesseract.js WASM', role: '100% offline optical character recognition' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 max-w-5xl mb-8">
          <nav className="flex items-center gap-2 text-xs text-[hsl(var(--color-muted-foreground))]">
            <Link href={`/${locale}`} className="hover:text-[hsl(var(--color-foreground))] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${locale}/about`} className="hover:text-[hsl(var(--color-foreground))] transition-colors">
              About
            </Link>
            <span>/</span>
            <span className="text-[hsl(var(--color-foreground))] font-medium">Founder</span>
          </nav>
        </div>

        {/* Hero Section: Personal Profile Header */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="relative p-8 sm:p-12 md:p-14 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs overflow-hidden">
            {/* Subtle Warm Gradient Backing */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500/10 via-rose-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10">
              {/* Founder Avatar Frame with glowing hover & zoom animation */}
              <div className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-zinc-200/90 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-emerald-500/25 dark:group-hover:shadow-emerald-400/20 group-hover:border-emerald-500/60 group-hover:ring-4 group-hover:ring-emerald-500/15">
                  <Image
                    src="/images/founder&CEO.png"
                    alt="Sudip Mani Gautam - Founder & CEO of iCreatePDF"
                    fill
                    sizes="(max-width: 640px) 192px, 224px"
                    priority
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                <div className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Founder & CEO
                </div>
              </div>

              {/* Bio & Intro Details */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))]">
                  Sudip Mani Gautam
                </h1>

                <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-100 font-normal leading-relaxed text-justify">
                  Full-stack software engineer and open-source builder passionate about local-first computing, browser-native performance, and liberating everyday productivity tools from predatory subscriptions.
                </p>

                <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed text-justify">
                  Creator of <strong>iCreatePDF</strong>, architecting client-side WebAssembly pipelines that process sensitive legal, medical, and financial documents with zero cloud exposure.
                </p>

                {/* Direct Action Links */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-3">
                  <a
                    href="https://sudipmanigautam.com.np/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-semibold text-white shadow-xs transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>sudipmanigautam.com.np</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/sudip-mani-gautam-038967285/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] dark:text-[#38a0dc] border border-[#0077b5]/20 text-xs font-semibold transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  <a
                    href="https://github.com/Sudip-Mani-Gautam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted)/0.8)] text-xs font-semibold text-[hsl(var(--color-foreground))] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  <a
                    href="mailto:founder@icreatepdf.com?subject=Hello%20Sudip%20-%20iCreatePDF"
                    onClick={handleEmailClick}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors"
                    title="Send email to founder@icreatepdf.com (click to copy)"
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </>
                    )}
                  </a>

                  <Link href={`/${locale}/about`}>
                    <Button variant="outline" size="sm" className="rounded-xl text-xs">
                      <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to About
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Personal Manifesto & Quote (Lighter Green Card) */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="p-8 sm:p-11 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-emerald-100/60 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-emerald-950/20 border-2 border-emerald-200/80 dark:border-emerald-800/50 text-[hsl(var(--color-foreground))] shadow-md shadow-emerald-500/5 relative overflow-hidden">
            <Quote className="w-24 h-24 text-emerald-500/15 dark:text-emerald-400/10 absolute -top-4 -left-4 pointer-events-none" />
            <div className="max-w-3xl mx-auto space-y-4 relative z-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Founder&apos;s Perspective</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-950 dark:text-emerald-100">
                A Personal Note to Every User
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
                “When you lock the front door of your home, you don’t mail a copy of your key to a corporation across the globe. Yet for years, the software industry conditioned everyone to believe that merging a contract, compressing an invoice, or signing a tax document required sending the file across the internet into someone else’s cloud storage.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
                I built iCreatePDF to prove that software can be fast, capable, beautiful, and respectful without asking for your email address, without extracting monthly fees, and without your data ever leaving your own hands. This tool belongs to you as much as it belongs to me.”
              </p>
              <div className="pt-2 text-right">
                <span className="font-serif italic text-lg sm:text-xl font-bold tracking-wide text-emerald-800 dark:text-emerald-300">— Sudip Mani Gautam</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Guiding Philosophies */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              Engineering Mindset
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] mt-1">
              Guiding Engineering Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophies.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[hsl(var(--color-foreground))]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* In-Depth Interview / Q&A */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              Behind the Code
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] mt-1">
              Conversations on Building iCreatePDF
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2">
              Sudip answers frequent questions about architecture, challenges, and the open-source philosophy.
            </p>
          </div>

          <div className="space-y-5">
            {interviewQuestions.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 flex items-center justify-center text-xs font-bold mt-0.5">
                    Q
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-[hsl(var(--color-foreground))]">
                    {item.q}
                  </h3>
                </div>
                <div className="pl-9 text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed space-y-2">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Arsenal / Stack Sudip Uses */}
        <section className="container mx-auto px-4 max-w-5xl mb-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Toolbox
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] mt-1">
                The Technologies That Power the Project
              </h2>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2">
                Hand-selected libraries, compilers, and browser APIs utilized to achieve 100% offline document processing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {techArsenal.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))] space-y-1"
                >
                  <div className="text-xs font-bold text-[hsl(var(--color-foreground))] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{tech.name}</span>
                  </div>
                  <p className="text-[11px] text-[hsl(var(--color-muted-foreground))]">
                    {tech.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Connect & Explore */}
        <section className="container mx-auto px-4 max-w-4xl text-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-[hsl(var(--color-muted)/0.4)] border border-[hsl(var(--color-border))] space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">
              Have an Idea, Feature Request, or Security Audit?
            </h3>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] max-w-xl mx-auto leading-relaxed">
              Sudip reads every email and reviews pull requests openly on GitHub. Whether you found an edge case with a corrupted PDF or want to request a new client-side tool, get in touch directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://sudipmanigautam.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-xs transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Visit sudipmanigautam.com.np</span>
              </a>
              <a
                href="https://www.linkedin.com/in/sudip-mani-gautam-038967285/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] dark:text-[#38a0dc] border border-[#0077b5]/20 text-sm font-semibold transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
              <a
                href="https://github.com/Sudip-Mani-Gautam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[hsl(var(--color-card))] hover:bg-[hsl(var(--color-muted))] border border-[hsl(var(--color-border))] text-sm font-semibold text-[hsl(var(--color-foreground))] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
              <a
                href="mailto:founder@icreatepdf.com?subject=Hello%20Sudip%20-%20iCreatePDF"
                onClick={handleEmailClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs transition-colors"
                title="Send email to founder@icreatepdf.com (click to copy)"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </>
                )}
              </a>
              <Link href={`/${locale}/tools`}>
                <Button variant="outline" size="sm" className="rounded-full">
                  Try the Tools <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
