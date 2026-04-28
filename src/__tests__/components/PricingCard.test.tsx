import { render, screen, fireEvent } from '@testing-library/react';
import { PricingCard } from '@/components/marketing/PricingCard';

const mockProps = {
  name: 'Starter Plan',
  price: '$99',
  period: '/month',
  description: 'Perfect for small businesses getting started with AI.',
  features: [
    { text: '5 AI Workflows', included: true },
    { text: 'Basic Analytics', included: true },
    { text: 'Email Support', included: true },
    { text: 'Custom Integrations', included: false },
    { text: 'Priority Support', included: false },
  ],
  cta: {
    label: 'Get Started',
    href: '/signup',
    variant: 'primary' as const,
  },
};

describe('PricingCard Component', () => {
  describe('Rendering', () => {
    it('renders plan name', () => {
      render(<PricingCard {...mockProps} />);
      expect(screen.getByText('Starter Plan')).toBeInTheDocument();
    });

    it('renders price with period', () => {
      render(<PricingCard {...mockProps} />);
      expect(screen.getByText('$99')).toBeInTheDocument();
      expect(screen.getByText('/month')).toBeInTheDocument();
    });

    it('renders default period when not provided', () => {
      const propsWithoutPeriod = { ...mockProps };
      delete (propsWithoutPeriod as { period?: string }).period;
      render(<PricingCard {...propsWithoutPeriod} />);
      expect(screen.getByText('/month')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<PricingCard {...mockProps} />);
      expect(screen.getByText('Perfect for small businesses getting started with AI.')).toBeInTheDocument();
    });

    it('renders all features', () => {
      render(<PricingCard {...mockProps} />);
      
      mockProps.features.forEach(feature => {
        expect(screen.getByText(feature.text)).toBeInTheDocument();
      });
    });

    it('renders CTA button with correct label', () => {
      render(<PricingCard {...mockProps} />);
      const ctaButton = screen.getByRole('link', { name: 'Get Started' });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '/signup');
    });

    it('renders with custom className', () => {
      render(<PricingCard {...mockProps} className="custom-class" data-testid="pricing-card" />);
      const card = screen.getByTestId('pricing-card');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Feature List', () => {
    it('renders checkmark for included features', () => {
      render(<PricingCard {...mockProps} />);
      
      const includedFeatures = mockProps.features.filter(f => f.included);
      const checkmarks = document.querySelectorAll('.text-success');
      
      // Should have checkmark icons for included features
      expect(checkmarks.length).toBeGreaterThanOrEqual(includedFeatures.length);
    });

    it('renders X mark for excluded features', () => {
      render(<PricingCard {...mockProps} />);
      
      const excludedFeatures = mockProps.features.filter(f => !f.included);
      const xMarks = document.querySelectorAll('.text-text-disabled');
      
      // Should have X icons for excluded features
      expect(xMarks.length).toBeGreaterThanOrEqual(excludedFeatures.length);
    });

    it('applies correct text color for included features', () => {
      render(<PricingCard {...mockProps} />);
      
      const includedFeature = screen.getByText('5 AI Workflows');
      expect(includedFeature).toHaveClass('text-text-secondary');
    });

    it('applies correct text color for excluded features', () => {
      render(<PricingCard {...mockProps} />);
      
      const excludedFeature = screen.getByText('Custom Integrations');
      expect(excludedFeature).toHaveClass('text-text-disabled');
    });

    it('renders with empty features array', () => {
      render(<PricingCard {...mockProps} features={[]} />);
      expect(screen.getByText('Starter Plan')).toBeInTheDocument();
    });
  });

  describe('Badges', () => {
    it('renders badges when provided', () => {
      const badges = [
        { text: 'Popular', variant: 'success' as const },
        { text: 'New', variant: 'warning' as const },
      ];
      render(<PricingCard {...mockProps} badges={badges} />);
      
      expect(screen.getByText('Popular')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('applies correct styling for default badge', () => {
      const badges = [{ text: 'Default', variant: 'default' as const }];
      render(<PricingCard {...mockProps} badges={badges} />);
      
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-background-secondary');
    });

    it('applies correct styling for success badge', () => {
      const badges = [{ text: 'Success', variant: 'success' as const }];
      render(<PricingCard {...mockProps} badges={badges} />);
      
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-success/10', 'text-success');
    });

    it('applies correct styling for warning badge', () => {
      const badges = [{ text: 'Warning', variant: 'warning' as const }];
      render(<PricingCard {...mockProps} badges={badges} />);
      
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-warning/10', 'text-warning');
    });

    it('applies correct styling for error badge', () => {
      const badges = [{ text: 'Error', variant: 'error' as const }];
      render(<PricingCard {...mockProps} badges={badges} />);
      
      const badge = screen.getByText('Error');
      expect(badge).toHaveClass('bg-error/10', 'text-error');
    });

    it('does not render badge section when badges array is empty', () => {
      render(<PricingCard {...mockProps} badges={[]} />);
      // The card should still render without errors
      expect(screen.getByText('Starter Plan')).toBeInTheDocument();
    });
  });

  describe('Highlighted State', () => {
    it('applies highlighted styling when highlighted is true', () => {
      render(<PricingCard {...mockProps} highlighted data-testid="pricing-card" />);
      
      const card = screen.getByTestId('pricing-card');
      expect(card).toHaveClass('border-accent/30');
      expect(card).toHaveClass('scale-[1.02]');
    });

    it('does not apply highlighted styling when highlighted is false', () => {
      render(<PricingCard {...mockProps} highlighted={false} data-testid="pricing-card" />);
      
      const card = screen.getByTestId('pricing-card');
      expect(card).not.toHaveClass('border-accent/30');
      expect(card).not.toHaveClass('scale-[1.02]');
    });

    it('applies default border when not highlighted', () => {
      render(<PricingCard {...mockProps} highlighted={false} data-testid="pricing-card" />);
      
      const card = screen.getByTestId('pricing-card');
      expect(card).toHaveClass('border-border-glass');
    });
  });

  describe('CTA Button', () => {
    it('renders primary variant CTA by default', () => {
      render(<PricingCard {...mockProps} cta={{ label: 'Get Started', href: '/signup' }} />);
      
      const ctaButton = screen.getByRole('link', { name: 'Get Started' });
      expect(ctaButton).toHaveClass('btn-light-primary');
    });

    it('renders secondary variant CTA when specified', () => {
      render(<PricingCard {...mockProps} cta={{ label: 'Learn More', href: '/learn', variant: 'secondary' }} />);
      
      const ctaButton = screen.getByRole('link', { name: 'Learn More' });
      expect(ctaButton).toHaveClass('btn-light-secondary');
    });

    it('CTA link has correct href', () => {
      render(<PricingCard {...mockProps} />);
      
      const ctaButton = screen.getByRole('link', { name: 'Get Started' });
      expect(ctaButton).toHaveAttribute('href', '/signup');
    });
  });

  describe('Footer', () => {
    it('renders footer when provided', () => {
      render(<PricingCard {...mockProps} footer={<span data-testid="footer-content">Custom footer</span>} />);
      
      expect(screen.getByTestId('footer-content')).toBeInTheDocument();
      expect(screen.getByText('Custom footer')).toBeInTheDocument();
    });

    it('does not render footer section when footer is not provided', () => {
      render(<PricingCard {...mockProps} />);
      
      // The card should render without the footer divider
      const dividers = document.querySelectorAll('.border-t');
      expect(dividers.length).toBe(1); // Only the features divider
    });

    it('renders footer divider when footer is provided', () => {
      render(<PricingCard {...mockProps} footer="Footer text" />);
      
      // Should have two dividers: one before features, one before footer
      const dividers = document.querySelectorAll('.border-t');
      expect(dividers.length).toBe(2);
    });
  });

  describe('Card Structure', () => {
    it('has glassmorphism background', () => {
      render(<PricingCard {...mockProps} data-testid="pricing-card" />);
      
      const card = screen.getByTestId('pricing-card');
      expect(card).toHaveClass('bg-surface-glass', 'backdrop-blur-xl');
    });

    it('has rounded corners', () => {
      render(<PricingCard {...mockProps} data-testid="pricing-card" />);
      
      const card = screen.getByTestId('pricing-card');
      expect(card).toHaveClass('rounded-2xl');
    });

    it('has correct padding', () => {
      render(<PricingCard {...mockProps} data-testid="pricing-card" />);
      
      const card = screen.getByTestId('pricing-card');
      expect(card).toHaveClass('p-6', 'md:p-8');
    });
  });
});
