'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Brain, Network, Target, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CTATracker } from '../tracking/CTATracker';
import { useCTATracking } from '../tracking/useCTATracking';

export type ProductType = 'synaptica' | 'sophia' | 'aso';
export type ProductVariant = 'card' | 'inline' | 'banner' | 'compact';
export type ContentContext =
  | 'aso'
  | 'vvs'
  | 'llmo'
  | 'illusion'
  | 'general'
  | 'engineering'
  | 'governance';

interface ProductBridgeCTAProps {
  /** Product to promote */
  product?: ProductType;
  /** Visual variant */
  variant?: ProductVariant;
  /** Content context for automatic product selection */
  context?: ContentContext;
  /** Custom className */
  className?: string;
  /** Unique ID for tracking */
  trackingId?: string;
}

interface ProductConfig {
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  ctaText: string;
  features: string[];
  color: string;
}

const productConfigs: Record<ProductType, ProductConfig> = {
  synaptica: {
    name: 'SYNAPTICA',
    tagline: 'Enterprise AI Platform',
    description:
      'Multi-LLM orchestration with enterprise security. Build AI applications without the infrastructure headache.',
    icon: <Network className="w-5 h-5" />,
    href: '/platform/synaptica',
    ctaText: 'Explore SYNAPTICA',
    features: [
      'Multi-LLM routing',
      'Tenant isolation',
      'Enterprise security',
    ],
    color: 'accent',
  },
  sophia: {
    name: 'SOPHIA',
    tagline: 'Your AI Partner',
    description:
      'An AI system designed to work with you, not replace you. Governed by SOPHIA-CODE principles.',
    icon: <Brain className="w-5 h-5" />,
    href: '/sophia',
    ctaText: 'Meet SOPHIA',
    features: ['Human-in-the-loop', 'Transparent decisions', 'Audit trails'],
    color: 'accent-secondary',
  },
  aso: {
    name: 'ASO Platform',
    tagline: 'Adaptive Search Optimization',
    description:
      'Stop guessing what AI search engines want. Get data-driven insights and optimize for the new search.',
    icon: <Target className="w-5 h-5" />,
    href: '/aso',
    ctaText: 'See ASO Platform',
    features: ['VVS scoring', 'Intent mapping', 'Citation tracking'],
    color: 'accent',
  },
};

// Context-to-product mapping
const contextProductMap: Record<ContentContext, ProductType> = {
  aso: 'aso',
  vvs: 'aso',
  llmo: 'synaptica',
  illusion: 'synaptica',
  general: 'sophia',
  engineering: 'synaptica',
  governance: 'sophia',
};

/**
 * Context-aware product promotion CTA
 * Automatically selects the right product based on content type
 */
