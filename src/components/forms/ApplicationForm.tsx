'use client';

import { useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select, type SelectOption } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ApplicationData, ApplicationFormProps } from '@/types';

// ============================================
// CONSTANTS & OPTIONS
// ============================================

const INDUSTRY_OPTIONS: SelectOption[] = [
  { value: 'saas', label: 'SaaS / Technology' },
  { value: 'ecommerce', label: 'E-commerce / Retail' },
  { value: 'healthcare', label: 'Healthcare / Medical' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'realestate', label: 'Real Estate' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'consulting', label: 'Consulting / Professional Services' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'education', label: 'Education' },
  { value: 'hospitality', label: 'Hospitality / Travel' },
  { value: 'nonprofit', label: 'Non-profit' },
  { value: 'other', label: 'Other' },
];

const REVENUE_OPTIONS: SelectOption[] = [
  { value: '<500k', label: 'Under $500K' },
  { value: '500k-1m', label: '$500K - $1M' },
  { value: '1m-5m', label: '$1M - $5M' },
  { value: '5m-10m', label: '$5M - $10M' },
  { value: '10m-50m', label: '$10M - $50M' },
  { value: '50m+', label: '$50M+' },
];

const MARKETING_SPEND_OPTIONS: SelectOption[] = [
  { value: '<1k', label: 'Under $1K' },
  { value: '1k-5k', label: '$1K - $5K' },
  { value: '5k-10k', label: '$5K - $10K' },
  { value: '10k-25k', label: '$10K - $25K' },
  { value: '25k+', label: '$25K+' },
];

const CASE_STUDY_OPTIONS: SelectOption[] = [
  { value: 'yes', label: 'Yes, absolutely' },
  { value: 'no', label: 'No, prefer to stay private' },
  { value: 'maybe', label: 'Maybe, let\'s discuss' },
];

// ============================================
// VALIDATION
// ============================================

interface ValidationErrors {
  [key: string]: string | undefined;
}

function validateApplicationData(data: Partial<ApplicationData>): ValidationErrors {
  const errors: ValidationErrors = {};

  // Required fields
  if (!data.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Name must be at least 2 characters';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.companyName?.trim()) {
    errors.companyName = 'Company name is required';
  }

  if (!data.companyWebsite?.trim()) {
    errors.companyWebsite = 'Company website is required';
  } else {
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/;
    if (!urlPattern.test(data.companyWebsite)) {
      errors.companyWebsite = 'Please enter a valid URL (e.g., https://example.com)';
    }
  }

  if (!data.industry) {
    errors.industry = 'Please select an industry';
  }

  if (!data.revenueRange) {
    errors.revenueRange = 'Please select a revenue range';
  }

  if (!data.monthlyMarketingSpend) {
    errors.monthlyMarketingSpend = 'Please select your monthly marketing spend';
  }

  if (!data.whyJoin?.trim()) {
    errors.whyJoin = 'Please tell us why you want to join';
  } else if (data.whyJoin.trim().length < 100) {
    errors.whyJoin = 'Please provide at least 100 characters';
  }

  // Optional fields - validate format only if provided
  if (data.linkedInProfile?.trim()) {
    const linkedinPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/;
    if (!linkedinPattern.test(data.linkedInProfile)) {
      errors.linkedInProfile = 'Please enter a valid LinkedIn URL';
    }
  }

  return errors;
}

// ============================================
// FORM FIELD COMPONENTS
// ============================================

interface RadioGroupProps {
  label: string;
  name: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
}: RadioGroupProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text-secondary mb-3">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all',
              'border border-border-glass hover:bg-surface-glass',
              value === option.value && 'bg-accent/5 border-accent'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-accent border-border-glass focus:ring-accent"
            />
            <span className="text-text-primary">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
  );
}

// ============================================
// PROGRESS INDICATOR
// ============================================

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-text-secondary mb-2">
        <span>Progress</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="h-2 bg-surface-glass rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ============================================
// SUCCESS STATE
// ============================================

