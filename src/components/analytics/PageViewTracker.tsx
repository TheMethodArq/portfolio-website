'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MLLCBDNZ81';

function PageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Skip if no GA ID
    if (!GA_MEASUREMENT_ID) return;

    // Debounce page view tracking to reduce main-thread work
    const timeoutId = setTimeout(() => {
      // Check gtag availability inside timeout (it may have loaded)
      if (typeof window.gtag !== 'function') return;
      
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_location: window.location.href,
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);

  return null;
}

export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}

// Helper function to track custom events
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', action, params);
}

// Common event helpers
export const AnalyticsEvents = {
  // CTA clicks
  ctaClick: (label: string, location: string) =>
    trackEvent('cta_click', { event_label: label, event_location: location }),

  // Form interactions
  formStart: (formName: string) =>
    trackEvent('form_start', { form_name: formName }),
  formSubmit: (formName: string) =>
    trackEvent('form_submit', { form_name: formName }),
  formError: (formName: string, error: string) =>
    trackEvent('form_error', { form_name: formName, error_message: error }),

  // Navigation
  navClick: (label: string) =>
    trackEvent('nav_click', { event_label: label }),

  // Content engagement
  scrollDepth: (percent: number) =>
    trackEvent('scroll_depth', { percent_scrolled: percent }),

  // External links
  outboundClick: (url: string) =>
    trackEvent('outbound_click', { destination: url }),

  // Video (if you add videos later)
  videoPlay: (videoName: string) =>
    trackEvent('video_play', { video_name: videoName }),
};
