'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = true, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glassmorphism styles
          'bg-surface-glass backdrop-blur-xl',
          'border border-border-glass rounded-xl',
          'p-6',
          // Transition
          'transition-all duration-200 ease-out',
          // Hover styles (conditional)
          hover && [
            'hover:bg-surface-glass-hover',
            'hover:border-border-glass-hover',
            'hover:-translate-y-0.5',
            'hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
          ],
          // Clickable styles
          onClick && 'cursor-pointer',
          // Custom className
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header
interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'pb-4 mb-4',
          'border-b border-border-glass',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Body
export const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('py-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// Card Footer
export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'pt-4 mt-4',
          'border-t border-border-glass',
          'flex items-center justify-between',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
