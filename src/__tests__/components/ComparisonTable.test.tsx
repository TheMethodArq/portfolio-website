import { render, screen } from '@testing-library/react';
import { ComparisonTable } from '@/components/layout/ComparisonTable';

const mockColumns = [
  {
    name: 'Basic',
    price: '$99/mo',
    features: [
      { name: 'VVS Tracking', value: true, included: true },
      { name: 'Keywords', value: '50' },
      { name: 'Support', value: 'Email', included: true },
      { name: 'API Access', value: false, included: false },
    ],
    cta: { label: 'Start Trial', href: '/signup/basic' },
  },
  {
    name: 'Pro',
    price: '$199/mo',
    highlighted: true,
    features: [
      { name: 'VVS Tracking', value: true, included: true },
      { name: 'Keywords', value: '200' },
      { name: 'Support', value: 'Priority', included: true },
      { name: 'API Access', value: true, included: true },
    ],
    cta: { label: 'Start Trial', href: '/signup/pro' },
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      { name: 'VVS Tracking', value: true, included: true },
      { name: 'Keywords', value: 'Unlimited' },
      { name: 'Support', value: '24/7', included: true },
      { name: 'API Access', value: true, included: true },
    ],
    cta: { label: 'Contact Us', href: '/contact' },
  },
];

