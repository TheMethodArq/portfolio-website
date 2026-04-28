'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { isClient } from '@/lib/utils';

interface UseExitIntentOptions {
  /** Delay before detecting exit intent (ms) */
  delay?: number;
  /** Cooldown between triggers (ms) */
  cooldown?: number;
  /** Max number of times to trigger */
  maxTriggers?: number;
  /** Don't trigger on mobile devices */
  disableOnMobile?: boolean;
  /** Minimum scroll depth before triggering (0-1) */
  minScrollDepth?: number;
}

interface UseExitIntentReturn {
  /** Whether exit intent has been detected */
  isExiting: boolean;
  /** Manually reset the exit intent state */
  reset: () => void;
  /** Number of times triggered */
  triggerCount: number;
}

/**
 * Hook to detect exit intent for modal CTAs
 * Triggers when user moves mouse to leave the page
 */
export function useExitIntent(
  options: UseExitIntentOptions = {}
): UseExitIntentReturn {
  const {
    delay = 0,
    cooldown = 30000, // 30 seconds
    maxTriggers = 1,
    disableOnMobile = true,
    minScrollDepth = 0.3, // 30% scroll
  } = options;

  const [isExiting, setIsExiting] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  
  const lastTriggerRef = useRef<number>(0);
  const hasDelayedRef = useRef(false);
  const scrollDepthRef = useRef(0);

  const reset = useCallback(() => {
    setIsExiting(false);
  }, []);

  // Track scroll depth
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollPercent = window.scrollY / 
        (document.documentElement.scrollHeight - window.innerHeight);
      scrollDepthRef.current = scrollPercent;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle delay
  useEffect(() => {
    if (delay > 0 && !hasDelayedRef.current) {
      const timer = setTimeout(() => {
        hasDelayedRef.current = true;
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  // Detect exit intent
  useEffect(() => {
    if (!isClient) return;

    // Disable on mobile if requested
    if (disableOnMobile && /Mobi|Android/i.test(navigator.userAgent)) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the page
      if (e.clientY > 100) return;

      // Check delay
      if (delay > 0 && !hasDelayedRef.current) return;

      // Check cooldown
      const now = Date.now();
      if (now - lastTriggerRef.current < cooldown) return;

      // Check max triggers
      if (triggerCount >= maxTriggers) return;

      // Check scroll depth
      if (scrollDepthRef.current < minScrollDepth) return;

      // All checks passed - trigger exit intent
      setIsExiting(true);
      lastTriggerRef.current = now;
      setTriggerCount(prev => prev + 1);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [delay, cooldown, maxTriggers, disableOnMobile, minScrollDepth, triggerCount]);

  return {
    isExiting,
    reset,
    triggerCount,
  };
}

export default useExitIntent;
