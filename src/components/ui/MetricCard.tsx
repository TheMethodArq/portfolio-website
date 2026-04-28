'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MetricVariant = 'default' | 'success' | 'warning' | 'error';

export interface MetricChange {
  value: number;
  direction: 'up' | 'down' | 'neutral';
  label?: string;
}

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: MetricChange;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: MetricVariant;
  className?: string;
  loading?: boolean;
}

const variantStyles: Record<MetricVariant, { iconBg: string; iconColor: string; accentColor: string }> = {
  default: {
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    accentColor: 'text-accent',
  },
  success: {
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    accentColor: 'text-success',
  },
  warning: {
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    accentColor: 'text-warning',
  },
  error: {
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
    accentColor: 'text-error',
  },
};

const directionConfig = {
  up: { icon: TrendingUp, color: 'text-success', bgColor: 'bg-success/10' },
  down: { icon: TrendingDown, color: 'text-error', bgColor: 'bg-error/10' },
  neutral: { icon: Minus, color: 'text-text-tertiary', bgColor: 'bg-text-tertiary/10' },
};

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    { label, value, change, icon: Icon, variant = 'default', className, loading = false, ...props },
    ref
  ) => {
    const styles = variantStyles[variant];
    const direction = change?.direction || 'neutral';
    const DirectionIcon = directionConfig[direction].icon;

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            'bg-surface-glass backdrop-blur-xl',
            'border border-border-glass rounded-xl',
            'p-6',
            'animate-pulse',
            className
          )}
          {...props}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="h-4 w-24 bg-text-tertiary/20 rounded" />
            <div className="h-10 w-10 bg-text-tertiary/20 rounded-lg" />
          </div>
          <div className="h-10 w-32 bg-text-tertiary/20 rounded mb-2" />
          <div className="h-4 w-20 bg-text-tertiary/20 rounded" />
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'bg-surface-glass backdrop-blur-xl',
          'border border-border-glass rounded-xl',
          'p-6',
          'transition-all duration-200',
          'hover:border-border-glass-hover hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
          className
        )}
        {...props}
      >
        {/* Header with label and icon */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-sm font-medium text-text-secondary uppercase tracking-wide">
            {label}
          </span>
          {Icon && (
            <div
              className={cn(
                'flex items-center justify-center',
                'w-10 h-10 rounded-lg',
                styles.iconBg
              )}
            >
              <Icon className={cn('w-5 h-5', styles.iconColor)} />
            </div>
          )}
        </div>

        {/* Value */}
        <div className={cn('text-4xl font-bold tracking-tight mb-2', styles.accentColor)}>
          {value}
        </div>

        {/* Change indicator */}
        {change && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                directionConfig[direction].bgColor,
                directionConfig[direction].color
              )}
            >
              <DirectionIcon className="w-3 h-3" />
              {change.value}%
            </span>
            {change.label && (
              <span className="text-xs text-text-tertiary">{change.label}</span>
            )}
          </div>
        )}
      </motion.div>
    );
  }
);

MetricCard.displayName = 'MetricCard';
