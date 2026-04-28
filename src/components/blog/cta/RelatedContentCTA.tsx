'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, FileText, Clock, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CTATracker } from '../tracking/CTATracker';
import { useCTATracking } from '../tracking/useCTATracking';
import type { BlogPost } from '@/content/blog';

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  isHub?: boolean;
  hubName?: string;
}

export interface RelatedContentCTAProps {
  /** Articles to display */
  articles: RelatedArticle[];
  /** Current article hub (if in a hub) */
  currentHub?: {
    name: string;
    slug: string;
  };
  /** Visual variant */
  variant?: 'card' | 'sidebar' | 'grid';
  /** Title override */
  title?: string;
  /** Custom className */
  className?: string;
  /** Unique ID for tracking */
  trackingId?: string;
}

/**
 * Cross-promote hubs and spokes
 * Shows related articles with hub badges
 */
export function RelatedContentCTA({
  articles,
  currentHub,
  variant = 'card',
  title,
  className,
  trackingId = 'related-content',
}: RelatedContentCTAProps) {
  const { trackRelatedContent } = useCTATracking();

  const handleClick = useCallback(
    (articleSlug: string, isHub?: boolean) => {
      trackRelatedContent({
        ctaType: 'related-content',
        ctaId: `${trackingId}-${articleSlug}`,
        context: { articleSlug, isHub, currentHub: currentHub?.slug },
      });
    },
    [currentHub?.slug, trackingId, trackRelatedContent]
  );

  const displayTitle = title || (currentHub ? 'Continue Reading' : 'Related Articles');

  // Transform BlogPost to RelatedArticle helper
  const transformPosts = (posts: BlogPost[]): RelatedArticle[] => {
    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      readTime: post.readingTime ? `${post.readingTime} min read` : '',
    }));
  };

  // Grid variant - 3 columns on desktop
  if (variant === 'grid') {
    return (
      <CTATracker
        ctaType="related-content"
        ctaId={trackingId}
        context={{ variant, currentHub: currentHub?.slug }}
        className={cn(className)}
      >
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">{displayTitle}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                onClick={() => handleClick(article.slug, article.isHub)}
                className="group"
              >
                <Card className="h-full hover:border-accent/50 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    {article.isHub ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-medium">
                        <Network className="w-3 h-3" />
                        Hub
                      </span>
                    ) : article.hubName ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-secondary/10 text-accent-secondary text-xs font-medium">
                        <FileText className="w-3 h-3" />
                        Spoke
                      </span>
                    ) : null}
                    <span className="text-xs text-text-tertiary uppercase tracking-wide">
                      {article.category.replace('-', ' ')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-text-tertiary">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </CTATracker>
    );
  }

  // Sidebar variant - compact vertical list
  if (variant === 'sidebar') {
    return (
      <CTATracker
        ctaType="related-content"
        ctaId={trackingId}
        context={{ variant, currentHub: currentHub?.slug }}
        className={cn(className)}
      >
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent" />
            {displayTitle}
          </h4>

          <div className="space-y-3">
            {articles.slice(0, 4).map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                onClick={() => handleClick(article.slug, article.isHub)}
                className="group block"
              >
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-glass transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {article.isHub && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-medium">
                          <Network className="w-2.5 h-2.5" />
                          Hub
                        </span>
                      )}
                      <span className="text-[10px] text-text-tertiary uppercase">
                        {article.category.replace('-', ' ')}
                      </span>
                    </div>
                    <h5 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h5>
                    <span className="text-xs text-text-tertiary">{article.readTime}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CTATracker>
    );
  }

  // Card variant (default) - highlighted box
  return (
    <CTATracker
      ctaType="related-content"
      ctaId={trackingId}
      context={{ variant, currentHub: currentHub?.slug }}
      className={cn(className)}
    >
      <Card className="p-6">
        {currentHub && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
              <Network className="w-3 h-3" />
              {currentHub.name} Hub
            </span>
          </div>
        )}

        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" />
          {displayTitle}
        </h3>

        <div className="space-y-4">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              onClick={() => handleClick(article.slug, article.isHub)}
              className="group block"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {article.isHub ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-medium">
                        <Network className="w-3 h-3" />
                        Hub
                      </span>
                    ) : article.hubName ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-secondary/10 text-accent-secondary text-xs font-medium">
                        <FileText className="w-3 h-3" />
                        Spoke
                      </span>
                    ) : (
                      <span className="text-xs text-accent font-medium uppercase">
                        {article.category.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium text-text-primary group-hover:text-accent transition-colors mb-1">
                    {article.title}
                  </h4>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-text-tertiary mt-2">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-6" />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </CTATracker>
  );
}

// Re-export for convenience
export { transformPosts };
function transformPosts(posts: BlogPost[]): RelatedArticle[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readingTime ? `${post.readingTime} min read` : '',
  }));
}

export default RelatedContentCTA;
