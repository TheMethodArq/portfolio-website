import { render, screen, fireEvent } from '@testing-library/react';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('applies glassmorphism styles', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('backdrop-blur-xl');
    });

    it('applies hover styles when hover prop is true', () => {
      render(<Card hover data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:bg-surface-glass-hover');
    });

    it('does not apply hover styles when hover is false', () => {
      render(<Card hover={false} data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('hover:bg-surface-glass-hover');
    });
  });

  describe('Interactivity', () => {
    it('handles click events when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Clickable</Card>);
      fireEvent.click(screen.getByText('Clickable'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has cursor-pointer when onClick is provided', () => {
      render(<Card onClick={() => {}} data-testid="card">Clickable</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('cursor-pointer');
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Card Sections', () => {
    it('renders CardHeader correctly', () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('renders CardBody correctly', () => {
      render(<CardBody>Body Content</CardBody>);
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('renders CardFooter correctly', () => {
      render(<CardFooter>Footer Content</CardFooter>);
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('renders complete card structure', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });
});
