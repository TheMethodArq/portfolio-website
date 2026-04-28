import type { Metadata } from 'next';
import { ContactFormClient } from './ContactFormClient';

/**
 * Contact page metadata for SEO
 * Refactored to Server Component to support metadata export
 */
export const metadata: Metadata = {
  title: 'Contact Shawn Sloan — Enterprise Architecture & AI Strategy',
  description:
    'Get in touch with Shawn Sloan for enterprise architecture consulting, governed AI strategy, and infrastructure design.',
  metadataBase: new URL('https://shawnsloan.com'),
  alternates: {
    canonical: '/contact',
  },
  keywords: [
    'contact Shawn Sloan',
    'enterprise architect consultation',
    'AI strategy session',
    'enterprise architecture consulting',
    'governed AI',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shawnsloan.com/contact',
    siteName: 'Shawn Sloan',
    title: 'Contact Shawn Sloan — Enterprise Architecture & AI Strategy',
    description:
      'Get in touch with Shawn Sloan for enterprise architecture consulting, governed AI strategy, and infrastructure design.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Shawn Sloan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Shawn Sloan — Enterprise Architecture & AI Strategy',
    description:
      'Get in touch with Shawn Sloan for enterprise architecture consulting, governed AI strategy, and infrastructure design.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Contact page - Server Component
 * Form logic moved to ContactFormClient component
 */
export default function ContactPage() {
  return <ContactFormClient />;
}
