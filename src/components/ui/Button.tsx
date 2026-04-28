'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';

const buttonVariants = {
  primary: 'bg-accent text-white hover:bg-accent-hover shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]',
  secondary: 'bg-transparent text-accent border-2 border-accent hover:bg-accent/10',
  ghost: 'bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900',
  danger: 'bg-error text-white hover:bg-error/90',
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      children,
      onClick,
      href,
      external = false,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles = cn(
      // Base styles
      'inline-flex items-center justify-center gap-2',
      'font-semibold rounded-lg',
      'transition-all duration-150 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      // Active state
      'active:scale-[0.98]',
      // Variant styles
      buttonVariants[variant],
      // Size styles
      buttonSizes[size],
      // Full width
      fullWidth && 'w-full',
      // Disabled styles
      isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      // Custom className
      className
    );

    const content = (
      <>
        {loading && (
          <span
            data-testid="button-spinner"
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          />
        )}
        {children}
      </>
    );

    // Render as link if href is provided
    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseStyles}
            {...props}
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseStyles}
          {...props}
        >
          {content}
        </Link>
      );
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={baseStyles}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
