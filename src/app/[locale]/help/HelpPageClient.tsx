'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronRight,
  FileText,
  Layers,
  Shield,
  Zap,
  Globe,
  Download,
  Upload,
  Lock,
  Unlock,
  Edit3,
  Image,
  AlignLeft,
  Settings,
  Wifi,
  WifiOff,
  Smartphone,
  Monitor,
  Search,
  BookOpen,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Cpu,
  Star,
  HardDrive,
  FileCheck2,
  AlertTriangle,
  Info,
  Workflow
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

interface HelpPageClientProps {
  locale: Locale;
}

interface Section {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  category: string;
}

interface AccordionItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? 'border-red-300 dark:border-red-800 shadow-sm' : 'border-[hsl(var(--color-border))]'} bg-[hsl(var(--color-card))]`}>
      <button
        onClick={onToggle}
        className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-[hsl(var(--color-muted)/0.4)] transition-colors"
      >
        <span className={`text-sm sm:text-base font-semibold leading-relaxed ${isOpen ? 'text-red-600 dark:text-red-400' : 'text-[hsl(var(--color-foreground))]'}`}>
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-red-600 dark:text-red-400' : 'text-[hsl(var(--color-muted-foreground))]'}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-2 text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.15)]">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HelpPageClient({ locale }: HelpPageClientProps) {
  const [activeSection, setActiveSection] = useState<string>('getting-started');
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const sections: Section[] = [
    { id: 'getting-started', title: 'Getting Started', shortTitle: 'Getting Started', icon: <Sparkles className="w-4 h-4" />, category: 'Basics' },
    { id: 'how-it-works', title: 'How iCreatePDF Works', shortTitle: 'How It Works', icon: <Cpu className="w-4 h-4" />, category: 'Basics' },
    { id: 'tools-overview', title: 'PDF Tools Overview', shortTitle: 'Tools', icon: <Layers className="w-4 h-4" />, category: 'Tools' },
    { id: 'organize-tools', title: 'Organize & Manage Tools', shortTitle: 'Organize', icon: <FileCheck2 className="w-4 h-4" />, category: 'Tools' },
    { id: 'convert-tools', title: 'Convert & Export Tools', shortTitle: 'Convert', icon: <ArrowRight className="w-4 h-4" />, category: 'Tools' },
    { id: 'edit-tools', title: 'Edit & Annotate Tools', shortTitle: 'Edit', icon: <Edit3 className="w-4 h-4" />, category: 'Tools' },
    { id: 'security-tools', title: 'Security & Privacy Tools', shortTitle: 'Security', icon: <Shield className="w-4 h-4" />, category: 'Tools' },
    { id: 'workflow', title: 'Batch Workflows', shortTitle: 'Workflows', icon: <Workflow className="w-4 h-4" />, category: 'Advanced' },
    { id: 'offline-use', title: 'Offline & Desktop Use', shortTitle: 'Offline / Desktop', icon: <WifiOff className="w-4 h-4" />, category: 'Advanced' },
    { id: 'privacy-security', title: 'Privacy & Data Security', shortTitle: 'Privacy', icon: <Lock className="w-4 h-4" />, category: 'Privacy' },
    { id: 'faq', title: 'Frequently Asked Questions', shortTitle: 'FAQ', icon: <HelpCircle className="w-4 h-4" />, category: 'Support' },
    { id: 'contact', title: 'Contact Support', shortTitle: 'Contact Us', icon: <MessageCircle className="w-4 h-4" />, category: 'Support' },
  ];

  // Group sections by category
  const sectionsByCategory = sections.reduce((acc, section) => {
    if (!acc[section.category]) acc[section.category] = [];
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, Section[]>);

  // Intersection Observer to track visible section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const toggleFaq = (key: string) => {
    setOpenFaqs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toolCategories = [
    {
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50',
      border: 'border-rose-200 dark:border-rose-900/60',
      title: 'Organize & Manage',
      desc: 'Merge, split, reorder, extract, rotate, and delete PDF pages.',
      tools: ['Merge PDF', 'Split PDF', 'Organize PDF', 'Extract Pages', 'Rotate PDF', 'Delete Pages', 'Add Page Numbers', 'Crop PDF'],
    },
    {
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50',
      border: 'border-blue-200 dark:border-blue-900/60',
      title: 'Convert PDF',
      desc: 'Convert PDF to Word, Excel, PowerPoint, images, and back.',
      tools: ['PDF to Word', 'PDF to Excel', 'PDF to JPG', 'PDF to PNG', 'Word to PDF', 'JPG to PDF', 'Excel to PDF', 'PowerPoint to PDF'],
    },
    {
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50',
      border: 'border-purple-200 dark:border-purple-900/60',
      title: 'Edit & Annotate',
      desc: 'Edit text, add images, annotate, watermark, and stamp PDFs.',
      tools: ['Edit PDF', 'Add Watermark', 'Sign PDF', 'OCR PDF', 'Redact PDF', 'Add Text to PDF', 'Draw on PDF', 'Comment & Annotate'],
    },
    {
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
      border: 'border-emerald-200 dark:border-emerald-900/60',
      title: 'Optimize & Repair',
      desc: 'Compress, repair, linearize, and prepare PDFs for publishing.',
      tools: ['Compress PDF', 'Repair PDF', 'Optimize PDF', 'Flatten PDF', 'Grayscale PDF', 'Linearize PDF', 'Remove Metadata', 'PDF/A Convert'],
    },
    {
      color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50',
      border: 'border-teal-200 dark:border-teal-900/60',
      title: 'Security & Protect',
      desc: 'Encrypt, decrypt, password-protect, and digitally sign PDFs.',
      tools: ['Encrypt PDF', 'Decrypt PDF', 'Protect PDF', 'Unlock PDF', 'Digital Signatures', 'Certify PDF', 'Permissions Lock', 'Redaction'],
    },
    {
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
      border: 'border-amber-200 dark:border-amber-900/60',
      title: 'AI & Advanced',
      desc: 'OCR recognition, intelligent rephrasing, batch injection, and more.',
      tools: ['OCR PDF', 'AI Summarize', 'Batch Barcode', 'Smart Redact', 'Invoice Parser', 'Form Designer', 'Bookmarks Generator', 'E-ink Optimizer'],
    },
  ];

  const faqs = [
    {
      key: 'faq-upload',
      question: 'Are my PDF files uploaded to a server?',
      answer: (
        <div className="space-y-2">
          <p><strong>No — never.</strong> iCreatePDF processes 100% of your documents directly inside your own web browser using WebAssembly. Your files are loaded into local RAM, processed, and saved back to your device without ever leaving your computer.</p>
          <p className="flex items-start gap-2 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            You can confirm this in real time: open your browser&rsquo;s Developer Tools (F12), go to the Network tab, and observe zero bytes of your file leaving your device.
          </p>
        </div>
      ),
    },
    {
      key: 'faq-account',
      question: 'Do I need to create an account or log in?',
      answer: 'No. iCreatePDF is entirely free to use with no account registration, no email requirement, and no login of any kind. Simply open the tool you need and start processing immediately.',
    },
    {
      key: 'faq-filesize',
      question: 'What are the file size limits?',
      answer: 'There are no imposed file size limits because processing happens locally on your device. The practical limit is determined by your own device\'s available RAM. Modern computers can comfortably handle PDFs up to several gigabytes.',
    },
    {
      key: 'faq-free',
      question: 'Is iCreatePDF really 100% free?',
      answer: 'Yes, completely. There are no paywalls, no credits system, no daily usage caps, and no premium tier. All 67+ tools are available at no cost, with no registration required.',
    },
    {
      key: 'faq-offline',
      question: 'Can I use iCreatePDF without an internet connection?',
      answer: 'Yes! Once the page has loaded in your browser, all PDF tools work fully offline. You can turn on airplane mode, disconnect Wi-Fi, or use it in environments with no internet, and every tool will continue to function normally because all processing is local.',
    },
    {
      key: 'faq-quality',
      question: 'Will my PDF quality be degraded after processing?',
      answer: 'Tools like Merge, Split, Rotate, and Organize perform lossless operations — your document quality is completely preserved. The Compress tool lets you choose compression level (low, medium, high) so you control the quality/size tradeoff. Tools like PDF-to-JPG use the resolution settings you select.',
    },
    {
      key: 'faq-mobile',
      question: 'Does iCreatePDF work on mobile devices?',
      answer: 'Yes. All tools are fully responsive and work on modern mobile browsers including Safari on iOS and Chrome on Android. For the best experience with advanced editing tools, a desktop or laptop browser is recommended.',
    },
    {
      key: 'faq-formats',
      question: 'Which file formats are supported for conversion?',
      answer: 'iCreatePDF supports PDF, DOCX (Word), XLSX (Excel), PPTX (PowerPoint), JPG, PNG, WebP, SVG, TIFF, GIF, TXT, HTML, and more. Available input and output formats depend on the specific tool.',
    },
    {
      key: 'faq-ocr',
      question: 'How does the OCR tool work?',
      answer: 'The OCR (Optical Character Recognition) tool uses Tesseract.js compiled to WebAssembly to recognize text in scanned or image-based PDFs directly inside your browser. It supports 60+ languages and produces a searchable PDF output without uploading your file.',
    },
    {
      key: 'faq-workflow',
      question: 'What is the Batch Workflow builder?',
      answer: 'The Visual Batch Workflow builder lets you chain multiple PDF operations together into an automated pipeline — for example: Compress → Watermark → Add Page Numbers → Download as ZIP. You can save workflows and reuse them for bulk document processing.',
    },
  ];

  const filteredFaqs = faqs.filter(f =>
    searchQuery.trim() === '' ||
    f.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] font-sans antialiased">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-24 md:pt-28">
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-8 pb-10 text-center border-b border-[hsl(var(--color-border))]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-red-500/10 via-rose-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200/80 dark:border-red-900/60 text-xs font-semibold text-red-600 dark:text-red-400 mb-5 shadow-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Help Center & Documentation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] mb-4">
              How can we help you?
            </h1>

            <p className="text-base text-[hsl(var(--color-muted-foreground))] mb-6 leading-relaxed">
              Everything you need to know about iCreatePDF&rsquo;s tools, privacy architecture, and features.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[hsl(var(--color-muted-foreground))]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help topics, questions..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-sm shadow-xs hover:shadow-md focus:shadow-md focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-[hsl(var(--color-muted-foreground))] text-[hsl(var(--color-foreground))]"
              />
            </div>
          </div>
        </div>

        {/* Quick Jump Chip Bar */}
        <div className="border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] sticky top-[60px] sm:top-[68px] z-30 shadow-xs">
          <div className="container mx-auto px-4 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 py-2.5 whitespace-nowrap">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border flex-shrink-0 ${
                    activeSection === section.id
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-transparent text-[hsl(var(--color-muted-foreground))] border-[hsl(var(--color-border))] hover:text-[hsl(var(--color-foreground))] hover:border-red-400'
                  }`}
                >
                  {section.icon}
                  <span>{section.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="container mx-auto px-4 max-w-7xl pb-20">
          <div className="flex gap-8 relative">
            {/* ─── Sticky Sidebar (iLovePDF-style) ─── */}
            <aside className="hidden lg:block w-64 flex-shrink-0 pt-8">
              <div className="sticky top-28">
                <nav className="space-y-5">
                  {Object.entries(sectionsByCategory).map(([category, categorySections]) => (
                    <div key={category}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--color-muted-foreground))] mb-2 px-2">
                        {category}
                      </p>
                      <ul className="space-y-0.5">
                        {categorySections.map((section) => (
                          <li key={section.id}>
                            <button
                              onClick={() => scrollToSection(section.id)}
                              className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                activeSection === section.id
                                  ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-semibold border-l-2 border-red-600 dark:border-red-400 pl-2.5'
                                  : 'text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted)/0.5)]'
                              }`}
                            >
                              <span className={activeSection === section.id ? 'text-red-600 dark:text-red-400' : 'text-[hsl(var(--color-muted-foreground))]'}>
                                {section.icon}
                              </span>
                              {section.shortTitle}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>

                {/* Quick Actions in sidebar */}
                <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-red-50/60 to-rose-50/40 dark:from-red-950/30 dark:to-rose-950/20 border border-red-200/60 dark:border-red-900/40 space-y-3">
                  <h3 className="text-xs font-bold text-[hsl(var(--color-foreground))] flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-red-600" /> Quick Links
                  </h3>
                  <div className="space-y-1.5">
                    <Link href={`/${locale}/tools`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors">
                      <ChevronRight className="w-3 h-3" /> All PDF Tools
                    </Link>
                    <Link href={`/${locale}/workflow`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors">
                      <ChevronRight className="w-3 h-3" /> Batch Workflows
                    </Link>
                    <Link href={`/${locale}/faq`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors">
                      <ChevronRight className="w-3 h-3" /> Full FAQ Page
                    </Link>
                    <Link href={`/${locale}/security`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors">
                      <ChevronRight className="w-3 h-3" /> Security Architecture
                    </Link>
                    <Link href={`/${locale}/contact`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors">
                      <ChevronRight className="w-3 h-3" /> Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* ─── Main Content ─── */}
            <div className="flex-1 min-w-0 pt-8 space-y-16">

              {/* ── Getting Started ── */}
              <section id="getting-started" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400 block">Basics</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Getting Started</h2>
                  </div>
                </div>

                <p className="text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  iCreatePDF is a free, privacy-first PDF utility suite that runs entirely in your web browser. No installation, no account, and no uploads required. Just open the tool you need and start working immediately.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { step: '01', title: 'Open a Tool', desc: 'Browse the 67+ tools at icreatepdf.com/tools or search for what you need.', icon: <Search className="w-5 h-5" /> },
                    { step: '02', title: 'Drop Your File', desc: 'Drag & drop your PDF, image, or document directly onto the tool interface.', icon: <Upload className="w-5 h-5" /> },
                    { step: '03', title: 'Download Result', desc: 'Process and download the result instantly — everything stays on your device.', icon: <Download className="w-5 h-5" /> },
                  ].map((item) => (
                    <div key={item.step} className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] shadow-xs text-center space-y-3 hover:border-red-300 dark:hover:border-red-800 transition-colors group">
                      <div className="text-xs font-bold text-red-600 dark:text-red-400 font-mono">STEP {item.step}</div>
                      <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))]">{item.title}</h3>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Browser Requirement:</strong> iCreatePDF works best in modern browsers — Chrome 90+, Edge 90+, Firefox 90+, and Safari 15+. Mobile browsers are fully supported.
                  </div>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section id="how-it-works" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block">Architecture</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">How iCreatePDF Works</h2>
                  </div>
                </div>

                <p className="text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  Unlike traditional cloud PDF services, iCreatePDF executes all operations <strong>client-side</strong> — directly inside your browser&rsquo;s memory using WebAssembly (WASM) and Web Workers.
                </p>

                <div className="space-y-3">
                  {[
                    { label: 'WebAssembly (WASM)', color: 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300', desc: 'High-performance C++ PDF rendering engines compile to near-native binary execution speed inside your browser sandbox.' },
                    { label: 'Web Workers (Multithreading)', color: 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300', desc: 'All heavy computation runs in isolated background threads, keeping the user interface perfectly smooth and responsive.' },
                    { label: 'Browser Memory (RAM Only)', color: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300', desc: 'Documents exist only in volatile RAM. When your tab closes, all data is immediately garbage collected — nothing persists to disk.' },
                    { label: 'Zero Network Transmission', color: 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300', desc: 'No bytes of your document content are ever sent over the internet. All processing happens entirely offline on your local machine.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] flex items-start gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${item.color}`}>{item.label}</span>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed pt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <Link href={`/${locale}/security`} className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:underline">
                  Read the full Security Architecture whitepaper <ArrowRight className="w-4 h-4" />
                </Link>
              </section>

              {/* ── Tools Overview ── */}
              <section id="tools-overview" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">Tools</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">PDF Tools Overview</h2>
                  </div>
                </div>

                <p className="text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  iCreatePDF offers 67+ specialized PDF tools organized into six functional categories. All tools work offline, require no account, and process files locally.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {toolCategories.map((cat, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border ${cat.border} bg-[hsl(var(--color-card))] shadow-xs space-y-3`}>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold ${cat.color}`}>
                        {cat.title}
                      </div>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))]">{cat.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.tools.map((tool) => (
                          <span key={tool} className="text-[11px] px-2 py-0.5 rounded-md bg-[hsl(var(--color-muted)/0.5)] text-[hsl(var(--color-foreground))] border border-[hsl(var(--color-border))]">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Link href={`/${locale}/tools`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]">
                  Browse All 67+ Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </section>

              {/* ── Organize Tools ── */}
              <section id="organize-tools" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 block">Tools</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Organize & Manage</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { tool: 'Merge PDF', desc: 'Combine two or more PDF files into one. You can reorder files before merging by dragging them in the upload grid.' },
                    { tool: 'Split PDF', desc: 'Divide a PDF into multiple files by specific page ranges (e.g., 1–4, 5–10) or extract individual pages.' },
                    { tool: 'Organize PDF', desc: 'Visual drag-and-drop page manager: reorder, rotate, delete, or duplicate individual pages with a thumbnail preview.' },
                    { tool: 'Extract Pages', desc: 'Select specific pages from a PDF and extract them into a new PDF file, leaving the original intact.' },
                    { tool: 'Rotate PDF', desc: 'Rotate all pages or selected pages by 90°, 180°, or 270° with a single click.' },
                    { tool: 'Delete Pages', desc: 'Remove unwanted pages from a PDF by selecting them via thumbnail view.' },
                    { tool: 'Add Page Numbers', desc: 'Insert numbered page footers or headers with customizable font, size, position, and starting number.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-rose-300 dark:hover:border-rose-800 transition-colors">
                      <h3 className="font-bold text-sm text-rose-600 dark:text-rose-400 mb-1">{item.tool}</h3>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Convert Tools ── */}
              <section id="convert-tools" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block">Tools</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Convert & Export</h2>
                  </div>
                </div>

                <p className="text-[hsl(var(--color-muted-foreground))] text-sm leading-relaxed">
                  Convert PDFs to and from various document and image formats. All conversions happen locally — no file is sent to any server.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { from: 'PDF', to: 'Word (.docx)', quality: 'Preserves fonts, tables, columns, and embedded images.' },
                    { from: 'PDF', to: 'Excel (.xlsx)', quality: 'Extracts tabular data and structured tables accurately.' },
                    { from: 'PDF', to: 'PowerPoint (.pptx)', quality: 'Converts each page to a slide with preserved layout.' },
                    { from: 'PDF', to: 'JPG / PNG / WebP', quality: 'Renders each page as a high-resolution image file.' },
                    { from: 'Word / Excel / PPT', to: 'PDF', quality: 'Converts Office documents to PDF with perfect fidelity.' },
                    { from: 'JPG / PNG / Image', to: 'PDF', quality: 'Converts image files into multi-page PDF documents.' },
                  ].map((conv, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-blue-300 dark:hover:border-blue-800 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">{conv.from}</span>
                        <ArrowRight className="w-3 h-3 text-[hsl(var(--color-muted-foreground))]" />
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">{conv.to}</span>
                      </div>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))]">{conv.quality}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Edit Tools ── */}
              <section id="edit-tools" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block">Tools</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Edit & Annotate</h2>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/30 space-y-3">
                  <h3 className="font-bold text-sm text-purple-700 dark:text-purple-300">Direct Content Edit Mode</h3>
                  <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                    iCreatePDF&rsquo;s most powerful feature — edit the actual text, images, and vector elements inside a PDF directly. You can click on any paragraph and retype it, replace images, adjust fonts, resize shapes, and export the modified PDF. All changes happen in-browser with zero server contact.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { title: 'Add Watermark', desc: 'Overlay text or image watermarks with customizable opacity, position, rotation, and font styling.' },
                    { title: 'Sign PDF', desc: 'Draw, type, or upload your signature and stamp it onto any page with precise placement.' },
                    { title: 'Redact PDF', desc: 'Permanently black-out sensitive text regions so they cannot be extracted or recovered.' },
                    { title: 'OCR PDF', desc: 'Recognize and embed searchable text in scanned image-based PDFs using Tesseract.js (60+ languages).' },
                    { title: 'Classic Annotator', desc: 'Add sticky notes, highlight passages, draw freehand, insert text boxes, and stamp pages.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-purple-300 dark:hover:border-purple-800 transition-colors">
                      <h3 className="font-bold text-xs text-purple-600 dark:text-purple-400 mb-1">{item.title}</h3>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Security Tools ── */}
              <section id="security-tools" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 block">Tools</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Security & Privacy Tools</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <Lock className="w-4 h-4" />, title: 'Encrypt PDF', desc: 'Apply AES-128 or AES-256 password encryption to prevent unauthorized opening of your PDF.' },
                    { icon: <Unlock className="w-4 h-4" />, title: 'Decrypt / Unlock PDF', desc: 'Remove password protection from a PDF when you know the owner password.' },
                    { icon: <Shield className="w-4 h-4" />, title: 'Protect PDF (Permissions)', desc: 'Set granular permissions: restrict printing, copying text, form editing, or annotations.' },
                    { icon: <FileText className="w-4 h-4" />, title: 'Remove Metadata', desc: 'Strip author names, creation dates, software tags, and GPS coordinates from the PDF header.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-teal-300 dark:hover:border-teal-800 transition-colors space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))]">{item.title}</h3>
                      <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Workflow ── */}
              <section id="workflow" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">Advanced</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Batch Workflows</h2>
                  </div>
                </div>

                <p className="text-[hsl(var(--color-muted-foreground))] text-sm leading-relaxed">
                  The Visual Batch Workflow Builder lets you automate multi-step operations by chaining PDF tools into sequential pipelines — all running locally in your browser.
                </p>

                <div className="p-6 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] space-y-4">
                  <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))]">Example Workflow: Legal Document Processing</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {['Upload PDFs', '→', 'Compress', '→', 'Add Watermark', '→', 'Encrypt', '→', 'Add Page Numbers', '→', 'Download ZIP'].map((step, idx) => (
                      <span key={idx} className={step === '→' ? 'text-[hsl(var(--color-muted-foreground))]' : 'px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200/50 dark:border-amber-900/30'}>
                        {step}
                      </span>
                    ))}
                  </div>
                  <Link href={`/${locale}/workflow`} className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
                    Open Workflow Builder <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {[
                    { title: 'Node-Based Visual Editor', desc: 'Drag and connect tool nodes to build complex automation pipelines with no coding required.' },
                    { title: 'Batch File Processing', desc: 'Apply the same workflow to dozens of files simultaneously, outputting as individual files or a ZIP archive.' },
                    { title: 'Reusable Saved Workflows', desc: 'Save your configured workflow chains and reload them for recurring document processing tasks.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-[hsl(var(--color-border))] flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-sm text-[hsl(var(--color-foreground))]">{item.title} — </span>
                        <span className="text-xs text-[hsl(var(--color-muted-foreground))]">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Offline & Desktop ── */}
              <section id="offline-use" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center flex-shrink-0">
                    <WifiOff className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Advanced</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Offline & Desktop Use</h2>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 text-white border border-zinc-800">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-3">
                    <CheckCircle2 className="w-4 h-4" /> 100% Offline Capable
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Once iCreatePDF has loaded in your browser, all 67+ tools work completely offline. Turn on Airplane Mode, disconnect your router, or use it on a secure air-gapped machine — everything continues to work because all processing runs locally in your browser&rsquo;s WebAssembly engine.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] text-center space-y-2">
                    <Monitor className="w-7 h-7 text-[hsl(var(--color-muted-foreground))] mx-auto" />
                    <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))]">Desktop App (Tauri)</h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))]">A lightweight native desktop app for Windows, macOS, and Linux built with Tauri.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] text-center space-y-2">
                    <Globe className="w-7 h-7 text-[hsl(var(--color-muted-foreground))] mx-auto" />
                    <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))]">PWA (Install in Browser)</h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))]">Install iCreatePDF as a Progressive Web App from your browser for offline access.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] text-center space-y-2">
                    <Smartphone className="w-7 h-7 text-[hsl(var(--color-muted-foreground))] mx-auto" />
                    <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))]">Mobile Browser</h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))]">Full functionality on Safari iOS, Chrome Android, and other modern mobile browsers.</p>
                  </div>
                </div>
              </section>

              {/* ── Privacy & Security ── */}
              <section id="privacy-security" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">Privacy</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Privacy & Data Security</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🔒', title: 'Zero Files Uploaded', desc: 'Your documents are processed exclusively in local browser memory and never sent over the internet.' },
                    { icon: '🛡️', title: 'No Account Required', desc: 'We never collect your name, email, or personal information. There is nothing to track.' },
                    { icon: '🗑️', title: 'Instant Data Destruction', desc: 'All file buffers are destroyed and garbage collected when the task completes or tab closes.' },
                    { icon: '📜', title: 'GDPR & CCPA Compliant', desc: 'Zero personal data transfer across borders. We comply with all major global privacy frameworks.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))] mb-1">{item.title}</h3>
                        <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href={`/${locale}/security`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors">
                    <Shield className="w-3.5 h-3.5" /> Security Architecture
                  </Link>
                  <Link href={`/${locale}/privacy`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-muted))/80] text-xs font-bold text-[hsl(var(--color-foreground))] border border-[hsl(var(--color-border))] transition-colors">
                    Privacy Policy
                  </Link>
                </div>
              </section>

              {/* ── FAQ ── */}
              <section id="faq" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400 block">Support</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Frequently Asked Questions</h2>
                  </div>
                </div>

                {searchQuery.trim() !== '' && filteredFaqs.length === 0 && (
                  <div className="p-5 rounded-2xl bg-[hsl(var(--color-muted)/0.5)] text-center text-sm text-[hsl(var(--color-muted-foreground))]">
                    No questions match &ldquo;{searchQuery}&rdquo;. Try a different search term.
                  </div>
                )}

                <div className="space-y-3">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem
                      key={faq.key}
                      question={faq.question}
                      answer={typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                      isOpen={!!openFaqs[faq.key]}
                      onToggle={() => toggleFaq(faq.key)}
                    />
                  ))}
                </div>

                <Link href={`/${locale}/faq`} className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:underline">
                  See all FAQs on the dedicated FAQ page <ArrowRight className="w-4 h-4" />
                </Link>
              </section>

              {/* ── Contact ── */}
              <section id="contact" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block">Support</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--color-foreground))]">Contact & Support</h2>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="max-w-xl relative space-y-3">
                    <h3 className="text-xl font-extrabold">Still have a question?</h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Can&rsquo;t find what you need in the documentation? Our team typically responds within 24 hours.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href="mailto:sudipmanigautam3@gmail.com?subject=iCreatePDF%20Support%20Request"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-red-600 font-bold text-sm shadow hover:bg-zinc-100 transition-all hover:scale-[1.02]"
                      >
                        Email Support
                      </a>
                      <Link
                        href={`/${locale}/contact`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/25 hover:bg-black/40 text-white font-semibold text-sm border border-white/20 backdrop-blur transition-all"
                      >
                        Contact Form <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link href={`/${locale}/faq`} className="p-4 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-red-300 dark:hover:border-red-800 transition-colors group">
                    <HelpCircle className="w-5 h-5 text-[hsl(var(--color-muted-foreground))] group-hover:text-red-600 dark:group-hover:text-red-400 mb-2 transition-colors" />
                    <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))] mb-1">FAQ</h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))]">Common questions answered in detail.</p>
                  </Link>
                  <Link href={`/${locale}/about`} className="p-4 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-red-300 dark:hover:border-red-800 transition-colors group">
                    <Star className="w-5 h-5 text-[hsl(var(--color-muted-foreground))] group-hover:text-red-600 dark:group-hover:text-red-400 mb-2 transition-colors" />
                    <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))] mb-1">About Us</h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))]">Our mission, technology & values.</p>
                  </Link>
                  <a href="https://github.com/PDFCraftTool/pdfcraft" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-red-300 dark:hover:border-red-800 transition-colors group">
                    <ExternalLink className="w-5 h-5 text-[hsl(var(--color-muted-foreground))] group-hover:text-red-600 dark:group-hover:text-red-400 mb-2 transition-colors" />
                    <h3 className="font-bold text-sm text-[hsl(var(--color-foreground))] mb-1">GitHub Issues</h3>
                    <p className="text-xs text-[hsl(var(--color-muted-foreground))]">Report bugs or request features.</p>
                  </a>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
