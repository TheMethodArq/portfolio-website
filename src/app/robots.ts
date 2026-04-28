/**
 * Thalamus AI - Robots.txt Configuration
 * Controls search engine crawling behavior
 */

export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';

const SITE_URL = 'https://getthalamus.ai';

/**
 * Generate robots.txt with crawling rules
 * 
 * Rules:
 * - Allow all blog content for indexing
 * - Disallow private/admin routes
 * - Set crawl-delay for major bots to manage server load
 * - Reference sitemap location
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ============================================
      // ALL BOTS - Default rules
      // ============================================
      {
        userAgent: '*',
        allow: [
          // Blog content - fully indexable
          '/blog/',
          '/blog/*',
          
          // Public marketing pages
          '/',
          '/platform/',
          '/platform/*',
          '/solutions/',
          '/solutions/*',
          '/industries/',
          '/industries/*',
          '/company/',
          '/company/*',
          '/aso/',
          '/aso/*',
          '/evidence/',
          '/evidence/*',
          '/architecture/',
          '/architecture/*',
          '/philosophy',
          '/vision',
          '/sophia',
          '/roadmap',
          '/pricing',
          '/beta',
          '/contact',
          '/early-bird',
          '/founders',
          '/guarantee',
          '/methodology',
          
          // Static assets
          '/_next/static/',
          '/images/',
          '/public/',
        ],
        disallow: [
          // API routes
          '/api/',
          '/api/*',
          
          // Admin and dashboard areas (future-proofing)
          '/admin/',
          '/admin/*',
          '/dashboard/',
          '/dashboard/*',
          '/app/',
          '/app/*',
          
          // Authentication pages
          '/auth/',
          '/auth/*',
          '/login',
          '/logout',
          '/signup',
          '/register',
          
          // Internal utilities
          '/_next/',
          '/_next/*',
          '/_vercel/',
          '/_vercel/*',
          
          // Search and filtering (avoid duplicate content)
          '/blog?*',
          '/blog/category/*?*',
          
          // Form submissions
          '/beta?submitted=true',
          '/contact?submitted=true',
          
          // Preview/draft content
          '/preview/',
          '/preview/*',
          '/draft/',
          '/draft/*',
        ],
      },
      
      // ============================================
      // GOOGLE BOT - Specific rules
      // ============================================
      {
        userAgent: 'Googlebot',
        allow: [
          '/blog/',
          '/blog/*',
          '/',
          '/platform/',
          '/platform/*',
          '/solutions/',
          '/solutions/*',
          '/industries/',
          '/industries/*',
        ],
        disallow: [
          '/api/',
          '/api/*',
          '/admin/',
          '/admin/*',
          '/dashboard/',
          '/dashboard/*',
          '/app/',
          '/app/*',
        ],
      },
      
      // ============================================
      // BING BOT
      // ============================================
      {
        userAgent: 'Bingbot',
        crawlDelay: 10, // Wait 10 seconds between requests
        allow: [
          '/blog/',
          '/blog/*',
          '/',
          '/platform/',
          '/platform/*',
          '/solutions/',
          '/solutions/*',
          '/industries/',
          '/industries/*',
        ],
        disallow: [
          '/api/',
          '/api/*',
          '/admin/',
          '/admin/*',
          '/dashboard/',
          '/dashboard/*',
        ],
      },
      
      // ============================================
      // BARD/GOOGLE-EXTENDED (AI crawlers)
      // ============================================
      {
        userAgent: 'Google-Extended',
        allow: [
          // Allow AI training on our public marketing content
          '/blog/',
          '/blog/*',
          '/',
          '/platform/',
          '/solutions/',
          '/industries/',
          '/philosophy',
          '/vision',
        ],
        disallow: [
          // Don't use for AI training
          '/api/',
          '/admin/',
          '/dashboard/',
          '/contact',
          '/beta',
        ],
      },
      
      // ============================================
      // CHATGPT BOT (OpenAI)
      // ============================================
      {
        userAgent: 'ChatGPT-User',
        allow: [
          '/blog/',
          '/blog/*',
          '/',
          '/platform/',
          '/solutions/',
          '/industries/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/blog/',
          '/blog/*',
          '/',
          '/platform/',
          '/solutions/',
          '/industries/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
        ],
      },
      
      // ============================================
      // CLAUDE BOT (Anthropic)
      // ============================================
      {
        userAgent: 'Claude-Web',
        allow: [
          '/blog/',
          '/blog/*',
          '/',
          '/platform/',
          '/solutions/',
          '/industries/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
        ],
      },
      {
        userAgent: 'anthropic-ai',
        allow: [
          '/blog/',
          '/blog/*',
          '/',
          '/platform/',
          '/solutions/',
          '/industries/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
        ],
      },
      
      // ============================================
      // PERPLEXITY BOT
      // ============================================
      {
        userAgent: 'PerplexityBot',
        crawlDelay: 5,
        allow: [
          '/blog/',
          '/blog/*',
          '/',
          '/platform/',
          '/solutions/',
          '/industries/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
        ],
      },
      
      // ============================================
      // OTHER MAJOR CRAWLERS
      // ============================================
      {
        userAgent: 'Slurp', // Yahoo
        crawlDelay: 10,
        allow: ['/blog/', '/blog/*'],
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      {
        userAgent: 'DuckDuckBot',
        crawlDelay: 5,
        allow: ['/blog/', '/blog/*'],
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      {
        userAgent: 'Baiduspider',
        crawlDelay: 10,
        allow: ['/blog/', '/blog/*'],
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      {
        userAgent: 'YandexBot',
        crawlDelay: 10,
        allow: ['/blog/', '/blog/*'],
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      
      // ============================================
      // AGGRESSIVE/PROBLEMATIC BOTS
      // ============================================
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 10,
        allow: ['/blog/', '/blog/*'],
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
        allow: ['/blog/', '/blog/*'],
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      {
        userAgent: 'MJ12bot',
        crawlDelay: 10,
        allow: ['/blog/', '/blog/*'],
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      
      // ============================================
      // MALICIOUS/UNWANTED BOTS - Full disallow
      // ============================================
      {
        userAgent: 'Screaming Frog',
        disallow: ['/'],
      },
      {
        userAgent: 'DotBot',
        disallow: ['/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
