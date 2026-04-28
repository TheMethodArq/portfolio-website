'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MLLCBDNZ81';

/**
 * Lazy-loaded Google Analytics component
 * 
 * Performance optimization:
 * - Only loads after user interaction (scroll, click, keypress) or after 5 seconds
 * - Reduces initial bundle by ~60 KiB of unused JavaScript
 * - Improves Core Web Vitals (LCP, FID, TTFB)
 */
export function LazyGoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Don't load if no GA ID or already loaded
    if (!GA_MEASUREMENT_ID || window.gtag) return;

    // Load after user interaction (indicates engagement)
    const loadOnInteraction = () => {
      setShouldLoad(true);
      // Remove listeners after first interaction
      removeListeners();
    };

    // Also load after 5 seconds as fallback
    const timeoutId = setTimeout(() => {
      setShouldLoad(true);
      removeListeners();
    }, 5000);

    // Add interaction listeners
    const events = ['scroll', 'click', 'keydown', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, loadOnInteraction, { passive: true, once: true });
    });

    const removeListeners = () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, loadOnInteraction);
      });
    };

    return removeListeners;
  }, []);

  if (!GA_MEASUREMENT_ID || !shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false, // Page views handled by PageViewTracker
          });`}
      </Script>
    </>
  );
}
