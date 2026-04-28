'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TimelineStatus = 'completed' | 'current' | 'upcoming';

export interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  icon?: React.ComponentType<{ className?: string }>;
  status?: TimelineStatus;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

const statusConfig: Record<
  TimelineStatus,
  {
    icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    lineClass: string;
    textClass: string;
  }
> = {
  completed: {
    icon: Check,
    iconClass: 'bg-success text-white border-success',
    lineClass: 'bg-success',
    textClass: 'text-text-primary',
  },
  current: {
    icon: Circle,
    iconClass: 'bg-accent text-white border-accent ring-4 ring-accent/20',
    lineClass: 'bg-accent',
    textClass: 'text-text-primary font-semibold',
  },
  upcoming: {
    icon: Clock,
    iconClass: 'bg-surface-glass text-text-tertiary border-border-glass',
    lineClass: 'bg-border-glass',
    textClass: 'text-text-tertiary',
  },
};

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, orientation = 'vertical', className, ...props }, ref) => {
    const isVertical = orientation === 'vertical';

    if (isVertical) {
      return (
        <div
          ref={ref}
          className={cn('relative', className)}
          {...props}
        >
          {items.map((item, index) => {
            const status = item.status || 'upcoming';
            const config = statusConfig[status];
            const Icon = item.icon || config.icon;
            const isLast = index === items.length - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Connecting line */}
                {!isLast && (
                  <div
                    className={cn(
                      'absolute left-5 top-10 w-0.5 h-[calc(100%-2.5rem)]',
                      status === 'completed' ? 'bg-success' : 'bg-border-glass'
                    )}
                  />
                )}

                {/* Icon/Status indicator */}
                <div
                  className={cn(
                    'relative z-10 flex items-center justify-center',
                    'w-10 h-10 rounded-full border-2',
                    'flex-shrink-0',
                    config.iconClass
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-1">
                    <h4 className={cn('text-base', config.textClass)}>
                      {item.title}
                    </h4>
                    {item.date && (
                      <span className="text-sm text-text-tertiary">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }

    // Horizontal layout
    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          {items.map((item, index) => {
            const status = item.status || 'upcoming';
            const config = statusConfig[status];
            const Icon = item.icon || config.icon;
            const isLast = index === items.length - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={cn(
                  'relative flex flex-col items-center',
                  'flex-1',
                  !isLast && 'after:content-[""] after:absolute after:top-5',
                  !isLast && 'after:left-1/2 after:right-0 after:h-0.5',
                  !isLast && (status === 'completed' ? 'after:bg-success' : 'after:bg-border-glass')
                )}
              >
                {/* Icon/Status indicator */}
                <div
                  className={cn(
                    'relative z-10 flex items-center justify-center',
                    'w-10 h-10 rounded-full border-2',
                    'mb-3',
                    config.iconClass
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="text-center px-2">
                  <h4 className={cn('text-sm mb-1', config.textClass)}>
                    {item.title}
                  </h4>
                  {item.date && (
                    <p className="text-xs text-text-tertiary mb-1">
                      {item.date}
                    </p>
                  )}
                  <p className="text-xs text-text-secondary leading-relaxed max-w-[140px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';
