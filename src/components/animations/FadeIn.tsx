'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  disabled?: boolean;
}

// CSS-based animation for better performance
// Uses CSS classes instead of inline styles to avoid forced reflow
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  direction = 'up',
  disabled = false,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (disabled || hasAnimated.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Use requestAnimationFrame to batch with browser paint cycle
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [disabled]);

  if (disabled) {
    return <div className={cn(className)}>{children}</div>;
  }

  // Use CSS custom properties for dynamic values
  const cssVars = {
    '--fade-delay': `${delay}s`,
    '--fade-duration': `${duration}s`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={cn(
        'fade-in-element',
        `fade-in-${direction}`,
        isVisible && 'fade-in-visible',
        className
      )}
      style={cssVars}
    >
      {children}
    </div>
  );
}
