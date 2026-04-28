'use client';

import { forwardRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  variant?: 'default' | 'compact' | 'large';
  className?: string;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const formatNumber = (num: number): string => num.toString().padStart(2, '0');

const variantStyles = {
  default: {
    container: 'gap-4',
    item: 'min-w-[64px]',
    value: 'text-3xl font-bold',
    label: 'text-sm',
  },
  compact: {
    container: 'gap-2',
    item: 'min-w-[48px]',
    value: 'text-xl font-bold',
    label: 'text-xs',
  },
  large: {
    container: 'gap-6',
    item: 'min-w-[80px]',
    value: 'text-5xl font-bold',
    label: 'text-base',
  },
};

export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  ({ targetDate, onComplete, variant = 'default', className, ...props }, ref) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft(targetDate));
    const [isComplete, setIsComplete] = useState(false);

    const updateTimeLeft = useCallback(() => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);

      if (!remaining && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
    }, [targetDate, onComplete, isComplete]);

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
      updateTimeLeft();

      const timer = setInterval(updateTimeLeft, 1000);

      return () => clearInterval(timer);
    }, [updateTimeLeft]);
    /* eslint-enable react-hooks/set-state-in-effect */

    const styles = variantStyles[variant];

    if (!timeLeft) {
      return (
        <div
          ref={ref}
          className={cn('text-center text-text-secondary', className)}
          role="timer"
          aria-live="polite"
          {...props}
        >
          <span className={styles.value}>Offer Expired</span>
        </div>
      );
    }

    const timeUnits: { key: keyof TimeLeft; label: string }[] = [
      { key: 'days', label: 'Days' },
      { key: 'hours', label: 'Hours' },
      { key: 'minutes', label: 'Min' },
      { key: 'seconds', label: 'Sec' },
    ];

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', styles.container, className)}
        role="timer"
        aria-label="Countdown timer"
        aria-live="polite"
        {...props}
      >
        {timeUnits.map(({ key, label }, index) => (
          <div key={key} className={cn('flex items-center', styles.item)}>
            <div className="flex flex-col items-center">
              <motion.span
                key={`${key}-${timeLeft[key]}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'text-text-primary tabular-nums',
                  styles.value
                )}
                aria-label={`${timeLeft[key]} ${label}`}
              >
                {formatNumber(timeLeft[key])}
              </motion.span>
              <span className={cn('text-text-tertiary uppercase tracking-wider mt-1', styles.label)}>
                {label}
              </span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className={cn('text-text-tertiary ml-2', variant === 'large' ? 'text-4xl' : variant === 'compact' ? 'text-lg' : 'text-2xl')}>
                :
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
);

CountdownTimer.displayName = 'CountdownTimer';
