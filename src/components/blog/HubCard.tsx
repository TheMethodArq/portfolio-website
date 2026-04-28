'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { BlogPost } from '@/content/blog';
import { FolderOpen, BookOpen, Clock, ArrowRight, Layers } from 'lucide-react';

interface HubCardProps {
  hub: BlogPost;
  spokeCount?: number;
  completedSpokes?: number;
  className?: string;
  featured?: boolean;
}

export function HubCard({ 
  hub, 
  spokeCount = 0, 
  completedSpokes = 0, 
  className,
  featured = false 
}: HubCardProps) {
  const progress = spokeCount > 0 ? (completedSpokes / spokeCount) * 100 : 0;

  return (
    <Link href={`/blog/hub/${hub.slug}`} className="block h-full group">
      <Card 
        className={cn(
          'h-full transition-all duration-300 overflow-hidden',
          featured && 'border-accent/30 shadow-[0_0_30px_rgba(37,99,235,0.15)]',
          className
        )}
      >
        {/* Hub Image */}
        {hub.image && (
          <div className={cn(
            'relative w-full overflow-hidden bg-surface-elevated -mx-6 -mt-6 mb-4',
            featured ? 'h-48' : 'h-40'
          )}>
            <Image
              src={hub.image}
              alt={hub.title}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={featured}
            />
            {/* Gradient overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            
            {/* Hub Badge on image */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/90 text-white text-xs font-semibold uppercase tracking-wide shadow-lg">
                <FolderOpen className="w-3.5 h-3.5" />
                Hub Guide
              </span>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Badge status="production" className="text-xs">
            {hub.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-bold text-text-primary mb-3 group-hover:text-accent transition-colors',
          featured ? 'text-2xl' : 'text-xl'
        )}>
          {hub.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {hub.excerpt}
        </p>

        {/* Spoke Count & Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-text-tertiary">
              <Layers className="w-4 h-4" />
              {spokeCount} {spokeCount === 1 ? 'article' : 'articles'}
            </span>
            <span className="flex items-center gap-2 text-text-tertiary">
              <Clock className="w-4 h-4" />
              {hub.readingTime ? `${hub.readingTime} min read` : ''}
            </span>
          </div>

          {/* Progress Bar */}
          {spokeCount > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-tertiary">Guide Progress</span>
                <span className="text-accent font-medium">
                  {completedSpokes} of {spokeCount} completed
                </span>
              </div>
              <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 pt-4 border-t border-border-glass flex items-center justify-between">
          <span className="text-accent font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            {progress > 0 ? 'Continue Reading' : 'Start Guide'}
            <ArrowRight className="w-4 h-4" />
          </span>
          {completedSpokes > 0 && (
            <span className="text-xs text-text-tertiary">
              {Math.round(progress)}% complete
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
}
