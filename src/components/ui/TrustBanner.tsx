'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TrustBannerVariant = 'default' | 'compact' | 'large';

export interface TrustBannerItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

export interface TrustBannerProps {
  items: TrustBannerItem[];
  variant?: TrustBannerVariant;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  showDividers?: boolean;
}

const variantStyles: Record<TrustBannerVariant, { container: string; icon: string; text: string; gap: string }> = {
  default: {
    container: 'py-4 px-6',
    icon: 'w-5 h-5',
    text: 'text-sm',
    gap: 'gap-6',
  },
  compact: {
    container: 'py-2 px-4',
    icon: 'w-4 h-4',
    text: 'text-xs',
    gap: 'gap-4',
  },
  large: {
    container: 'py-6 px-8',
    icon: 'w-6 h-6',
    text: 'text-base',
    gap: 'gap-8',
  },
};

export const TrustBanner = forwardRef<HTMLDivElement, TrustBannerProps>(
  (
    {
      items,
      variant = 'default',
      layout = 'horizontal',
      className,
      showDividers = false,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];
    const isHorizontal = layout === 'horizontal';

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'bg-surface-glass/50 backdrop-blur-sm',
          'border border-border-glass rounded-xl',
          styles.container,
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'flex',
            isHorizontal
              ? cn('flex-wrap items-center justify-center', styles.gap)
              : cn('flex-col', styles.gap)
          )}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === items.length - 1;

            return (
              <div key={index} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center gap-2',
                    isHorizontal ? '' : 'gap-3'
                  )}
                >
                  <Icon
                    className={cn(
                      styles.icon,
                      'text-accent flex-shrink-0'
                    )}
                  />
                  <span
                    className={cn(
                      styles.text,
                      'text-text-secondary font-medium',
                      'whitespace-nowrap'
                    )}
                  >
                    {item.text}
                  </span>
                </div>
                {showDividers && !isLast && (
                  <div
                    className={cn(
                      'bg-border-glass',
                      isHorizontal
                        ? 'w-px h-4 ml-6'
                        : 'w-full h-px mt-4'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }
);

TrustBanner.displayName = 'TrustBanner';
