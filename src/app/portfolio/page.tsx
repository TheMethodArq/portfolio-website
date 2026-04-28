import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/animations/FadeIn';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { 
  Brain, Building2, MapPin, Search, Code, Server, Layers,
  ArrowRight, ExternalLink, Zap, Shield, Activity
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio — Shawn Sloan',
  description: 'Projects built by Shawn Sloan: Thalamus AI Platform, xAI Colossus, Mercedes-Benz Stadium infrastructure, ipixx.ai, HypeLocal, Cortex Digital, and more.',
  alternates: {
    canonical: '/portfolio',
  },
};

const projects = [
  {
    icon: <Server className="w-7 h-7" />,
    title: 'Thalamus AI Platform',
    description: '51-microservice governed AI infrastructure. Multi-LLM orchestration. Sub-150ms P95 latency. The platform that proves enterprise AI can be built right.',
    tags: ['51 Microservices', 'Multi-LLM', 'Sub-150ms P95', 'Governed'],
    status: 'production' as const,
    highlights: [
      'Full SOPHIA governance layer with immutable audit trails',
      'Multi-provider LLM orchestration (OpenAI, Anthropic, etc.)',
      'Progressive autonomy from P0 to P4',
      'VPC-isolated deployments for enterprise security',
    ],
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: 'ipixx.ai',
    description: 'AI-powered marketing platform for real estate professionals. Intelligent listing optimization, market analysis, and lead generation.',
    tags: ['Real Estate', 'AI Marketing', 'SaaS'],
    status: 'production' as const,
    highlights: [
      'AI-driven property listing optimization',
      'Automated market analysis and pricing recommendations',
      'Lead scoring and nurturing automation',
    ],
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    title: 'HypeLocal',
    description: 'Municipal-first local discovery platform. Connecting communities with local businesses, events, and services through intelligent discovery.',
    tags: ['Local Discovery', 'Municipal', 'Platform'],
    status: 'production' as const,
    highlights: [
      'Municipality-integrated local business directory',
      'Event discovery and community engagement',
      'Location-based recommendation engine',
    ],
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'xAI Colossus',
    description: 'Infrastructure for the world\'s largest AI supercomputer. Enterprise-scale architecture supporting massive GPU clusters and distributed workloads.',
    tags: ['Supercomputer', 'GPU Clusters', 'Infrastructure'],
    status: 'production' as const,
    highlights: [
      'World\'s largest AI supercomputer infrastructure',
      'Massive GPU cluster orchestration',
      'Enterprise-grade networking and storage',
    ],
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    title: 'Mercedes-Benz Stadium',
    description: 'Enterprise infrastructure at stadium scale. Systems designed to handle peak loads of 70,000+ concurrent users with zero downtime.',
    tags: ['Stadium', 'Enterprise Scale', 'High Availability'],
    status: 'production' as const,
    highlights: [
      'Infrastructure for 70,000+ concurrent users',
      'High-availability architecture with zero downtime',
      'Real-time systems integration',
    ],
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: 'Cortex Digital',
    description: 'Adaptive Search Optimization — making businesses visible in AI search. Not traditional SEO. A fundamentally different approach to being found in the age of AI.',
    tags: ['ASO', 'AI Search', 'Visibility'],
    status: 'production' as const,
    highlights: [
      'Vector Visibility Score (VVS) measurement',
      'Semantic distance optimization',
      'Multi-platform AI search coverage',
    ],
  },
  {
    icon: <Code className="w-7 h-7" />,
    title: 'Thalamus Standard',
    description: 'Open-source enterprise development standard injectable into any repo. The governance and architecture patterns from the Thalamus Platform, available to everyone.',
    tags: ['Open Source', 'Standard', 'Injectable'],
    status: 'production' as const,
    highlights: [
      'Injectable into any existing repository',
      'Enterprise governance patterns out of the box',
      'Community-driven development standards',
    ],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        
        {/* Hero */}
        <Section size="lg" className="bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh-dark opacity-40" />
          <Container className="relative z-10">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/20 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8">
                  <Layers className="w-4 h-4" />
                  Portfolio
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
                  Things I&apos;ve <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent to-purple-500">
                    Built
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                  From the world&apos;s largest AI supercomputer to platforms serving local communities. 
                  <span className="text-white font-medium"> Every project built on the same principle: governed, reliable, built to last.</span>
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Projects Grid */}
        <Section className="bg-white py-32">
          <Container>
            <div className="space-y-8">
              {projects.map((project, idx) => (
                <FadeIn key={project.title} delay={idx * 0.05}>
                  <Card className="p-8 md:p-10 bg-white border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left: Icon + Title */}
                      <div className="lg:w-1/3">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 rounded-2xl bg-slate-900 text-white flex-shrink-0 group-hover:bg-accent transition-colors">
                            {project.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
                            <Badge status={project.status} className="mt-2" />
                          </div>
                        </div>
                        <p className="text-lg text-slate-600 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Highlights */}
                      <div className="lg:w-2/3">
                        <div className="grid sm:grid-cols-2 gap-4">
                          {project.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
                            >
                              <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-700 font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* Stats */}
        <Section className="bg-slate-50 py-32">
          <Container>
            <FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">7</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Projects Shipped</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">51</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Microservices</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">20+</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">&lt;150ms</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">P95 Latency</div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* CTA */}
        <Section className="bg-white py-32">
          <Container>
            <FadeIn>
              <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
                <div className="relative z-10 text-center space-y-8">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Have a Project in Mind?
                  </h2>
                  <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    I bring enterprise architecture to projects of every size. Let&apos;s build something that lasts.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button href="/contact" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 w-full sm:w-auto">
                      Let&apos;s Talk
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button href="/methodology" size="lg" variant="ghost" className="text-white hover:bg-white/10 w-full sm:w-auto">
                      See the Methodology
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

      </main>
      <Footer />
    </>
  );
}
