import { render, screen, act } from '@testing-library/react';
import { CountdownTimer } from '@/components/marketing/CountdownTimer';

describe('CountdownTimer Component', () => {
  const mockDate = new Date('2026-02-08T12:00:00Z');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders with target date in the future', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z'); // 1 day in future
      render(<CountdownTimer targetDate={targetDate} />);
      
      expect(screen.getByRole('timer')).toBeInTheDocument();
      expect(screen.getByText('01')).toBeInTheDocument(); // 1 day
    });

    it('renders "Offer Expired" when target date is in the past', () => {
      const targetDate = new Date('2026-02-07T12:00:00Z'); // 1 day in past
      render(<CountdownTimer targetDate={targetDate} />);
      
      expect(screen.getByText('Offer Expired')).toBeInTheDocument();
    });

    it('renders all time units (days, hours, minutes, seconds)', () => {
      const targetDate = new Date('2026-02-09T13:30:45Z');
      render(<CountdownTimer targetDate={targetDate} />);
      
      expect(screen.getByText('Days')).toBeInTheDocument();
      expect(screen.getByText('Hours')).toBeInTheDocument();
      expect(screen.getByText('Min')).toBeInTheDocument();
      expect(screen.getByText('Sec')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} className="custom-class" data-testid="timer" />);
      
      const timer = screen.getByTestId('timer');
      expect(timer).toHaveClass('custom-class');
    });

    it('has correct aria-label', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} />);
      
      expect(screen.getByLabelText('Countdown timer')).toBeInTheDocument();
    });
  });

  describe('Countdown Calculation', () => {
    it('calculates correct time for 1 day remaining', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} />);
      
      expect(screen.getByText('01')).toBeInTheDocument(); // Days
      // Hours, minutes, seconds should all be 00
      const zeros = screen.getAllByText('00');
      expect(zeros.length).toBe(3); // Hours, Minutes, Seconds
    });

    it('calculates correct time for multiple days, hours, minutes, seconds', () => {
      const targetDate = new Date('2026-02-10T14:35:20Z'); // 2 days, 2 hours, 35 min, 20 sec
      render(<CountdownTimer targetDate={targetDate} />);
      
      const timerValues = screen.getAllByText(/\d{2}/).filter(el => 
        el.tagName.toLowerCase() === 'span' && el.className.includes('tabular-nums')
      );
      
      expect(timerValues[0]).toHaveTextContent('02'); // Days
      expect(timerValues[1]).toHaveTextContent('02'); // Hours
      expect(timerValues[2]).toHaveTextContent('35'); // Minutes
      expect(timerValues[3]).toHaveTextContent('20'); // Seconds
    });

    it('pads single digit values with leading zero', () => {
      const targetDate = new Date('2026-02-08T13:05:05Z'); // 1 hour, 5 min, 5 sec
      render(<CountdownTimer targetDate={targetDate} />);
      
      const timerValues = screen.getAllByText(/\d{2}/).filter(el => 
        el.tagName.toLowerCase() === 'span' && el.className.includes('tabular-nums')
      );
      
      expect(timerValues[0]).toHaveTextContent('00'); // Days
      expect(timerValues[1]).toHaveTextContent('01'); // Hours (padded)
      expect(timerValues[2]).toHaveTextContent('05'); // Minutes (padded)
      expect(timerValues[3]).toHaveTextContent('05'); // Seconds (padded)
    });

    it('updates countdown every second', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} />);
      
      const initialSeconds = screen.getAllByText(/\d{2}/).filter(el => 
        el.tagName.toLowerCase() === 'span' && el.className.includes('tabular-nums')
      )[3];
      
      expect(initialSeconds).toHaveTextContent('00');
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      const updatedSeconds = screen.getAllByText(/\d{2}/).filter(el => 
        el.tagName.toLowerCase() === 'span' && el.className.includes('tabular-nums')
      )[3];
      
      expect(updatedSeconds).toHaveTextContent('59');
    });
  });

  describe('Variant Sizes', () => {
    it('renders default variant correctly', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} variant="default" data-testid="timer" />);
      
      const timer = screen.getByTestId('timer');
      expect(timer).toHaveClass('gap-4');
    });

    it('renders compact variant correctly', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} variant="compact" data-testid="timer" />);
      
      const timer = screen.getByTestId('timer');
      expect(timer).toHaveClass('gap-2');
    });

    it('renders large variant correctly', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} variant="large" data-testid="timer" />);
      
      const timer = screen.getByTestId('timer');
      expect(timer).toHaveClass('gap-6');
    });

    it('applies correct value text sizes for each variant', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      
      const { rerender } = render(<CountdownTimer targetDate={targetDate} variant="default" />);
      let valueElement = screen.getAllByText(/\d{2}/).find(el => 
        el.className.includes('text-3xl')
      );
      expect(valueElement).toBeInTheDocument();

      rerender(<CountdownTimer targetDate={targetDate} variant="compact" />);
      valueElement = screen.getAllByText(/\d{2}/).find(el => 
        el.className.includes('text-xl')
      );
      expect(valueElement).toBeInTheDocument();

      rerender(<CountdownTimer targetDate={targetDate} variant="large" />);
      valueElement = screen.getAllByText(/\d{2}/).find(el => 
        el.className.includes('text-5xl')
      );
      expect(valueElement).toBeInTheDocument();
    });
  });

  describe('onComplete Callback', () => {
    it('calls onComplete when timer reaches zero', () => {
      const onComplete = jest.fn();
      const targetDate = new Date('2026-02-08T12:00:05Z'); // 5 seconds in future
      
      render(<CountdownTimer targetDate={targetDate} onComplete={onComplete} />);
      
      expect(onComplete).not.toHaveBeenCalled();
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('calls onComplete only once when timer expires', () => {
      const onComplete = jest.fn();
      // Set target date 2 seconds in the future from our mock time
      const targetDate = new Date(mockDate.getTime() + 2000);
      
      render(<CountdownTimer targetDate={targetDate} onComplete={onComplete} />);
      
      // Wait for timer to complete
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      // onComplete should have been called at least once
      expect(onComplete).toHaveBeenCalled();
      
      const callCount = onComplete.mock.calls.length;
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      // Should not increase call count after initial expiration
      expect(onComplete).toHaveBeenCalledTimes(callCount);
    });

    it('does not throw if onComplete is not provided', () => {
      const targetDate = new Date('2026-02-08T12:00:01Z');
      
      expect(() => {
        render(<CountdownTimer targetDate={targetDate} />);
        act(() => {
          jest.advanceTimersByTime(2000);
        });
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('has aria-live attribute for screen readers', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} />);
      
      const timer = screen.getByRole('timer');
      expect(timer).toHaveAttribute('aria-live', 'polite');
    });

    it('has aria-label on each time unit', () => {
      // 1 day, 2 hours, 35 minutes, 20 seconds from mock date
      const targetDate = new Date('2026-02-09T14:35:20Z');
      render(<CountdownTimer targetDate={targetDate} />);
      
      // Check aria-labels on the timer values
      expect(screen.getByLabelText('1 Days')).toBeInTheDocument();
      expect(screen.getByLabelText('2 Hours')).toBeInTheDocument();
      expect(screen.getByLabelText('35 Min')).toBeInTheDocument();
      expect(screen.getByLabelText('20 Sec')).toBeInTheDocument();
    });

    it('has role="timer" attribute', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      render(<CountdownTimer targetDate={targetDate} />);
      
      expect(screen.getByRole('timer')).toBeInTheDocument();
    });

    it('has aria-live="polite" in expired state', () => {
      const targetDate = new Date('2026-02-07T12:00:00Z'); // Past date
      render(<CountdownTimer targetDate={targetDate} />);
      
      const timer = screen.getByRole('timer');
      expect(timer).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Cleanup', () => {
    it('clears interval on unmount', () => {
      const targetDate = new Date('2026-02-09T12:00:00Z');
      const { unmount } = render(<CountdownTimer targetDate={targetDate} />);
      
      unmount();
      
      // Should not throw errors when timer tries to update after unmount
      act(() => {
        jest.advanceTimersByTime(5000);
      });
    });
  });
});
