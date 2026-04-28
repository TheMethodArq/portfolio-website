import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { EntryModalWrapper } from '@/components/sections/EntryModal';
import {
  ArrowRight,
  Brain,
  Shield,
  Layers,
  Eye,
  Server,
  Building2,
  Zap,
  Search,
  CheckCircle,
  Award,
  Flame,
  Cpu,
} from 'lucide-react';

/**
 * Homepage-specific metadata for SEO
 */
export const metadata: Metadata = {
  title: 'Shawn Sloan — Enterprise Architect & AI Strategist',
  description:
    '20 years building Fortune 100 systems — xAI Colossus, Mercedes-Benz Stadium, and more. Now I build them for you. Enterprise architecture and governed AI consulting.',
  keywords: [
    'enterprise architect',
    'AI strategist',
    'governed AI',
    'enterprise consulting',
    'Shawn Sloan',
    'AI infrastructure',
    'Fortune 100 systems',
  ],
  metadataBase: new URL('https://shawnsloan.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shawnsloan.com/',
    siteName: 'Shawn Sloan',
    title: 'Shawn Sloan — Enterprise Architect & AI Strategist',
    description:
      '20 years building Fortune 100 systems. Now I build them for you — without the Fortune 100 price tag.',
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
      '20 years building Fortune 100 systems. Now I build them for you — without the Fortune 100 price tag.',
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

// ============================================
// DATA
// ============================================

const services = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Governed AI Architecture',
    description:
      'I design AI systems that are safe, auditable, and production-ready. Governance isn\'t an afterthought — it\'s the foundation.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Consulting',
    description:
      'Infrastructure strategy, system design, and technology leadership for companies that need Fortune 100 expertise without Fortune 100 overhead.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'The Thalamus Method',
    description:
      'A 6-pillar methodology built from 20 years of real-world system architecture. Proven at scale. Now available to you.',
  },
];

const credentials = [
  {
    icon: <Award className="w-6 h-6" />,
    stat: '20+ Years',
    detail: 'Enterprise architecture for IBM, Computacenter, and Fortune 100 companies',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    stat: 'xAI Colossus',
    detail: 'Infrastructure for the world\'s largest AI supercomputer',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    stat: 'Fortune 100',
    detail: 'Mercedes-Benz Stadium, IBM, and enterprise systems at the highest level',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    stat: 'The Accessible Version',
    detail: 'I\'ve built the expensive version. Now I\'m building the accessible version.',
  },
];

const methodPillars = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: 'No Bullshit',
    subtitle: 'Transparency Over Marketing',
    description: 'No black boxes. No buzzwords. I show you exactly what I\'m doing, why, and what it costs.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Safety First',
    subtitle: 'Governance Before Speed',
    description: 'Fast and broken isn\'t impressive. Fast and safe is. Governance baked in, not bolted on.',
  },
  {
    icon: <Flame className="w-5 h-5" />,
    title: 'Built to Last',
    subtitle: 'No VC Pressure',
    description: '20-year architecture thinking. No venture capital deadlines. Infrastructure that endures.',
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: 'Listen First',
    subtitle: 'Understand Before Building',
    description: 'I don\'t start coding until I understand your problem. Real solutions start with real listening.',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Never Locked In',
    subtitle: 'Platform Independence',
    description: 'I orchestrate the best tools and platforms. You own your architecture. No vendor dependency.',
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: 'Humans in Charge',
    subtitle: 'Augmentation, Not Replacement',
    description: 'AI extends your capabilities. It doesn\'t replace your judgment. People always have the final say.',
  },
];

const featuredProjects = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'xAI Colossus',
    description: 'Infrastructure for the world\'s largest AI supercomputer.',
    tags: ['Supercomputer', 'Infrastructure'],
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Mercedes-Benz Stadium',
    description: 'Enterprise systems for 70,000+ concurrent users, zero downtime.',
    tags: ['Stadium Scale', 'High Availability'],
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Thalamus AI Platform',
    description: '51-microservice governed AI infrastructure with multi-LLM orchestration.',
    tags: ['51 Services', 'Governed AI'],
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Cortex Digital',
    description: 'Adaptive Search Optimization — making businesses visible in AI search.',
    tags: ['ASO', 'AI Visibility'],
  },
];

