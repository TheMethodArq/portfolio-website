import { render, screen } from '@testing-library/react';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { Shield, CheckCircle, Award, Lock, Star, Zap } from 'lucide-react';

const mockItems = [
  { icon: Shield, text: 'Enterprise Security' },
  { icon: CheckCircle, text: '99.9% Uptime' },
  { icon: Award, text: 'SOC 2 Certified' },
];

describe('TrustBanner Component', () => {
  describe('Rendering', () => {
    it('renders all trust items', () => {
      render(<TrustBanner items={mockItems} />);
      
      expect(screen.getByText('Enterprise Security')).toBeInTheDocument();
      expect(screen.getByText('99.9% Uptime')).toBeInTheDocument();
      expect(screen.getByText('SOC 2 Certified')).toBeInTheDocument();
    });

    it('renders all icons', () => {
      render(<TrustBanner items={mockItems} />);
      
      // All icons should be rendered
      const iconElements = document.querySelectorAll('svg');
      expect(iconElements.length).toBe(mockItems.length);
    });

    it('renders with custom className', () => {
      render(<TrustBanner items={mockItems} className="custom-class" data-testid="trust-banner" />);
      const banner = screen.getByTestId('trust-banner');
      expect(banner).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<TrustBanner items={mockItems} variant="default" data-testid="trust-banner" />);
      const banner = screen.getByTestId('trust-banner');
      
      expect(banner).toHaveClass('py-4', 'px-6');
    });

    it('renders compact variant correctly', () => {
      render(<TrustBanner items={mockItems} variant="compact" data-testid="trust-banner" />);
      const banner = screen.getByTestId('trust-banner');
      
      expect(banner).toHaveClass('py-2', 'px-4');
    });

    it('renders large variant correctly', () => {
      render(<TrustBanner items={mockItems} variant="large" data-testid="trust-banner" />);
      const banner = screen.getByTestId('trust-banner');
      
      expect(banner).toHaveClass('py-6', 'px-8');
    });

    it('applies correct icon size for default variant', () => {
      render(<TrustBanner items={mockItems} variant="default" />);
      
      const icons = document.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('w-5', 'h-5');
      });
    });

    it('applies correct icon size for compact variant', () => {
      render(<TrustBanner items={mockItems} variant="compact" />);
      
      const icons = document.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('w-4', 'h-4');
      });
    });

    it('applies correct icon size for large variant', () => {
      render(<TrustBanner items={mockItems} variant="large" />);
      
      const icons = document.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('w-6', 'h-6');
      });
    });

    it('applies correct text size for default variant', () => {
      render(<TrustBanner items={mockItems} variant="default" />);
      
      const texts = screen.getAllByText(/Enterprise Security|99.9% Uptime|SOC 2 Certified/);
      texts.forEach(text => {
        expect(text).toHaveClass('text-sm');
      });
    });

    it('applies correct text size for compact variant', () => {
      render(<TrustBanner items={mockItems} variant="compact" />);
      
      const texts = screen.getAllByText(/Enterprise Security|99.9% Uptime|SOC 2 Certified/);
      texts.forEach(text => {
        expect(text).toHaveClass('text-xs');
      });
    });

    it('applies correct text size for large variant', () => {
      render(<TrustBanner items={mockItems} variant="large" />);
      
      const texts = screen.getAllByText(/Enterprise Security|99.9% Uptime|SOC 2 Certified/);
      texts.forEach(text => {
        expect(text).toHaveClass('text-base');
      });
    });

    it('applies correct gap for default variant', () => {
      render(<TrustBanner items={mockItems} variant="default" />);
      
      const container = document.querySelector('.gap-6');
      expect(container).toBeInTheDocument();
    });

    it('applies correct gap for compact variant', () => {
      render(<TrustBanner items={mockItems} variant="compact" />);
      
      const container = document.querySelector('.gap-4');
      expect(container).toBeInTheDocument();
    });

    it('applies correct gap for large variant', () => {
      render(<TrustBanner items={mockItems} variant="large" />);
      
      const container = document.querySelector('.gap-8');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders horizontal layout by default', () => {
      render(<TrustBanner items={mockItems} />);
      
      const container = document.querySelector('.flex-wrap');
      expect(container).toBeInTheDocument();
    });

    it('renders horizontal layout when explicitly specified', () => {
      render(<TrustBanner items={mockItems} layout="horizontal" />);
      
      const container = document.querySelector('.flex-wrap');
      expect(container).toBeInTheDocument();
    });

    it('renders vertical layout when specified', () => {
      render(<TrustBanner items={mockItems} layout="vertical" />);
      
      const container = document.querySelector('.flex-col');
      expect(container).toBeInTheDocument();
    });

    it('centers items horizontally', () => {
      render(<TrustBanner items={mockItems} />);
      
      const container = document.querySelector('.justify-center');
      expect(container).toBeInTheDocument();
    });

    it('centers items vertically', () => {
      render(<TrustBanner items={mockItems} />);
      
      const container = document.querySelector('.items-center');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Dividers', () => {
    it('does not render dividers by default', () => {
      render(<TrustBanner items={mockItems} />);
      
      const dividers = document.querySelectorAll('.bg-border-glass');
      expect(dividers.length).toBe(0);
    });

    it('renders dividers when showDividers is true in horizontal layout', () => {
      render(<TrustBanner items={mockItems} showDividers layout="horizontal" />);
      
      // Should have dividers between items (n-1 dividers)
      const dividers = document.querySelectorAll('.w-px');
      expect(dividers.length).toBe(mockItems.length - 1);
    });

    it('renders dividers when showDividers is true in vertical layout', () => {
      render(<TrustBanner items={mockItems} showDividers layout="vertical" />);
      
      // Should have horizontal dividers
      const dividers = document.querySelectorAll('.h-px');
      expect(dividers.length).toBe(mockItems.length - 1);
    });

    it('does not render divider after the last item', () => {
      render(<TrustBanner items={mockItems} showDividers />);
      
      const dividers = document.querySelectorAll('.bg-border-glass');
      expect(dividers.length).toBe(mockItems.length - 1);
    });
  });

  describe('Styling', () => {
    it('has glassmorphism background', () => {
      render(<TrustBanner items={mockItems} data-testid="trust-banner" />);
      
      const banner = screen.getByTestId('trust-banner');
      // Check for the classes individually since the escaped class name doesn't match
      expect(banner.className).toContain('bg-surface-glass/50');
      expect(banner.className).toContain('backdrop-blur-sm');
    });

    it('has border styling', () => {
      render(<TrustBanner items={mockItems} data-testid="trust-banner" />);
      
      const banner = screen.getByTestId('trust-banner');
      expect(banner).toHaveClass('border', 'border-border-glass');
    });

    it('has rounded corners', () => {
      render(<TrustBanner items={mockItems} data-testid="trust-banner" />);
      
      const banner = screen.getByTestId('trust-banner');
      expect(banner).toHaveClass('rounded-xl');
    });

    it('applies accent color to icons', () => {
      render(<TrustBanner items={mockItems} />);
      
      const icons = document.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('text-accent');
      });
    });

    it('applies correct text styling', () => {
      render(<TrustBanner items={mockItems} />);
      
      const texts = screen.getAllByText(/Enterprise Security|99.9% Uptime|SOC 2 Certified/);
      texts.forEach(text => {
        expect(text).toHaveClass('text-text-secondary', 'font-medium');
      });
    });

    it('prevents text wrapping', () => {
      render(<TrustBanner items={mockItems} />);
      
      const texts = screen.getAllByText(/Enterprise Security|99.9% Uptime|SOC 2 Certified/);
      texts.forEach(text => {
        expect(text).toHaveClass('whitespace-nowrap');
      });
    });
  });

  describe('Item Structure', () => {
    it('renders each item with icon and text in flex container', () => {
      render(<TrustBanner items={mockItems} />);
      
      const itemContainers = document.querySelectorAll('.flex.items-center.gap-2');
      expect(itemContainers.length).toBe(mockItems.length);
    });

    it('renders icons with flex-shrink-0', () => {
      render(<TrustBanner items={mockItems} />);
      
      const icons = document.querySelectorAll('.flex-shrink-0');
      expect(icons.length).toBe(mockItems.length);
    });
  });

  describe('Animation', () => {
    it('has initial animation state', () => {
      render(<TrustBanner items={mockItems} data-testid="trust-banner" />);
      
      const banner = screen.getByTestId('trust-banner');
      // Initial state is set by framer-motion (opacity: 0, y: 10)
      expect(banner).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      render(<TrustBanner items={[]} data-testid="trust-banner" />);
      const banner = screen.getByTestId('trust-banner');
      expect(banner).toBeInTheDocument();
    });

    it('handles single item', () => {
      const singleItem = [mockItems[0]];
      render(<TrustBanner items={singleItem} />);
      
      expect(screen.getByText('Enterprise Security')).toBeInTheDocument();
    });

    it('handles many items', () => {
      const manyItems = [
        { icon: Shield, text: 'Security' },
        { icon: Lock, text: 'Privacy' },
        { icon: CheckCircle, text: 'Verified' },
        { icon: Award, text: 'Certified' },
        { icon: Star, text: 'Rated' },
        { icon: Zap, text: 'Fast' },
      ];
      render(<TrustBanner items={manyItems} />);
      
      manyItems.forEach(item => {
        expect(screen.getByText(item.text)).toBeInTheDocument();
      });
    });

    it('handles long text content', () => {
      const longTextItems = [
        { icon: Shield, text: 'This is a very long trust indicator text that should still render properly' },
      ];
      render(<TrustBanner items={longTextItems} />);
      
      expect(screen.getByText(longTextItems[0].text)).toBeInTheDocument();
    });
  });
});
