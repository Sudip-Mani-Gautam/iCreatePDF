export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogPostFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // YYYY-MM-DD
  updatedAt?: string;
  author: BlogAuthor;
  category: 'Tutorials' | 'Guides' | 'Privacy & Security' | 'Productivity';
  tags: string[];
  readingTime: string;
  featured?: boolean;
  coverGradient?: string;
  coverImage?: string; // Path relative to public (e.g. /images/blog/how-to-merge.webp)
  content: string; // Rich markdown or structured paragraphs
  faq?: BlogPostFAQ[]; // Post-specific FAQs
  draft?: boolean; // When true, excluded from notifications and production lists
}

