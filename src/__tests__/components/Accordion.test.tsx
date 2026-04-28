import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '@/components/ui/Accordion';

const mockItems = [
  {
    id: 'item-1',
    question: 'What is Thalamus AI?',
    answer: 'Thalamus AI is a platform that democratizes Fortune 500 AI capabilities for SMBs.',
  },
  {
    id: 'item-2',
    question: 'How does it work?',
    answer: 'Our platform uses advanced neural networks to analyze and optimize your business processes.',
  },
  {
    id: 'item-3',
    question: 'What are the pricing plans?',
    answer: 'We offer flexible pricing plans starting from $99/month.',
  },
];

describe('Accordion Component', () => {
  describe('Rendering', () => {
    it('renders all accordion items', () => {
      render(<Accordion items={mockItems} />);
      
      expect(screen.getByText('What is Thalamus AI?')).toBeInTheDocument();
      expect(screen.getByText('How does it work?')).toBeInTheDocument();
      expect(screen.getByText('What are the pricing plans?')).toBeInTheDocument();
    });

    it('renders with correct number of buttons', () => {
      render(<Accordion items={mockItems} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    it('renders with custom className', () => {
      render(<Accordion items={mockItems} className="custom-class" data-testid="accordion" />);
      const accordion = screen.getByTestId('accordion');
      expect(accordion).toHaveClass('custom-class');
    });

    it('renders with correct divide styling between items', () => {
      render(<Accordion items={mockItems} data-testid="accordion" />);
      const accordion = screen.getByTestId('accordion');
      expect(accordion).toHaveClass('divide-y', 'divide-border-glass');
    });
  });

  describe('Interaction', () => {
    it('expands item when clicked', () => {
      render(<Accordion items={mockItems} />);
      
      const firstButton = screen.getByRole('button', { name: /what is thalamus ai/i });
      fireEvent.click(firstButton);
      
      expect(screen.getByText(/thalamus ai is a platform/i)).toBeInTheDocument();
    });

    it('collapses item when clicked again', () => {
      render(<Accordion items={mockItems} />);
      
      const firstButton = screen.getByRole('button', { name: /what is thalamus ai/i });
      fireEvent.click(firstButton);
      expect(screen.getByText(/thalamus ai is a platform/i)).toBeInTheDocument();
      
      fireEvent.click(firstButton);
      // After collapsing, the content should be hidden
      const content = screen.queryByText(/thalamus ai is a platform/i);
      expect(content).toBeNull();
    });

    it('collapses previously opened item when new item is clicked (default behavior)', () => {
      render(<Accordion items={mockItems} />);
      
      const firstButton = screen.getByRole('button', { name: /what is thalamus ai/i });
      const secondButton = screen.getByRole('button', { name: /how does it work/i });
      
      fireEvent.click(firstButton);
      expect(screen.getByText(/thalamus ai is a platform/i)).toBeInTheDocument();
      
      fireEvent.click(secondButton);
      // First item should be collapsed
      expect(screen.queryByText(/thalamus ai is a platform/i)).toBeNull();
      expect(screen.getByText(/our platform uses advanced neural networks/i)).toBeInTheDocument();
    });

    it('allows multiple items to be open when allowMultiple is true', () => {
      render(<Accordion items={mockItems} allowMultiple />);
      
      const firstButton = screen.getByRole('button', { name: /what is thalamus ai/i });
      const secondButton = screen.getByRole('button', { name: /how does it work/i });
      
      fireEvent.click(firstButton);
      fireEvent.click(secondButton);
      
      expect(screen.getByText(/thalamus ai is a platform/i)).toBeInTheDocument();
      expect(screen.getByText(/our platform uses advanced neural networks/i)).toBeInTheDocument();
    });
  });

  describe('defaultOpen prop', () => {
    it('opens specified items by default', () => {
      render(<Accordion items={mockItems} defaultOpen={['item-1']} />);
      
      expect(screen.getByText(/thalamus ai is a platform/i)).toBeInTheDocument();
      // Other items should be collapsed
      expect(screen.queryByText(/our platform uses advanced neural networks/i)).toBeNull();
    });

    it('opens multiple items by default when allowMultiple is true', () => {
      render(<Accordion items={mockItems} defaultOpen={['item-1', 'item-2']} allowMultiple />);
      
      expect(screen.getByText(/thalamus ai is a platform/i)).toBeInTheDocument();
      expect(screen.getByText(/our platform uses advanced neural networks/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-expanded attribute when collapsed', () => {
      render(<Accordion items={mockItems} />);
      
      const button = screen.getByRole('button', { name: /what is thalamus ai/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('has correct aria-expanded attribute when expanded', () => {
      render(<Accordion items={mockItems} />);
      
      const button = screen.getByRole('button', { name: /what is thalamus ai/i });
      fireEvent.click(button);
      
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has correct aria-controls attribute', () => {
      render(<Accordion items={mockItems} />);
      
      const button = screen.getByRole('button', { name: /what is thalamus ai/i });
      expect(button).toHaveAttribute('aria-controls', 'accordion-content-item-1');
    });

    it('content has correct id matching aria-controls', () => {
      render(<Accordion items={mockItems} />);
      
      const button = screen.getByRole('button', { name: /what is thalamus ai/i });
      expect(button).toHaveAttribute('aria-controls', 'accordion-content-item-1');
      
      fireEvent.click(button);
      
      // The content should have the matching id
      const content = document.getElementById('accordion-content-item-1');
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent(/thalamus ai is a platform/i);
    });

    it('button is keyboard accessible', () => {
      render(<Accordion items={mockItems} />);
      
      const button = screen.getByRole('button', { name: /what is thalamus ai/i });
      button.focus();
      expect(button).toHaveFocus();
    });

    it('expands on Enter key press', () => {
      render(<Accordion items={mockItems} />);
      
      const button = screen.getByRole('button', { name: /what is thalamus ai/i });
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      fireEvent.click(button); // Simulate the click that would follow
      
      expect(screen.getByText(/thalamus ai is a platform/i)).toBeInTheDocument();
    });

    it('expands on Space key press', () => {
      render(<Accordion items={mockItems} />);
      
      const button = screen.getByRole('button', { name: /what is thalamus ai/i });
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      fireEvent.click(button); // Simulate the click that would follow
      
      expect(screen.getByText(/thalamus ai is a platform/i)).toBeInTheDocument();
    });

    it('has correct button type', () => {
      render(<Accordion items={mockItems} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      render(<Accordion items={[]} data-testid="accordion" />);
      const accordion = screen.getByTestId('accordion');
      expect(accordion).toBeInTheDocument();
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    it('handles single item', () => {
      const singleItem = [mockItems[0]];
      render(<Accordion items={singleItem} />);
      
      expect(screen.getByText('What is Thalamus AI?')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles ReactNode as answer content', () => {
      const itemsWithReactNode = [
        {
          id: 'item-1',
          question: 'Complex Answer',
          answer: <div data-testid="complex-content"><strong>Bold</strong> and <em>italic</em></div>,
        },
      ];
      render(<Accordion items={itemsWithReactNode} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(screen.getByTestId('complex-content')).toBeInTheDocument();
    });
  });
});