function SuccessState({ programName }: { programName: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-success" />
      </div>
      <h3 className="text-2xl font-bold text-text-primary mb-4">
        Application Submitted!
      </h3>
      <p className="text-text-secondary max-w-md mx-auto mb-6">
        Thanks for applying to the {programName}. We review applications within 48 hours. 
        You&apos;ll hear from us either way.
      </p>
      <div className="text-sm text-text-tertiary">
        <p>What happens next:</p>
        <ol className="mt-2 space-y-1">
          <li>1. We review your application (within 48 hours)</li>
          <li>2. If selected, we schedule a 30-minute interview</li>
          <li>3. If it&apos;s a mutual fit, we send terms and onboarding</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// ERROR STATE
// ============================================

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 mx-auto mb-4 bg-error/10 rounded-full flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        Something went wrong
      </h3>
      <p className="text-text-secondary mb-4">{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function ApplicationForm({ onSubmit, programName }: ApplicationFormProps) {
  const [formData, setFormData] = useState<Partial<ApplicationData>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = useCallback(<K extends keyof ApplicationData>(
    field: K,
    value: ApplicationData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const calculateProgress = useCallback(() => {
    const requiredFields: (keyof ApplicationData)[] = [
      'fullName', 'email', 'companyName', 'companyWebsite',
      'industry', 'revenueRange', 'monthlyMarketingSpend', 'whyJoin'
    ];
    const filledFields = requiredFields.filter(field => {
      const value = formData[field];
      return value && value.toString().trim().length > 0;
    });
    return filledFields.length;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const validationErrors = validateApplicationData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData as ApplicationData);
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to submit application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessState programName={programName} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <ProgressIndicator 
        currentStep={calculateProgress()} 
        totalSteps={8} 
      />

      {submitError && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <ErrorState 
            message={submitError} 
            onRetry={() => setSubmitError(null)} 
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Required Fields */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Required Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="fullName"
              label="Full Name"
              placeholder="John Doe"
              value={formData.fullName || ''}
              onChange={(e) => updateField('fullName', e.target.value)}
              error={errors.fullName}
              required
            />

            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="john@company.com"
              value={formData.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="companyName"
              label="Company Name"
              placeholder="Acme Inc."
              value={formData.companyName || ''}
              onChange={(e) => updateField('companyName', e.target.value)}
              error={errors.companyName}
              required
            />

            <Input
              id="companyWebsite"
              label="Company Website"
              type="url"
              placeholder="https://example.com"
              value={formData.companyWebsite || ''}
              onChange={(e) => updateField('companyWebsite', e.target.value)}
              error={errors.companyWebsite}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="industry"
              label="Industry"
              options={INDUSTRY_OPTIONS}
              value={formData.industry || ''}
              onChange={(e) => updateField('industry', e.target.value)}
              error={errors.industry}
              placeholder="Select your industry"
              required
            />

            <Select
              id="revenueRange"
              label="Approximate Revenue Range"
              options={REVENUE_OPTIONS}
              value={formData.revenueRange || ''}
              onChange={(e) => updateField('revenueRange', e.target.value)}
              error={errors.revenueRange}
              placeholder="Select revenue range"
              required
            />
          </div>

          <Select
            id="monthlyMarketingSpend"
            label="Current Marketing Spend per Month"
            options={MARKETING_SPEND_OPTIONS}
            value={formData.monthlyMarketingSpend || ''}
            onChange={(e) => updateField('monthlyMarketingSpend', e.target.value)}
            error={errors.monthlyMarketingSpend}
            placeholder="Select monthly spend"
            required
          />

          <Textarea
            id="whyJoin"
            label="Why do you want to join the Founders Beta?"
            placeholder="Tell us about your business goals and why you're interested in the program..."
            value={formData.whyJoin || ''}
            onChange={(e) => updateField('whyJoin', e.target.value)}
            error={errors.whyJoin}
            helperText={`${(formData.whyJoin || '').length}/100 characters minimum`}
            required
          />
        </div>

        {/* Optional Fields */}
        <div className="space-y-6 pt-6 border-t border-border-glass">
          <h3 className="text-lg font-semibold text-text-primary">
            Optional Information
          </h3>

          <Input
            id="linkedInProfile"
            label="LinkedIn Profile"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            value={formData.linkedInProfile || ''}
            onChange={(e) => updateField('linkedInProfile', e.target.value)}
            error={errors.linkedInProfile}
          />

          <Textarea
            id="biggestChallenge"
            label="What's your biggest search/marketing challenge?"
            placeholder="Describe your current challenges with SEO, marketing, or growth..."
            value={formData.biggestChallenge || ''}
            onChange={(e) => updateField('biggestChallenge', e.target.value)}
          />

          <RadioGroup
            label="Are you willing to be a public case study?"
            name="willingCaseStudy"
            options={CASE_STUDY_OPTIONS}
            value={formData.willingCaseStudy || ''}
            onChange={(value) => updateField('willingCaseStudy', value as 'yes' | 'no' | 'maybe')}
          />

          <Input
            id="howDidYouHear"
            label="How did you hear about us?"
            placeholder="e.g., Google search, referral, social media..."
            value={formData.howDidYouHear || ''}
            onChange={(e) => updateField('howDidYouHear', e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isSubmitting}
            className="text-lg"
          >
            <Send className="w-5 h-5" />
            Submit Application
          </Button>
          <p className="mt-4 text-center text-sm text-text-tertiary">
            We respect your privacy. Your information will never be shared.
          </p>
        </div>
      </form>
    </div>
  );
}
