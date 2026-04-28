'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingBadge {
  text: string;
  variant: 'default' | 'success' | 'warning' | 'error';
}

export interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  cta: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  badges?: PricingBadge[];
  highlighted?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const badgeVariants = {
  default: 'bg-background-secondary text-text-secondary border-border-glass',
  success: 'bg-success/10 text-success border-success/25',
  warning: 'bg-warning/10 text-warning border-warning/25',
  error: 'bg-error/10 text-error border-error/25',
};

const ctaVariants = {
  primary: 'btn-light-primary text-white',
  secondary: 'btn-light-secondary text-accent-secondary',
};

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      name,
      price,
      period = '/month',
      description,
      features,
      cta,
      badges,
      highlighted = false,
      footer,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={highlighted ? { y: -8 } : { y: -4 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'relative flex flex-col rounded-2xl p-6 md:p-8',
          'bg-surface-glass backdrop-blur-xl',
          'border transition-all duration-300',
          highlighted
            ? 'border-accent/30 shadow-[0_8px_30px_rgba(37,99,235,0.15)] scale-[1.02]'
            : 'border-border-glass hover:border-border-glass-hover shadow-card-light',
          className
        )}
        {...props}
      >
        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={cn(
                  'inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border',
                  badgeVariants[badge.variant]
                )}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {/* Plan Name */}
        <h3 className="text-xl font-bold text-text-primary mb-2">{name}</h3>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-6">{description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-bold text-text-primary">{price}</span>
          <span className="text-text-tertiary">{period}</span>
        </div>

        {/* CTA Button */}
        <Link
          href={cta.href}
          className={cn(
            'inline-flex items-center justify-center w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 mb-6',
            ctaVariants[cta.variant || 'primary']
          )}
        >
          {cta.label}
        </Link>

        {/* Divider */}
        <div className="border-t border-border-glass my-4" />

        {/* Features */}
        <ul className="space-y-3 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                className={cn(
                  'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                  feature.included
                    ? 'bg-success/10 text-success'
                    : 'bg-text-disabled/20 text-text-disabled'
                )}
              >
                {feature.included ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <X className="w-3 h-3" />
                )}
              </span>
              <span
                className={cn(
                  'text-sm',
                  feature.included ? 'text-text-secondary' : 'text-text-disabled'
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        {footer && (
          <>
            <div className="border-t border-border-glass my-4" />
            <div className="text-sm text-text-tertiary">{footer}</div>
          </>
        )}
      </motion.div>
    );
  }
);

PricingCard.displayName = 'PricingCard';
