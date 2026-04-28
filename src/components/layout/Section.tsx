'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { SectionProps } from '@/types';

const sectionSizes: Record<string, string> = {
  sm: 'py-10 md:py-14',
  md: 'py-14 md:py-18',
  default: 'py-16 md:py-20',
  lg: 'py-20 md:py-28',
  xl: 'py-24 md:py-32',
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id, size = 'default', ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(sectionSizes[size], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
