// Type definitions for Shawn Sloan's site

import type { ReactNode } from 'react';

// ============================================
// UI Component Types
// ============================================

export interface ButtonProps {
  children?: ReactNode;
  href?: string;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

export interface CardProps {
  children?: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export interface BadgeProps {
  status?: ProductStatus | IndustryStatus;
  className?: string;
  label?: string;
}

export type ProductStatus = 'production' | 'beta' | 'development' | 'community' | 'researching' | 'coming-soon';
export type IndustryStatus = 'active' | 'exploring' | 'planned';

export interface SectionProps {
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

export interface ContainerProps {
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ============================================
// Form Types
// ============================================

export interface ApplicationData {
  fullName: string;
  email: string;
  companyName: string;
  companyWebsite: string;
  industry: string;
  revenueRange: string;
  monthlyMarketingSpend: string;
  whyJoin: string;
  linkedInProfile?: string;
  biggestChallenge?: string;
  willingCaseStudy?: 'yes' | 'no' | 'maybe';
  howDidYouHear?: string;
}

export interface ApplicationFormProps {
  onSubmit: (data: ApplicationData) => Promise<void>;
  programName: string;
}
