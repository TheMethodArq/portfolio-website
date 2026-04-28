'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import type { BlogPost } from '@/content/blog';
import { FileText, Clock, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

interface SpokeCardProps {
  spoke: BlogPost;
  hubTitle?: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
  showHubBadge?: boolean;
  className?: string;
  compact?: boolean;
}

export function SpokeCard({
  spoke,
  hubTitle,
  isCompleted = false,
  isCurrent = false,
  showHubBadge = true,
  className,
  compact = false,
}: SpokeCardProps) {
  if (compact) {
    return (
      <Link href={`/blog/spoke/${spoke.slug}`} className="block">
        <div
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
            'hover:bg-surface-glass-hover border border-transparent',
            isCurrent && 'bg-accent/10 border-accent/30',
            className
          )}
        >
          <div className="flex-shrink-0">
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : isCurrent ? (
              <Circle className="w-5 h-5 text-accent fill-accent/20" />
            ) : (
              <Circle className="w-5 h-5 text-text-tertiary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                'font-medium text-sm truncate',
                isCurrent ? 'text-accent' : 'text-text-primary'
              )}
            >
              {spoke.title}
            </p>
            <p className="text-xs text-text-tertiary">{spoke.readingTime ? `${spoke.readingTime} min read` : ''}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-text-tertiary flex-shrink-0" />
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/spoke/${spoke.slug}`} className="block h-full">
      <Card
        className={cn(
          'h-full transition-all duration-300',
          isCurrent && 'border-accent/50 shadow-[0_0_20px_rgba(37,99,235,0.1)]',
          className
        )}
      >
        {/* Hub Badge */}
        {showHubBadge && hubTitle && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-secondary/15 text-accent-secondary text-xs font-medium">
              <FileText className="w-3 h-3" />
              Part of: {hubTitle}
            </span>
          </div>
        )}

        {/* Status & Meta */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 text-success text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            ) : isCurrent ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-medium">
                <Circle className="w-3.5 h-3.5 fill-current" />
                Reading
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background-tertiary text-text-tertiary text-xs font-medium">
                <Circle className="w-3.5 h-3.5" />
                Not Started
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs text-text-tertiary">
            <Clock className="w-3.5 h-3.5" />
            {spoke.readingTime ? `${spoke.readingTime} min read` : ''}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {spoke.title}
        </h4>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm line-clamp-2 mb-4">
          {spoke.excerpt}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1 text-sm text-accent font-medium mt-auto">
          {isCompleted ? 'Revisit' : isCurrent ? 'Continue' : 'Read Article'}
          <ArrowRight className="w-4 h-4" />
        </div>
      </Card>
    </Link>
  );
}