/**
 * Homepage — Shawn Sloan, Solo Consultant
 */
export default function HomePage() {
  return (
    <EntryModalWrapper>
      <Navbar />
      <main id="main-content">
        <Hero />

        {/* ── What I Do ── */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-light" />
          <Container className="relative z-10">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-50 border border-blue-200/50 shadow-sm">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">What I Do</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
                  Enterprise Architecture, <span className="text-gradient">Personal Service</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  I bring the same architecture principles that power Fortune 100 companies — adapted for your scale, your budget, and your reality.
                </p>
              </div>
            </FadeIn>

            <Stagger className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <StaggerItem key={service.title}>
                  <Card className="p-8 h-full bg-white border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300">
                    <div className="p-3 rounded-2xl bg-slate-900 text-white w-fit mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ── Credentials ── */}
        <section className="relative py-24 bg-slate-50 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <Container className="relative z-10">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
                  Built at <span className="text-gradient">Scale</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Not slides. Not theory. Real systems, running in production, at the highest levels.
                </p>
              </div>
            </FadeIn>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((cred) => (
                <StaggerItem key={cred.stat}>
                  <Card className="p-6 h-full bg-white border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300 text-center">
                    <div className="p-3 rounded-2xl bg-accent/10 text-accent w-fit mx-auto mb-4">
                      {cred.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{cred.stat}</h3>
                    <p className="text-sm text-slate-600">{cred.detail}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* ── The Method ── */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-lines-subtle" />
          <Container className="relative z-10">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-50 border border-purple-200/50 shadow-sm">
                  <Layers className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">The Method</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
                  The Six <span className="text-gradient">Pillars</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Every engagement is built on these principles. They&apos;re not optional add-ons — they&apos;re the chassis.
                </p>
              </div>
            </FadeIn>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {methodPillars.map((pillar) => (
                <StaggerItem key={pillar.title}>
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-lg transition-all duration-300 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-accent/10 text-accent">{pillar.icon}</div>
                      <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                    </div>
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-3">{pillar.subtitle}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn delay={0.3}>
              <div className="mt-12 text-center">
                <Button href="/methodology" variant="secondary" size="lg">
                  Explore the Full Methodology
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* ── Portfolio Teaser ── */}
        <section className="relative py-24 bg-slate-50 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <Container className="relative z-10">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
                  Selected <span className="text-gradient">Projects</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  From the world&apos;s largest AI supercomputer to platforms serving local communities.
                </p>
              </div>
            </FadeIn>

            <Stagger className="grid sm:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <StaggerItem key={project.title}>
                  <Card className="p-6 h-full bg-white border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-slate-900 text-white flex-shrink-0 group-hover:bg-accent transition-colors">
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h3>
                        <p className="text-sm text-slate-600 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn delay={0.3}>
              <div className="mt-12 text-center">
                <Button href="/portfolio" size="lg">
                  See All Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* ── Quote / About Teaser ── */}
        <section className="relative py-24 overflow-hidden">
          <Container>
            <FadeIn>
              <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
                <div className="relative z-10 text-center space-y-6">
                  <Flame className="w-10 h-10 text-red-400 mx-auto" />
                  <blockquote className="text-2xl md:text-4xl font-bold leading-tight tracking-tight">
                    &ldquo;When systems fail, people get hurt.&rdquo;
                  </blockquote>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    I started my career as a firefighter and mechanic. That shaped everything about how I build systems.
                    Reliability isn&apos;t a feature — it&apos;s a requirement. I bring that standard to every system I architect.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button href="/about" size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                      My Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button href="/contact" size="lg" variant="ghost" className="text-white hover:bg-white/10">
                      Work With Me
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* ── Final CTA ── */}
        <section className="relative py-24 bg-slate-50 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <Container>
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800 tracking-tight">
                  Ready to Build Something That Doesn&apos;t Break?
                </h2>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  I bring enterprise architecture to companies that thought they couldn&apos;t afford it.
                  Same architecture. Same governance. Without the Fortune 100 price tag.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button href="/contact" size="lg">
                    Get in Touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button href="/portfolio" variant="secondary" size="lg">
                    See My Work
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
    </EntryModalWrapper>
  );
}
