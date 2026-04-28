'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ContainerProps } from '@/types';

const containerSizes: Record<string, string> = {
  sm: 'max-w-3xl',      // 768px
  md: 'max-w-4xl',      // 896px
  default: 'max-w-7xl', // 1280px
  lg: 'max-w-[1536px]', // 1536px
  xl: 'max-w-[1792px]', // 1792px
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto px-4 sm:px-6 lg:px-8',
          containerSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
