'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import type { BlogPost } from '@/content/blog';
import { ArrowRight, Clock, User } from 'lucide-react';

interface RelatedPostsProps {
  posts: BlogPost[];
  title?: string;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function RelatedPosts({
  posts,
  title = 'Related Reading',
  className,
  columns = 3,
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('space-y-6', className)}>
      <h3 className="text-xl font-bold text-text-primary">{title}</h3>
      
      <div className={cn('grid gap-6', columnClasses[columns])}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block h-full group"
          >
            <Card className="h-full hover:border-accent/50 transition-all duration-300">
              {/* Category Tag */}
              <div className="mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-accent">
                  {post.category.replace('-', ' ')}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                {post.title}
              </h4>

              {/* Excerpt */}
              <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-text-tertiary pt-4 border-t border-border-glass">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {post.author.name}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime ? `${post.readingTime} min` : ''}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
