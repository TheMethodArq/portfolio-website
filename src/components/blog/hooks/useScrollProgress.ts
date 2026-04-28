'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { isClient } from '@/lib/utils';

interface UseScrollProgressOptions {
  /** Element to track scroll within (defaults to window) */
  element?: HTMLElement | null;
  /** Throttle delay in ms */
  throttleMs?: number;
}

interface UseScrollProgressReturn {
  /** Progress percentage from 0 to 100 */
  progress: number;
  /** Current scroll position in pixels */
  scrollY: number;
  /** Total scrollable height */
  scrollHeight: number;
  /** Whether user has scrolled past threshold */
  hasScrolled: boolean;
  /** Whether user has reached bottom */
  isAtBottom: boolean;
}

/**
 * Hook to track reading progress (0-100%)
 * Useful for scroll progress bars and reading indicators
 */
export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): UseScrollProgressReturn {
  const { element, throttleMs = 100 } = options;
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const calculateProgress = useCallback(() => {
    if (!isClient) return;

    const target = element || document.documentElement;
    const scrollTop = element ? element.scrollTop : window.scrollY;
    const clientHeight = element ? element.clientHeight : window.innerHeight;
    const totalHeight = element 
      ? element.scrollHeight - clientHeight 
      : document.documentElement.scrollHeight - clientHeight;

    // Calculate percentage (0-100)
    const rawProgress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
    const clampedProgress = Math.min(100, Math.max(0, rawProgress));

    setProgress(Math.round(clampedProgress));
    setScrollY(scrollTop);
    setScrollHeight(totalHeight);
    setHasScrolled(scrollTop > 100);
    setIsAtBottom(clampedProgress >= 95);
  }, [element]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle updates
      if (now - lastUpdateRef.current < throttleMs) {
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
          calculateProgress();
          lastUpdateRef.current = now;
          rafRef.current = null;
        });
        return;
      }

      calculateProgress();
      lastUpdateRef.current = now;
    };

    const target = element || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    calculateProgress();

    return () => {
      target.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [element, throttleMs, calculateProgress]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return {
    progress,
    scrollY,
    scrollHeight,
    hasScrolled,
    isAtBottom,
  };
}

export default useScrollProgress;
