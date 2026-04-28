/**
 * Global type declarations
 */

export {};

/* eslint-disable @typescript-eslint/no-explicit-any */

// Google Analytics
interface GtagCommand {
  (command: 'event', eventName: string, eventParams?: Record<string, any>): void;
  (command: 'config', targetId: string, config?: Record<string, any>): void;
  (command: 'set', customMap: Record<string, any>): void;
  (...args: any[]): void;
}

// Segment Analytics
interface SegmentAnalytics {
  track: (event: string, properties?: Record<string, unknown>) => void;
  page: (name?: string, properties?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
  [key: string]: any;
}

declare global {
  interface Window {
    gtag?: GtagCommand;
    analytics?: SegmentAnalytics;
    dataLayer?: Record<string, any>[];
  }
}
