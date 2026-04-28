'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  List,
  ChevronRight,
  Clock,
  Bookmark,
  Share2,
  X,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { NewsletterCTA } from './NewsletterCTA';
import { ProductBridgeCTA } from './ProductBridgeCTA';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface StickySidebarProps {
  /** Table of contents items */
  tableOfContents?: TOCItem[];
  /** Estimated read time */
  readTime?: string;
  /** Article publish date */
  publishDate?: string;
  /** Content context for contextual CTA */
  contentContext?: 'aso' | 'vvs' | 'llmo' | 'illusion' | 'general';
  /** Custom CTA component (overrides default) */
  customCTA?: React.ReactNode;
  /** Whether sidebar should be collapsible on mobile */
  collapsible?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Desktop sticky sidebar with:
 * - Reading progress indicator
 * - Table of contents with scroll spy
 * - Contextual CTA
 * - Share/bookmark actions
 */
export function StickySidebar({
  tableOfContents = [],
  readTime,
  publishDate,
  contentContext = 'general',
  customCTA,
  collapsible = true,
  className,
}: StickySidebarProps) {
  const { progress } = useScrollProgress();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Scroll spy - track active section
  useEffect(() => {
    if (tableOfContents.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0,
      }
    );

    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  const toggleBookmark = useCallback(() => {
    setIsBookmarked((prev) => !prev);
    // TODO: Persist to localStorage or API
  }, []);

  // Contextual CTA based on content type
  const renderContextualCTA = () => {
    if (customCTA) return customCTA;

    if (contentContext === 'illusion') {
      return (
        <NewsletterCTA variant="sidebar" tone="skeptical" trackingId="sidebar-skeptical" />
      );
    }

    if (contentContext === 'aso' || contentContext === 'vvs') {
      return (
        <ProductBridgeCTA
          variant="compact"
          context={contentContext}
          trackingId="sidebar-product"
        />
      );
    }

    return (
      <NewsletterCTA
        variant="sidebar"
        tone="general"
        trackingId="sidebar-newsletter"
      />
    );
  };

  const sidebarContent = (
    <>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-text-tertiary flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readTime || '5 min read'}
          </span>
          <span className="text-accent font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-surface-elevated rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <List className="w-4 h-4 text-accent" />
            Contents
          </h4>
          <nav className="space-y-1">
            {tableOfContents.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors',
                  'hover:bg-surface-glass',
                  item.level === 2 ? 'pl-2' : 'pl-6',
                  activeSection === item.id
                    ? 'text-accent bg-accent/5 font-medium'
                    : 'text-text-secondary'
                )}
              >
                <span className="line-clamp-1">{item.text}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border-glass">
        <button
          onClick={toggleBookmark}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors',
            isBookmarked
              ? 'bg-accent/10 text-accent'
              : 'bg-surface-glass text-text-secondary hover:bg-surface-elevated'
          )}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
        >
          <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-current')} />
          {isBookmarked ? 'Saved' : 'Save'}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm bg-surface-glass text-text-secondary hover:bg-surface-elevated transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Contextual CTA */}
      {renderContextualCTA()}

      {/* Publish date */}
      {publishDate && (
        <p className="text-xs text-text-tertiary mt-6 text-center">
          Published {new Date(publishDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block sticky top-24 self-start',
          'w-72 xl:w-80',
          className
        )}
      >
        <Card className="p-5">
          {sidebarContent}
        </Card>
      </aside>

      {/* Mobile Toggle Button */}
      {collapsible && (
        <>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden fixed right-4 bottom-24 z-40 w-12 h-12 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:bg-accent-hover transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {isMobileOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                  onClick={() => setIsMobileOpen(false)}
                />

                {/* Drawer */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="lg:hidden fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background z-50 overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-text-primary">Article Menu</h3>
                      <button
                        onClick={() => setIsMobileOpen(false)}
                        className="p-2 rounded-lg hover:bg-surface-glass transition-colors"
                      >
                        <X className="w-5 h-5 text-text-secondary" />
                      </button>
                    </div>
                    {sidebarContent}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default StickySidebar;
