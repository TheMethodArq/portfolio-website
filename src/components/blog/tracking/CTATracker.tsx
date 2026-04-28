'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCTAVisibility } from '../hooks/useCTAVisibility';
import { useCTATracking, CTAEventData, CTATrackingOptions } from './useCTATracking';

export interface CTATrackerProps {
  /** CTA content */
  children: ReactNode;
  /** Type of CTA for tracking */
  ctaType: string;
  /** Unique identifier for this CTA instance */
  ctaId: string;
  /** Additional context data */
  context?: Record<string, unknown>;
  /** Tracking options */
  trackingOptions?: CTATrackingOptions;
  /** Visibility threshold (0-1) */
  visibilityThreshold?: number;
  /** CSS class names */
  className?: string;
  /** Animation variant */
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  /** Whether this CTA is inside a modal */
  isModal?: boolean;
}

/**
 * Wrapper component for CTAs that handles analytics tracking
 * Tracks impressions, visibility time, and provides tracking functions to children
 */
export function CTATracker({
  children,
  ctaType,
  ctaId,
  context = {},
  trackingOptions = {},
  visibilityThreshold = 0.5,
  className,
  animation = 'fade',
  isModal = false,
}: CTATrackerProps) {
  const hasTrackedViewRef = useRef(false);
  
  const { trackView, trackModalOpen, trackModalClose } = useCTATracking(trackingOptions);
  
  const { ref, isVisible } = useCTAVisibility({
    threshold: visibilityThreshold,
    triggerOnce: true,
  });

  // Track view when CTA becomes visible
  useEffect(() => {
    if (isVisible && !hasTrackedViewRef.current) {
      hasTrackedViewRef.current = true;
      const eventData: CTAEventData = {
        ctaType,
        ctaId,
        context,
      };
      trackView(eventData);
    }
  }, [isVisible, ctaType, ctaId, context, trackView]);

  // Track modal open/close
  useEffect(() => {
    if (!isModal) return;

    const eventData: CTAEventData = {
      ctaType,
      ctaId,
      context,
    };

    trackModalOpen(eventData);

    return () => {
      trackModalClose(eventData);
    };
  }, [isModal, ctaType, ctaId, context, trackModalOpen, trackModalClose]);

  const animationVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    none: {
      hidden: {},
      visible: {},
    },
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial="hidden"
      animate="visible"
      variants={animationVariants[animation]}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
      data-cta-type={ctaType}
      data-cta-id={ctaId}
    >
      {children}
    </motion.div>
  );
}

export default CTATracker;
