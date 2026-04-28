/**
 * Metadata Utility for Thalamus AI
 * 
 * Provides standardized metadata generation functions to ensure consistent
 * Open Graph and Twitter Card tags across all pages.
 * 
 * Required Twitter tags: card, title, description, images
 * Required OG tags: type, url, title, description, images, siteName, locale
 */

import type { Metadata } from 'next';

// Default site configuration
const SITE_CONFIG = {
  name: 'Thalamus AI',
  url: 'https://getthalamus.ai',
  locale: 'en_US',
  defaultImage: '/og-image.png',
  twitterHandle: '@ThalamusAI', // Update when you have the actual handle
} as const;

// Default image dimensions
const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

/**
 * Generate Open Graph image metadata
 */
function generateOgImage(
  imageUrl: string = SITE_CONFIG.defaultImage,
  alt: string = SITE_CONFIG.name
) {
  return {
    url: imageUrl,
    width: OG_IMAGE_DIMENSIONS.width,
    height: OG_IMAGE_DIMENSIONS.height,
    alt,
  };
}

/**
 * Generate complete metadata for a page
 * 
 * @param options - Metadata generation options
 * @returns Complete Metadata object with all required social tags
 */
interface MetadataOptions {
  /** Page title (required) */
  title: string;
  /** Page description (required) */
  description: string;
  /** Canonical path (e.g., '/about/' or '/blog/post-name/') */
  canonicalPath: string;
  /** OG/Twitter image URL (defaults to site default) */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** OG type (defaults to 'website') */
  ogType?: 'website' | 'article';
  /** Keywords for the page */
  keywords?: string[];
  /** Article-specific metadata (only used if ogType is 'article') */
  article?: {
    publishedTime: string;
    authors: string[];
    tags: string[];
    section: string;
  };
  /** Whether to allow indexing (defaults to true) */
  index?: boolean;
}

export function generatePageMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    canonicalPath,
    image = SITE_CONFIG.defaultImage,
    imageAlt,
    ogType = 'website',
    keywords = [],
    article,
    index = true,
  } = options;

  // Ensure canonical path starts with / and ends with /
  const normalizedPath = canonicalPath.startsWith('/') 
    ? canonicalPath 
    : `/${canonicalPath}`;
  const canonicalUrl = normalizedPath.endsWith('/')
    ? normalizedPath
    : `${normalizedPath}/`;

  // Full URL for OG
  const fullUrl = `${SITE_CONFIG.url}${canonicalUrl}`;

  // Build base metadata
  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    keywords,
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: ogType,
      locale: SITE_CONFIG.locale,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [generateOgImage(image, imageAlt || title)],
      ...(article && {
        publishedTime: article.publishedTime,
        authors: article.authors,
        tags: article.tags,
        section: article.section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      // site: SITE_CONFIG.twitterHandle, // Uncomment when handle is available
    },
  };

  return metadata;
}

/**
 * Generate metadata for blog posts
 * 
 * @param post - Blog post data
 * @returns Complete Metadata object for the blog post
 */
interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  publishedAt: string;
  author: { name: string };
  tags: string[];
  category: string;
}

export function generateBlogPostMetadata(post: BlogPostData): Metadata {
  const imageUrl = post.image || SITE_CONFIG.defaultImage;
  const canonicalPath = `/blog/${post.slug}/`;

  return generatePageMetadata({
    title: `${post.title} - Thalamus AI Blog`,
    description: post.excerpt,
    canonicalPath,
    image: imageUrl,
    imageAlt: post.title,
    ogType: 'article',
    keywords: [...post.tags, 'AI blog', 'Thalamus AI', post.category],
    article: {
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      section: post.category,
    },
  });
}

/**
 * Generate metadata for industry pages
 * 
 * @param industry - Industry data
 * @returns Complete Metadata object for the industry page
 */
interface IndustryData {
  slug: string;
  name: string;
  challenge: string;
  possibilities: string[];
}

export function generateIndustryMetadata(industry: IndustryData): Metadata {
  const title = `${industry.name} AI Solutions - Enterprise AI for ${industry.name}`;
  const description = `What could enterprise-grade AI mean for ${industry.name.toLowerCase()}? ${industry.challenge} Explore AI possibilities with Thalamus SYNAPTICA platform.`;
  const canonicalPath = `/industries/${industry.slug}/`;

  return generatePageMetadata({
    title,
    description,
    canonicalPath,
    imageAlt: `${industry.name} AI Solutions - Thalamus AI`,
    keywords: [
      industry.name,
      `${industry.name} AI`,
      'enterprise AI',
      'SMB AI',
      'AI solutions',
      'SYNAPTICA',
      'Thalamus AI',
      ...industry.possibilities.slice(0, 3),
    ],
  });
}

/**
 * Export site config for use in other components
 */
export { SITE_CONFIG, OG_IMAGE_DIMENSIONS };
