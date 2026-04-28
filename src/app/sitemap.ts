/**
 * Shawn Sloan - Sitemap
 * Static sitemap for the remaining site pages
 */

export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';

const SITE_URL = 'https://shawnsloan.com';

const PAGES = [
  { path: '/', priority: 1.0 },
  { path: '/about', priority: 0.9 },
  { path: '/methodology', priority: 0.9 },
  { path: '/portfolio', priority: 0.95 },
  { path: '/philosophy', priority: 0.85 },
  { path: '/manifesto', priority: 0.85 },
  { path: '/contact', priority: 0.85 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page.priority,
  }));
}
