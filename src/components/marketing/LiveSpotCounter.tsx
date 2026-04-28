'use client';

import { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LiveSpotCounterProps {
  total: number;
  remaining: number;
  label?: string;
  animate?: boolean;
  className?: string;
}

export const LiveSpotCounter = forwardRef<HTMLDivElement, LiveSpotCounterProps>(
  ({ total, remaining, label = 'spots remaining', animate = true, className, ...props }, ref) => {
    const percentage = useMemo(() => {
      return Math.max(0, Math.min(100, (remaining / total) * 100));
    }, [remaining, total]);

    const taken = total - remaining;
    const isLow = remaining <= Math.ceil(total * 0.2);
    const isCritical = remaining <= Math.ceil(total * 0.1);

    const progressColor = isCritical
      ? 'bg-error'
      : isLow
        ? 'bg-warning'
        : 'bg-accent';

    const pulseAnimation = animate && isLow;

    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface-glass backdrop-blur-xl rounded-xl p-4 border border-border-glass',
          className
        )}
        role="status"
        aria-live="polite"
        aria-label={`${remaining} of ${total} ${label}`}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                isCritical
                  ? 'bg-error/10'
                  : isLow
                    ? 'bg-warning/10'
                    : 'bg-accent/10'
              )}
            >
              {isLow ? (
                <AlertCircle
                  className={cn(
                    'w-4 h-4',
                    isCritical ? 'text-error' : 'text-warning'
                  )}
                />
              ) : (
                <Users className="w-4 h-4 text-accent" />
              )}
            </div>
            <span className="text-sm font-medium text-text-secondary">
              {remaining} of {total} {label}
            </span>
          </div>
          <motion.span
            key={remaining}
            initial={animate ? { scale: 1.2, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              'text-2xl font-bold',
              isCritical ? 'text-error' : isLow ? 'text-warning' : 'text-text-primary'
            )}
            aria-hidden="true"
          >
            {remaining}
          </motion.span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 bg-background-secondary rounded-full overflow-hidden">
          {/* Background track */}
          <div className="absolute inset-0 bg-background-secondary" />

          {/* Filled portion (taken spots) */}
          <motion.div
            initial={animate ? { width: 0 } : false}
            animate={{ width: `${100 - percentage}%` }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              'absolute inset-y-0 left-0 rounded-full transition-colors duration-300',
              progressColor,
              pulseAnimation && 'animate-pulse'
            )}
          />

          {/* Remaining indicator */}
          <motion.div
            initial={animate ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                isCritical ? 'bg-error' : isLow ? 'bg-warning' : 'bg-success'
              )}
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-3 text-xs text-text-tertiary">
          <span>{taken} taken</span>
          <span>{remaining} available</span>
        </div>

        {/* Urgency message */}
        {isLow && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 pt-3 border-t border-border-glass"
          >
            <p
              className={cn(
                'text-sm font-medium text-center',
                isCritical ? 'text-error' : 'text-warning'
              )}
            >
              {isCritical
                ? 'Almost gone! Secure your spot now.'
                : 'Hurry! Limited spots remaining.'}
            </p>
          </motion.div>
        )}
      </div>
    );
  }
);

LiveSpotCounter.displayName = 'LiveSpotCounter';
