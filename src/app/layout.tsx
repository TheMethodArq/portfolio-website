import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-thalamus-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-thalamus-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shawnsloan.com'),
  title: {
    default: 'Shawn Sloan — Enterprise Architect & AI Strategist',
    template: '%s | Shawn Sloan',
  },
  description:
    '20 years building Fortune 100 systems. Governed AI architecture, enterprise-grade consulting, and the Thalamus Method — now available to you.',
  keywords: [
    'enterprise architecture',
    'AI strategist',
    'AI governance',
    'enterprise consulting',
    'Fortune 100 systems',
    'Thalamus Method',
    'AI infrastructure',
    'multi-LLM orchestration',
  ],
  authors: [{ name: 'Shawn Sloan' }],
  creator: 'Shawn Sloan',
  publisher: 'Shawn Sloan',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shawnsloan.com',
    siteName: 'Shawn Sloan',
    title: 'Shawn Sloan — Enterprise Architect & AI Strategist',
    description:
      '20 years building Fortune 100 systems. Governed AI architecture, enterprise-grade consulting, and the Thalamus Method — now available to you.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shawn Sloan — Enterprise Architect & AI Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shawn Sloan — Enterprise Architect & AI Strategist',
    description:
      '20 years building Fortune 100 systems. Governed AI architecture, enterprise-grade consulting, and the Thalamus Method — now available to you.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#F8FAFC',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
