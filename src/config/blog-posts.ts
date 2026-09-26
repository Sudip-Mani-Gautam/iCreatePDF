import { BlogPost } from '@/types/blog';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-merge-pdf-files-online-free',
    title: 'How to Merge PDF Files Online for Free Without Uploading to Servers',
    description: 'Learn how to combine multiple PDF documents into one single file privately and securely in your browser using iCreatePDF. Fast, free, and zero uploads.',
    publishedAt: '2026-09-26',
    author: {
      name: 'iCreatePDF Editorial Team',
      role: 'Document Workflow Specialists',
    },
    category: 'Tutorials',
    tags: ['Merge PDF', 'Combine PDF', 'Productivity', 'Free Tools'],
    readingTime: '4 min read',
    featured: true,
    coverGradient: 'from-blue-600 to-indigo-700',
    content: `
Merging multiple PDF documents into a single, cohesive file is one of the most common document tasks in modern work and study. Whether you are combining invoices for monthly accounting, stitching together school assignments, or preparing a comprehensive project report, having an efficient and secure way to merge PDFs is essential.

### Why Privacy Matters When Merging PDFs
Traditional online PDF editors require you to upload your sensitive files to their remote servers. Once uploaded, your contracts, bank statements, or confidential business reports are stored on third-party computers, creating potential security and data privacy risks.

With **iCreatePDF**, all merging is powered by WebAssembly and client-side JavaScript. This means:
- **100% Private**: Your files never leave your device.
- **Zero Server Uploads**: Processing happens locally in your web browser.
- **Lightning Fast**: No waiting for multi-megabyte files to upload or download.
- **Unlimited Usage**: Combine as many pages and documents as you need without artificial paywalls.

---

### Step-by-Step Guide to Merging PDFs on iCreatePDF

#### Step 1: Open the Merge Tool
Navigate to the **Merge PDF** tool on [iCreatePDF](https://icreatepdf.com).

#### Step 2: Select or Drag & Drop Your Files
Click **Upload Files** or simply drag and drop the PDF documents you wish to combine into the drop zone. You can select multiple documents at once.

#### Step 3: Rearrange Pages & Order
Once your files appear on screen, use the visual drag-and-drop organizer to reorder the documents. You can place Document A before Document B, or customize the exact page sequence.

#### Step 4: Click Merge & Download Instantly
Click the **Merge PDF** button. In milliseconds, your browser compiles the unified document. Click **Download**, and your merged PDF is immediately saved to your computer or phone!

---

### Pro Tips for Organizing Merged Files
1. **Compress After Merging**: If your resulting combined file is too large for email attachments, use the [Compress PDF](/tools/compress-pdf) tool right after merging.
2. **Add Page Numbers**: When putting together a formal report or binder, add sequential page numbers using our page numbering utility.
3. **Protect with a Password**: If the combined PDF contains sensitive financial or medical information, add AES-256 encryption before sharing.
    `,
  },
  {
    slug: 'how-to-compress-pdf-without-losing-quality',
    title: 'How to Compress Large PDF Files Without Losing Text or Image Quality',
    description: 'Reduce PDF file size for email attachments and portal submissions while maintaining sharp text and crisp images. Complete compression guide.',
    publishedAt: '2026-09-25',
    author: {
      name: 'Sarah Chen',
      role: 'Senior Digital Media Specialist',
    },
    category: 'Guides',
    tags: ['Compress PDF', 'Optimize PDF', 'File Size', 'Email Attachment'],
    readingTime: '5 min read',
    featured: false,
    coverGradient: 'from-emerald-600 to-teal-700',
    content: `
Have you ever tried sending a job application, tax form, or business presentation via email only to be blocked by the dreaded "Attachment exceeds 25MB limit" message?

PDF file bloat is usually caused by unoptimized high-resolution images, embedded redundant fonts, and hidden metadata. In this guide, we explore how smart PDF compression works and how you can dramatically shrink file sizes without turning your clear text into blurry pixels.

---

### Understanding PDF Compression Techniques

There are two primary forms of compression applied to PDF files:

1. **Lossless Structural Optimization**:
   Eliminates duplicate font definitions, clears deleted revisions, strips unnecessary object streams, and condenses vector coordinates. This reduces file size by 15% to 40% with absolutely zero change in visual appearance.

2. **Intelligent Image Resampling**:
   Digital cameras and scanners often save photos inside PDFs at 300 to 600 DPI (dots per inch). Standard computer screens and smartphone displays only require 96 to 150 DPI for crystal clear clarity. Downsampling high-DPI images can reduce file size by up to 80%!

---

### How to Compress on iCreatePDF

1. Visit the **Compress PDF** tool.
2. Select your PDF document.
3. Choose your compression level:
   - **Recommended (Balanced)**: Ideal for general emails and web portals.
   - **High Compression**: Maximizes size reduction for strictly limited portals (e.g. government or university 2MB limits).
   - **Low Compression (Maximum Quality)**: Maintains archival grade resolution for printing.
4. Click **Compress**. Review your before-and-after file sizes and download your optimized document.

---

### Best Practices Before Compressing
- If your document has color pages that do not require color, consider converting to Grayscale to save an additional 30% file size.
- Delete unwanted blank or filler pages using the [Organize & Delete PDF Pages](/tools/remove-pages) tool prior to compression.
    `,
  },
  {
    slug: 'complete-guide-to-pdf-security-and-password-protection',
    title: 'The Complete Guide to PDF Security, Passwords, and Digital Privacy',
    description: 'Learn how to protect sensitive documents with industry-standard AES encryption, restrict printing, and sanitize hidden metadata.',
    publishedAt: '2026-09-24',
    author: {
      name: 'Michael Davis',
      role: 'Cybersecurity Analyst',
    },
    category: 'Privacy & Security',
    tags: ['PDF Security', 'Encryption', 'Protect PDF', 'Privacy'],
    readingTime: '6 min read',
    featured: false,
    coverGradient: 'from-purple-600 to-pink-700',
    content: `
In an era of remote work and digital collaboration, sharing documents securely is non-negotiable. Whether you are distributing proprietary business proposals, employee payroll records, or legal agreements, unencrypted PDFs are vulnerable to interception and tampering.

### What is AES-256 PDF Encryption?
The Advanced Encryption Standard with a 256-bit key length (AES-256) is the gold standard of cryptographic protection, recognized and utilized by governments and enterprise organizations worldwide. 

When you apply AES-256 password protection to a PDF:
- The entire content stream of the file is converted into ciphertext.
- Without the master decryption key (your password), decoding the document with brute force would take billions of years with modern supercomputers.

---

### User Passwords vs. Owner (Permissions) Passwords

A secure PDF specification actually supports two distinct password types:

1. **User (Open) Password**:
   Required by any person trying to open and view the contents of the PDF. Without this password, the file cannot be opened.

2. **Owner (Permissions) Password**:
   Allows viewing, but restricts actions such as:
   - Printing the document (or restricting to low-resolution printing only)
   - Copying text, tables, or extracting graphics
   - Editing, rotating, or annotating pages
   - Filling out interactive form fields

---

### How to Password Protect Your PDF on iCreatePDF

1. Open the **Protect PDF** tool on iCreatePDF.
2. Drag and drop your file.
3. Enter your chosen secure password. Make sure to use a passphrase containing at least 12 characters, including numbers and symbols.
4. Click **Encrypt & Download**. Because encryption executes locally in your browser memory, your secret password is never transmitted across the internet!
    `,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRecentBlogPosts(limit = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(BLOG_POSTS.map((post) => post.category)));
}

export function getRelatedBlogPosts(currentSlug: string, limit = 2): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return [];
  return getAllBlogPosts()
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, limit);
}
