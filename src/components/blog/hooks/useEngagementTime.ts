'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { isClient } from '@/lib/utils';

interface UseEngagementTimeOptions {
  /** Interval to update time (ms) */
  updateInterval?: number;
  /** Consider user idle after this time (ms) */
  idleThreshold?: number;
}

interface UseEngagementTimeReturn {
  /** Total engagement time in seconds */
  engagementTime: number;
  /** Whether user is currently engaged */
  isEngaged: boolean;
  /** Whether user has been on page long enough to be "engaged" */
  isDeepEngagement: boolean;
  /** Start tracking (called automatically) */
  startTracking: () => void;
  /** Stop tracking */
  stopTracking: () => void;
  /** Reset the timer */
  reset: () => void;
}

/**
 * Hook to track time on page with idle detection
 * Useful for determining user engagement quality
 */
export function useEngagementTime(
  options: UseEngagementTimeOptions = {}
): UseEngagementTimeReturn {
  const {
    updateInterval = 1000,
    idleThreshold = 30000, // 30 seconds
  } = options;

  const [engagementTime, setEngagementTime] = useState(0);
  const [isEngaged, setIsEngaged] = useState(true);
  const [isDeepEngagement, setIsDeepEngagement] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(0); // initialized to 0; set to Date.now() in startTracking
  const isTrackingRef = useRef(false);

  const updateEngagement = useCallback(() => {
    const now = Date.now();
    const timeSinceActivity = now - lastActivityRef.current;

    if (timeSinceActivity > idleThreshold) {
      setIsEngaged(false);
    } else {
      setIsEngaged(true);
      setEngagementTime(prev => {
        const newTime = prev + (updateInterval / 1000);
        // Mark as deep engagement after 60 seconds
        if (newTime >= 60) {
          setIsDeepEngagement(true);
        }
        return newTime;
      });
    }
  }, [updateInterval, idleThreshold]);

  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (!isEngaged) {
      setIsEngaged(true);
    }
  }, [isEngaged]);

  const startTracking = useCallback(() => {
    if (isTrackingRef.current || !isClient) return;
    
    isTrackingRef.current = true;
    lastActivityRef.current = Date.now();

    // Track various user activities
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Start the interval
    intervalRef.current = setInterval(updateEngagement, updateInterval);
  }, [handleActivity, updateEngagement, updateInterval]);

  const stopTracking = useCallback(() => {
    if (!isTrackingRef.current) return;
    
    isTrackingRef.current = false;

    const events = ['mousedown', 'keydown', 'touchstart', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.removeEventListener(event, handleActivity);
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [handleActivity]);

  const reset = useCallback(() => {
    setEngagementTime(0);
    setIsEngaged(true);
    setIsDeepEngagement(false);
    lastActivityRef.current = Date.now();
  }, []);

  // Auto-start on mount
  useEffect(() => {
    startTracking();
    return stopTracking;
  }, [startTracking, stopTracking]);

  // Handle visibility change (pause when tab hidden)
  useEffect(() => {
    if (!isClient) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTracking();
      } else {
        startTracking();
        lastActivityRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [startTracking, stopTracking]);

  return {
    engagementTime,
    isEngaged,
    isDeepEngagement,
    startTracking,
    stopTracking,
    reset,
  };
}

export default useEngagementTime;
