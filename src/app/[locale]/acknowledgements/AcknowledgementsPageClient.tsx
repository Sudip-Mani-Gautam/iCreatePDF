'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Heart, ExternalLink, Code2, Cpu, FileCode, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface AcknowledgementsPageClientProps {
  locale: Locale;
}

interface ProjectCredit {
  name: string;
  category: string;
  description: string;
  license: string;
  url: string;
}

const CREDITS: ProjectCredit[] = [
  {
    name: 'PDF.js',
    category: 'Rendering & Viewing',
    description: 'A general-purpose, web standards-based platform for parsing and rendering PDFs, created by Mozilla.',
    license: 'Apache 2.0',
    url: 'https://github.com/mozilla/pdf.js',
  },
  {
    name: 'pdf-lib',
    category: 'PDF Manipulation',
    description: 'Create and modify PDF documents in any JavaScript environment without external dependencies.',
    license: 'MIT',
    url: 'https://github.com/Hopding/pdf-lib',
  },
  {
    name: 'LibreOffice WASM',
    category: 'Document Conversion',
    description: 'WebAssembly port of LibreOffice engine enabling offline document conversions (DOCX, XLSX, PPTX to PDF).',
    license: 'MPL 2.0',
    url: 'https://www.libreoffice.org/',
  },
  {
    name: 'PyMuPDF (MuPDF WASM)',
    category: 'High Performance Engine',
    description: 'Ultra-fast PDF rendering and deep object inspection engine running client-side.',
    license: 'AGPL-3.0',
    url: 'https://github.com/pymupdf/PyMuPDF',
  },
  {
    name: 'QPDF',
    category: 'Structural Transformation & Encryption',
    description: 'Structural PDF transformations, linearization, decryption, and low-level page extraction.',
    license: 'Apache 2.0',
    url: 'https://github.com/qpdf/qpdf',
  },
  {
    name: 'Tesseract.js',
    category: 'Optical Character Recognition (OCR)',
    description: 'Pure JavaScript port of the popular Tesseract OCR engine for recognizing text in scanned PDFs.',
    license: 'Apache 2.0',
    url: 'https://github.com/naptha/tesseract.js',
  },
  {
    name: 'Next.js & React',
    category: 'Web Framework',
    description: 'Modern, high-performance static export framework by Vercel and Meta.',
    license: 'MIT',
    url: 'https://nextjs.org/',
  },
  {
    name: 'Lucide Icons',
    category: 'Design & Icons',
    description: 'Clean, consistent open-source iconography used throughout our user interface.',
    license: 'ISC',
    url: 'https://lucide.dev/',
  },
];

export default function AcknowledgementsPageClient({ locale }: AcknowledgementsPageClientProps) {
  const tCommon = useTranslations('common');

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
      <Header locale={locale} />

      <main className="flex-1 pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16 border-b border-[hsl(var(--color-border))/0.5] bg-gradient-to-b from-[hsl(var(--color-primary)/0.05)] to-transparent">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 mb-4">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Built on the Shoulders of Giants</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Acknowledgements & Credits
            </h1>
            <p className="text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto">
              {tCommon('brand')} is powered by world-class open-source software, WebAssembly, and modern web standards. We gratefully acknowledge these foundational projects.
            </p>
          </div>
        </section>

        {/* Upstream & Community Note */}
        <section className="container mx-auto px-4 max-w-4xl mt-12 mb-8">
          <div className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))]">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[hsl(var(--color-primary))]" />
              Client-Side WebAssembly Architecture
            </h2>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed mb-4">
              Our privacy-first commitment is made possible through WebAssembly (WASM). By compiling robust native libraries directly into binary code executed in your browser sandbox, {tCommon('brand')} eliminates the need to transmit your documents over the web.
            </p>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
              We extend sincere gratitude to the developers of <strong className="text-[hsl(var(--color-foreground))]">PDFCraft</strong>, <strong className="text-[hsl(var(--color-foreground))]">BentoPDF</strong>, and the global open-source community whose contributions continue to push web document technology forward.
            </p>
          </div>
        </section>

        {/* Libraries Grid */}
        <section className="container mx-auto px-4 max-w-4xl py-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Core Libraries & Engines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CREDITS.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:border-[hsl(var(--color-primary)/0.4)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))]">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-[hsl(var(--color-muted-foreground))]">
                      {item.license}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--color-foreground))]">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--color-primary))] hover:underline mt-auto"
                >
                  Visit Project <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
