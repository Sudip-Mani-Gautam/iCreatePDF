'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Scale, FileText, Shield, CheckCircle2, AlertTriangle, Code2, RefreshCw,
  Mail, ArrowRight, ChevronRight, Sparkles, Gavel, BookOpen, Globe,
  Copyright, UserCheck, TriangleAlert, ExternalLink, FileCheck2,
  ShieldCheck, Cpu, Info, Cookie, Puzzle, GraduationCap, Link2,
  Lock, Users, CreditCard, Headphones, Ban, Zap, Clock, LogOut,
  EyeOff, BellRing, Shuffle, Map, Settings2, Database, Wifi,
  Download, Upload, Bot, Megaphone, Bug, Cloud, Wrench, KeyRound,
  ReceiptText, FileDown, ChevronDown
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface TermsPageClientProps {
  locale: Locale;
}

// ─── Section & Category Types ──────────────────────────────────────
interface Section {
  id: string;
  label: string;
  short: string;
  icon: React.ReactNode;
  category: string;
}

const GENERAL: Section[] = [
  { id: 'g-data',         label: 'Our Data',                      short: 'Our Data',         icon: <Database    className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-scope',        label: 'Scope',                         short: 'Scope',             icon: <Map         className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-privacy',      label: 'Privacy Policy',                short: 'Privacy',           icon: <Shield      className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-license',      label: 'Limited Use License',           short: 'License',           icon: <KeyRound    className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-use',          label: 'Use of the Services',           short: 'Use of Services',   icon: <Wrench      className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-nomod',        label: 'Prohibition of Modification',   short: 'No Modification',   icon: <Ban         className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-accounts',     label: 'User Accounts',                 short: 'Accounts',          icon: <Users       className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-conduct',      label: 'User Conduct',                  short: 'Conduct',           icon: <UserCheck   className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-content',      label: 'User Content',                  short: 'User Content',      icon: <FileText    className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-fees',         label: 'Fees, Billing and Payment',     short: 'Fees & Billing',    icon: <CreditCard  className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-ip',           label: 'Intellectual Property Rights',  short: 'IP Rights',         icon: <Copyright   className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-support',      label: 'Technical Support',             short: 'Support',           icon: <Headphones  className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-fraud',        label: 'Fraudulent Practices',          short: 'Fraud',             icon: <ShieldCheck className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-updates',      label: 'Program Updates & Availability', short: 'Updates',          icon: <RefreshCw   className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-audit',        label: 'Audit Rights',                  short: 'Audit',             icon: <FileCheck2  className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-liability',    label: 'Liability',                     short: 'Liability',         icon: <AlertTriangle className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-links',        label: 'Links and Resources',           short: 'Links',             icon: <Link2       className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-social',       label: 'Social Media and Advertising',  short: 'Social & Ads',      icon: <Megaphone   className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-viruses',      label: 'Viruses, Hacking and Attacks',  short: 'Security Threats',  icon: <Bug         className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-force',        label: 'Events Beyond Our Control',     short: 'Force Majeure',     icon: <Zap         className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-modification', label: 'Modification',                  short: 'Modification',      icon: <Settings2   className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-termination',  label: 'Duration and Termination',      short: 'Termination',       icon: <LogOut      className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-withdrawal',   label: 'Right of Withdrawal',           short: 'Withdrawal',        icon: <Clock       className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-confidential', label: 'Confidentiality',               short: 'Confidentiality',   icon: <EyeOff      className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-contact',      label: 'Contact and Notifications',     short: 'Contact',           icon: <BellRing    className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-transfer',     label: 'Transfer or Assignment',        short: 'Transfer',          icon: <Shuffle     className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-jurisdiction', label: 'Jurisdiction and Applicable Law', short: 'Jurisdiction',   icon: <Globe       className="w-3.5 h-3.5"/>, category: 'General' },
  { id: 'g-misc',         label: 'Miscellaneous',                 short: 'Miscellaneous',     icon: <Sparkles    className="w-3.5 h-3.5"/>, category: 'General' },
];

