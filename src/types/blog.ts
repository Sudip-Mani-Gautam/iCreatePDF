export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
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
  content: string; // Rich markdown or structured paragraphs
}
