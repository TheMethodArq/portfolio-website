import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Home, Search, ArrowRight, HelpCircle, BookOpen, MessageSquare } from 'lucide-react';

// Force static generation for 404 page with proper status code handling
export const dynamic = 'force-static';

// Export metadata to ensure proper 404 status code
export const metadata: Metadata = {
  title: '404 - Page Not Found | Thalamus AI',
  description: 'The page you are looking for could not be found.',
  metadataBase: new URL('https://getthalamus.ai'),
  alternates: {
    canonical: '/404/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getthalamus.ai/404/',
    siteName: 'Thalamus AI',
    title: '404 - Page Not Found | Thalamus AI',
    description: 'The page you are looking for could not be found.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thalamus AI - Page Not Found',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 - Page Not Found | Thalamus AI',
    description: 'The page you are looking for could not be found.',
    images: ['/og-image.png'],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const helpfulLinks = [
    {
      icon: Home,
      title: 'Home',
      description: 'Go back to the homepage',
      href: '/',
    },
    {
      icon: BookOpen,
      title: 'Platform',
      description: 'Explore SYNAPTICA and our products',
      href: '/platform/synaptica/',
    },
    {
      icon: HelpCircle,
      title: 'About Us',
      description: 'Learn about Thalamus AI',
      href: '/company/about/',
    },
    {
      icon: MessageSquare,
      title: 'Contact',
      description: 'Get in touch with our team',
      href: '/contact/',
    },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        <Section size="lg" className="bg-background relative overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <Container className="relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              {/* 404 Display */}
              <div className="mb-8">
                <h1 className="text-8xl md:text-9xl font-bold text-accent/20 select-none">404</h1>
                <div className="relative -mt-16 md:-mt-20">
                  <Search className="w-16 h-16 md:w-20 md:h-20 text-accent mx-auto" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Page Not Found
              </h2>
              <p className="text-xl text-text-secondary mb-8">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back on track.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button href="/">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
                <Button href="/contact/" variant="secondary">
                  Contact Support
                </Button>
              </div>

              {/* Helpful Links */}
              <Card className="text-left">
                <h3 className="text-lg font-bold text-text-primary mb-4 text-center">
                  Helpful Links
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {helpfulLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <link.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm text-text-tertiary">{link.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* SOPHIA suggestion */}
              <div className="mt-8 p-4 rounded-lg bg-accent/5 border border-accent/20">
                <p className="text-text-secondary text-sm">
                  <span className="text-accent font-semibold">SOPHIA suggests:</span> If you were
                  looking for something specific, try using the navigation menu or{' '}
                  <Link href="/contact/" className="text-accent hover:underline">
                    contact us
                  </Link>{' '}
                  and we&apos;ll help you find it.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Quick Navigation */}
        <Section className="bg-background-secondary">
          <Container>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Explore Thalamus AI</h2>
              <p className="text-text-secondary mb-8">
                Discover our platform, products, and how we&apos;re democratizing enterprise AI.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/platform/synaptica/" variant="secondary">
                  SYNAPTICA Platform
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/sophia/" variant="secondary">
                  Meet SOPHIA
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/beta/" variant="ghost">
                  Join Beta
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
