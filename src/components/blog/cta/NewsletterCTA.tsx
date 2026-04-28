'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, AlertCircle, Sparkles, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CTATracker } from '../tracking/CTATracker';
import { useCTATracking } from '../tracking/useCTATracking';

export type NewsletterVariant = 'inline' | 'sidebar' | 'banner' | 'modal';
export type NewsletterTone = 'general' | 'technical' | 'skeptical';

interface NewsletterCTAProps {
  /** Visual variant */
  variant?: NewsletterVariant;
  /** Tone/headline style */
  tone?: NewsletterTone;
  /** Custom className */
  className?: string;
  /** Callback on successful signup */
  onSuccess?: (email: string) => void;
  /** Unique ID for tracking */
  trackingId?: string;
}

interface NewsletterContent {
  headline: string;
  subheadline: string;
  icon: React.ReactNode;
  badge?: string;
}

const contentMap: Record<NewsletterTone, NewsletterContent> = {
  general: {
    headline: 'Get AI Insights Weekly',
    subheadline: 'Join 2,000+ business leaders getting practical AI strategies without the hype.',
    icon: <Sparkles className="w-5 h-5" />,
    badge: 'Weekly Newsletter',
  },
  technical: {
    headline: 'Engineering Notes & Architecture Deep-Dives',
    subheadline: 'Technical write-ups on building multi-tenant AI systems, LLM orchestration, and cloud architecture decisions.',
    icon: <Zap className="w-5 h-5" />,
    badge: 'For Engineers',
  },
  skeptical: {
    headline: 'No BS. Just Receipts.',
    subheadline: 'We expose the AI industry\'s overpromises. Get the truth about costs, limitations, and what actually works.',
    icon: <Shield className="w-5 h-5" />,
    badge: 'Illusion Hub',
  },
};

const variantStyles: Record<NewsletterVariant, string> = {
  inline: 'p-6 md:p-8',
  sidebar: 'p-5',
  banner: 'p-6 md:p-8 lg:p-10',
  modal: 'p-8',
};

/**
 * Newsletter signup CTA with multiple variants and tones
 */
export function NewsletterCTA({
  variant = 'inline',
  tone = 'general',
  className,
  onSuccess,
  trackingId = 'newsletter',
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { trackNewsletterSignup } = useCTATracking();

  const content = contentMap[tone];
  const ctaId = `${trackingId}-${variant}-${tone}`;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateEmail(email)) {
        setStatus('error');
        setErrorMessage('Please enter a valid email address');
        trackNewsletterSignup(
          {
            ctaType: 'newsletter',
            ctaId,
            context: { variant, tone, error: 'invalid_email' },
          },
          false
        );
        return;
      }

      setStatus('loading');
      setErrorMessage('');

      try {
        // Simulate API call - replace with actual signup endpoint
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Success
        setStatus('success');
        trackNewsletterSignup(
          {
            ctaType: 'newsletter',
            ctaId,
            context: { variant, tone, email },
          },
          true
        );
        onSuccess?.(email);
      } catch {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
        trackNewsletterSignup(
          {
            ctaType: 'newsletter',
            ctaId,
            context: { variant, tone, error: 'api_error' },
          },
          false
        );
      }
    },
    [email, ctaId, variant, tone, onSuccess, trackNewsletterSignup]
  );

  const handleDismiss = () => {
    // Optional: handle dismiss action
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            disabled={status === 'loading' || status === 'success'}
            className={cn(
              'h-12',
              status === 'error' && 'border-error focus:border-error'
            )}
            aria-label="Email address"
          />
        </div>
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          loading={status === 'loading'}
          className="h-12 px-6 whitespace-nowrap"
        >
          {status === 'success' ? (
            <>
              <Check className="w-4 h-4" />
              Subscribed
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              Subscribe
            </>
          )}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-sm text-error"
          >
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="text-xs text-text-tertiary">
        We respect your privacy. Unsubscribe anytime. No spam, ever.
      </p>
    </form>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6"
    >
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-success" />
      </div>
      <h4 className="text-lg font-semibold text-text-primary mb-2">
        You&apos;re in!
      </h4>
      <p className="text-text-secondary">
        Check your inbox for a confirmation email.
      </p>
    </motion.div>
  );

  // Banner variant - full width with gradient
  if (variant === 'banner') {
    return (
      <CTATracker
        ctaType="newsletter"
        ctaId={ctaId}
        context={{ variant, tone }}
        className={cn('w-full', className)}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-accent-secondary/10 border border-accent/20">
          <div className="relative z-10 p-6 md:p-8 lg:p-10">
            <div className="max-w-2xl mx-auto text-center">
              {content.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
                  {content.icon}
                  {content.badge}
                </span>
              )}
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                {content.headline}
              </h3>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                {content.subheadline}
              </p>
              {status === 'success' ? renderSuccess() : renderForm()}
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
      </CTATracker>
    );
  }

  // Modal variant - centered with overlay styling
  if (variant === 'modal') {
    return (
      <CTATracker
        ctaType="newsletter"
        ctaId={ctaId}
        context={{ variant, tone }}
        isModal
        className={cn('w-full max-w-md mx-auto', className)}
      >
        <Card className={cn(variantStyles[variant], 'text-center')}>
          {content.badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
              {content.icon}
              {content.badge}
            </span>
          )}
          <h3 className="text-2xl font-bold text-text-primary mb-3">
            {content.headline}
          </h3>
          <p className="text-text-secondary mb-6">
            {content.subheadline}
          </p>
          {status === 'success' ? renderSuccess() : renderForm()}
        </Card>
      </CTATracker>
    );
  }

  // Inline and Sidebar variants
  return (
    <CTATracker
      ctaType="newsletter"
      ctaId={ctaId}
      context={{ variant, tone }}
      className={cn(className)}
    >
      <Card className={cn(variantStyles[variant])}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <div>
            {content.badge && (
              <span className="text-xs text-accent font-medium uppercase tracking-wide">
                {content.badge}
              </span>
            )}
            <h3 className="text-lg font-semibold text-text-primary">
              {content.headline}
            </h3>
          </div>
        </div>
        <p className="text-text-secondary text-sm mb-4">
          {content.subheadline}
        </p>
        {status === 'success' ? renderSuccess() : renderForm()}
      </Card>
    </CTATracker>
  );
}

export default NewsletterCTA;
