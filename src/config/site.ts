/**
 * Site configuration
 */
export const siteConfig = {
  name: 'iCreatePDF',
  description: 'Professional PDF Tools - Free, Private & Browser-Based. Merge, split, compress, convert, and edit PDF files online without uploading to servers.',
  url: 'https://icreatepdf.com',
  ogImage: '/images/og-image.png',
  links: {
    github: 'https://github.com',
    twitter: 'https://twitter.com/icreatepdf',
  },
  creator: 'iCreatePDF Team',
  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'free PDF tools',
    'online PDF editor',
    'browser-based PDF',
    'private PDF processing',
  ],
  // SEO-related settings
  seo: {
    titleTemplate: '%s | iCreatePDF',
    defaultTitle: 'iCreatePDF - Professional PDF Tools',
    twitterHandle: '@icreatepdf',
    locale: 'en_US',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Tools', href: '/tools' },
    { title: 'Blog', href: '/blog' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { title: 'Blog', href: '/blog' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
    { title: 'Privacy', href: '/privacy' },
    { title: 'License', href: '/license' },
    { title: 'Acknowledgements', href: '/acknowledgements' },
    { title: 'Contact', href: '/contact' },
  ],
};
