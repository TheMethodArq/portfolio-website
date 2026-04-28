'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';
import type { NavItem } from '@/types';

const navigation: NavItem[] = [
  { label: 'Methodology', href: '/methodology/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Philosophy', href: '/philosophy/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  
  // Check if we're on the homepage for light theme
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        isScrolled
          ? isHomepage
            ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm'
            : 'bg-background/80 backdrop-blur-xl border-b border-border-glass'
          : 'bg-transparent'
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className={cn(
              "flex items-center",
              isHomepage ? "text-light-primary" : "text-text-primary"
            )}
          >
            <span className="text-xl font-bold tracking-tight">
              Shawn Sloan
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 rounded-lg',
                  'text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-accent bg-accent/10'
                    : isHomepage
                      ? 'text-light-secondary hover:text-light-primary hover:bg-black/5'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-glass'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button 
              href="/contact/" 
              size="sm"
              variant="ghost"
              className={isHomepage ? "text-light-secondary hover:text-light-primary" : ""}
            >
              Get in Touch
            </Button>
          </div>

          <button
            ref={mobileMenuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2",
              isHomepage
                ? "text-light-secondary hover:text-light-primary"
                : "text-text-secondary hover:text-text-primary"
            )}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "lg:hidden border-b overflow-y-auto max-h-[80vh]",
              isHomepage
                ? "bg-white/95 backdrop-blur-xl border-black/5"
                : "bg-background-secondary/95 backdrop-blur-xl border-border-glass"
            )}
          >
            <Container>
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 rounded-lg',
                      'text-base font-medium transition-colors',
                      isActive(item.href)
                        ? 'text-accent bg-accent/10'
                        : isHomepage
                          ? 'text-light-primary'
                          : 'text-text-primary'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
