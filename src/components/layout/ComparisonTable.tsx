'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

export interface ComparisonFeature {
  /** The feature name (row label) */
  name: string;
  /** The value to display - can be ReactNode or boolean */
  value: React.ReactNode;
  /** Whether this feature is included (controls check/X icon) */
  included?: boolean;
}

export interface ComparisonColumn {
  /** Column header name */
  name: string;
  /** Array of features for this column */
  features: ComparisonFeature[];
  /** Optional price display */
  price?: string;
  /** Optional CTA button configuration */
  cta?: {
    label: string;
    href: string;
  };
  /** Whether to highlight this column (adds border/shadow emphasis) */
  highlighted?: boolean;
}

export interface ComparisonTableProps {
  /** Array of column configurations */
  columns: ComparisonColumn[];
  /** Whether to enable sticky header on scroll */
  stickyHeader?: boolean;
  /** Optional className for the container */
  className?: string;
  /** Optional caption for the table (for accessibility) */
  caption?: string;
}

// ============================================
// COMPONENT
// ============================================

/**
 * ComparisonTable - A responsive table for comparing products, tiers, or offers.
 * 
 * Features:
 * - Responsive horizontal scroll on mobile
 * - Highlighted column emphasis with border/shadow
 * - Automatic Check/X icons for boolean values
 * - Optional sticky header on scroll
 * - Feature row labels in the first column
 * - CTA buttons in column footers
 * - Card view alternative for mobile screens
 * 
 * @example
 * ```tsx
 * <ComparisonTable
 *   columns={[
 *     {
 *       name: 'Foundation',
 *       price: '$199/mo',
 *       features: [
 *         { name: 'VVS Tracking', value: true, included: true },
 *         { name: 'Keywords', value: '50' },
 *       ],
 *       cta: { label: 'Start Trial', href: '/contact' },
 *     },
 *     {
 *       name: 'Accelerate',
 *       price: '$499/mo',
 *       highlighted: true,
 *       features: [
 *         { name: 'VVS Tracking', value: true, included: true },
 *         { name: 'Keywords', value: '200' },
 *       ],
 *       cta: { label: 'Start Trial', href: '/contact' },
 *     },
 *   ]}
 *   stickyHeader
 * />
 * ```
 */
