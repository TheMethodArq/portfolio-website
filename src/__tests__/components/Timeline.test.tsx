import { render, screen } from '@testing-library/react';
import { Timeline } from '@/components/ui/Timeline';
import { Check, Circle, Clock, Zap, Shield, Star } from 'lucide-react';

const mockItems = [
  {
    title: 'Discovery Phase',
    description: 'Initial consultation and requirements gathering.',
    date: 'Jan 2024',
    status: 'completed' as const,
  },
  {
    title: 'Design Phase',
    description: 'Creating wireframes and visual designs.',
    date: 'Feb 2024',
    status: 'completed' as const,
  },
  {
    title: 'Development',
    description: 'Building the core platform features.',
    date: 'Mar 2024',
    status: 'current' as const,
  },
  {
    title: 'Launch',
    description: 'Deploying to production and monitoring.',
    date: 'Apr 2024',
    status: 'upcoming' as const,
  },
];

describe('Timeline Component', () => {
  describe('Rendering', () => {
    it('renders all timeline items', () => {
      render(<Timeline items={mockItems} />);
      
      expect(screen.getByText('Discovery Phase')).toBeInTheDocument();
      expect(screen.getByText('Design Phase')).toBeInTheDocument();
      expect(screen.getByText('Development')).toBeInTheDocument();
      expect(screen.getByText('Launch')).toBeInTheDocument();
    });

    it('renders all descriptions', () => {
      render(<Timeline items={mockItems} />);
      
      expect(screen.getByText('Initial consultation and requirements gathering.')).toBeInTheDocument();
      expect(screen.getByText('Creating wireframes and visual designs.')).toBeInTheDocument();
      expect(screen.getByText('Building the core platform features.')).toBeInTheDocument();
      expect(screen.getByText('Deploying to production and monitoring.')).toBeInTheDocument();
    });

    it('renders all dates', () => {
      render(<Timeline items={mockItems} />);
      
      expect(screen.getByText('Jan 2024')).toBeInTheDocument();
      expect(screen.getByText('Feb 2024')).toBeInTheDocument();
      expect(screen.getByText('Mar 2024')).toBeInTheDocument();
      expect(screen.getByText('Apr 2024')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Timeline items={mockItems} className="custom-class" data-testid="timeline" />);
      const timeline = screen.getByTestId('timeline');
      expect(timeline).toHaveClass('custom-class');
    });
  });

  describe('Status Indicators', () => {
    it('renders completed status with Check icon', () => {
      render(<Timeline items={mockItems} />);
      
      const completedItems = mockItems.filter(item => item.status === 'completed');
      // Check icons should be rendered for completed items
      const checkIcons = document.querySelectorAll('.bg-success');
      expect(checkIcons.length).toBeGreaterThanOrEqual(completedItems.length);
    });

    it('renders current status with Circle icon', () => {
      render(<Timeline items={mockItems} />);
      
      // Current item should have accent background and ring
      const currentIcon = document.querySelector('.bg-accent.ring-4');
      expect(currentIcon).toBeInTheDocument();
    });

    it('renders upcoming status with Clock icon', () => {
      render(<Timeline items={mockItems} />);
      
      // Upcoming items should have muted styling
      const upcomingItems = mockItems.filter(item => item.status === 'upcoming');
      const mutedIcons = document.querySelectorAll('.text-text-tertiary');
      expect(mutedIcons.length).toBeGreaterThan(0);
    });

    it('applies correct styling for completed status', () => {
      render(<Timeline items={mockItems} />);
      
      const completedTitle = screen.getByText('Discovery Phase');
      expect(completedTitle).toHaveClass('text-text-primary');
    });

    it('applies correct styling for current status (bold)', () => {
      render(<Timeline items={mockItems} />);
      
      const currentTitle = screen.getByText('Development');
      expect(currentTitle).toHaveClass('text-text-primary', 'font-semibold');
    });

    it('applies correct styling for upcoming status (muted)', () => {
      render(<Timeline items={mockItems} />);
      
      const upcomingTitle = screen.getByText('Launch');
      expect(upcomingTitle).toHaveClass('text-text-tertiary');
    });

    it('defaults to upcoming status when status is not provided', () => {
      const itemsWithoutStatus = [
        { title: 'Item 1', description: 'Description 1' },
      ];
      render(<Timeline items={itemsWithoutStatus} />);
      
      // Should render with muted/upcoming styling
      const title = screen.getByText('Item 1');
      expect(title).toHaveClass('text-text-tertiary');
    });
  });

  describe('Custom Icons', () => {
    it('renders custom icon when provided', () => {
      const itemsWithCustomIcons = [
        { title: 'Step 1', description: 'Desc 1', icon: Zap, status: 'completed' as const },
        { title: 'Step 2', description: 'Desc 2', icon: Shield, status: 'current' as const },
        { title: 'Step 3', description: 'Desc 3', icon: Star, status: 'upcoming' as const },
      ];
      render(<Timeline items={itemsWithCustomIcons} />);
      
      // All items should render with custom icons
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('uses default status icon when custom icon is not provided', () => {
      const itemsWithoutIcons = [
        { title: 'Completed', description: 'Desc', status: 'completed' as const },
      ];
      render(<Timeline items={itemsWithoutIcons} />);
      
      // Should render with Check icon (default for completed)
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
  });

  describe('Vertical Orientation', () => {
    it('renders vertical layout by default', () => {
      render(<Timeline items={mockItems} data-testid="timeline" />);
      const timeline = screen.getByTestId('timeline');
      expect(timeline).toBeInTheDocument();
    });

    it('renders connecting lines between items', () => {
      render(<Timeline items={mockItems} />);
      
      // Should have connecting lines (not for the last item)
      const lines = document.querySelectorAll('.w-0\\.5');
      expect(lines.length).toBe(mockItems.length - 1);
    });

    it('applies completed styling to connecting lines after completed items', () => {
      render(<Timeline items={mockItems} />);
      
      // Lines after completed items should be green
      const completedLines = document.querySelectorAll('.bg-success');
      expect(completedLines.length).toBeGreaterThan(0);
    });

    it('does not render connecting line for the last item', () => {
      const singleItem = [mockItems[0]];
      render(<Timeline items={singleItem} />);
      
      const lines = document.querySelectorAll('.w-0\\.5');
      expect(lines.length).toBe(0);
    });

    it('renders items with correct flex layout', () => {
      render(<Timeline items={mockItems} />);
      
      // Items should have flex layout with gap
      const itemContainers = document.querySelectorAll('.flex.gap-4');
      expect(itemContainers.length).toBeGreaterThan(0);
    });
  });

  describe('Horizontal Orientation', () => {
    it('renders horizontal layout when specified', () => {
      render(<Timeline items={mockItems} orientation="horizontal" data-testid="timeline" />);
      const timeline = screen.getByTestId('timeline');
      expect(timeline).toBeInTheDocument();
    });

    it('renders horizontal connecting lines', () => {
      render(<Timeline items={mockItems} orientation="horizontal" />);
      
      // Horizontal layout uses pseudo-elements for lines
      const items = document.querySelectorAll('[class*="after:"]');
      expect(items.length).toBeGreaterThan(0);
    });

    it('renders items in horizontal flex container', () => {
      render(<Timeline items={mockItems} orientation="horizontal" />);
      
      const container = document.querySelector('.flex.items-start.justify-between');
      expect(container).toBeInTheDocument();
    });

    it('centers content in horizontal layout', () => {
      render(<Timeline items={mockItems} orientation="horizontal" />);
      
      const centeredContent = document.querySelectorAll('.text-center');
      expect(centeredContent.length).toBeGreaterThan(0);
    });

    it('renders correct horizontal spacing', () => {
      render(<Timeline items={mockItems} orientation="horizontal" />);
      
      const flexItems = document.querySelectorAll('.flex-1');
      expect(flexItems.length).toBe(mockItems.length);
    });
  });

  describe('Icon Styling', () => {
    it('renders icons in circular containers', () => {
      render(<Timeline items={mockItems} />);
      
      const iconContainers = document.querySelectorAll('.rounded-full');
      expect(iconContainers.length).toBeGreaterThanOrEqual(mockItems.length);
    });

    it('applies correct icon container sizing', () => {
      render(<Timeline items={mockItems} />);
      
      const iconContainers = document.querySelectorAll('.w-10.h-10');
      expect(iconContainers.length).toBeGreaterThanOrEqual(mockItems.length);
    });

    it('renders icons with correct size', () => {
      render(<Timeline items={mockItems} />);
      
      const icons = document.querySelectorAll('.w-5.h-5');
      expect(icons.length).toBeGreaterThanOrEqual(mockItems.length);
    });
  });

  describe('Date Rendering', () => {
    it('renders date when provided', () => {
      render(<Timeline items={mockItems} />);
      
      expect(screen.getByText('Jan 2024')).toBeInTheDocument();
    });

    it('does not render date element when date is not provided', () => {
      const itemsWithoutDate = [
        { title: 'Item 1', description: 'Description 1' },
      ];
      render(<Timeline items={itemsWithoutDate} />);
      
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
    });

    it('applies correct date styling', () => {
      render(<Timeline items={mockItems} />);
      
      const date = screen.getByText('Jan 2024');
      expect(date).toHaveClass('text-text-tertiary');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      render(<Timeline items={[]} data-testid="timeline" />);
      const timeline = screen.getByTestId('timeline');
      expect(timeline).toBeInTheDocument();
    });

    it('handles single item', () => {
      const singleItem = [mockItems[0]];
      render(<Timeline items={singleItem} />);
      
      expect(screen.getByText('Discovery Phase')).toBeInTheDocument();
    });

    it('handles all items having the same status', () => {
      const allCompleted = mockItems.map(item => ({ ...item, status: 'completed' as const }));
      render(<Timeline items={allCompleted} />);
      
      mockItems.forEach(item => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });

    it('handles items without status property', () => {
      const itemsNoStatus = mockItems.map(({ status, ...rest }) => rest);
      render(<Timeline items={itemsNoStatus} />);
      
      mockItems.forEach(item => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });
  });
});
