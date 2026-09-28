'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Cookie,
  CheckCircle2,
  XCircle,
  Shield,
  Trash2,
  RefreshCw,
  HardDrive,
  Info,
  Sparkles,
  ArrowRight,
  Layers,
  HelpCircle,
  Check
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface CookiesPageClientProps {
  locale: Locale;
}

export default function CookiesPageClient({ locale }: CookiesPageClientProps) {
  const [activeBrowserTab, setActiveBrowserTab] = useState<'chrome' | 'firefox' | 'safari' | 'edge'>('chrome');
  const [localItemsCount, setLocalItemsCount] = useState<number>(0);
  const [clearedNotice, setClearedNotice] = useState<boolean>(false);

  const inspectLocalStorage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setLocalItemsCount(window.localStorage.length);
    }
  };

  useEffect(() => {
    inspectLocalStorage();
  }, []);

  const handleClearPreferences = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
      inspectLocalStorage();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3500);
    }
  };

  const storageItems = [
    {
      key: 'icreatepdf_theme / theme',
      type: 'localStorage',
      purpose: 'Remembers whether you selected Light Mode or Dark Mode for comfortable viewing.',
      duration: 'Persistent until cleared',
      party: 'First-party only (Stays in browser)',
    },
    {
      key: 'NEXT_LOCALE',
      type: 'Cookie (Essential)',
      purpose: 'Remembers your selected interface language (e.g. English, Hindi, Spanish, Nepali).',
      duration: '1 year',
      party: 'First-party only (Never shared)',
    },
    {
      key: 'workflow_state (Optional)',
      type: 'localStorage / IndexedDB',
      purpose: 'Saves your batch visual pipeline nodes locally so you don’t lose work upon reload.',
      duration: 'Persistent on device',
      party: 'First-party only (Local compute)',
    },
    {
      key: 'Document Binary Buffers',
      type: 'Volatile RAM Heap',
      purpose: 'Holds active PDF bytes during in-memory processing (merging, editing, compressing).',
      duration: 'Instant deletion on tab close',
      party: 'Never written to disk or sent online',
    },
  ];

  const prohibitedTrackers = [
    {
      name: 'Advertising & Remarketing Cookies',
      desc: 'We never install Google AdSense, DoubleClick, or affiliate cookies to track your web browsing history.',
    },
    {
      name: 'Social Media Pixels',
      desc: 'We do not embed Meta (Facebook) Pixels, TikTok beacons, or LinkedIn tracking tags on any page.',
    },
    {
      name: 'Cross-Site Behavioral Profilers',
      desc: 'We do not partner with data brokers or behavioral trackers to monitor user identity or habits.',
    },
    {
      name: 'Hardware Fingerprinting',
      desc: 'We do not run canvas, audio, or WebGL fingerprinting scripts to identify your specific device.',
    },
  ];

  const browserInstructions = {
    chrome: {
      name: 'Google Chrome',
      steps: [
        'Click the Tune / Lock icon next to the URL in the address bar.',
        'Select "Cookies and site data".',
        'Click "Manage on-device site data".',
        'Click the Trash icon next to icreatepdf.com to delete all stored state.',
      ],
      shortcut: 'Shortcut: Ctrl + Shift + Del (Windows) or Cmd + Shift + Delete (macOS)',
    },
    firefox: {
      name: 'Mozilla Firefox',
      steps: [
        'Click the Padlock icon on the left side of the address bar.',
        'Select "Clear cookies and site data...".',
        'Confirm by clicking "Remove" in the prompt.',
      ],
      shortcut: 'Shortcut: Ctrl + Shift + Del (Windows) or Cmd + Shift + Delete (macOS)',
    },
    safari: {
      name: 'Apple Safari',
      steps: [
        'In the top menu, go to Safari > Settings (or Preferences).',
        'Click the "Privacy" tab.',
        'Click "Manage Website Data...".',
        'Search for "icreatepdf", select it, and click "Remove".',
      ],
      shortcut: 'Shortcut: Cmd + , (Comma) > Privacy',
    },
    edge: {
      name: 'Microsoft Edge',
      steps: [
        'Click the Lock icon next to the URL.',
        'Select "Cookies" (e.g. 1 cookie in use).',
        'Select icreatepdf.com and click "Remove".',
      ],
      shortcut: 'Shortcut: Ctrl + Shift + Del',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-900/60 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-6 shadow-xs">
              <Cookie className="w-3.5 h-3.5" />
              <span>Zero-Tracking Policy • 100% Tracking-Free</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] leading-tight mb-4">
              Cookie & Local{' '}
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                Storage Policy
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto leading-relaxed mb-4">
              Total transparency into what lives on your device. We use zero tracking cookies, zero ad trackers, and zero behavioral profilers.
            </p>

            <span className="text-xs text-[hsl(var(--color-muted-foreground))] block">
              Last Updated: September 2026
            </span>
          </div>
        </section>

        {/* Live Device Storage Status Widget */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[hsl(var(--color-border))]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <HardDrive className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[hsl(var(--color-foreground))]">
                    Your Current Browser Storage Status
                  </h2>
                  <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                    Inspecting this website&rsquo;s data footprint on your current browser:
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={inspectLocalStorage}
                  className="p-2 rounded-xl border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] text-xs font-semibold transition-colors"
                  title="Refresh status"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[hsl(var(--color-muted-foreground))]" />
                </button>
                <button
                  onClick={handleClearPreferences}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Local Storage
                </button>
              </div>
            </div>

            {clearedNotice && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Local storage items successfully cleared on this browser!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))]">
                <span className="text-2xl font-extrabold text-[hsl(var(--color-foreground))] block">
                  {localItemsCount}
                </span>
                <span className="text-xs font-semibold text-[hsl(var(--color-muted-foreground))]">
                  Local Preference Items
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))]">
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
                  0
                </span>
                <span className="text-xs font-semibold text-[hsl(var(--color-muted-foreground))]">
                  Advertising & Tracking Pixels
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))]">
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
                  0 Bytes
                </span>
                <span className="text-xs font-semibold text-[hsl(var(--color-muted-foreground))]">
                  Document Content Uploaded
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Storage Inventory Matrix */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              Complete Storage Inventory
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2">
              Every data key stored on your device, its technical purpose, and retention lifespan.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.5)] p-4 text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">
              <div className="md:col-span-3">Key / Item Name</div>
              <div className="md:col-span-2">Storage Mechanism</div>
              <div className="md:col-span-4">Functional Purpose</div>
              <div className="md:col-span-3">Duration & Sharing</div>
            </div>

            <div className="divide-y divide-[hsl(var(--color-border))]">
              {storageItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-5 text-sm gap-3 items-center">
                  <div className="md:col-span-3 font-mono text-xs font-bold text-[hsl(var(--color-foreground))]">
                    {item.key}
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))]">
                      {item.type}
                    </span>
                  </div>
                  <div className="md:col-span-4 text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                    {item.purpose}
                  </div>
                  <div className="md:col-span-3 text-xs text-[hsl(var(--color-muted-foreground))]">
                    <div className="font-semibold text-[hsl(var(--color-foreground))]">{item.duration}</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400">{item.party}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prohibited Tracking Elements Grid */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))]">
              What We Strictly Do Not Use
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-2">
              Common invasive practices eliminated from the iCreatePDF architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {prohibitedTrackers.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[hsl(var(--color-foreground))] mb-1.5">
                  {item.name}
                </h3>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Browser Guides */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <div className="p-8 rounded-3xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))] mb-1">
                How to Manage or Clear Site Data in Your Browser
              </h2>
              <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                You can inspect or delete all local preferences at any time through standard browser controls.
              </p>
            </div>

            {/* Browser Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[hsl(var(--color-border))] pb-3">
              {(['chrome', 'firefox', 'safari', 'edge'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveBrowserTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeBrowserTab === tab
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]'
                  }`}
                >
                  {browserInstructions[tab].name}
                </button>
              ))}
            </div>

            {/* Active Browser Steps */}
            <div className="space-y-4 pt-2">
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))]">
                {browserInstructions[activeBrowserTab].steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
              <div className="p-3 rounded-xl bg-[hsl(var(--color-muted)/0.5)] border border-[hsl(var(--color-border))] text-xs font-mono text-[hsl(var(--color-foreground))]">
                {browserInstructions[activeBrowserTab].shortcut}
              </div>
            </div>
          </div>
        </section>

        {/* Why No Annoying Cookie Banner FAQ */}
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-50/60 via-[hsl(var(--color-card))] to-orange-50/40 dark:from-amber-950/20 dark:via-[hsl(var(--color-card))] dark:to-orange-950/10 border border-amber-200/60 dark:border-amber-900/40 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" /> Why Don&rsquo;t You Show an Annoying Cookie Banner?
            </div>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              Under the European Union&rsquo;s <strong>ePrivacy Directive</strong> and <strong>GDPR Article 5(3)</strong>, cookie consent banners are strictly mandatory only when websites deploy non-essential tracking, profiling, or third-party advertising cookies.
            </p>
            <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              Because iCreatePDF uses zero tracking cookies and relies strictly on functional local storage for theme and language ergonomics, we are exempt from consent banner mandates. We prefer delivering a fast, distraction-free interface rather than nagging you with unnecessary pop-ups.
            </p>
            <div className="pt-2">
              <Link href={`/${locale}/privacy`} className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1">
                Read our complete Privacy Policy <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
