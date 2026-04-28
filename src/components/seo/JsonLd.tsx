/**
 * Thalamus AI - JSON-LD Schema Components
 * React components for injecting structured data into pages
 */

import { safeJsonLd } from '@/lib/seo';
import type {
  OrganizationSchemaProps,
  ArticleSchemaProps,
  BreadcrumbItem,
  SoftwareApplicationSchemaProps,
} from '@/lib/seo';
import {
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateHubPageSchema,
  generateFAQSchema,
  generateWebsiteSchema,
  generateSoftwareApplicationSchema,
  combineSchemas,
} from '@/lib/seo';
import type { BlogPost } from '@/content/blog';

// ============================================
// BASE JSON-LD COMPONENT
// ============================================

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}

/**
 * Base component for injecting JSON-LD structured data
 * Handles serialization and XSS protection
 */
export function JsonLd({ data, id = 'json-ld' }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];
  
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: schemas.map((schema) => safeJsonLd(schema)).join('\n'),
      }}
    />
  );
}

// ============================================
// ORGANIZATION SCHEMA COMPONENT
// ============================================

interface OrganizationSchemaComponentProps {
  orgData?: OrganizationSchemaProps;
}

/**
 * Organization schema for site-wide brand recognition
 * Should be included in the root layout
 */
export function OrganizationSchema({
  orgData,
}: OrganizationSchemaComponentProps = {}) {
  const schema = generateOrganizationSchema(orgData);
  return <JsonLd data={schema} id="organization-schema" />;
}

// ============================================
// WEBSITE SCHEMA COMPONENT
// ============================================

interface WebsiteSchemaProps {
  siteUrl?: string;
}

/**
 * WebSite schema with search action
 * Enables Google Sitelinks searchbox
 */
export function WebsiteSchema({ siteUrl }: WebsiteSchemaProps = {}) {
  const schema = generateWebsiteSchema(siteUrl);
  return <JsonLd data={schema} id="website-schema" />;
}

// ============================================
// ARTICLE SCHEMA COMPONENT
// ============================================

interface ArticleSchemaComponentProps {
  post: BlogPost;
  url: string;
  siteUrl?: string;
}

/**
 * Article schema for blog posts
 * Standard blog article markup
 */
export function ArticleSchema({
  post,
  url,
  siteUrl,
}: ArticleSchemaComponentProps) {
  const schema = generateArticleSchema(post, { url, siteUrl });
  return <JsonLd data={schema} id="article-schema" />;
}

// ============================================
// HUB ARTICLE SCHEMA COMPONENT
// ============================================

interface HubArticleSchemaProps {
  hubPost: BlogPost;
  spokePosts: BlogPost[];
  url: string;
  siteUrl?: string;
}

/**
 * Hub article schema with hasPart for spokes
 * Creates content cluster structure
 */
export function HubArticleSchema({
  hubPost,
  spokePosts,
  url,
  siteUrl,
}: HubArticleSchemaProps) {
  const schema = generateHubPageSchema(hubPost, spokePosts, { url, siteUrl });
  return <JsonLd data={schema} id="hub-article-schema" />;
}

// ============================================
// SPOKE ARTICLE SCHEMA COMPONENT
// ============================================

interface SpokeArticleSchemaProps {
  spokePost: BlogPost;
  hubUrl: string;
  url: string;
  siteUrl?: string;
}

/**
 * Spoke article schema that links back to hub
 * Establishes content cluster relationship
 */
export function SpokeArticleSchema({
  spokePost,
  hubUrl,
  url,
  siteUrl,
}: SpokeArticleSchemaProps) {
  const schema = generateArticleSchema(spokePost, {
    url,
    siteUrl,
    isSpoke: true,
    hubUrl,
  });
  return <JsonLd data={schema} id="spoke-article-schema" />;
}

// ============================================
// BREADCRUMB SCHEMA COMPONENT
// ============================================

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  siteUrl?: string;
}

/**
 * BreadcrumbList schema for navigation
 * Essential for hub-and-spoke content architecture
 */
export function BreadcrumbSchema({ items, siteUrl }: BreadcrumbSchemaProps) {
  const schema = generateBreadcrumbSchema(items, siteUrl);
  return <JsonLd data={schema} id="breadcrumb-schema" />;
}

// ============================================
// COLLECTION PAGE SCHEMA COMPONENT
// ============================================

interface CollectionPageSchemaProps {
  url: string;
  title: string;
  description: string;
  itemCount: number;
  siteUrl?: string;
}

/**
 * CollectionPage schema for blog index and category pages
 */