const SPECIFIC: Section[] = [
  { id: 's-online',   label: 'iCreatePDF Online Tools', short: 'Online Tools',  icon: <Cpu        className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-process',  label: 'PDF Processing',          short: 'Processing',    icon: <Wrench     className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-uploads',  label: 'PDF File Uploads',        short: 'File Uploads',  icon: <Upload     className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-downloads',label: 'PDF Downloads',           short: 'Downloads',     icon: <Download   className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-free',     label: 'Free Services',           short: 'Free Services', icon: <GraduationCap className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-premium',  label: 'Premium Services',        short: 'Premium',       icon: <Sparkles   className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-ai',       label: 'AI Tools',                short: 'AI Tools',      icon: <Bot        className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-third',    label: 'Third-Party Services',    short: 'Third-Party',   icon: <Puzzle     className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-ads',      label: 'Advertising',             short: 'Advertising',   icon: <Megaphone  className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
  { id: 's-api',      label: 'API Services',            short: 'API',           icon: <Code2      className="w-3.5 h-3.5"/>, category: 'Specific Terms' },
];

const ALL_SECTIONS = [...GENERAL, ...SPECIFIC];

// ─── Callout ────────────────────────────────────────────────────────
function Callout({ type, children }: { type: 'info' | 'warn' | 'good' | 'legal'; children: React.ReactNode }) {
  const s = {
    info:  'bg-blue-50/70   dark:bg-blue-950/30   border-blue-300/60  dark:border-blue-800/40  text-blue-800  dark:text-blue-300',
    warn:  'bg-amber-50/70  dark:bg-amber-950/30  border-amber-300/60 dark:border-amber-800/40 text-amber-800 dark:text-amber-300',
    good:  'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300/60 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300',
    legal: 'bg-zinc-900/90  dark:bg-zinc-950/80   border-zinc-700     text-zinc-200',
  };
  const icons = {
    info:  <Info          className="w-4 h-4 flex-shrink-0 mt-0.5"/>,
    warn:  <TriangleAlert className="w-4 h-4 flex-shrink-0 mt-0.5"/>,
    good:  <CheckCircle2  className="w-4 h-4 flex-shrink-0 mt-0.5"/>,
    legal: <Gavel         className="w-4 h-4 flex-shrink-0 mt-0.5"/>,
  };
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border text-xs font-medium leading-relaxed ${s[type]}`}>
      {icons[type]}<div>{children}</div>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────
function SH({ icon, color, tag, title }: { icon: React.ReactNode; color: string; tag: string; title: string }) {
  return (
    <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>{icon}</div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--color-muted-foreground))] block">{tag}</span>
        <h2 className="text-lg sm:text-xl font-bold text-[hsl(var(--color-foreground))] leading-tight">{title}</h2>
      </div>
    </div>
  );
}

// ─── Bullet List ─────────────────────────────────────────────────────
function BList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
          <ChevronRight className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5"/>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Sidebar Group ───────────────────────────────────────────────────
function SidebarGroup({
  title, sections, active, onNav
}: { title: string; sections: Section[]; active: string; onNav: (id: string) => void }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--color-muted-foreground))] mb-2 px-2">{title}</p>
      <ul className="space-y-0.5">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => onNav(s.id)}
              className={`w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
                active === s.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold border-l-2 border-emerald-600 dark:border-emerald-400 pl-2.5'
                  : 'text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted)/0.5)]'
              }`}
            >
              <span className={active === s.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-[hsl(var(--color-muted-foreground))]'}>{s.icon}</span>
              <span className="leading-snug truncate">{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TermsPageClient({ locale }: TermsPageClientProps) {
  const [active, setActive] = useState('g-data');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    ALL_SECTIONS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' }); setActive(id); }
  };

  const p = 'text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed';

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28">

        {/* ── Hero ── */}
        <div className="relative overflow-hidden pt-8 pb-10 text-center border-b border-[hsl(var(--color-border))]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-emerald-500/10 to-transparent blur-3xl -z-10" />
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900/60 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-5">
              <Scale className="w-3.5 h-3.5" /><span>Legal · Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Terms &amp;{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">Conditions</span>
            </h1>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-5 leading-relaxed max-w-xl mx-auto">
              These Terms govern your use of iCreatePDF — a free, open-source, 100% client-side PDF tool suite. No uploads, no accounts, no hidden fees.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[hsl(var(--color-muted-foreground))]">
              <span className="flex items-center gap-1.5"><FileCheck2 className="w-3.5 h-3.5 text-emerald-500"/> Effective: September 2026</span>
              <span className="w-px h-3 bg-[hsl(var(--color-border))]"/>
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-blue-500"/> 38 Clauses</span>
              <span className="w-px h-3 bg-[hsl(var(--color-border))]"/>
              <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-purple-500"/> Education-Friendly</span>
              <span className="w-px h-3 bg-[hsl(var(--color-border))]"/>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-teal-500"/> Global</span>
            </div>
          </div>
        </div>

        {/* ── Chip Slider Bar ── */}
        <div className="border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] sticky top-[60px] sm:top-[68px] z-30 shadow-xs">
          <div className="container mx-auto px-4 max-w-6xl overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="flex items-center gap-1.5 py-2.5 whitespace-nowrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--color-muted-foreground))] pr-2 flex-shrink-0">General</span>
              {GENERAL.map((s) => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border flex-shrink-0 ${active === s.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-transparent text-[hsl(var(--color-muted-foreground))] border-[hsl(var(--color-border))] hover:border-emerald-400'}`}>
                  {s.icon}<span>{s.short}</span>
                </button>
              ))}
              <span className="w-px h-5 bg-[hsl(var(--color-border))] flex-shrink-0 mx-1"/>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--color-muted-foreground))] pr-2 flex-shrink-0">Specific</span>
              {SPECIFIC.map((s) => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border flex-shrink-0 ${active === s.id ? 'bg-teal-600 text-white border-teal-600' : 'bg-transparent text-[hsl(var(--color-muted-foreground))] border-[hsl(var(--color-border))] hover:border-teal-400'}`}>
                  {s.icon}<span>{s.short}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two-column Layout ── */}
        <div className="container mx-auto px-4 max-w-6xl pb-20">
          <div className="flex gap-8 relative">

            {/* ─── Sticky Sidebar ─── */}
            <aside className="hidden lg:block w-64 flex-shrink-0 pt-8">
              <div className="sticky top-28 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>

                <SidebarGroup title="General" sections={GENERAL} active={active} onNav={scrollTo} />
                <SidebarGroup title="Specific Terms" sections={SPECIFIC} active={active} onNav={scrollTo} />

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/40 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
                  <h3 className="text-xs font-bold text-[hsl(var(--color-foreground))] flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"/> Legal Contact
                  </h3>
                  <a href="mailto:sudipmanigautam3@gmail.com?subject=Legal%20Inquiry" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                    <Mail className="w-3 h-3"/> Email Legal Team
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))] space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--color-muted-foreground))]">Related</p>
                  {[{ href: `/${locale}/privacy`, l: 'Privacy Policy' }, { href: `/${locale}/cookies`, l: 'Cookie Policy' }, { href: `/${locale}/security`, l: 'Security' }, { href: `/${locale}/license`, l: 'AGPL-3.0 License' }].map(({ href, l }) => (
                    <Link key={href} href={href} className="flex items-center gap-1 text-xs text-[hsl(var(--color-muted-foreground))] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <ChevronRight className="w-3 h-3"/>{l}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* ─── Main Content ─── */}
            <div className="flex-1 min-w-0 max-w-3xl lg:max-w-none mx-auto lg:mx-0 pt-8 space-y-14">

              {/* ══════════════════════════════════════════
                  PART 1 — GENERAL
              ══════════════════════════════════════════ */}

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[hsl(var(--color-border))]"/>
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[hsl(var(--color-muted-foreground))] px-3">Part I — General Terms</span>
                <div className="flex-1 h-px bg-[hsl(var(--color-border))]"/>
              </div>

              {/* Our Data */}
              <section id="g-data" className="scroll-mt-28 space-y-4">
                <SH icon={<Database className="w-5 h-5"/>} color="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" tag="General" title="Our Data"/>
                <p className={p}>iCreatePDF does not collect, receive, store, or process any document content on its servers. All PDF operations are executed entirely within your device&rsquo;s browser memory using WebAssembly. iCreatePDF may collect minimal, anonymized usage metrics (e.g., page views, tool usage frequency) solely for improving the service. No personally identifiable information is linked to these metrics.</p>
                <Callout type="good">Your files never leave your device. This is architecturally enforced — not just a policy statement. You can verify this at any time using your browser&rsquo;s Developer Tools (F12 → Network tab).</Callout>
                <BList items={[
                  'No document content, file names, or metadata is transmitted to our servers.',
                  'Anonymized aggregate analytics (e.g., "X users used Merge PDF today") may be collected to improve the service.',
                  'No personal identifiers (name, email, IP address linked to files) are collected.',
                  'All file buffers are destroyed when the browser tab is closed or the task completes.',
                ]}/>
              </section>

              {/* Scope */}
              <section id="g-scope" className="scroll-mt-28 space-y-4">
                <SH icon={<Map className="w-5 h-5"/>} color="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400" tag="General" title="Scope"/>
                <p className={p}>These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of all iCreatePDF services, including the web application at <a href="https://icreatepdf.com" className="text-emerald-600 dark:text-emerald-400 underline font-medium">icreatepdf.com</a>, the Progressive Web App (PWA), the desktop application (Tauri-based builds), and the browser extension (collectively, the &ldquo;Services&rdquo; or &ldquo;Platform&rdquo;).</p>
                <BList items={[
                  'These Terms apply to all users globally, regardless of location or access method.',
                  'By accessing any part of the Platform, you agree to these Terms in full.',
                  'These Terms supersede any prior agreements between you and iCreatePDF regarding the Services.',
                  'Specific Terms in Part II supplement these General Terms for particular features.',
                ]}/>
              </section>

              {/* Privacy Policy */}
              <section id="g-privacy" className="scroll-mt-28 space-y-4">
                <SH icon={<Shield className="w-5 h-5"/>} color="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" tag="General" title="Privacy Policy"/>
                <p className={p}>Your use of the Services is also governed by our <Link href={`/${locale}/privacy`} className="text-emerald-600 dark:text-emerald-400 underline font-medium">Privacy Policy</Link>, which is incorporated into these Terms by reference. The Privacy Policy explains what limited information we collect, how it is used, and your rights over it.</p>
                <BList items={[
                  'No document content is ever transmitted to or processed by our servers.',
                  'We do not sell, share, or monetize your personal data.',
                  'Cookie and local storage usage is limited to functional preferences (theme, language).',
                  'You have the right to request deletion of any personal data we may hold at any time.',
                ]}/>
                <Link href={`/${locale}/privacy`} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">Read the full Privacy Policy <ArrowRight className="w-4 h-4"/></Link>
              </section>

              {/* Limited Use License */}
              <section id="g-license" className="scroll-mt-28 space-y-4">
                <SH icon={<KeyRound className="w-5 h-5"/>} color="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" tag="General" title="Limited Use License"/>
                <p className={p}>Subject to your compliance with these Terms, iCreatePDF grants you a <strong>limited, non-exclusive, non-transferable, revocable license</strong> to access and use the Services for your personal, educational, or internal business purposes. The underlying source code is separately licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />, t: 'Personal Use',     d: 'Use all tools freely for personal PDF tasks with no restrictions.' },
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />, t: 'Educational Use',  d: 'Students, teachers, and institutions may use the platform without restriction.' },
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />, t: 'Commercial Use',   d: 'Use within your organization for internal document processing.' },
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />, t: 'Open Source',      d: 'Inspect, fork, and self-host under AGPL-3.0 terms.' },
                    { icon: <Ban className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />,          t: 'Reselling Access', d: 'You may not resell, sublicense, or charge others for access to iCreatePDF.' },
                    { icon: <Ban className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />,          t: 'White-labeling',   d: 'You may not rebrand and distribute iCreatePDF without complying with AGPL-3.0.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))]">
                      {item.icon}
                      <div>
                        <span className="font-bold text-xs text-[hsl(var(--color-foreground))]">{item.t} — </span>
                        <span className="text-xs text-[hsl(var(--color-muted-foreground))]">{item.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Use of Services */}
              <section id="g-use" className="scroll-mt-28 space-y-4">
                <SH icon={<Wrench className="w-5 h-5"/>} color="bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400" tag="General" title="Use of the Services"/>
                <p className={p}>The Services are provided for lawful document processing purposes only. You agree to use iCreatePDF responsibly, in accordance with applicable laws, and in a manner that does not interfere with other users&rsquo; access to the Services or damage our infrastructure.</p>
                <BList items={[
                  'You may use the Services to merge, split, compress, convert, edit, sign, annotate, protect, and otherwise process PDF documents.',
                  'Commercial use within your own organization is permitted under the limited use license.',
                  'You must not use the Services to process, store, or distribute unlawful content.',
                  'You must not circumvent, disable, or interfere with any security feature of the Services.',
                  'Automated or scripted bulk access to the web interface is prohibited without prior written permission.',
                  'iCreatePDF reserves the right to restrict or terminate access for violations of these Terms.',
                ]}/>
              </section>

              {/* Prohibition of Modification */}
              <section id="g-nomod" className="scroll-mt-28 space-y-4">
                <SH icon={<Ban className="w-5 h-5"/>} color="bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400" tag="General" title="Prohibition of Modification"/>
                <p className={p}>You may not modify, adapt, translate, decompile, reverse-engineer, or create derivative works from the proprietary portions of iCreatePDF without express written consent. This clause applies to the iCreatePDF brand, trade dress, and any proprietary configuration layers not covered by the AGPL-3.0 open-source license.</p>
                <Callout type="info">The open-source AGPL-3.0 code portions are separately governed by that license and may be modified in accordance with its terms. See the <Link href={`/${locale}/license`} className="underline font-medium">License page</Link> for details.</Callout>
                <BList items={[
                  'You may not strip or obscure iCreatePDF attribution in publicly deployed forks.',
                  'You may not inject malicious code, backdoors, or trackers into self-hosted deployments distributed to others.',
                  'Derivative works distributed publicly must be released under AGPL-3.0 with full source.',
                ]}/>
              </section>

              {/* User Accounts */}
              <section id="g-accounts" className="scroll-mt-28 space-y-4">
                <SH icon={<Users className="w-5 h-5"/>} color="bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400" tag="General" title="User Accounts"/>
                <p className={p}>iCreatePDF currently operates <strong>without mandatory user accounts</strong>. All core PDF tools are accessible without registration, login, or any form of account creation. This is a deliberate design choice to maximize privacy and accessibility.</p>
                <div className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-3">
                  <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))]">No Account Required</h3>
                  <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">You do not need to create an account, provide an email address, or authenticate to use any iCreatePDF tool. There is no user database, no password storage, and no profile associated with your usage. If optional account features are introduced in a future release, a separate notice and updated Terms will be provided before such features go live.</p>
                </div>
                <BList items={[
                  'No user registration, email, or login is required for any current feature.',
                  'Your tool preferences (theme, language) are stored locally in your own browser storage.',
                  'If future account features are added, they will be strictly opt-in and governed by updated Terms.',
                  'We will never retroactively require account creation to access features you currently use for free.',
                ]}/>
              </section>

              {/* User Conduct */}
              <section id="g-conduct" className="scroll-mt-28 space-y-4">
                <SH icon={<UserCheck className="w-5 h-5"/>} color="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400" tag="General" title="User Conduct"/>
                <p className={p}>You agree to conduct yourself lawfully and respectfully when using iCreatePDF. The following conduct is expressly prohibited:</p>
                <div className="space-y-2">
                  {[
                    { icon: <Bug className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />,           t: 'Malware Distribution',       d: 'Processing or distributing PDFs containing malicious code, exploits, or embedded executables.' },
                    { icon: <Copyright className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />,     t: 'Copyright Infringement',      d: 'Processing documents you have no legal right to use, reproduce, or distribute.' },
                    { icon: <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />,           t: 'Infrastructure Attacks',      d: 'Attempting denial-of-service or resource exhaustion against our CDN or delivery network.' },
                    { icon: <Lock className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />,          t: 'Unauthorized Access',         d: 'Attempting to breach, bypass, or exploit any security system associated with iCreatePDF.' },
                    { icon: <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />, t: 'Facilitation of Crime',       d: 'Using the tools to process documents that facilitate fraud, money laundering, or other illegal acts.' },
                    { icon: <Bot className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />,          t: 'Abusive Automation',          d: 'Running bots or scrapers against the web interface that generate disproportionate load.' },
                    { icon: <Ban className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />,          t: 'Harassment',                   d: 'Using contact channels to harass, threaten, or intimidate our team members or other users.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors">
                      {item.icon}
                      <div>
                        <span className="font-bold text-xs text-[hsl(var(--color-foreground))]">{item.t} — </span>
                        <span className="text-xs text-[hsl(var(--color-muted-foreground))]">{item.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* User Content */}
              <section id="g-content" className="scroll-mt-28 space-y-4">
                <SH icon={<FileText className="w-5 h-5"/>} color="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400" tag="General" title="User Content"/>
                <p className={p}>You retain full ownership of all documents, files, and content you process through iCreatePDF (&ldquo;User Content&rdquo;). Because iCreatePDF processes files exclusively client-side, your User Content never reaches our servers. Consequently, we hold no rights, licenses, or obligations with respect to your User Content.</p>
                <Callout type="good">We cannot access your documents. We do not want access to your documents. This is the core privacy promise of iCreatePDF.</Callout>
                <BList items={[
                  'You retain 100% intellectual property ownership of all documents processed.',
                  'iCreatePDF claims no license, right, or interest in your User Content.',
                  'You are solely responsible for the legality of the content you process.',
                  'User Content exists only in your device\'s volatile RAM during processing and is destroyed after.',
                  'You represent that you have lawful authority over all documents you submit for processing.',
                ]}/>
              </section>

              {/* Fees, Billing and Payment */}
              <section id="g-fees" className="scroll-mt-28 space-y-4">
                <SH icon={<CreditCard className="w-5 h-5"/>} color="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" tag="General" title="Fees, Billing and Payment"/>
                <p className={p}>iCreatePDF is currently <strong>100% free of charge</strong>. There are no subscription fees, processing fees, file size limits, usage caps, or credit systems. All 67+ tools are available to all users at no cost.</p>
                <div className="p-5 rounded-2xl bg-zinc-950 text-white border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold"><CheckCircle2 className="w-4 h-4"/>Currently Free — Always Transparent</div>
                  <p className="text-xs text-zinc-300 leading-relaxed">If premium or subscription features are introduced in the future, they will be clearly labeled, strictly opt-in, and governed by a separate pricing agreement. Free tools will remain free. We will never retroactively charge for features you currently use at no cost. Any changes to pricing will be communicated with at least 30 days&rsquo; notice via the website and GitHub.</p>
                </div>
                <BList items={[
                  'All current tools and features are free with no usage limits.',
                  'No credit card, PayPal, or payment information is ever collected.',
                  'Future premium features (if any) will be optional add-ons and clearly disclosed.',
                  'Free-tier tools will remain free even if paid tiers are introduced.',
                ]}/>
              </section>

              {/* IP Rights */}
              <section id="g-ip" className="scroll-mt-28 space-y-4">
                <SH icon={<Copyright className="w-5 h-5"/>} color="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400" tag="General" title="Intellectual Property Rights"/>
                <p className={p}>All intellectual property rights in the iCreatePDF platform — including its name, logo, brand identity, UI design, original code, and documentation — are owned by their respective creators. The platform&rsquo;s source code is published under AGPL-3.0, while proprietary brand elements remain protected by applicable trademark and copyright law.</p>
                <BList items={[
                  'The iCreatePDF name and logo are protected brand assets. Do not use them without permission.',
                  'Platform source code is licensed under AGPL-3.0 — open for inspection, use, and modification.',
                  'Third-party libraries (pdf-lib, PDF.js, Tesseract.js, etc.) are governed by their own open-source licenses.',
                  'User-created output files belong entirely to the user who created them.',
                  'Any feedback, suggestions, or bug reports you submit may be used to improve the platform without compensation.',
                ]}/>
              </section>

              {/* Technical Support */}
              <section id="g-support" className="scroll-mt-28 space-y-4">
                <SH icon={<Headphones className="w-5 h-5"/>} color="bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400" tag="General" title="Technical Support"/>
                <p className={p}>iCreatePDF provides community-based technical support on a best-effort basis. As a free, open-source project, we do not offer guaranteed Service Level Agreements (SLAs) or dedicated enterprise support channels.</p>
                <BList items={[
                  'Support is available via email at sudipmanigautam3@gmail.com — typical response within 2–5 business days.',
                  'Bug reports and feature requests may be submitted via the GitHub repository Issues tracker.',
                  'Community support via GitHub Discussions is also available.',
                  'Critical security vulnerabilities should be reported privately via email before public disclosure.',
                  'We do not offer phone support, live chat, or guaranteed response times.',
                ]}/>
              </section>

              {/* Fraudulent Practices */}
              <section id="g-fraud" className="scroll-mt-28 space-y-4">
                <SH icon={<ShieldCheck className="w-5 h-5"/>} color="bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400" tag="General" title="Fraudulent Practices"/>
                <p className={p}>iCreatePDF has a zero-tolerance policy for fraudulent practices. Any attempt to defraud, misrepresent, or exploit the platform or its users will result in immediate termination of access and may be reported to relevant authorities.</p>
                <BList items={[
                  'Impersonating iCreatePDF staff or brand representatives is strictly prohibited.',
                  'Creating fake or misleading reviews, testimonials, or social media accounts impersonating iCreatePDF is prohibited.',
                  'Attempting to manipulate or game any community or rating system associated with the platform is prohibited.',
                  'Submitting false legal notices (e.g., DMCA takedowns for content you do not own) is prohibited.',
                  'Using the platform to generate fraudulent documents (fake contracts, fake IDs, forged signatures) is illegal and prohibited.',
                ]}/>
                <Callout type="warn">Fraudulent use of iCreatePDF may violate criminal laws in your jurisdiction. iCreatePDF will cooperate fully with law enforcement in any investigation involving misuse of the platform.</Callout>
              </section>

              {/* Program Updates */}
              <section id="g-updates" className="scroll-mt-28 space-y-4">
                <SH icon={<RefreshCw className="w-5 h-5"/>} color="bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400" tag="General" title="Program Updates and Availability"/>
                <p className={p}>iCreatePDF is continuously developed and improved. We may update, modify, add, or remove features, tools, and functionality at any time without prior notice. As a free service, we do not guarantee perpetual availability of any specific feature.</p>
                <BList items={[
                  'New tools and features may be released at any time — follow our GitHub for release notes.',
                  'Existing tools may be updated, refactored, or replaced with improved versions.',
                  'We may temporarily take the website offline for maintenance — all tools remain functional offline once loaded.',
                  'In the event of discontinuation of the service, at least 90 days\' notice will be provided.',
                  'The open-source nature of the project means you can always self-host a snapshot if needed.',
                ]}/>
              </section>

              {/* Audit Rights */}
              <section id="g-audit" className="scroll-mt-28 space-y-4">
                <SH icon={<FileCheck2 className="w-5 h-5"/>} color="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300" tag="General" title="Audit Rights"/>
                <p className={p}>iCreatePDF operates on a principle of radical transparency. Because the platform is fully open source, the community has continuous audit rights over the entire codebase, build process, and deployed artifacts.</p>
                <BList items={[
                  'The full source code is publicly available on GitHub under AGPL-3.0 at all times.',
                  'Build scripts, deployment configurations, and dependency trees are all publicly auditable.',
                  'Security researchers are encouraged to audit the codebase and report findings responsibly.',
                  'We publish a public changelog for all significant updates and security patches.',
                  'We do not have the right to audit your documents — client-side processing means we have zero access.',
                ]}/>
                <Callout type="good">Unlike proprietary PDF services, iCreatePDF can be fully audited by anyone. There are no hidden server-side processes, black-box algorithms, or undisclosed data flows.</Callout>
              </section>

              {/* Liability */}
              <section id="g-liability" className="scroll-mt-28 space-y-4">
                <SH icon={<AlertTriangle className="w-5 h-5"/>} color="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" tag="General" title="Liability"/>
                <Callout type="legal">THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, ICREATEPDF AND ITS CONTRIBUTORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES.</Callout>
                <p className={p}>iCreatePDF is a free, open-source service with no commercial subscription tier. Our liability is correspondingly limited. Nothing in these Terms limits liability for death, personal injury, or fraud caused by our negligence.</p>
                <BList items={[
                  'We are not liable for data loss resulting from browser crashes during processing.',
                  'We are not liable for output quality differences after format conversion.',
                  'We are not liable for losses arising from use of the service by unauthorized parties.',
                  'In jurisdictions where liability limitation is restricted by law, our liability is limited to the minimum amount permitted.',
                ]}/>
              </section>

              {/* Links */}
              <section id="g-links" className="scroll-mt-28 space-y-4">
                <SH icon={<Link2 className="w-5 h-5"/>} color="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" tag="General" title="Links and Resources"/>
                <p className={p}>The iCreatePDF platform may contain links to third-party websites, documentation, GitHub repositories, open-source projects, and external resources. These links are provided for convenience and informational purposes only.</p>
                <BList items={[
                  'iCreatePDF does not endorse, control, or take responsibility for the content of linked third-party websites.',
                  'You access linked resources at your own risk and should review their respective terms and privacy policies.',
                  'Links to our GitHub repository, acknowledgements, and open-source dependencies are provided for transparency.',
                  'Broken or outdated links may occasionally exist — please report them via GitHub Issues.',
                ]}/>
              </section>

              {/* Social Media */}
              <section id="g-social" className="scroll-mt-28 space-y-4">
                <SH icon={<Megaphone className="w-5 h-5"/>} color="bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400" tag="General" title="Social Media and Advertising"/>
                <p className={p}>iCreatePDF does not currently display paid advertisements within the platform. We may in the future introduce non-intrusive sponsorship or contextual advertising — any such introduction will be clearly disclosed and governed by an updated version of these Terms.</p>
                <BList items={[
                  'iCreatePDF currently contains zero advertising banners, pop-ups, or sponsored placements.',
                  'We do not share user data with advertising networks for targeting purposes.',
                  'Any future advertising will be non-personalized, non-intrusive, and clearly labeled as sponsored.',
                  'References to iCreatePDF on social media by users should be accurate and not misleading.',
                  'Unauthorized use of the iCreatePDF brand in paid advertising by third parties is prohibited.',
                ]}/>
              </section>

              {/* Viruses */}
              <section id="g-viruses" className="scroll-mt-28 space-y-4">
                <SH icon={<Bug className="w-5 h-5"/>} color="bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400" tag="General" title="Viruses, Hacking and Other Attacks"/>
                <p className={p}>You must not misuse the iCreatePDF platform by knowingly introducing viruses, Trojans, worms, logic bombs, or other malicious or technologically harmful material. You must not attempt to gain unauthorized access to any server, database, or system associated with iCreatePDF.</p>
                <BList items={[
                  'Uploading malware-embedded PDFs to harm other users or test environments is prohibited.',
                  'Attempting SQL injection, XSS, CSRF, or other web attacks against iCreatePDF infrastructure is prohibited.',
                  'Attempting to intercept or manipulate traffic between users and our CDN is prohibited.',
                  'Responsible disclosure of security vulnerabilities is welcomed — email us privately before public disclosure.',
                  'We will report all criminal cyber-attacks to the appropriate law enforcement authorities.',
                ]}/>
                <Link href={`/${locale}/security`} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">Read our Security Architecture <ArrowRight className="w-4 h-4"/></Link>
              </section>

              {/* Force Majeure */}
              <section id="g-force" className="scroll-mt-28 space-y-4">
                <SH icon={<Zap className="w-5 h-5"/>} color="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" tag="General" title="Events Beyond Our Control"/>
                <p className={p}>iCreatePDF shall not be liable for any failure or delay in the performance of its obligations under these Terms where such failure or delay results from events beyond our reasonable control (&ldquo;Force Majeure Events&rdquo;).</p>
                <BList items={[
                  'Force Majeure Events include: natural disasters, pandemics, war, cyberattacks by nation-state actors, CDN provider outages, and government-mandated restrictions.',
                  'In Force Majeure Events, iCreatePDF will use reasonable efforts to restore service as quickly as practicable.',
                  'Because all tools are offline-capable once loaded, many Force Majeure events will not affect your ability to use already-loaded tools.',
                  'Users are encouraged to leverage the PWA or desktop app for resilience against connectivity disruptions.',
                ]}/>
              </section>

              {/* Modification */}
              <section id="g-modification" className="scroll-mt-28 space-y-4">
                <SH icon={<Settings2 className="w-5 h-5"/>} color="bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400" tag="General" title="Modification"/>
                <p className={p}>iCreatePDF reserves the right to amend, update, or replace these Terms at any time. We will indicate the effective date of the latest version at the top of this page. For material changes, we will provide notice via the website banner, GitHub release notes, or email (if applicable).</p>
                <BList items={[
                  'The "Effective Date" at the top of this document will always reflect the current version.',
                  'Continued use of the Services after any modification constitutes your acceptance of the revised Terms.',
                  'You are encouraged to review these Terms periodically, particularly when new features are launched.',
                  'If you disagree with a modification, you must discontinue use of the Services.',
                ]}/>
              </section>

              {/* Duration and Termination */}
              <section id="g-termination" className="scroll-mt-28 space-y-4">
                <SH icon={<LogOut className="w-5 h-5"/>} color="bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400" tag="General" title="Duration and Termination"/>
                <p className={p}>These Terms remain in effect for as long as you use the Services. iCreatePDF may immediately suspend or terminate your access to the Services — including blocking your IP address or browser fingerprint — if you violate these Terms or applicable law.</p>
                <BList items={[
                  'You may stop using the Services at any time — no cancellation process is required as no account exists.',
                  'Clauses regarding IP rights, liability, governing law, and confidentiality survive termination.',
                  'iCreatePDF may discontinue the Services with 90 days\' notice; the open-source code will remain available.',
                  'Termination does not affect any rights or obligations that arose before the termination date.',
                ]}/>
              </section>

              {/* Right of Withdrawal */}
              <section id="g-withdrawal" className="scroll-mt-28 space-y-4">
                <SH icon={<Clock className="w-5 h-5"/>} color="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400" tag="General" title="Right of Withdrawal"/>
                <p className={p}>As iCreatePDF is currently a free service with no purchase or subscription, standard consumer withdrawal rights (such as the EU 14-day cooling-off period for digital services) do not apply in the traditional sense. If premium paid services are introduced, a full withdrawal and refund policy will be disclosed at the point of purchase.</p>
                <Callout type="info">Because iCreatePDF does not charge you anything, there is nothing to refund. If future paid features are introduced, they will carry a clear refund policy before purchase.</Callout>
                <BList items={[
                  'No payment is taken, so no withdrawal or refund mechanism is currently applicable.',
                  'Future paid features will include a minimum 14-day refund period for EU/EEA consumers.',
                  'Data deletion requests: since we hold no document data, no deletion process is needed for file content.',
                  'For deletion of any minimal analytics data, contact sudipmanigautam3@gmail.com.',
                ]}/>
              </section>

              {/* Confidentiality */}
              <section id="g-confidential" className="scroll-mt-28 space-y-4">
                <SH icon={<EyeOff className="w-5 h-5"/>} color="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300" tag="General" title="Confidentiality"/>
                <p className={p}>iCreatePDF treats all document content you process as inherently confidential — by design and by architecture. Because document files never reach our servers, we are technically incapable of accessing, sharing, or disclosing your document content to any party.</p>
                <BList items={[
                  'Document content is processed exclusively in your device\'s local browser memory.',
                  'We cannot access your documents even in response to a government subpoena — we simply do not have them.',
                  'Any communication you send us (e.g., support emails) is treated confidentially and not shared.',
                  'Feedback and bug reports you submit may be discussed publicly on GitHub Issues but will not include personal data without your consent.',
                ]}/>
                <Callout type="good">Our confidentiality model is enforced by architecture, not policy. Zero-server processing means zero possibility of unauthorized disclosure of your document content.</Callout>
              </section>

              {/* Contact and Notifications */}
              <section id="g-contact" className="scroll-mt-28 space-y-4">
                <SH icon={<BellRing className="w-5 h-5"/>} color="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" tag="General" title="Contact and Notifications"/>
                <p className={p}>All notices, requests, or communications under these Terms should be directed to iCreatePDF using the contact information below. Legal notices must be sent via email to ensure a verifiable record.</p>
                <div className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div><span className="font-bold text-[hsl(var(--color-foreground))]">Platform: </span><span className="text-[hsl(var(--color-muted-foreground))]">iCreatePDF</span></div>
                    <div><span className="font-bold text-[hsl(var(--color-foreground))]">Website: </span><a href="https://icreatepdf.com" className="text-emerald-600 dark:text-emerald-400 underline">icreatepdf.com</a></div>
                    <div><span className="font-bold text-[hsl(var(--color-foreground))]">Legal Email: </span><a href="mailto:sudipmanigautam3@gmail.com" className="text-emerald-600 dark:text-emerald-400 underline">sudipmanigautam3@gmail.com</a></div>
                    <div><span className="font-bold text-[hsl(var(--color-foreground))]">GitHub: </span><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline">GitHub Issues</a></div>
                  </div>
                </div>
                <BList items={[
                  'Legal notices must be sent via email to ensure a timestamped, verifiable record.',
                  'General support requests can be submitted via email or GitHub Issues.',
                  'We aim to acknowledge legal notices within 5 business days.',
                  'Security vulnerability reports must be sent privately via email before any public disclosure.',
                ]}/>
              </section>

              {/* Transfer */}
              <section id="g-transfer" className="scroll-mt-28 space-y-4">
                <SH icon={<Shuffle className="w-5 h-5"/>} color="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400" tag="General" title="Transfer or Assignment"/>
                <p className={p}>You may not transfer, assign, or sublicense your rights under these Terms to any third party without prior written consent from iCreatePDF. iCreatePDF may transfer or assign its rights and obligations under these Terms in connection with a merger, acquisition, restructuring, or sale of all or substantially all of its assets.</p>
                <BList items={[
                  'Your limited use license is personal and non-transferable.',
                  'In the event of ownership transfer, users will be notified and the Terms will be updated accordingly.',
                  'Any transfer of iCreatePDF will not materially diminish user privacy protections guaranteed herein.',
                  'The open-source nature of the project means the codebase remains publicly available regardless of ownership.',
                ]}/>
              </section>

              {/* Jurisdiction */}
              <section id="g-jurisdiction" className="scroll-mt-28 space-y-4">
                <SH icon={<Globe className="w-5 h-5"/>} color="bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400" tag="General" title="Jurisdiction and Applicable Law"/>
                <p className={p}>These Terms shall be governed by and construed in accordance with applicable laws. Disputes should first be resolved through good-faith negotiation. iCreatePDF serves users globally and respects the legal frameworks of all jurisdictions.</p>
                <BList items={[
                  'Good-faith informal resolution should be attempted before any formal legal proceedings.',
                  'International users are responsible for compliance with their local laws when using the Services.',
                  'For EU users: GDPR rights apply. For California users: CCPA rights apply.',
                  'If any provision is found unenforceable in your jurisdiction, the remaining Terms continue in full effect.',
                  'Nothing in these Terms limits any mandatory consumer protection rights you have under local law.',
                ]}/>
              </section>

              {/* Miscellaneous */}
              <section id="g-misc" className="scroll-mt-28 space-y-4">
                <SH icon={<Sparkles className="w-5 h-5"/>} color="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" tag="General" title="Miscellaneous"/>
                <BList items={[
                  'Entire Agreement: These Terms, together with the Privacy Policy and Cookie Policy, constitute the entire agreement between you and iCreatePDF.',
                  'Severability: If any provision is held unenforceable, it will be modified minimally to make it enforceable; the rest remains in effect.',
                  'Waiver: Failure to enforce any provision does not constitute a waiver of future enforcement.',
                  'Headings: Section headings are for convenience only and do not affect interpretation.',
                  'Language: These Terms are written in English. Translations are provided as a courtesy; the English version governs in case of conflict.',
                  'Open Source Commitment: iCreatePDF remains committed to open-source principles. Core tools will never be locked behind proprietary walls.',
                ]}/>
              </section>

              {/* ══════════════════════════════════════════
                  PART 2 — SPECIFIC TERMS
              ══════════════════════════════════════════ */}

              <div className="flex items-center gap-3 pt-4">
                <div className="flex-1 h-px bg-[hsl(var(--color-border))]"/>
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[hsl(var(--color-muted-foreground))] px-3">Part II — Specific Terms</span>
                <div className="flex-1 h-px bg-[hsl(var(--color-border))]"/>
              </div>

              {/* iCreatePDF Online Tools */}
              <section id="s-online" className="scroll-mt-28 space-y-4">
                <SH icon={<Cpu className="w-5 h-5"/>} color="bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400" tag="Specific Terms" title="iCreatePDF Online Tools"/>
                <p className={p}>The iCreatePDF Online Tools are a suite of 67+ browser-based PDF utilities accessible at icreatepdf.com. All tools operate entirely client-side with no server-side document processing. Tools include Merge PDF, Split PDF, Compress PDF, PDF to Word, OCR PDF, Sign PDF, Edit PDF, and many more.</p>
                <BList items={[
                  'All tools are free to use with no registration, account, or login required.',
                  'Tools process files locally in your browser — no file is uploaded to any server.',
                  'All tools are available offline once the page has been loaded.',
                  'Output files are saved directly to your device\'s Downloads folder.',
                  'Tool availability may change; new tools are added regularly.',
                ]}/>
              </section>

              {/* PDF Processing */}
              <section id="s-process" className="scroll-mt-28 space-y-4">
                <SH icon={<Wrench className="w-5 h-5"/>} color="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" tag="Specific Terms" title="PDF Processing"/>
                <p className={p}>PDF processing on iCreatePDF is performed by WebAssembly-compiled engines running inside your browser&rsquo;s sandboxed JavaScript environment. Processing speed and capability are determined by your device&rsquo;s hardware specifications.</p>
                <BList items={[
                  'Processing engines include pdf-lib (creation/editing), PDF.js (rendering), and Tesseract.js (OCR).',
                  'Multi-threaded operations use Web Workers to keep the interface responsive during heavy tasks.',
                  'Processing is hardware-bound — faster devices process larger files more quickly.',
                  'No file size limits are enforced by iCreatePDF; practical limits are determined by your device RAM.',
                  'Processing accuracy for conversion tasks (e.g., PDF→Word) depends on source document complexity.',
                  'You are advised to verify conversion output for critical documents before use.',
                ]}/>
              </section>

              {/* PDF File Uploads */}
              <section id="s-uploads" className="scroll-mt-28 space-y-4">
                <SH icon={<Upload className="w-5 h-5"/>} color="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" tag="Specific Terms" title="PDF File Uploads"/>
                <p className={p}>The term &ldquo;upload&rdquo; in iCreatePDF&rsquo;s context refers exclusively to loading a file from your local storage into your browser&rsquo;s working memory. <strong>No file data is transmitted over the network</strong>. File loading is performed using the browser&rsquo;s native File API.</p>
                <Callout type="good">There are no server uploads in iCreatePDF. When you &ldquo;open&rdquo; or &ldquo;select&rdquo; a file, it is read directly into your browser&rsquo;s RAM — never sent over the internet.</Callout>
                <BList items={[
                  'Files are read using the browser\'s FileReader or File API — no network request is made.',
                  'Drag-and-drop and file-picker methods both read files locally without any network activity.',
                  'No file size upload limits exist because files never leave your device.',
                  'You are responsible for ensuring you have the right to process any file you open in iCreatePDF.',
                  'Confidential or sensitive documents can be safely processed without privacy concern.',
                ]}/>
              </section>

              {/* PDF Downloads */}
              <section id="s-downloads" className="scroll-mt-28 space-y-4">
                <SH icon={<Download className="w-5 h-5"/>} color="bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400" tag="Specific Terms" title="PDF Downloads"/>
                <p className={p}>After processing, your output file is offered for download directly from your browser&rsquo;s memory to your local storage. No download servers are involved — the file is generated on your device and saved via your browser&rsquo;s native download mechanism.</p>
                <BList items={[
                  'Downloads are served directly from browser memory — no cloud storage, download servers, or CDN is involved.',
                  'Downloaded files are saved to your device\'s default Downloads folder unless redirected by your browser settings.',
                  'File names are preserved or set according to your tool inputs and preferences.',
                  'There are no download limits, expiry timers, or watermarks added to output files.',
                  'In some browsers, the sandbox iframe architecture may require parent-window download proxying — this is a transparent browser-security mechanism.',
                ]}/>
              </section>

              {/* Free Services */}
              <section id="s-free" className="scroll-mt-28 space-y-4">
                <SH icon={<GraduationCap className="w-5 h-5"/>} color="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400" tag="Specific Terms" title="Free Services"/>
                <p className={p}>All current iCreatePDF tools and features constitute &ldquo;Free Services.&rdquo; Free Services are provided without charge, without usage limits, and without feature restrictions of any kind. iCreatePDF is especially committed to free access for educational institutions, students, and non-profit organizations.</p>
                <BList items={[
                  'All 67+ tools are free with no daily limits, file count limits, or feature restrictions.',
                  'No registration, email, or credit card is required for any free feature.',
                  'Educational institutions may freely deploy and recommend iCreatePDF.',
                  'Free Services may be supported in the future by non-intrusive, non-personalized advertising — disclosed in advance.',
                  'iCreatePDF commits to maintaining a meaningful free tier indefinitely.',
                ]}/>
              </section>

              {/* Premium Services */}
              <section id="s-premium" className="scroll-mt-28 space-y-4">
                <SH icon={<Sparkles className="w-5 h-5"/>} color="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" tag="Specific Terms" title="Premium Services"/>
                <p className={p}>iCreatePDF does not currently offer any Premium Services. All tools are free. If Premium Services (e.g., advanced AI features, priority support, or batch API access) are introduced in the future, the following terms will apply:</p>
                <BList items={[
                  'Premium features will be clearly labeled and strictly opt-in.',
                  'Free tools will remain free and unaffected by the introduction of premium features.',
                  'Premium subscriptions will include a minimum 14-day refund period for EU/EEA consumers.',
                  'Subscription pricing, billing cycles, and cancellation terms will be disclosed at point of purchase.',
                  'Premium subscribers will receive updated Terms and a dedicated billing agreement.',
                  'At least 30 days\' notice will be given before any premium pricing changes take effect.',
                ]}/>
                <Callout type="info">No premium tier exists today. This clause is included for future transparency only.</Callout>
              </section>

              {/* AI Tools */}
              <section id="s-ai" className="scroll-mt-28 space-y-4">
                <SH icon={<Bot className="w-5 h-5"/>} color="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400" tag="Specific Terms" title="AI Tools"/>
                <p className={p}>iCreatePDF includes AI-assisted features such as OCR (Optical Character Recognition via Tesseract.js compiled to WebAssembly). Future AI features (e.g., AI summarization, intelligent redaction, smart form filling) are planned. All AI processing on iCreatePDF follows the same zero-upload, client-side principle.</p>
                <BList items={[
                  'Current AI features (OCR via Tesseract.js) run 100% locally in your browser — no cloud AI API is called.',
                  'Future AI features may optionally integrate third-party AI APIs (e.g., for document summarization) — this will be clearly disclosed and consent will be required.',
                  'AI-processed output should be verified by the user before use in critical contexts.',
                  'AI tools are not a substitute for professional legal, medical, or financial advice.',
                  'iCreatePDF does not use your documents to train AI models — client-side processing makes this architecturally impossible.',
                ]}/>
              </section>

              {/* Third-Party Services */}
              <section id="s-third" className="scroll-mt-28 space-y-4">
                <SH icon={<Puzzle className="w-5 h-5"/>} color="bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400" tag="Specific Terms" title="Third-Party Services"/>
                <p className={p}>iCreatePDF is built using a number of third-party open-source libraries. These are not &ldquo;services&rdquo; that receive your data — they are code that runs locally in your browser. A complete list is maintained on the Acknowledgements page.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { n: 'pdf-lib',        l: 'MIT',        r: 'PDF editing' },
                    { n: 'PDF.js',         l: 'Apache 2.0', r: 'PDF rendering' },
                    { n: 'Tesseract.js',   l: 'Apache 2.0', r: 'OCR' },
                    { n: 'Next.js',        l: 'MIT',        r: 'Web framework' },
                    { n: 'Tauri',          l: 'Apache/MIT', r: 'Desktop app' },
                    { n: 'Lucide Icons',   l: 'ISC',        r: 'UI icons' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[hsl(var(--color-foreground))]">{item.n}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300">{item.l}</span>
                      </div>
                      <p className="text-[11px] text-[hsl(var(--color-muted-foreground))]">{item.r}</p>
                    </div>
                  ))}
                </div>
                <Link href={`/${locale}/acknowledgements`} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">Full acknowledgements & licenses <ArrowRight className="w-4 h-4"/></Link>
              </section>

              {/* Advertising */}
              <section id="s-ads" className="scroll-mt-28 space-y-4">
                <SH icon={<Megaphone className="w-5 h-5"/>} color="bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400" tag="Specific Terms" title="Advertising"/>
                <p className={p}>iCreatePDF currently displays <strong>no advertisements</strong> of any kind. We are committed to maintaining a clean, distraction-free experience. If advertising is introduced in the future to sustain the free service, strict standards will apply.</p>
                <BList items={[
                  'Zero advertising exists on iCreatePDF today.',
                  'No user behavioral data is shared with advertising networks.',
                  'Any future advertising will be non-personalized, contextual, and clearly labeled.',
                  'Intrusive formats (pop-ups, interstitials, auto-playing video ads) will never be used.',
                  'Users will be notified at least 30 days before any advertising is introduced.',
                  'An ad-free experience will always be available (either free or via opt-out).',
                ]}/>
              </section>

              {/* API Services */}
              <section id="s-api" className="scroll-mt-28 space-y-4">
                <SH icon={<Code2 className="w-5 h-5"/>} color="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400" tag="Specific Terms" title="API Services"/>
                <p className={p}>iCreatePDF does not currently offer a public API service. A developer API for programmatic PDF processing is under consideration for future releases. If/when released, the API will be governed by these Specific Terms plus a supplemental API Agreement.</p>
                <BList items={[
                  'No public API currently exists — this clause is included for future reference.',
                  'A future API would allow developers to integrate iCreatePDF\'s PDF processing tools into their own applications.',
                  'API access will be governed by rate limits, usage quotas, and a dedicated API Terms of Service.',
                  'API plans may be offered on a free tier (for low-volume use) and paid tiers (for commercial/high-volume use).',
                  'API processing will adhere to the same zero-server-storage, privacy-first principles.',
                  'API documentation and authentication methods will be published on the developer portal when available.',
                ]}/>
                <Callout type="info">Follow the iCreatePDF GitHub repository or newsletter to be notified when API services launch.</Callout>

                {/* Final CTA */}
                <div className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none"/>
                  <div className="relative space-y-3 max-w-xl">
                    <h3 className="text-xl font-extrabold">Questions About These Terms?</h3>
                    <p className="text-sm text-white/90 leading-relaxed">Our team responds to legal inquiries within 2 business days. DPA and compliance documentation available on request.</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a href="mailto:sudipmanigautam3@gmail.com?subject=Legal%20Inquiry%20-%20iCreatePDF" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-emerald-700 font-bold text-sm shadow hover:bg-zinc-100 transition-all hover:scale-[1.02]">
                        <Mail className="w-4 h-4"/> Email Legal Team
                      </a>
                      <Link href={`/${locale}/privacy`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/20 hover:bg-black/35 text-white font-semibold text-sm border border-white/20 transition-all">
                        Privacy Policy <ArrowRight className="w-4 h-4"/>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />

      <style>{`
        .scroll-mt-28 { scroll-margin-top: 7rem; }
      `}</style>
    </div>
  );
}
