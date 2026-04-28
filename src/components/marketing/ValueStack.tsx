'use client';

import { forwardRef, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, ArrowRight, Sparkles, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ValueStackItem {
  title: string;
  value: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ValueStackProps {
  items: ValueStackItem[];
  totalValue: string;
  yourPrice: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const parseValue = (value: string): number => {
  // Remove non-numeric characters except decimal point
  const numeric = value.replace(/[^0-9.]/g, '');
  return parseFloat(numeric) || 0;
};

const formatSavings = (total: number, price: number): string => {
  const savings = total - price;
  if (savings >= 1000) {
    return `$${(savings / 1000).toFixed(1)}K`;
  }
  return `$${savings.toLocaleString()}`;
};

export const ValueStack = forwardRef<HTMLDivElement, ValueStackProps>(
  (
    {
      items,
      totalValue,
      yourPrice,
      title = 'Everything You Get',
      subtitle = 'All-inclusive package with lifetime access',
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    const totalNumeric = parseValue(totalValue);
    const priceNumeric = parseValue(yourPrice);
    const savings = formatSavings(totalNumeric, priceNumeric);
    const savingsPercentage = Math.round(((totalNumeric - priceNumeric) / totalNumeric) * 100);

    return (
      <div
        ref={(el) => {
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={cn(
          'bg-surface-glass backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-border-glass',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
            <Gift className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Complete Package</span>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">{title}</h3>
          <p className="text-text-secondary">{subtitle}</p>
        </div>

        {/* Stacked Items */}
        <div className="space-y-3 mb-8">
          {items.map((item, index) => {
            const Icon = item.icon || Package;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl',
                  'bg-background-secondary/50 border border-border-glass',
                  'hover:border-accent/20 transition-colors duration-200'
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-semibold text-text-primary truncate">{item.title}</h4>
                  <p className="text-sm text-text-tertiary truncate">{item.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-bold text-text-primary">{item.value}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Running Total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: items.length * 0.1 }}
          className="border-t border-border-glass pt-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-secondary">Total Value</span>
            <span className="text-2xl font-bold text-text-primary line-through decoration-error/50 decoration-2">
              {totalValue}
            </span>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-4">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 text-success rotate-90" />
            </motion.div>
          </div>

          {/* Your Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-semibold text-text-primary">Your Investment</span>
            </div>
            <span className="text-3xl font-bold text-gradient">{yourPrice}</span>
          </div>
        </motion.div>

        {/* Savings Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: items.length * 0.1 + 0.2 }}
          className="bg-gradient-to-r from-success/10 to-accent/10 rounded-xl p-4 border border-success/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">You Save</p>
              <p className="text-2xl font-bold text-success">{savings}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 bg-success text-white text-sm font-bold rounded-full">
                {savingsPercentage}% OFF
              </span>
            </div>
          </div>
        </motion.div>

        {/* Guarantee Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: items.length * 0.1 + 0.3 }}
          className="text-center text-sm text-text-tertiary mt-4"
        >
          Lifetime access • No recurring fees • All future updates included
        </motion.p>
      </div>
    );
  }
);

ValueStack.displayName = 'ValueStack';