export function CollectionPageSchema({
  url,
  title,
  description,
  itemCount,
  siteUrl,
}: CollectionPageSchemaProps) {
  const schema = generateCollectionPageSchema({
    url,
    title,
    description,
    itemCount,
    siteUrl,
  });
  return <JsonLd data={schema} id="collection-page-schema" />;
}

// ============================================
// BLOG INDEX SCHEMA COMPONENT
// ============================================

interface BlogIndexSchemaProps {
  posts: BlogPost[];
  categoryName?: string;
  siteUrl?: string;
}

/**
 * Combined schema for blog index pages
 * Includes CollectionPage and Website schemas
 */
export function BlogIndexSchema({
  posts,
  categoryName,
  siteUrl = 'https://getthalamus.ai',
}: BlogIndexSchemaProps) {
  const title = categoryName
    ? `${categoryName} Articles | Thalamus AI Blog`
    : 'Thalamus AI Blog';
  const description = categoryName
    ? `Read our latest ${categoryName.toLowerCase()} articles on AI, governance, and enterprise technology.`
    : 'Insights on AI governance, engineering, and building enterprise-grade AI for SMBs.';
  const url = categoryName
    ? `${siteUrl}/blog/category/${categoryName.toLowerCase()}`
    : `${siteUrl}/blog`;

  const schemas = combineSchemas(
    generateCollectionPageSchema({
      url,
      title,
      description,
      itemCount: posts.length,
      siteUrl,
    }),
    generateWebsiteSchema(siteUrl)
  );

  return <JsonLd data={schemas} id="blog-index-schema" />;
}

// ============================================
// FAQ SCHEMA COMPONENT
// ============================================

interface FAQSchemaProps {
  questions: Array<{ question: string; answer: string }>;
}

/**
 * FAQ schema for hub pages with expandable sections
 */
export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = generateFAQSchema(questions);
  return <JsonLd data={schema} id="faq-schema" />;
}

// ============================================
// COMBINED PAGE SCHEMAS
// ============================================

interface BlogPostPageSchemaProps {
  post: BlogPost;
  breadcrumbs: BreadcrumbItem[];
  siteUrl?: string;
  url: string;
}

/**
 * Complete schema set for a blog post page
 * Includes Article + Breadcrumb schemas
 */
export function BlogPostPageSchema({
  post,
  breadcrumbs,
  siteUrl,
  url,
}: BlogPostPageSchemaProps) {
  const schemas = combineSchemas(
    generateArticleSchema(post, { url, siteUrl }),
    generateBreadcrumbSchema(breadcrumbs, siteUrl),
    generateOrganizationSchema({ url: siteUrl })
  );

  return <JsonLd data={schemas} id="blog-post-page-schema" />;
}

interface HubPageSchemaProps {
  hubPost: BlogPost;
  spokePosts: BlogPost[];
  breadcrumbs: BreadcrumbItem[];
  faqs?: Array<{ question: string; answer: string }>;
  siteUrl?: string;
  url: string;
}

/**
 * Complete schema set for hub pages
 * Includes Hub Article + Breadcrumb + FAQ schemas
 */
export function HubPageSchema({
  hubPost,
  spokePosts,
  breadcrumbs,
  faqs,
  siteUrl,
  url,
}: HubPageSchemaProps) {
  const schemas: Record<string, unknown>[] = [
    generateHubPageSchema(hubPost, spokePosts, { url, siteUrl }),
    generateBreadcrumbSchema(breadcrumbs, siteUrl),
    generateOrganizationSchema({ url: siteUrl }),
  ];

  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  return <JsonLd data={schemas} id="hub-page-schema" />;
}

// ============================================
// EXPORTS
// ============================================

// ============================================
// SOFTWARE APPLICATION SCHEMA COMPONENT
// ============================================

interface SoftwareApplicationSchemaComponentProps {
  product: SoftwareApplicationSchemaProps;
  siteUrl?: string;
}

/**
 * SoftwareApplication schema for product pages
 * Used for SOPHIAClaw Community, Pro, and other software products
 */
export function SoftwareApplicationSchema({
  product,
  siteUrl,
}: SoftwareApplicationSchemaComponentProps) {
  const schema = generateSoftwareApplicationSchema(product, siteUrl);
  return <JsonLd data={schema} id="software-application-schema" />;
}

// ============================================
// EXPORTS
// ============================================

// Re-export utility functions for convenience
export {
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateHubPageSchema,
  generateFAQSchema,
  generateWebsiteSchema,
  generateSoftwareApplicationSchema,
  combineSchemas,
  safeJsonLd,
};

// Default export for the base component
export default JsonLd;
