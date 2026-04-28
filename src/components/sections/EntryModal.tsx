'use client';

// Entry modal disabled - removed for better performance and UX
export function EntryModalWrapper({ children }: { children: React.ReactNode }) {
  // Return children directly without the intro modal
  return <>{children}</>;
}
