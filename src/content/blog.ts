/**
 * Blog content types and data.
 * Blog routes were removed, but the BlogPost type is still referenced
 * by seo utilities and schema components.
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  tags: string[];
  category: string;
  featured?: boolean;
  image?: string;
  readingTime?: number;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}

// Empty arrays — blog routes were removed during refactoring
export const blogPosts: BlogPost[] = [];
export const blogCategories: BlogCategory[] = [];