describe('ComparisonTable Component', () => {
  describe('Rendering', () => {
    it('renders all column headers', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Use getAllByText since text appears in both desktop and mobile views
      expect(screen.getAllByText('Basic').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Pro').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Enterprise').length).toBeGreaterThan(0);
    });

    it('renders prices for each column', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Use getAllByText since prices appear in both desktop and mobile views
      expect(screen.getAllByText('$99/mo').length).toBeGreaterThan(0);
      expect(screen.getAllByText('$199/mo').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Custom').length).toBeGreaterThan(0);
    });

    it('renders all feature names in the first column', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Use getAllByText since feature names appear in both desktop and mobile views
      expect(screen.getAllByText('VVS Tracking').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Keywords').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Support').length).toBeGreaterThan(0);
      expect(screen.getAllByText('API Access').length).toBeGreaterThan(0);
    });

    it('renders with custom className', () => {
      render(<ComparisonTable columns={mockColumns} className="custom-class" />);
      // Find the container by role instead of testId
      const table = screen.getByRole('region');
      expect(table).toHaveClass('custom-class');
    });

    it('has correct aria-label', () => {
      render(<ComparisonTable columns={mockColumns} />);
      expect(screen.getByLabelText('Comparison table')).toBeInTheDocument();
    });
  });

  describe('Feature Values', () => {
    it('renders Check icon for included boolean features', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const checkIcons = document.querySelectorAll('[aria-label="Included"]');
      expect(checkIcons.length).toBeGreaterThan(0);
    });

    it('renders X icon for excluded boolean features', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const xIcons = document.querySelectorAll('[aria-label="Not included"]');
      expect(xIcons.length).toBeGreaterThan(0);
    });

    it('renders text values correctly', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Use getAllByText since values appear in both desktop and mobile views
      expect(screen.getAllByText('50').length).toBeGreaterThan(0);
      expect(screen.getAllByText('200').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Unlimited').length).toBeGreaterThan(0);
    });

    it('renders support tier indicators', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Support features use boolean-like rendering with checkmarks
      // since `included: true` is set in the mock data
      const checkIcons = document.querySelectorAll('[aria-label="Included"]');
      expect(checkIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Highlighted Column', () => {
    it('applies highlight styling to highlighted column header', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Find the highlighted header (Pro column) - it has border-accent class
      const headers = document.querySelectorAll('th');
      const proHeader = Array.from(headers).find(th => th.textContent?.includes('Pro'));
      expect(proHeader).toHaveClass('border-accent', 'bg-surface-elevated');
    });

    it('does not apply highlight styling to non-highlighted columns', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const headers = document.querySelectorAll('th');
      const basicHeader = Array.from(headers).find(th => th.textContent?.includes('Basic'));
      expect(basicHeader).not.toHaveClass('border-accent');
      expect(basicHeader).toHaveClass('border-border-light');
    });

    it('applies highlight text color to highlighted column name', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Find the Pro name in the table header (desktop view only)
      const headerSpans = document.querySelectorAll('th span');
      const proName = Array.from(headerSpans).find(span => span.textContent === 'Pro');
      expect(proName).toHaveClass('text-accent');
    });

    it('applies regular text color to non-highlighted column names', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const headerSpans = document.querySelectorAll('th span');
      const basicName = Array.from(headerSpans).find(span => span.textContent === 'Basic');
      expect(basicName).toHaveClass('text-text-primary');
    });

    it('applies highlighted cell background in table body', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Find cells in the highlighted column
      const proCells = document.querySelectorAll('.bg-surface-elevated\\/50');
      expect(proCells.length).toBeGreaterThan(0);
    });
  });

  describe('CTA Buttons', () => {
    it('renders CTA buttons in footer', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // CTA links appear in both desktop and mobile views
      const startTrialLinks = screen.getAllByRole('link', { name: 'Start Trial' });
      const contactUsLinks = screen.getAllByRole('link', { name: 'Contact Us' });
      expect(startTrialLinks.length).toBeGreaterThan(0);
      expect(contactUsLinks.length).toBeGreaterThan(0);
    });

    it('renders correct number of CTA buttons', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const ctaLinks = screen.getAllByRole('link');
      // 3 columns * 2 views (desktop + mobile) = 6 links
      expect(ctaLinks.length).toBe(6);
    });

    it('CTA links have correct hrefs', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const startTrialLinks = screen.getAllByRole('link', { name: 'Start Trial' });
      const contactUsLinks = screen.getAllByRole('link', { name: 'Contact Us' });
      
      // Check at least one of each has correct href
      expect(startTrialLinks.some(link => link.getAttribute('href') === '/signup/basic')).toBe(true);
      expect(contactUsLinks.some(link => link.getAttribute('href') === '/contact')).toBe(true);
    });

    it('applies highlighted button style for highlighted column', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Find the Pro column's CTA button
      const proCta = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '/signup/pro'
      );
      expect(proCta).toHaveClass('bg-accent', 'text-white');
    });

    it('applies outline button style for non-highlighted columns', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const basicCta = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '/signup/basic'
      );
      expect(basicCta).toHaveClass('bg-transparent', 'border-2', 'border-accent');
    });

    it('shows dash when CTA is not provided', () => {
      const columnsWithoutCta = [
        { ...mockColumns[0], cta: undefined },
      ];
      render(<ComparisonTable columns={columnsWithoutCta} />);
      
      expect(screen.getByText('-')).toBeInTheDocument();
    });
  });

  describe('Table Structure', () => {
    it('has role="table" attribute', () => {
      render(<ComparisonTable columns={mockColumns} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders correct number of rows including header and footer', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const rows = screen.getAllByRole('row');
      // 1 header + 4 feature rows + 1 footer = 6 rows
      expect(rows.length).toBe(6);
    });

    it('renders column headers with scope="col"', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const headers = screen.getAllByRole('columnheader');
      expect(headers.length).toBe(4); // Features + 3 columns
    });

    it('renders cells with role="cell"', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      const cells = screen.getAllByRole('cell');
      expect(cells.length).toBeGreaterThan(0);
    });
  });

  describe('Sticky Header', () => {
    it('applies sticky header styling when stickyHeader is true', () => {
      render(<ComparisonTable columns={mockColumns} stickyHeader />);
      
      const thead = document.querySelector('thead');
      expect(thead).toHaveClass('sticky', 'top-0', 'z-10');
    });

    it('does not apply sticky header styling when stickyHeader is false', () => {
      render(<ComparisonTable columns={mockColumns} stickyHeader={false} />);
      
      const thead = document.querySelector('thead');
      expect(thead).not.toHaveClass('sticky');
    });
  });

  describe('Mobile View', () => {
    it('renders mobile card view (hidden on desktop)', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Mobile cards should be hidden on sm screens and above
      const mobileContainer = document.querySelector('.sm\\:hidden');
      expect(mobileContainer).toBeInTheDocument();
    });

    it('renders desktop table view (hidden on mobile)', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Desktop table should be hidden on small screens
      const desktopContainer = document.querySelector('.hidden.sm\\:block');
      expect(desktopContainer).toBeInTheDocument();
    });

    it('renders mobile cards with correct structure', () => {
      render(<ComparisonTable columns={mockColumns} />);
      
      // Should have mobile card container with cards inside
      const mobileContainer = document.querySelector('.sm\\:hidden');
      expect(mobileContainer).toBeInTheDocument();
      // Cards are direct children of the container
      expect(mobileContainer?.children.length).toBe(mockColumns.length);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty columns array', () => {
      render(<ComparisonTable columns={[]} />);
      // Find container by role since there's no testId
      const table = screen.getByRole('region');
      expect(table).toBeInTheDocument();
    });

    it('handles single column', () => {
      const singleColumn = [mockColumns[0]];
      render(<ComparisonTable columns={singleColumn} />);
      
      // Use getAllByText since text appears in both views
      expect(screen.getAllByText('Basic').length).toBeGreaterThan(0);
      expect(screen.getAllByText('VVS Tracking').length).toBeGreaterThan(0);
    });

    it('renders features in all columns', () => {
      const columnsWithDifferentFeatures = [
        {
          name: 'Basic',
          features: [
            { name: 'Feature 1', value: true, included: true },
            { name: 'Feature 2', value: false, included: false },
          ],
        },
        {
          name: 'Pro',
          features: [
            { name: 'Feature 1', value: true, included: true },
            { name: 'Feature 2', value: true, included: true },
          ],
        },
      ];
      render(<ComparisonTable columns={columnsWithDifferentFeatures} />);
      
      // Both features should be rendered
      expect(screen.getAllByText('Feature 1').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Feature 2').length).toBeGreaterThan(0);
      
      // Check and X icons should be present
      const checkIcons = document.querySelectorAll('[aria-label="Included"]');
      const xIcons = document.querySelectorAll('[aria-label="Not included"]');
      expect(checkIcons.length).toBeGreaterThan(0);
      expect(xIcons.length).toBeGreaterThan(0);
    });
  });
});
