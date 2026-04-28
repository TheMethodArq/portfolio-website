'use client';

import { useCallback } from 'react';
import {
  Microscope,
  Wallet,
  Layers,
  Receipt,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CTATracker } from '../tracking/CTATracker';
import { useCTATracking } from '../tracking/useCTATracking';

export type TransparencyType =
  | 'methodology'
  | 'pricing'
  | 'stack'
  | 'receipts'
  | 'human-chat';

interface TransparencyCTAProps {
  /** Type of transparency CTA */
  type: TransparencyType;
  /** Visual variant */
  variant?: 'card' | 'inline' | 'banner' | 'button';
  /** Custom className */
  className?: string;
  /** Unique ID for tracking */
  trackingId?: string;
}

interface TransparencyConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  buttonText: string;
  badge?: string;
}

const transparencyConfigs: Record<TransparencyType, TransparencyConfig> = {
  methodology: {
    title: 'See Our Research Methodology',
    description:
      'How we verify claims, run experiments, and ensure our exposés are accurate and fair.',
    icon: <Microscope className="w-5 h-5" />,
    href: '/evidence/methodology',
    buttonText: 'View Methodology',
    badge: 'Radical Transparency',
  },
  pricing: {
    title: 'See Our Actual Pricing (No BS)',
    description:
      'Full pricing breakdown. No "contact sales" games. See exactly what you pay and why.',
    icon: <Wallet className="w-5 h-5" />,
    href: '/platform/pricing',
    buttonText: 'View Pricing',
    badge: 'No Hidden Fees',
  },
  stack: {
    title: 'See Our Tech Stack & Costs',
    description:
      'We publish our entire architecture, vendor costs, and infrastructure decisions.',
    icon: <Layers className="w-5 h-5" />,
    href: '/architecture',
    buttonText: 'View Architecture',
    badge: 'Open Source Stack',
  },
  receipts: {
    title: 'See The Receipts (Cost Breakdown)',
    description:
      'Detailed cost analysis of building vs buying AI. Real numbers, real vendors, real breakdowns.',
    icon: <Receipt className="w-5 h-5" />,
    href: '/evidence/ad-waste',
    buttonText: 'See The Numbers',
    badge: 'Verified Data',
  },
  'human-chat': {
    title: 'Talk to a Human (Not Sales)',
    description:
      'No SDR screening. No qualification calls. Book time directly with our engineering team.',
    icon: <MessageCircle className="w-5 h-5" />,
    href: '/contact',
    buttonText: 'Schedule a Call',
    badge: 'Engineer-to-Engineer',
  },
};

/**
 * Transparency CTA for Illusion hub exposé articles
 * Builds trust through radical transparency
 */
export function TransparencyCTA({
  type,
  variant = 'card',
  className,
  trackingId,
}: TransparencyCTAProps) {
  const config = transparencyConfigs[type];
  const ctaId = trackingId || `transparency-${type}-${variant}`;

  const { trackTransparencyClick } = useCTATracking();

  const handleClick = useCallback(() => {
    trackTransparencyClick({
      ctaType: 'transparency',
      ctaId,
      context: { transparencyType: type },
    });
  }, [ctaId, type, trackTransparencyClick]);

  // Button variant - minimal
  if (variant === 'button') {
    return (
      <CTATracker
        ctaType="transparency"
        ctaId={ctaId}
        context={{ transparencyType: type }}
        className={cn(className)}
      >
        <Button
          href={config.href}
          onClick={handleClick}
          variant="ghost"
          size="sm"
          className="text-accent hover:text-accent-hover"
        >
          <Eye className="w-4 h-4" />
          {config.title}
          <ExternalLink className="w-3 h-3" />
        </Button>
      </CTATracker>
    );
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <CTATracker
        ctaType="transparency"
        ctaId={ctaId}
        context={{ transparencyType: type }}
        className={cn(className)}
      >
        <div className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/10 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {config.title}
            </p>
          </div>
          <a
            href={config.href}
            onClick={handleClick}
            className="text-sm text-accent hover:text-accent-hover flex items-center gap-1 flex-shrink-0"
          >
            {config.buttonText}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </CTATracker>
    );
  }

  // Banner variant
  if (variant === 'banner') {
    return (
      <CTATracker
        ctaType="transparency"
        ctaId={ctaId}
        context={{ transparencyType: type }}
        className={cn(className)}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-accent-secondary/5 border border-accent/20 p-6 md:p-8">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              {config.icon}
            </div>
            <div className="flex-1">
              {config.badge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-medium mb-2">
                  <Eye className="w-3 h-3" />
                  {config.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {config.title}
              </h3>
              <p className="text-text-secondary">{config.description}</p>
            </div>
            <Button
              href={config.href}
              onClick={handleClick}
              className="flex-shrink-0 group"
            >
              {config.buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
      </CTATracker>
    );
  }

  // Card variant (default)
  return (
    <CTATracker
      ctaType="transparency"
      ctaId={ctaId}
      context={{ transparencyType: type }}
      className={cn(className)}
    >
      <Card className="p-6 border-l-4 border-l-accent hover:border-accent/50 transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            {config.icon}
          </div>
          <div className="flex-1">
            {config.badge && (
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium mb-1">
                <Eye className="w-3 h-3" />
                {config.badge}
              </span>
            )}
            <h4 className="text-lg font-semibold text-text-primary mb-2">
              {config.title}
            </h4>
            <p className="text-sm text-text-secondary mb-4">
              {config.description}
            </p>
            <Button
              href={config.href}
              onClick={handleClick}
              variant="secondary"
              size="sm"
              className="group"
            >
              {config.buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </CTATracker>
  );
}

export default TransparencyCTA;
