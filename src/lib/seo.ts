/**
 * Thalamus AI - SEO Utilities
 * Schema generation and content processing for structured data
 */

import type { BlogPost } from '@/content/blog';

// ============================================
// TYPES
// ============================================

export interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author: {
    name: string;
    role?: string;
  };
  category?: string;
  tags?: string[];
  wordCount?: number;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

// ============================================
// ORGANIZATION SCHEMA
// ============================================

/**
 * Generate Organization schema for Thalamus AI
 * Used site-wide for brand recognition
 */
export function generateOrganizationSchema(
  props: OrganizationSchemaProps = {}
): Record<string, unknown> {
  const {
    name = 'Thalamus AI',
    url = 'https://getthalamus.ai',
    logo = 'https://getthalamus.ai/thalamus-logo-small.webp',
    description = 'Democratizing Fortune 500 AI capabilities for SMBs. Enterprise-grade AI infrastructure, governance, and applications without the enterprise price tag.',
    sameAs = [
      'https://x.com/GetThalamus',
      'https://www.linkedin.com/company/thalamusai',
      'https://github.com/GetThalamusAI',
    ],
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
      width: 512,
      height: 512,
    },
    description,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3241 SE West Snow Road',
      addressLocality: 'Port Saint Lucie',
      addressRegion: 'FL',
      postalCode: '34984',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-888-381-8949',
      contactType: 'customer service',
      availableLanguage: ['English'],
      areaServed: 'US',
    },
  };
}

// ============================================
// ARTICLE SCHEMA
// ============================================

/**
 * Generate Article schema for blog posts
 * Supports both standard articles and spoke articles (isPartOf hub)
 */
export function generateArticleSchema(
  post: BlogPost,
  options: {
    url: string;
    siteUrl?: string;
    isSpoke?: boolean;
    hubUrl?: string;
  }
): Record<string, unknown> {
  const { url, siteUrl = 'https://getthalamus.ai', isSpoke = false, hubUrl } = options;
  
  const wordCount = (post.content ?? '').split(/\s+/).length;
  const imageUrl = post.image || `${siteUrl}/og-image.png`;
  
  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}/#article`,
    isPartOf: {
      '@type': 'WebPage',
      '@id': `${url}/#webpage`,
    },
    headline: post.title,
    description: post.excerpt,
    url,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    wordCount,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    inLanguage: 'en-US',
  };

  // Spoke articles are part of a hub/collection
  if (isSpoke && hubUrl) {
    baseSchema.isPartOf = {
      '@type': 'Article',
      '@id': `${hubUrl}/#article`,
    };
  }

  return baseSchema;
}

// ============================================
// BREADCRUMB SCHEMA
// ============================================

/**
 * Generate BreadcrumbList schema for navigation
 * Essential for hub-and-spoke content architecture
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  siteUrl: string = 'https://getthalamus.ai'
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${siteUrl}${item.item}`,
    })),
  };
}

/**
 * Generate breadcrumb items for a blog post
 * Handles both standard posts and spoke posts
 */
export function generateBlogPostBreadcrumbs(
  post: BlogPost,
  options: {
    isHub?: boolean;
    isSpoke?: boolean;
    hubSlug?: string;
    hubTitle?: string;
  } = {}
): BreadcrumbItem[] {
  const { isHub = false, isSpoke = false, hubSlug, hubTitle } = options;
  
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
  ];

  // Add category for standard posts
  if (!isHub && !isSpoke) {
    breadcrumbs.push({
      name: post.category.charAt(0).toUpperCase() + post.category.slice(1),
      item: `/blog/category/${post.category}`,
    });
  }

  // For spoke posts, link back to hub
  if (isSpoke && hubSlug && hubTitle) {
    breadcrumbs.push({
      name: hubTitle,
      item: `/blog/hub/${hubSlug}`,
    });
  }

  // Current page
  breadcrumbs.push({
    name: post.title,
    item: `/blog/${post.slug}`,
  });

  return breadcrumbs;
}

// ============================================
// COLLECTION PAGE SCHEMA
// ============================================

/**
 * Generate CollectionPage schema for blog index
 * Used for blog listing pages
 */
export function generateCollectionPageSchema(
  options: {
    url: string;
    title: string;
    description: string;
    itemCount: number;
    siteUrl?: string;
  }
): Record<string, unknown> {
  const { url, title, description, itemCount, siteUrl = 'https://getthalamus.ai' } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}/#collectionpage`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    url,
    name: title,
    description,
    about: {
      '@type': 'Thing',
      name: 'Thalamus AI Blog',
    },
    numberOfItems: itemCount,
    inLanguage: 'en-US',
  };
}

/**
 * Generate ItemList schema for paginated collections
 * Shows articles in a structured list
 */
export function generateItemListSchema(
  posts: BlogPost[],
  options: {
    baseUrl: string;
    page?: number;
  }
): Record<string, unknown> {
  const { baseUrl, page = 1 } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: (page - 1) * posts.length + index + 1,
      url: `${baseUrl}/blog/${post.slug}`,
      name: post.title,
    })),
  };
}

// ============================================
// HUB AND SPOKE SCHEMAS
// ============================================

/**
 * Generate hub page schema with hasPart for spokes
 * Creates content cluster structure
 */