export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(
  ({ columns, stickyHeader = false, className, caption }, ref) => {
    // Get all unique feature names from the first column (assumes consistent ordering)
    const featureNames = columns[0]?.features.map((f) => f.name) ?? [];

    /**
     * Renders a cell value - either a checkmark, x mark, or the actual value
     */
    const renderValue = (value: React.ReactNode, included?: boolean) => {
      // If it's a boolean or included is explicitly set, show icons
      if (typeof value === 'boolean' || included !== undefined) {
        const isIncluded = included ?? value === true;
        return isIncluded ? (
          <Check
            className="w-5 h-5 text-success mx-auto"
            aria-label="Included"
            strokeWidth={2.5}
          />
        ) : (
          <X
            className="w-5 h-5 text-text-tertiary mx-auto"
            aria-label="Not included"
            strokeWidth={2}
          />
        );
      }
      return <span className="text-text-secondary">{value}</span>;
    };

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        role="region"
        aria-label="Comparison table"
      >
        {/* Desktop Table View - Hidden on small screens */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full border-collapse" role="table">
            {caption && <caption className="sr-only">{caption}</caption>}
            {/* Table Header */}
            <thead
              className={cn(
                'bg-background-secondary',
                stickyHeader && 'sticky top-0 z-10'
              )}
              role="rowgroup"
            >
              <tr role="row">
                {/* Empty corner cell */}
                <th
                  className="p-4 text-left text-text-secondary font-medium border-b border-border-light min-w-[160px]"
                  scope="col"
                  role="columnheader"
                >
                  Features
                </th>
                {/* Column headers */}
                {columns.map((column, index) => (
                  <th
                    key={`header-${index}`}
                    className={cn(
                      'p-4 text-center border-b min-w-[140px]',
                      column.highlighted
                        ? 'border-accent bg-surface-elevated'
                        : 'border-border-light'
                    )}
                    scope="col"
                    role="columnheader"
                  >
                    <div className="space-y-2">
                      <span
                        className={cn(
                          'block font-semibold text-lg',
                          column.highlighted
                            ? 'text-accent'
                            : 'text-text-primary'
                        )}
                      >
                        {column.name}
                      </span>
                      {column.price && (
                        <span className="block text-text-secondary text-sm">
                          {column.price}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody role="rowgroup">
              {featureNames.map((featureName, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className={cn(
                    'border-b border-border-light',
                    rowIndex % 2 === 0 ? 'bg-background' : 'bg-background-secondary/50'
                  )}
                  role="row"
                >
                  {/* Feature name cell */}
                  <td
                    className="p-4 text-left text-text-primary font-medium"
                    role="cell"
                  >
                    {featureName}
                  </td>
                  {/* Feature values for each column */}
                  {columns.map((column, colIndex) => {
                    const feature = column.features[rowIndex];
                    return (
                      <td
                        key={`cell-${rowIndex}-${colIndex}`}
                        className={cn(
                          'p-4 text-center',
                          column.highlighted && 'bg-surface-elevated/50'
                        )}
                        role="cell"
                      >
                        {feature
                          ? renderValue(feature.value, feature.included)
                          : '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            {/* Table Footer with CTAs */}
            <tfoot role="rowgroup">
              <tr role="row">
                {/* Empty corner cell */}
                <td
                  className="p-4 border-t border-border-light"
                  role="cell"
                />
                {/* CTA buttons */}
                {columns.map((column, index) => (
                  <td
                    key={`cta-${index}`}
                    className={cn(
                      'p-4 text-center border-t',
                      column.highlighted
                        ? 'border-accent bg-surface-elevated'
                        : 'border-border-light'
                    )}
                    role="cell"
                  >
                    {column.cta ? (
                      <Link
                        href={column.cta.href}
                        className={cn(
                          'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                          column.highlighted
                            ? 'bg-accent text-white hover:bg-accent-hover shadow-sm'
                            : 'bg-transparent text-accent border-2 border-accent hover:bg-accent/5'
                        )}
                      >
                        {column.cta.label}
                      </Link>
                    ) : (
                      <span className="text-text-disabled">-</span>
                    )}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Card View - Visible only on small screens */}
        <div className="sm:hidden space-y-6">
          {columns.map((column, colIndex) => (
            <div
              key={`mobile-col-${colIndex}`}
              className={cn(
                'rounded-xl overflow-hidden',
                'bg-surface-glass backdrop-blur-sm',
                'border',
                column.highlighted
                  ? 'border-accent shadow-glow'
                  : 'border-border-glass'
              )}
            >
              {/* Card Header */}
              <div
                className={cn(
                  'p-4 border-b',
                  column.highlighted
                    ? 'border-accent/30 bg-accent/5'
                    : 'border-border-light bg-background-secondary'
                )}
              >
                <h3
                  className={cn(
                    'font-semibold text-lg',
                    column.highlighted ? 'text-accent' : 'text-text-primary'
                  )}
                >
                  {column.name}
                </h3>
                {column.price && (
                  <p className="text-text-secondary text-sm mt-1">
                    {column.price}
                  </p>
                )}
              </div>

              {/* Card Body - Feature List */}
              <div className="p-4 space-y-3">
                {column.features.map((feature, featureIndex) => (
                  <div
                    key={`mobile-feature-${colIndex}-${featureIndex}`}
                    className="flex items-center justify-between py-2 border-b border-border-light/50 last:border-0"
                  >
                    <span className="text-text-secondary text-sm">
                      {feature.name}
                    </span>
                    <span className="ml-4">
                      {renderValue(feature.value, feature.included)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Footer - CTA */}
              {column.cta && (
                <div
                  className={cn(
                    'p-4 border-t',
                    column.highlighted
                      ? 'border-accent/30'
                      : 'border-border-light'
                  )}
                >
                  <Link
                    href={column.cta.href}
                    className={cn(
                      'flex items-center justify-center w-full px-4 py-3 rounded-lg font-medium transition-all duration-200',
                      column.highlighted
                        ? 'bg-accent text-white hover:bg-accent-hover'
                        : 'bg-transparent text-accent border-2 border-accent hover:bg-accent/5'
                    )}
                  >
                    {column.cta.label}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ComparisonTable.displayName = 'ComparisonTable';
