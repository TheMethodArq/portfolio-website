'use client';

import Link from 'next/link';
import { Container } from './Container';
import { ArrowRight } from 'lucide-react';

const footerLinks = {
  navigation: {
    title: 'Navigation',
    links: [
      { label: 'Methodology', href: '/methodology/' },
      { label: 'Portfolio', href: '/portfolio/' },
      { label: 'Philosophy', href: '/philosophy/' },
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Architecture', href: '/architecture/' },
      { label: 'Security', href: '/architecture/security/' },
      { label: 'Blog', href: '/blog/' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Service', href: '/terms/' },
      { label: 'Cookie Policy', href: '/cookies/' },
    ],
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-accent via-purple-500 to-fuchsia-500" />
      
      {/* CTA Banner */}
      <div className="border-b bg-white border-slate-200">
        <Container>
          <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to build something that doesn&apos;t break?
              </h3>
              <p className="text-slate-600">
                Enterprise-grade architecture and AI strategy — available to you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              <Link
                href="/"
                className="inline-flex items-center gap-2 mb-4"
              >
                <span className="text-xl font-bold text-slate-900">
                  Shawn Sloan
                </span>
              </Link>
              <p className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
                Enterprise Architect &amp; AI Strategist. 20 years building systems that don&apos;t fail — because when systems fail, people get hurt.
              </p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={`${link.href}-${index}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t bg-white border-slate-200">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-500">
              &copy; {currentYear} Shawn Sloan. Built on the Thalamus Method.
            </p>

            {/* Location */}
            <p className="text-sm text-slate-400">
              Port Saint Lucie, Florida
            </p>

            {/* Legal Links - Mobile only (desktop has them in columns) */}
            <div className="flex md:hidden items-center gap-6 text-sm text-slate-500">
              <Link href="/privacy/" className="hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link href="/terms/" className="hover:text-accent transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
