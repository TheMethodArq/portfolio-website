'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  disabled?: boolean;
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  staggerDelay?: number;
  initialDelay?: number;
  isVisible?: boolean;
}

// CSS-based stagger animation for better performance
export function Stagger({
  children,
  className,
  staggerDelay = 0.08,
  initialDelay = 0,
  disabled = false,
}: StaggerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (disabled || hasAnimated.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
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

  return (
    <div 
      ref={ref} 
      className={cn('stagger-container', className)}
      style={{
        '--stagger-initial': `${initialDelay}s`,
        '--stagger-delay': `${staggerDelay}s`,
      } as React.CSSProperties}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <StaggerItem
              key={index}
              index={index}
              staggerDelay={staggerDelay}
              initialDelay={initialDelay}
              isVisible={isVisible}
            >
              {child}
            </StaggerItem>
          ))
        : children
      }
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
  staggerDelay = 0.08,
  initialDelay = 0,
  isVisible = true,
}: StaggerItemProps) {
  const delay = initialDelay + index * staggerDelay;

  return (
    <div
      className={cn('stagger-item', isVisible && 'stagger-item-visible', className)}
      style={{
        '--item-delay': `${delay}s`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
