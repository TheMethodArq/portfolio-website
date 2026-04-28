'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { BadgeProps, ProductStatus, IndustryStatus } from '@/types';

const statusStyles: Record<ProductStatus | IndustryStatus, string> = {
  production: 'bg-success/15 text-success',
  beta: 'bg-warning/15 text-warning',
  development: 'bg-accent/15 text-accent',
  community: 'bg-slate-100 text-slate-700',
  exploring: 'bg-white/10 text-text-secondary',
  researching: 'bg-info/15 text-info',
  'coming-soon': 'bg-white/5 text-text-tertiary',
  active: 'bg-success/15 text-success',
  planned: 'bg-accent/15 text-accent',
};

const statusLabels: Record<ProductStatus | IndustryStatus, string> = {
  production: 'Production',
  beta: 'Beta',
  development: 'Development',
  community: 'Community',
  exploring: 'Exploring',
  researching: 'Researching',
  'coming-soon': 'Coming Soon',
  active: 'Active',
  planned: 'Planned',
};

interface ExtendedBadgeProps extends BadgeProps {
  children?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, ExtendedBadgeProps>(
  ({ status, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center',
          'px-3 py-1',
          'rounded-full',
          'text-xs font-semibold',
          'tracking-wide uppercase',
          // Status-specific styles
          statusStyles[status!],
          // Custom className
          className
        )}
        {...props}
      >
        {children || (status ? statusLabels[status] : '')}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Convenience components for specific statuses
export const ProductionBadge = ({ className }: { className?: string }) => (
  <Badge status="production" className={className} />
);

export const BetaBadge = ({ className }: { className?: string }) => (
  <Badge status="beta" className={className} />
);

export const DevelopmentBadge = ({ className }: { className?: string }) => (
  <Badge status="development" className={className} />
);

export const ExploringBadge = ({ className }: { className?: string }) => (
  <Badge status="exploring" className={className} />
);