export function generateHubPageSchema(
  hubPost: BlogPost,
  spokePosts: BlogPost[],
  options: {
    url: string;
    siteUrl?: string;
  }
): Record<string, unknown> {
  const { url, siteUrl = 'https://getthalamus.ai' } = options;
  const wordCount = (hubPost.content ?? '').split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}/#article`,
    headline: hubPost.title,
    description: hubPost.excerpt,
    url,
    author: {
      '@type': 'Person',
      name: hubPost.author.name,
      jobTitle: hubPost.author.role,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
    },
    datePublished: hubPost.publishedAt,
    wordCount,
    articleSection: hubPost.category,
    keywords: hubPost.tags.join(', '),
    // Hub contains spokes as parts
    hasPart: spokePosts.map((spoke) => ({
      '@type': 'Article',
      '@id': `${siteUrl}/blog/${spoke.slug}/#article`,
      headline: spoke.title,
      url: `${siteUrl}/blog/${spoke.slug}`,
      isPartOf: {
        '@id': `${url}/#article`,
      },
    })),
  };
}

/**
 * Generate FAQ schema for hub pages with expandable sections
 */
export function generateFAQSchema(
  questions: Array<{ question: string; answer: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

// ============================================
// CONTENT PROCESSING
// ============================================

/**
 * Extract H2 headings from markdown content
 * Used for table of contents generation
 */
export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  
  // Match H2 headings (## Heading)
  const h2Regex = /^##\s+(.+)$/gm;
  let match;
  
  while ((match = h2Regex.exec(content)) !== null) {
    const text = match[1].trim();
    // Create URL-friendly ID from heading text
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ id, text, level: 2 });
  }
  
  return headings;
}

/**
 * Extract H3 headings as well for detailed TOC
 */
export function extractDetailedTableOfContents(content: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  
  // Match H2 and H3 headings
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ id, text, level });
  }
  
  return headings;
}

/**
 * Calculate reading time in minutes from content
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTimeMinutes(content: string): number {
  // Clean markdown syntax for accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/[#*_>`|]/g, '') // Remove markdown syntax (removed - from regex for ES2017 compatibility)
    .replace(/\s+/g, ' '); // Normalize whitespace
  
  const wordCount = cleanContent.trim().split(/\s+/).length;
  const wordsPerMinute = 225; // Average reading speed
  
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Extract word count from content (including markdown)
 */
export function extractWordCount(content: string): number {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>`|-]/g, '');
  
  return cleanContent.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Extract excerpt from content if not provided
 * Takes first paragraph after any H1 heading
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove H1 heading
  const withoutH1 = content.replace(/^#\s+.+\n+/m, '');
  
  // Find first paragraph (non-empty line that's not a heading)
  // Using [\s\S] instead of . with /s flag for ES2017 compatibility
  const paragraphMatch = withoutH1.match(/\n\n([^#\n][\s\S]*?)(?=\n\n|$)/);
  
  if (paragraphMatch) {
    const excerpt = paragraphMatch[1].replace(/\n/g, ' ').trim();
    if (excerpt.length > maxLength) {
      return excerpt.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
    }
    return excerpt;
  }
  
  // Fallback: return first sentence
  const firstSentence = withoutH1.match(/[^.!?]+[.!?]+/);
  return firstSentence ? firstSentence[0].trim() : '';
}

// ============================================
// UTILITIES
// ============================================

/**
 * Safely serialize JSON-LD schema
 * Prevents XSS by escaping HTML special characters
 */
export function safeJsonLd(json: Record<string, unknown>): string {
  return JSON.stringify(json)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\//g, '\\/');
}

/**
 * Generate WebSite schema with search action
 * Enables Google Sitelinks searchbox
 */
export function generateWebsiteSchema(
  siteUrl: string = 'https://getthalamus.ai'
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Thalamus AI',
    description: 'Democratizing Fortune 500 AI capabilities for SMBs',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Combine multiple schemas for a page
 */
export function combineSchemas(
  ...schemas: Record<string, unknown>[]
): Record<string, unknown>[] {
  return schemas;
}

// ============================================
// SOFTWARE APPLICATION SCHEMA
// ============================================

export interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  softwareVersion?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  aggregateRating?: {
    ratingValue: string;
    ratingCount: string;
  };
  image?: string;
  featureList?: string[];
  isOpenSource?: boolean;
  codeRepository?: string;
  programmingLanguage?: string[];
  license?: string;
}

/**
 * Generate SoftwareApplication schema for product pages
 * Used for SophiaClaw Community, Pro, and other products
 */
export function generateSoftwareApplicationSchema(
  props: SoftwareApplicationSchemaProps,
  siteUrl: string = 'https://getthalamus.ai'
): Record<string, unknown> {
  const {
    name,
    description,
    url,
    applicationCategory = 'SoftwareApplication',
    operatingSystem,
    softwareVersion,
    offers,
    aggregateRating,
    image = `${siteUrl}/og-image.png`,
    featureList,
    isOpenSource = false,
    codeRepository,
    programmingLanguage,
    license,
  } = props;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}/#software`,
    name,
    description,
    url,
    applicationCategory,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Thalamus AI',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-US',
  };

  if (operatingSystem) {
    schema.operatingSystem = operatingSystem;
  }

  if (softwareVersion) {
    schema.softwareVersion = softwareVersion;
  }

  if (offers) {
    schema.offers = {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: offers.availability || 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
      },
    };
  }

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      ratingCount: aggregateRating.ratingCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  if (featureList && featureList.length > 0) {
    schema.featureList = featureList.join(', ');
  }

  // Open source specific properties
  if (isOpenSource) {
    schema.isOpenSource = true;

    if (codeRepository) {
      schema.codeRepository = codeRepository;
    }

    if (programmingLanguage && programmingLanguage.length > 0) {
      schema.programmingLanguage = programmingLanguage;
    }

    if (license) {
      schema.license = license;
    }
  }

  return schema;
}
