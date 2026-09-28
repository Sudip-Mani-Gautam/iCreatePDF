import Link from 'next/link';
import Image from 'next/image';
import { Home, ArrowLeft, Merge, Scissors, Minimize2, Lock, FileText, GitBranch, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | iCreatePDF',
  description: 'The requested page could not be found. Explore our 132+ free, private, client-side PDF tools on iCreatePDF.',
  robots: {
    index: false,
    follow: true,
  },
};

const POPULAR_TOOLS = [
  { name: 'Merge PDF', slug: 'merge-pdf', icon: Merge, desc: 'Combine multiple PDFs into one document' },
  { name: 'Split PDF', slug: 'split-pdf', icon: Scissors, desc: 'Extract pages or split into separate files' },
  { name: 'Compress PDF', slug: 'compress-pdf', icon: Minimize2, desc: 'Reduce PDF file size without losing quality' },
  { name: 'PDF to Word', slug: 'pdf-to-word', icon: FileText, desc: 'Convert PDF files into editable DOCX' },
  { name: 'Protect PDF', slug: 'protect-pdf', icon: Lock, desc: 'Encrypt your PDF with AES password security' },
  { name: 'PDF Workflow', slug: 'workflow', icon: GitBranch, desc: 'Automate multi-step PDF tasks visually', isSpecial: true },
];

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] flex flex-col justify-between selection:bg-red-500/20">
      {/* Minimal Top Brand Bar */}
      <header className="border-b border-[hsl(var(--color-border))] py-4 px-6 bg-[hsl(var(--color-background))]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/en" className="group flex items-center hover:opacity-90 transition-opacity flex-shrink-0" aria-label="iCreatePDF - Home">
            <span className="flex items-center" data-testid="brand-name">
              <img
                src="/images/logo-light.png"
                alt="iCreatePDF"
                className="h-8 sm:h-10 md:h-11 w-auto max-w-[140px] sm:max-w-none dark:hidden object-contain"
              />
              <img
                src="/images/logo-dark.png"
                alt="iCreatePDF"
                className="h-8 sm:h-10 md:h-11 w-auto max-w-[140px] sm:max-w-none hidden dark:block object-contain"
              />
              <span className="sr-only">iCreatePDF</span>
            </span>
          </Link>
          <Link
            href="/en/tools"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Browse 132+ Tools</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:py-16 flex flex-col items-center text-center justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 border border-red-500/20 mb-6">
          <span>Error 404</span>
          <span>•</span>
          <span>Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-xl mx-auto mb-8 leading-relaxed">
          The page or PDF tool you are looking for doesn&apos;t exist, was moved, or had its link changed. Don&apos;t worry—your files are safe and all our tools are ready to use.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm shadow-md shadow-red-600/25 transition-all hover:shadow-lg hover:shadow-red-600/30"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/en/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:bg-[hsl(var(--color-muted))] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore All Tools
          </Link>
        </div>

        {/* Quick Tools Grid */}
        <div className="w-full text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))] mb-4 text-center">
            Popular Free PDF Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {POPULAR_TOOLS.map((tool) => {
              const Icon = tool.icon;
              const href = tool.isSpecial ? `/en/${tool.slug}` : `/en/tools/${tool.slug}`;
              return (
                <Link
                  key={tool.slug}
                  href={href}
                  className="group p-4 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:border-red-500/40 hover:shadow-md transition-all flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))] group-hover:bg-red-500/10 group-hover:text-red-600 transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm group-hover:text-red-600 transition-colors truncate">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))] line-clamp-1 mt-0.5">
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="border-t border-[hsl(var(--color-border))] py-6 px-4 text-center text-xs text-[hsl(var(--color-muted-foreground))]">
        <p>© {new Date().getFullYear()} iCreatePDF. All processing runs 100% locally in your browser. Zero file uploads.</p>
      </footer>
    </div>
  );
}
