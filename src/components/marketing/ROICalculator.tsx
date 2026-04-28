'use client';

import { forwardRef, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ROICalculatorProps {
  initialInvestment: number;
  monthlyValue: number;
  timeframeMonths: number;
  showComparison?: boolean;
  comparisonLabel?: string;
  comparisonMonthlyCost?: number;
  className?: string;
}

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

const AnimatedNumber = forwardRef<HTMLSpanElement, AnimatedNumberProps>(
  ({ value, prefix = '', suffix = '', duration = 1.5, className }, ref) => {
    const [displayValue, setDisplayValue] = useState(0);
    const numberRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(numberRef, { once: true, margin: '-50px' });
    const hasAnimated = useRef(false);

    useEffect(() => {
      if (!isInView || hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = Date.now();
      const endValue = value;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(easeOut * endValue);

        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    const formatNumber = (num: number): string => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toLocaleString();
    };

    return (
      <span ref={numberRef} className={className}>
        {prefix}
        {formatNumber(displayValue)}
        {suffix}
      </span>
    );
  }
);

AnimatedNumber.displayName = 'AnimatedNumber';

export const ROICalculator = forwardRef<HTMLDivElement, ROICalculatorProps>(
  (
    {
      initialInvestment,
      monthlyValue,
      timeframeMonths,
      showComparison = false,
      comparisonLabel = 'Traditional Agency',
      comparisonMonthlyCost = 0,
      className,
      ...props
    },
    ref
  ) => {
    const totalValue = monthlyValue * timeframeMonths;
    const netROI = totalValue - initialInvestment;
    const roiPercentage = (netROI / initialInvestment) * 100;
    const breakEvenMonths = Math.ceil(initialInvestment / monthlyValue);
    const monthlySavings = comparisonMonthlyCost > 0 ? comparisonMonthlyCost - monthlyValue : 0;
    const totalSavings = monthlySavings * timeframeMonths;

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
      <div
        ref={(el) => {
          // Handle both refs
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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-text-primary">ROI Calculator</h3>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-background-secondary/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
              <DollarSign className="w-4 h-4" />
              <span>Total Value</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">
              <AnimatedNumber value={totalValue} prefix="$" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-background-secondary/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Net ROI</span>
            </div>
            <div className="text-2xl font-bold text-success">
              <AnimatedNumber value={netROI} prefix="$" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-background-secondary/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
              <Clock className="w-4 h-4" />
              <span>Break Even</span>
            </div>
            <div className="text-2xl font-bold text-accent-secondary">
              {breakEvenMonths} {breakEvenMonths === 1 ? 'month' : 'months'}
            </div>
          </motion.div>
        </div>

        {/* ROI Percentage Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 origin-left"
        >
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary">Return on Investment</span>
            <span className="font-semibold text-success">+{roiPercentage.toFixed(0)}%</span>
          </div>
          <div className="h-3 bg-background-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${Math.min(roiPercentage, 100)}%` } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full"
            />
          </div>
        </motion.div>

        {/* Comparison */}
        {showComparison && comparisonMonthlyCost > 0 && monthlySavings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border-t border-border-glass pt-6"
          >
            <h4 className="text-sm font-semibold text-text-secondary mb-4">
              vs {comparisonLabel}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-background-secondary/30 rounded-xl">
                <div className="text-text-tertiary text-sm mb-1">Monthly Savings</div>
                <div className="text-xl font-bold text-success">
                  <AnimatedNumber value={monthlySavings} prefix="$" />
                </div>
              </div>
              <div className="text-center p-4 bg-background-secondary/30 rounded-xl">
                <div className="text-text-tertiary text-sm mb-1">Total Savings ({timeframeMonths} mo)</div>
                <div className="text-xl font-bold text-success">
                  <AnimatedNumber value={totalSavings} prefix="$" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Investment Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 p-4 bg-accent/5 rounded-xl border border-accent/10"
        >
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-sm">Initial Investment</span>
            <span className="text-text-primary font-semibold">
              ${initialInvestment.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-text-secondary text-sm">Timeframe</span>
            <span className="text-text-primary font-semibold">
              {timeframeMonths} {timeframeMonths === 1 ? 'month' : 'months'}
            </span>
          </div>
        </motion.div>
      </div>
    );
  }
);

ROICalculator.displayName = 'ROICalculator';
