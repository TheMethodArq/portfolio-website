import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  describe('Status Variants', () => {
    it('renders production status correctly (green)', () => {
      render(<Badge status="production">Production</Badge>);
      const badge = screen.getByText('Production');
      expect(badge).toHaveClass('bg-success/15', 'text-success');
    });

    it('renders beta status correctly (yellow)', () => {
      render(<Badge status="beta">Beta</Badge>);
      const badge = screen.getByText('Beta');
      expect(badge).toHaveClass('bg-warning/15', 'text-warning');
    });

    it('renders development status correctly (cyan)', () => {
      render(<Badge status="development">In Development</Badge>);
      const badge = screen.getByText('In Development');
      expect(badge).toHaveClass('bg-accent/15', 'text-accent');
    });

    it('renders exploring status correctly (gray)', () => {
      render(<Badge status="exploring">Exploring</Badge>);
      const badge = screen.getByText('Exploring');
      expect(badge).toHaveClass('bg-white/10', 'text-text-secondary');
    });

    it('renders researching status correctly', () => {
      render(<Badge status="researching">Researching</Badge>);
      const badge = screen.getByText('Researching');
      expect(badge).toHaveClass('bg-info/15', 'text-info');
    });

    it('renders coming-soon status correctly', () => {
      render(<Badge status="coming-soon">Coming Soon</Badge>);
      const badge = screen.getByText('Coming Soon');
      expect(badge).toHaveClass('bg-white/5', 'text-text-tertiary');
    });
  });

  describe('Styling', () => {
    it('has correct base styles', () => {
      render(<Badge status="production" data-testid="badge">Test</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full');
    });

    it('accepts custom className', () => {
      render(<Badge status="production" className="custom-class">Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('custom-class');
    });

    it('has uppercase text', () => {
      render(<Badge status="production" data-testid="badge">Test</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('uppercase');
    });
  });
});
