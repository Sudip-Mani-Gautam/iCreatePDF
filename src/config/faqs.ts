export interface FAQItem {
  id: string;
  category: 'general' | 'privacy' | 'features' | 'technical' | 'troubleshooting' | 'languages';
  categoryLabel: string;
  question: string;
  answer: string;
  keywords?: string[];
}

export const FAQ_CATEGORIES = [
  { key: 'all', label: 'All Questions' },
  { key: 'general', label: 'General' },
  { key: 'privacy', label: 'Privacy & Security' },
  { key: 'features', label: 'Features & Tools' },
  { key: 'technical', label: 'Technical & Offline' },
  { key: 'troubleshooting', label: 'Troubleshooting' },
  { key: 'languages', label: 'Languages' },
] as const;

export const FAQ_ITEMS: FAQItem[] = [
  // --- GENERAL ---
  {
    id: 'general-what-is',
    category: 'general',
    categoryLabel: 'General',
    question: 'What is iCreatePDF and how does it work?',
    answer: 'iCreatePDF is an open-source, client-side PDF document manipulation suite featuring 67+ tools. Unlike traditional cloud PDF websites that upload your files to remote servers, iCreatePDF executes all document processing entirely within your browser using high-performance WebAssembly (Wasm) and JavaScript engines. Your documents never leave your computer or phone.',
    keywords: ['what is icreatepdf', 'how it works', 'client side', 'webassembly', 'pdf tools'],
  },
  {
    id: 'general-free-no-catch',
    category: 'general',
    categoryLabel: 'General',
    question: 'Is iCreatePDF completely free? Are there any hidden fees or watermarks?',
    answer: 'Yes, iCreatePDF is 100% free with absolutely no hidden fees, subscriptions, or paywalls. Furthermore, we never stamp unwanted watermarks, logos, or advertising onto your exported documents. You enjoy unlimited operations with full fidelity.',
    keywords: ['free pdf editor', 'no watermark', 'no subscription', 'free online pdf', 'unlimited'],
  },
  {
    id: 'general-account-required',
    category: 'general',
    categoryLabel: 'General',
    question: 'Do I need to create an account, register, or download any software?',
    answer: 'No registration, email sign-up, or account creation is required. You do not need to install any external desktop programs or browser extensions. Simply open any tool on the website and begin processing your documents instantly.',
    keywords: ['no sign up', 'no registration', 'no account', 'no install', 'web app'],
  },
  {
    id: 'general-compare-cloud-tools',
    category: 'general',
    categoryLabel: 'General',
    question: 'How does iCreatePDF compare to services like Smallpdf, Adobe Acrobat, or iLovePDF?',
    answer: 'Traditional tools like Smallpdf or iLovePDF require uploading your private files over the internet to centralized cloud servers, which introduces privacy liabilities, bandwidth latency, and strict upload file size caps. iCreatePDF processes your files on your device hardware via WebAssembly. It is faster (no waiting for uploads or downloads), completely private, Offline-capable, and has no daily file limits.',
    keywords: ['smallpdf alternative', 'ilovepdf alternative', 'adobe acrobat alternative', 'privacy comparison'],
  },
  {
    id: 'general-open-source-license',
    category: 'general',
    categoryLabel: 'General',
    question: 'Is iCreatePDF open-source software?',
    answer: 'Yes! iCreatePDF is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). The complete source code is transparent, auditable, and freely available on GitHub. You can inspect how your documents are processed or host your own private instance.',
    keywords: ['open source', 'agpl 3.0', 'github', 'auditable', 'transparent'],
  },

  // --- PRIVACY & SECURITY ---
  {
    id: 'privacy-server-upload',
    category: 'privacy',
    categoryLabel: 'Privacy & Security',
    question: 'Are my PDF files or confidential documents ever uploaded to your servers?',
    answer: 'Never. iCreatePDF has a zero-upload architecture. When you select or drag-and-drop a file, your browser reads the binary data straight into your local device memory using Web APIs. No network packets containing your document contents are ever transmitted to our servers or any third-party clouds.',
    keywords: ['zero upload', 'client side processing', 'privacy guaranteed', 'no server storage'],
  },
  {
    id: 'privacy-legal-medical-compliance',
    category: 'privacy',
    categoryLabel: 'Privacy & Security',
    question: 'Is iCreatePDF safe for confidential legal, financial, and medical documents (GDPR & HIPAA)?',
    answer: 'Yes. Because your files never traverse the network or leave your local machine, iCreatePDF eliminates third-party data processor exposure. This makes it inherently compliant with data privacy frameworks such as GDPR, HIPAA, FERPA, and CCPA, as no personal data is transferred or retained by an external entity.',
    keywords: ['gdpr compliant', 'hipaa compliant', 'confidential documents', 'legal pdf', 'medical records'],
  },
  {
    id: 'privacy-data-retention',
    category: 'privacy',
    categoryLabel: 'Privacy & Security',
    question: 'What happens to my documents after I close the browser tab?',
    answer: 'Once you close the browser tab, refresh the page, or clear your session, all allocated WebAssembly buffers and memory pointers are instantly destroyed by your browser’s automatic garbage collection. Nothing is stored in browser cache, cookies, or remote databases.',
    keywords: ['data retention', 'memory cleanup', 'browser cache', 'document deletion'],
  },
  {
    id: 'privacy-telemetry-tracking',
    category: 'privacy',
    categoryLabel: 'Privacy & Security',
    question: 'Does iCreatePDF track me or use tracking cookies?',
    answer: 'No. We do not use third-party tracking cookies or sell your activity to advertisers. We respect your digital privacy. Preferences such as your dark/light theme and selected language are saved purely in your browser’s local storage (`localStorage`).',
    keywords: ['no tracking', 'no cookies', 'localstorage', 'privacy policy'],
  },

  // --- FEATURES & TOOLS ---
  {
    id: 'features-merge-reorder',
    category: 'features',
    categoryLabel: 'Features & Tools',
    question: 'How do I merge multiple PDFs into one and rearrange or rotate pages?',
    answer: 'Open our "Merge PDF" or "Organize PDF" tool, drag and drop all your files, and use the visual thumbnail grid to drag pages into your desired order, rotate individual pages by 90/180/270 degrees, delete unnecessary pages, and click "Merge & Download" to get a combined single PDF file immediately.',
    keywords: ['merge pdf', 'combine pdf', 'reorder pages', 'rotate pdf', 'organize pdf'],
  },
  {
    id: 'features-compress-quality',
    category: 'features',
    categoryLabel: 'Features & Tools',
    question: 'How do I compress large PDF files without losing text and image quality?',
    answer: 'Our "Compress PDF" tool offers adjustable compression presets (Low, Medium, High, Extreme). It optimizes internal PDF structure, removes redundant metadata, and re-encodes embedded raster images without degrading vector text crispness. This reduces file sizes by up to 80-90% for easy emailing.',
    keywords: ['compress pdf', 'reduce file size', 'email pdf', 'lossless compression'],
  },
  {
    id: 'features-ocr-scanned',
    category: 'features',
    categoryLabel: 'Features & Tools',
    question: 'Can I extract text from scanned documents using OCR (Optical Character Recognition)?',
    answer: 'Yes! Our "OCR PDF" tool utilizes an in-browser Tesseract.js engine with support for multi-language dictionary recognition. It scans raster page images and embeds a searchable, selectable invisible text layer over your document, or exports plain text directly.',
    keywords: ['ocr pdf', 'optical character recognition', 'scanned pdf to text', 'searchable pdf'],
  },
  {
    id: 'features-convert-office-images',
    category: 'features',
    categoryLabel: 'Features & Tools',
    question: 'Can I convert PDFs to Word, Excel, PowerPoint, or image formats (and vice versa)?',
    answer: 'Yes. iCreatePDF includes two-way conversion tools: convert PDF to JPG, PNG, WebP, SVG, Word (.docx), Excel (.xlsx), and Text (.txt), as well as converting images, Markdown, HTML, and Office documents into standardized PDF files.',
    keywords: ['convert pdf to word', 'pdf to jpg', 'pdf to excel', 'word to pdf', 'images to pdf'],
  },
  {
    id: 'features-signatures-watermarks',
    category: 'features',
    categoryLabel: 'Features & Tools',
    question: 'Can I sign documents electronically, add watermarks, or stamp page numbers?',
    answer: 'Yes. The "Sign PDF" tool enables you to draw your signature, type it with calligraphy fonts, or upload a signature image. You can also use "Watermark PDF" for copyright text or logos, and "Add Page Numbers" with custom positions, margins, and formatting.',
    keywords: ['sign pdf', 'digital signature', 'watermark pdf', 'page numbers', 'electronic signature'],
  },
  {
    id: 'features-password-protect-decrypt',
    category: 'features',
    categoryLabel: 'Features & Tools',
    question: 'How do I password-protect a PDF or unlock a protected PDF?',
    answer: 'Use the "Protect PDF" tool to encrypt your document with standard 128-bit or military-grade AES-256 encryption, restricting viewing, printing, or copying. If you know the password of a protected file and want to remove it permanently, use the "Unlock PDF" tool.',
    keywords: ['password protect pdf', 'encrypt pdf', 'unlock pdf', 'remove pdf password', 'aes 256'],
  },
  {
    id: 'features-workflow-editor',
    category: 'features',
    categoryLabel: 'Features & Tools',
    question: 'What is the Workflow Editor and how does it automate repetitive PDF tasks?',
    answer: 'The Workflow Editor lets you build automated pipelines combining multiple tools in sequence (for example: Merge 5 PDFs → Rotate Landscape Pages → Compress 80% → Add Confidential Watermark → Encrypt with Password). Run the entire pipeline on a batch of files in a single click.',
    keywords: ['workflow editor', 'batch pdf processing', 'pdf automation', 'pipeline'],
  },

  // --- TECHNICAL & Offline ---
  {
    id: 'technical-works-Offline',
    category: 'technical',
    categoryLabel: 'Technical & Offline',
    question: 'Can I use iCreatePDF completely Offline without an active internet connection?',
    answer: 'Yes! Once you have loaded iCreatePDF in your browser, our Progressive Web App (PWA) Service Worker caches all necessary scripts, icons, and WebAssembly compilation modules. You can disconnect your internet, board an airplane, or work in low-connectivity areas with zero interruption.',
    keywords: ['Offline pdf editor', 'airplane mode', 'no internet required', 'pwa Offline'],
  },
  {
    id: 'technical-max-file-size',
    category: 'technical',
    categoryLabel: 'Technical & Offline',
    question: 'Is there a maximum file size limit when merging or editing PDFs?',
    answer: 'Because processing executes on your device hardware, there are no artificial file size caps imposed by our servers. The only limit is your device’s available RAM memory. In standard desktop browsers, files of 500MB to 1GB+ and hundreds of pages process effortlessly.',
    keywords: ['file size limit', 'max pdf size', 'large pdf processing', 'ram limit'],
  },
  {
    id: 'technical-browser-mobile-support',
    category: 'technical',
    categoryLabel: 'Technical & Offline',
    question: 'Which browsers, operating systems, and mobile devices are supported?',
    answer: 'iCreatePDF is fully compatible with Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Brave, and Opera. It works seamlessly across Windows, macOS, Linux, ChromeOS, iOS (iPhone & iPad), and Android devices without requiring separate apps.',
    keywords: ['browser support', 'mobile pdf editor', 'iphone pdf', 'android pdf', 'cross platform'],
  },
  {
    id: 'technical-install-pwa',
    category: 'technical',
    categoryLabel: 'Technical & Offline',
    question: 'Can I install iCreatePDF as an app on my desktop or mobile home screen?',
    answer: 'Yes. iCreatePDF is built as a Progressive Web App (PWA). In Chrome, Edge, or Safari, simply click the "Install App" icon in your URL address bar (or select "Add to Home Screen" on iOS/Android). It launches as a standalone app with desktop shortcuts.',
    keywords: ['install pwa', 'desktop app', 'add to home screen', 'pwa install'],
  },

  // --- TROUBLESHOOTING ---
  {
    id: 'troubleshooting-memory-crash',
    category: 'troubleshooting',
    categoryLabel: 'Troubleshooting',
    question: 'Why did my browser crash or slow down during a large operation?',
    answer: 'Processing very massive PDF files (e.g., thousands of high-resolution scanned pages) consumes significant browser memory. If your device runs out of available RAM, your browser may terminate the tab. To prevent this, try closing background applications or processing your documents in smaller batches.',
    keywords: ['browser crash', 'out of memory', 'performance tip', 'large file troubleshooting'],
  },
  {
    id: 'troubleshooting-corrupted-file',
    category: 'troubleshooting',
    categoryLabel: 'Troubleshooting',
    question: 'Can iCreatePDF repair damaged, corrupted, or unreadable PDF files?',
    answer: 'Yes! The "Repair PDF" tool reconstructs broken PDF cross-reference tables (XREF tables), repairs truncated page object streams, and recovers damaged data structures so the file can be opened and viewed normally in standard readers.',
    keywords: ['repair pdf', 'fix corrupted pdf', 'broken pdf', 'damaged pdf recovery'],
  },
  {
    id: 'troubleshooting-fonts-links-preserved',
    category: 'troubleshooting',
    categoryLabel: 'Troubleshooting',
    question: 'Are fonts, bookmarks, form fields, and hyperlinks preserved after processing?',
    answer: 'Yes. Our processing engine preserves vector fonts, interactive form fields, internal document bookmarks, and external URL hyperlinks wherever technically supported by the target format, ensuring zero quality degradation.',
    keywords: ['embedded fonts', 'pdf hyperlinks', 'form fields', 'bookmarks preserved'],
  },

  // --- LANGUAGES ---
  {
    id: 'languages-supported-list',
    category: 'languages',
    categoryLabel: 'Languages',
    question: 'What languages does iCreatePDF support?',
    answer: 'iCreatePDF is localized in 15+ global languages: English, Spanish (Español), French (Français), German (Deutsch), Italian (Italiano), Portuguese (Português), Japanese (日本語), Korean (한국어), Simplified Chinese (简体中文), Traditional Chinese (繁體中文), Arabic (العربية), Indonesian (Bahasa Indonesia), Vietnamese (Tiếng Việt), Polish (Polski), and Romanian (Română).',
    keywords: ['multilingual', 'languages supported', 'internationalization', 'i18n'],
  },
  {
    id: 'languages-arabic-rtl',
    category: 'languages',
    categoryLabel: 'Languages',
    question: 'Is Right-to-Left (RTL) text supported for Arabic and Hebrew documents?',
    answer: 'Yes! Our user interface features full native RTL layout flipping for Arabic, and our text rendering and editing engines support bidirectional (BiDi) Unicode scripts for proper Right-to-Left typesetting.',
    keywords: ['rtl support', 'arabic pdf', 'right to left', 'bidi unicode'],
  },
];
