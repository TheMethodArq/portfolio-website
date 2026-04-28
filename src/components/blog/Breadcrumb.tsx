'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm', className)}
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-text-tertiary hover:text-accent transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-text-tertiary" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-text-tertiary hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Pre-built breadcrumb for blog pages
export function BlogBreadcrumb({
  category,
  categoryHref,
  title,
  className,
}: {
  category?: string;
  categoryHref?: string;
  title: string;
  className?: string;
}) {
  const items: BreadcrumbItem[] = [{ label: 'Blog', href: '/blog' }];
  
  if (category) {
    items.push({
      label: category,
      href: categoryHref,
    });
  }
  
  items.push({ label: title });

  return <Breadcrumb items={items} className={className} />;
}

// Breadcrumb for hub pages
export function HubBreadcrumb({
  hubTitle,
  className,
}: {
  hubTitle: string;
  className?: string;
}) {
  return (
    <Breadcrumb
      items={[
        { label: 'Blog', href: '/blog' },
        { label: 'Guides', href: '/blog#hubs' },
        { label: hubTitle },
      ]}
      className={className}
    />
  );
}

// Breadcrumb for spoke pages
export function SpokeBreadcrumb({
  hubTitle,
  hubSlug,
  spokeTitle,
  className,
}: {
  hubTitle: string;
  hubSlug: string;
  spokeTitle: string;
  className?: string;
}) {
  return (
    <Breadcrumb
      items={[
        { label: 'Blog', href: '/blog' },
        { label: hubTitle, href: `/blog/hub/${hubSlug}` },
        { label: spokeTitle },
      ]}
      className={className}
    />
  );
}
