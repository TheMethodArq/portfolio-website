'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CTATracker } from '../tracking/CTATracker';
import { useCTATracking } from '../tracking/useCTATracking';
import { useEngagementTime } from '../hooks/useEngagementTime';

export type FooterCTAType = 'newsletter' | 'product' | 'custom';

export interface StickyFooterProps {
  /** Type of CTA to display */
  ctaType?: FooterCTAType;
  /** Custom CTA button text */
  buttonText?: string;
  /** Custom CTA href */
  buttonHref?: string;
  /** Custom headline */
  headline?: string;
  /** Custom subheadline */
  subheadline?: string;
  /** Delay before showing (ms) */
  delay?: number;
  /** Scroll threshold to show (0-1) */
  scrollThreshold?: number;
  /** Whether to show newsletter form */
  showNewsletter?: boolean;
  /** Custom className */
  className?: string;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Unique ID for tracking */
  trackingId?: string;
}

/**
 * Mobile sticky footer with newsletter signup or CTA button
 * Dismissible and respects user engagement
 */
export function StickyFooter({
  ctaType = 'newsletter',
  buttonText = 'Learn More',
  buttonHref = '/beta',
  headline,
  subheadline,
  delay = 5000,
  scrollThreshold = 0.3,
  showNewsletter = true,
  className,
  onDismiss,
  trackingId = 'sticky-footer',
}: StickyFooterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success'>('idle');

  const { engagementTime, isDeepEngagement } = useEngagementTime();
  const { trackNewsletterSignup, trackClick, trackDismiss } = useCTATracking();

  // Check localStorage for previous dismissal
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const dismissed = localStorage.getItem(`sticky-footer-${trackingId}-dismissed`);
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Reset after 24 hours
      if (Date.now() - dismissedTime > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(`sticky-footer-${trackingId}-dismissed`);
      } else {
        setIsDismissed(true);
      }
    }
  }, [trackingId]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Show after delay and scroll threshold
  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);

      if (scrollPercent >= scrollThreshold) {
        // Wait for delay before showing
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, delay);

        window.removeEventListener('scroll', handleScroll);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [delay, scrollThreshold, isDismissed]);

  // Also show after deep engagement
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isDismissed || isVisible) return;

    if (isDeepEngagement && engagementTime > 60) {
      setIsVisible(true);
    }
  }, [isDeepEngagement, engagementTime, isDismissed, isVisible]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem(
      `sticky-footer-${trackingId}-dismissed`,
      Date.now().toString()
    );
    trackDismiss({
      ctaType: 'sticky-footer',
      ctaId: trackingId,
      context: { ctaType, engagementTime },
    });
    onDismiss?.();
  }, [trackingId, ctaType, engagementTime, trackDismiss, onDismiss]);

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !email.includes('@')) return;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setEmailStatus('success');
      trackNewsletterSignup(
        {
          ctaType: 'sticky-footer',
          ctaId: `${trackingId}-newsletter`,
          context: { email, engagementTime },
        },
        true
      );

      // Hide after success
      setTimeout(() => {
        handleDismiss();
      }, 2000);
    },
    [email, engagementTime, trackingId, trackNewsletterSignup, handleDismiss]
  );

  const handleCTAClick = useCallback(() => {
    trackClick({
      ctaType: 'sticky-footer',
      ctaId: trackingId,
      context: { ctaType, buttonHref, engagementTime },
    });
  }, [ctaType, buttonHref, engagementTime, trackingId, trackClick]);

  const displayHeadline = headline || (
    ctaType === 'newsletter'
      ? 'Get AI Insights Weekly'
      : 'Ready to Transform Your Business?'
  );

  const displaySubheadline = subheadline || (
    ctaType === 'newsletter'
      ? 'Join 2,000+ business leaders'
      : 'See how Thalamus AI can help'
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <CTATracker
          ctaType="sticky-footer"
          ctaId={trackingId}
          context={{ ctaType, engagementTime }}
          className={cn('lg:hidden', className)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border-glass shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
          >
            <div className="px-4 py-3">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {emailStatus === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-2"
                    >
                      <p className="text-sm font-medium text-success">
                        You&apos;re subscribed! ✓
                      </p>
                    </motion.div>
                  ) : showNewsletter && ctaType === 'newsletter' ? (
                    <form onSubmit={handleEmailSubmit} className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {displayHeadline}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {displaySubheadline}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-9 text-sm flex-1"
                          required
                        />
                        <Button
                          type="submit"
                          size="sm"
                          className="h-9 px-3"
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {displayHeadline}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {displaySubheadline}
                        </p>
                      </div>
                      <Button
                        href={buttonHref}
                        onClick={handleCTAClick}
                        size="sm"
                        className="flex-shrink-0"
                      >
                        {buttonText}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Dismiss button */}
                <button
                  onClick={handleDismiss}
                  className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-glass transition-colors flex-shrink-0"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Safe area padding for mobile */}
            <div className="h-safe-area-inset-bottom bg-background" />
          </motion.div>
        </CTATracker>
      )}
    </AnimatePresence>
  );
}

export default StickyFooter;
