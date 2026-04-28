'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { FadeIn } from '@/components/animations/FadeIn';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { 
  Mail, Users, Building, Handshake, Shield, Newspaper,
  MapPin, Clock, CheckCircle, AlertCircle, Phone
} from 'lucide-react';

const contactOptions = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Consultation',
    description: 'Discuss your architecture, AI strategy, or infrastructure needs.',
    type: 'consultation',
    color: 'blue',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Project Inquiry',
    description: 'Have a project that needs enterprise-grade architecture?',
    type: 'project',
    color: 'teal',
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: 'Enterprise',
    description: 'Large-scale infrastructure and system design.',
    type: 'enterprise',
    color: 'amber',
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: 'Partnership',
    description: 'Technology and integration partnerships.',
    type: 'partnership',
    color: 'emerald',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Technical/Security',
    description: 'Architecture and compliance questions.',
    type: 'technical',
    color: 'pink',
  },
  {
    icon: <Newspaper className="w-6 h-6" />,
    title: 'Media/Press',
    description: 'Press inquiries and interviews.',
    type: 'press',
    color: 'cyan',
  },
];

const colorClasses: Record<string, string> = {
  blue: 'bg-gradient-to-br from-blue-50/90 to-white border-blue-200/60',
  teal: 'bg-gradient-to-br from-purple-50/90 to-white border-purple-200/60',
  amber: 'bg-gradient-to-br from-indigo-50/90 to-white border-indigo-200/60',
  emerald: 'bg-gradient-to-br from-blue-50/90 to-white border-blue-200/60',
  pink: 'bg-gradient-to-br from-pink-50/90 to-white border-pink-200/60',
  cyan: 'bg-gradient-to-br from-violet-50/90 to-white border-violet-200/60',
};

/**
 * Contact form client component
 * Extracted from page.tsx to enable Server Component metadata export
 * All form state and interactivity preserved
 */
export function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <Section size="lg" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh-light" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
          <Container className="relative z-10">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-accent">Let&apos;s</span>{' '}
                <span className="text-slate-800">Talk</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mb-4">
                Whether you need enterprise architecture, AI strategy, or infrastructure consulting — I&apos;m here to help.
              </p>
              <p className="text-lg text-accent font-medium max-w-2xl">
                Let&apos;s discuss your project and find the right approach.
              </p>
            </FadeIn>
          </Container>
          {/* Section divider */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </Section>

        {/* Contact Options */}
        <Section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-light" />
          <Container className="relative z-10">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">Choose Your Path</h2>
            </FadeIn>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contactOptions.map((option) => (
                <StaggerItem key={option.type}>
                  <button
                    type="button"
                    aria-pressed={formData.type === option.type}
                    className={`h-full p-6 rounded-2xl backdrop-blur-sm border shadow-sm cursor-pointer transition-all hover:shadow-lg text-left w-full ${colorClasses[option.color]} ${
                      formData.type === option.type ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, type: option.type }))}
                  >
                    <div className={`p-3 rounded-xl w-fit mb-4 ${
                      formData.type === option.type
                        ? 'bg-accent text-black'
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {option.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{option.title}</h3>
                    <p className="text-sm text-slate-500">{option.description}</p>
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
          {/* Section divider */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </Section>

        {/* Contact Form */}
        <Section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh-light" />
          <Container size="sm" className="relative z-10">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">Send Me a Message</h2>
            </FadeIn>

            {isSubmitted ? (
              <FadeIn>
                <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-200/60 shadow-sm text-center">
                  <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-slate-600 mb-6">
                    We&apos;ll get back to you within 24-48 hours on business days.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="secondary">
                    Send Another Message
                  </Button>
                </div>
              </FadeIn>
            ) : (
              <FadeIn delay={0.2}>
                <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                      />
                      <Input
                        label="Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-type" className="block text-sm font-medium text-slate-600 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        id="inquiry-type"
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/80 border border-slate-200/60 rounded-lg text-slate-800 focus:outline-none focus:border-accent"
                      >
                        {contactOptions.map((option) => (
                          <option key={option.type} value={option.type}>
                            {option.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Input
                      label="Subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="What's this about?"
                    />

                    <Textarea
                      label="Message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us more..."
                      rows={6}
                    />

                    {error && (
                      <div role="alert" aria-live="polite" className="p-4 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    <Button type="submit" fullWidth loading={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </FadeIn>
            )}
          </Container>
          {/* Section divider */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </Section>

        {/* Contact Info */}
        <Section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-light" />
          <Container className="relative z-10">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <FadeIn delay={0.1}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/90 to-white border border-blue-200/60 shadow-sm text-center">
                  <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Location</h3>
                  <p className="text-slate-600">Port Saint Lucie, Florida</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Remote-first team, local community roots
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/90 to-white border border-purple-200/60 shadow-sm text-center">
                  <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Phone</h3>
                  <a href="tel:+18883818949" className="text-slate-600 hover:text-accent transition-colors">
                    (888) 381-8949
                  </a>
                  <p className="text-sm text-slate-500 mt-2">
                    Mon-Fri 9am-6pm EST
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/90 to-white border border-indigo-200/60 shadow-sm text-center">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Response Time</h3>
                  <p className="text-slate-600">24-48 hours on business days</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Detailed technical questions may take longer
                  </p>
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>

        <Section className="relative overflow-hidden bg-slate-50">
          <Container className="relative z-10">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">Explore More</h2>
            </FadeIn>
            <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <FadeIn delay={0.1}>
                <Link href="/beta" className="block p-4 rounded-xl bg-white border border-slate-200 hover:border-accent hover:shadow-md transition-all text-center">
                  <h3 className="font-semibold text-slate-800 mb-1">Beta Program</h3>
                  <p className="text-sm text-slate-500">Join our founding partner cohort</p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link href="/pricing" className="block p-4 rounded-xl bg-white border border-slate-200 hover:border-accent hover:shadow-md transition-all text-center">
                  <h3 className="font-semibold text-slate-800 mb-1">Pricing</h3>
                  <p className="text-sm text-slate-500">Transparent ASO pricing plans</p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.3}>
                <Link href="/platform/synaptica" className="block p-4 rounded-xl bg-white border border-slate-200 hover:border-accent hover:shadow-md transition-all text-center">
                  <h3 className="font-semibold text-slate-800 mb-1">Platform</h3>
                  <p className="text-sm text-slate-500">Explore the SYNAPTICA stack</p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Link href="/blog" className="block p-4 rounded-xl bg-white border border-slate-200 hover:border-accent hover:shadow-md transition-all text-center">
                  <h3 className="font-semibold text-slate-800 mb-1">Blog</h3>
                  <p className="text-sm text-slate-500">Latest insights on AI &amp; search</p>
                </Link>
              </FadeIn>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
