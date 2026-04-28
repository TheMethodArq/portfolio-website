'use client';

import { forwardRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HoverRevealProps {
  preview: React.ReactNode;
  revealed: React.ReactNode;
  revealText?: string;
  hideText?: string;
  className?: string;
}

export const HoverReveal = forwardRef<HTMLDivElement, HoverRevealProps>(
  (
    {
      preview,
      revealed,
      revealText = 'Hover to reveal',
      hideText = 'Click to hide',
      className,
      ...props
    },
    ref
  ) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    const handleClick = useCallback(() => {
      setIsRevealed((prev) => !prev);
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsRevealed((prev) => !prev);
      }
    }, []);

    const showRevealed = isRevealed || isHovered;

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.div
          className={cn(
            'relative overflow-hidden rounded-xl p-6 cursor-pointer',
            'bg-surface-glass backdrop-blur-xl border border-border-glass',
            'transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={showRevealed}
          whileTap={{ scale: 0.98 }}
          animate={{
            borderColor: showRevealed
              ? 'rgba(37, 99, 235, 0.35)'
              : 'rgba(15, 23, 42, 0.10)',
            boxShadow: showRevealed
              ? '0 8px 30px rgba(37, 99, 235, 0.15)'
              : '0 1px 3px rgba(15, 23, 42, 0.06)',
          }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!showRevealed ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="text-text-secondary text-center">{preview}</div>
                <div className="flex items-center gap-2 text-sm text-accent font-medium">
                  <Eye className="w-4 h-4" />
                  <span>{revealText}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center gap-3"
              >
                <div className="text-text-primary text-center">{revealed}</div>
                <div className="flex items-center gap-2 text-sm text-accent-secondary font-medium">
                  <EyeOff className="w-4 h-4" />
                  <span>{hideText}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }
);

HoverReveal.displayName = 'HoverReveal';
