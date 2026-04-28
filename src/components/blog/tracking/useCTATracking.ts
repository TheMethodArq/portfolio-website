'use client';

import { useCallback, useRef } from 'react';
import { isClient } from '@/lib/utils';

export type CTAEventType =
  | 'cta_view'
  | 'cta_click'
  | 'cta_dismiss'
  | 'newsletter_signup'
  | 'newsletter_error'
  | 'lead_magnet_download'
  | 'lead_magnet_error'
  | 'product_cta_click'
  | 'transparency_click'
  | 'related_content_click'
  | 'modal_open'
  | 'modal_close';

export interface CTAEventData {
  /** Type of CTA component */
  ctaType: string;
  /** Specific identifier for this CTA instance */
  ctaId: string;
  /** Page where CTA was shown */
  pagePath?: string;
  /** Contextual information */
  context?: Record<string, unknown>;
  /** Value/profit associated with this event */
  value?: number;
}

export interface CTATrackingOptions {
  /** Analytics provider: 'gtag' | 'segment' | 'custom' */
  provider?: 'gtag' | 'segment' | 'custom';
  /** Custom tracking function */
  onTrack?: (event: CTAEventType, data: CTAEventData) => void;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Hook for tracking CTA events
 * Supports multiple analytics providers with fallback to custom tracking
 */
export function useCTATracking(options: CTATrackingOptions = {}) {
  const { provider = 'gtag', onTrack, debug = false } = options;
  const trackedEventsRef = useRef<Set<string>>(new Set());

  const generateEventKey = useCallback((event: CTAEventType, ctaId: string) => {
    return `${event}:${ctaId}`;
  }, []);

  const trackEvent = useCallback(
    (event: CTAEventType, data: CTAEventData, options?: { once?: boolean }) => {
      if (!isClient) return;

      const eventKey = generateEventKey(event, data.ctaId);

      // Check if this event should only fire once
      if (options?.once) {
        if (trackedEventsRef.current.has(eventKey)) {
          return;
        }
        trackedEventsRef.current.add(eventKey);
      }

      const eventData: CTAEventData = {
        ...data,
        pagePath: data.pagePath || window.location.pathname,
      };

      // Debug logging
      if (debug) {
         
        console.log('[CTA Tracking]', event, eventData);
      }

      // Send to analytics provider
      switch (provider) {
        case 'gtag':
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', event, {
              custom_parameter_cta_type: eventData.ctaType,
              custom_parameter_cta_id: eventData.ctaId,
              custom_parameter_context: JSON.stringify(eventData.context),
              value: eventData.value,
            });
          }
          break;

        case 'segment':
          if (typeof window.analytics !== 'undefined') {
            window.analytics.track(event, eventData as unknown as Record<string, unknown>);
          }
          break;

        case 'custom':
        default:
          onTrack?.(event, eventData);
          break;
      }

      // Also dispatch custom event for other listeners
      const customEvent = new CustomEvent('cta-event', {
        detail: { event, data: eventData },
      });
      window.dispatchEvent(customEvent);
    },
    [provider, onTrack, debug, generateEventKey]
  );

  const trackView = useCallback(
    (data: CTAEventData) => {
      trackEvent('cta_view', data, { once: true });
    },
    [trackEvent]
  );

  const trackClick = useCallback(
    (data: CTAEventData) => {
      trackEvent('cta_click', data);
    },
    [trackEvent]
  );

  const trackDismiss = useCallback(
    (data: CTAEventData) => {
      trackEvent('cta_dismiss', data);
    },
    [trackEvent]
  );

  const trackNewsletterSignup = useCallback(
    (data: CTAEventData, success: boolean) => {
      trackEvent(
        success ? 'newsletter_signup' : 'newsletter_error',
        data
      );
    },
    [trackEvent]
  );

  const trackLeadMagnetDownload = useCallback(
    (data: CTAEventData, success: boolean) => {
      trackEvent(
        success ? 'lead_magnet_download' : 'lead_magnet_error',
        data
      );
    },
    [trackEvent]
  );

  const trackProductCTA = useCallback(
    (data: CTAEventData) => {
      trackEvent('product_cta_click', data);
    },
    [trackEvent]
  );

  const trackTransparencyClick = useCallback(
    (data: CTAEventData) => {
      trackEvent('transparency_click', data);
    },
    [trackEvent]
  );

  const trackRelatedContent = useCallback(
    (data: CTAEventData) => {
      trackEvent('related_content_click', data);
    },
    [trackEvent]
  );

  const trackModalOpen = useCallback(
    (data: CTAEventData) => {
      trackEvent('modal_open', data);
    },
    [trackEvent]
  );

  const trackModalClose = useCallback(
    (data: CTAEventData) => {
      trackEvent('modal_close', data);
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackView,
    trackClick,
    trackDismiss,
    trackNewsletterSignup,
    trackLeadMagnetDownload,
    trackProductCTA,
    trackTransparencyClick,
    trackRelatedContent,
    trackModalOpen,
    trackModalClose,
  };
}

export default useCTATracking;