export function ProductBridgeCTA({
  product,
  variant = 'card',
  context = 'general',
  className,
  trackingId,
}: ProductBridgeCTAProps) {
  // Determine product based on context or explicit prop
  const selectedProduct = product || contextProductMap[context];
  const config = productConfigs[selectedProduct];
  const ctaId = trackingId || `product-bridge-${selectedProduct}-${variant}`;

  const { trackProductCTA } = useCTATracking();

  const handleClick = useCallback(() => {
    trackProductCTA({
      ctaType: 'product-bridge',
      ctaId,
      context: { product: selectedProduct, contentContext: context },
    });
  }, [ctaId, selectedProduct, context, trackProductCTA]);

  // Illusion hub special CTA
  if (context === 'illusion') {
    return (
      <CTATracker
        ctaType="product-bridge"
        ctaId={ctaId}
        context={{ product: selectedProduct, contentContext: context }}
        className={cn(className)}
      >
        <Card className="p-6 border-l-4 border-l-accent">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1 text-sm text-accent font-medium mb-2">
                <Sparkles className="w-4 h-4" />
                See How We Do It Differently
              </span>
              <h4 className="text-lg font-semibold text-text-primary mb-1">
                Transparency Isn&apos;t Just Talk Here
              </h4>
              <p className="text-sm text-text-secondary">
                We publish our architecture, our costs, and our limitations.
                Judge for yourself if we&apos;re building real AI or just another
                wrapper.
              </p>
            </div>
            <Button
              href="/architecture"
              onClick={handleClick}
              className="flex-shrink-0 group"
            >
              <Zap className="w-4 h-4" />
              View Our Stack
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </CTATracker>
    );
  }

  // Compact variant - minimal
  if (variant === 'compact') {
    return (
      <CTATracker
        ctaType="product-bridge"
        ctaId={ctaId}
        context={{ product: selectedProduct, contentContext: context }}
        className={cn(className)}
      >
        <a
          href={config.href}
          onClick={handleClick}
          className="flex items-center gap-3 p-4 bg-surface-glass border border-border-glass rounded-lg hover:border-accent/50 transition-colors group"
        >
          <div
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              config.color === 'accent'
                ? 'bg-accent/10 text-accent'
                : 'bg-accent-secondary/10 text-accent-secondary'
            )}
          >
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-text-primary text-sm">
              {config.name}
            </h4>
            <p className="text-xs text-text-tertiary truncate">
              {config.tagline}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all" />
        </a>
      </CTATracker>
    );
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <CTATracker
        ctaType="product-bridge"
        ctaId={ctaId}
        context={{ product: selectedProduct, contentContext: context }}
        className={cn(className)}
      >
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-accent/5 to-transparent border border-accent/10 rounded-lg">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
              config.color === 'accent'
                ? 'bg-accent/10 text-accent'
                : 'bg-accent-secondary/10 text-accent-secondary'
            )}
          >
            {config.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-text-primary">{config.name}</h4>
            <p className="text-sm text-text-secondary">{config.tagline}</p>
          </div>
          <Button
            href={config.href}
            onClick={handleClick}
            variant="secondary"
            size="sm"
          >
            {config.ctaText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CTATracker>
    );
  }

  // Banner variant
  if (variant === 'banner') {
    return (
      <CTATracker
        ctaType="product-bridge"
        ctaId={ctaId}
        context={{ product: selectedProduct, contentContext: context }}
        className={cn(className)}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl p-6 md:p-8',
            config.color === 'accent'
              ? 'bg-gradient-to-br from-accent/10 via-accent/5 to-accent-secondary/10 border border-accent/20'
              : 'bg-gradient-to-br from-accent-secondary/10 via-accent-secondary/5 to-accent/10 border border-accent-secondary/20'
          )}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0',
                config.color === 'accent'
                  ? 'bg-accent/10 text-accent'
                  : 'bg-accent-secondary/10 text-accent-secondary'
              )}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {config.icon}
              </motion.div>
            </div>
            <div className="flex-1">
              <span
                className={cn(
                  'inline-block text-xs font-medium uppercase tracking-wide mb-2',
                  config.color === 'accent' ? 'text-accent' : 'text-accent-secondary'
                )}
              >
                From the Blog to the Product
              </span>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {config.name}
              </h3>
              <p className="text-text-secondary max-w-lg mb-4">
                {config.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {config.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 text-xs text-text-tertiary bg-surface-glass px-2 py-1 rounded"
                  >
                    <Sparkles className="w-3 h-3" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <Button
              href={config.href}
              onClick={handleClick}
              className="flex-shrink-0 group"
            >
              {config.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Decorative glow */}
          <div
            className={cn(
              'absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2',
              config.color === 'accent' ? 'bg-accent/5' : 'bg-accent-secondary/5'
            )}
          />
        </div>
      </CTATracker>
    );
  }

  // Card variant (default)
  return (
    <CTATracker
      ctaType="product-bridge"
      ctaId={ctaId}
      context={{ product: selectedProduct, contentContext: context }}
      className={cn(className)}
    >
      <Card className="p-6 hover:border-accent/50 transition-colors">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
              config.color === 'accent'
                ? 'bg-accent/10 text-accent'
                : 'bg-accent-secondary/10 text-accent-secondary'
            )}
          >
            {config.icon}
          </div>
          <div className="flex-1">
            <span
              className={cn(
                'text-xs font-medium uppercase tracking-wide',
                config.color === 'accent' ? 'text-accent' : 'text-accent-secondary'
              )}
            >
              {config.tagline}
            </span>
            <h4 className="text-lg font-semibold text-text-primary mb-2">
              {config.name}
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
              {config.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </CTATracker>
  );
}

export default ProductBridgeCTA;
