'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { isClient } from '@/lib/utils';

interface UseCTAVisibilityOptions {
  /** Threshold for considering CTA visible (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Only trigger once */
  triggerOnce?: boolean;
  /** Callback when CTA becomes visible */
  onVisible?: () => void;
  /** Callback when CTA becomes hidden */
  onHidden?: () => void;
}

interface UseCTAVisibilityReturn {
  /** Ref to attach to the CTA element */
  ref: React.RefObject<HTMLElement | null>;
  /** Whether the CTA is currently visible */
  isVisible: boolean;
  /** Whether the CTA has been viewed at least once */
  hasBeenViewed: boolean;
  /** Time spent viewing in ms */
  viewTime: number;
}

/**
 * Hook to track CTA impressions with Intersection Observer
 * Tracks visibility, view time, and view count for analytics
 */
export function useCTAVisibility(
  options: UseCTAVisibilityOptions = {}
): UseCTAVisibilityReturn {
  const {
    threshold = 0.5,
    rootMargin = '0px',
    triggerOnce = false,
    onVisible,
    onHidden,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const [viewTime, setViewTime] = useState(0);
  
  const visibilityStartRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setIsVisible(visible);

    if (visible) {
      // Started viewing
      visibilityStartRef.current = Date.now();
      
      if (!hasBeenViewed) {
        setHasBeenViewed(true);
      }

      // Call onVisible callback
      if (!triggerOnce || !hasTriggeredRef.current) {
        onVisible?.();
        if (triggerOnce) {
          hasTriggeredRef.current = true;
        }
      }
    } else {
      // Stopped viewing - calculate view time
      if (visibilityStartRef.current) {
        const duration = Date.now() - visibilityStartRef.current;
        setViewTime(prev => prev + duration);
        visibilityStartRef.current = null;
      }

      onHidden?.();
    }
  }, [hasBeenViewed, onVisible, onHidden, triggerOnce]);

  useEffect(() => {
    if (!isClient) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        handleVisibilityChange(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      
      // Calculate remaining view time on cleanup
      if (visibilityStartRef.current) {
        const duration = Date.now() - visibilityStartRef.current;
        setViewTime(prev => prev + duration);
      }
    };
  }, [threshold, rootMargin, handleVisibilityChange]);

  return {
    ref,
    isVisible,
    hasBeenViewed,
    viewTime,
  };
}

export default useCTAVisibility;
