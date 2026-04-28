import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { 
  Wrench, Flame, Truck, Building2, Brain, ArrowRight, CheckCircle,
  Shield, Eye, Layers, Target, Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — Shawn Sloan',
  description: 'From mechanic to firefighter to enterprise architect. 20+ years building Fortune 100 infrastructure, including xAI Colossus and Mercedes-Benz Stadium.',
  alternates: {
    canonical: '/about',
  },
};

const timeline = [
  {
    icon: <Wrench className="w-6 h-6" />,
    period: 'The Early Years',
    title: 'Mechanic',
    description: 'Learned how systems work by tearing them apart and putting them back together. Diagnosed problems, not symptoms.',
  },
  {
    icon: <Flame className="w-6 h-6" />,
    period: 'The Crucible',
    title: 'Firefighter',
    description: 'When systems fail, people get hurt. This is where I learned that reliability isn\'t optional — it\'s life or death.',
  },
  {
    icon: <Truck className="w-6 h-6" />,
    period: 'The Hustle',
    title: 'Tow Truck Driver',
    description: 'Nobody calls a tow truck because things are going well. Problem-solving under pressure, every single day.',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    period: '20 Years',
    title: 'Enterprise Architect',
    description: 'IBM. Computacenter. Fortune 100. Built infrastructure that handles millions of transactions. Learned what "enterprise-grade" actually means.',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    period: 'Now',
    title: 'AI Builder',
    description: 'Building governed AI infrastructure for the world. xAI Colossus. Thalamus Platform. Making enterprise architecture accessible to everyone.',
  },
];

const credentials = [
  { icon: <Award className="w-5 h-5" />, text: '20+ years enterprise architecture' },
  { icon: <Building2 className="w-5 h-5" />, text: 'IBM, Computacenter, Fortune 100' },
  { icon: <Shield className="w-5 h-5" />, text: 'Built xAI Colossus infrastructure' },
  { icon: <Target className="w-5 h-5" />, text: 'Mercedes-Benz Stadium systems' },
  { icon: <Layers className="w-5 h-5" />, text: '51-microservice platform in production' },
  { icon: <Eye className="w-5 h-5" />, text: 'Sub-150ms P95 latency' },
];

const philosophy = [
  {
    title: 'Governance Before Speed',
    description: 'Fast and broken isn\'t impressive. Fast and safe is. I build systems you can trust with your business.',
  },
  {
    title: 'Orchestrate, Don\'t Build',
    description: 'I don\'t reinvent wheels. I orchestrate the best tools, models, and platforms into systems that work together.',
  },
  {
    title: 'Radical Transparency',
    description: 'I show you exactly what I\'m doing, why, and what it costs. No black boxes, no hidden fees, no BS.',
  },
];

export default function AboutPage() {
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
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent to-purple-500">Unconventional</span> Path
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Mechanic → Firefighter → Tow Truck Driver → Enterprise Architect → AI Builder
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* The Origin Story */}
        <Section className="bg-white py-32">
          <Container size="md">
            <FadeIn>
              <div className="space-y-8">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-8">
                  <Flame className="w-7 h-7" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                  &ldquo;When systems fail, people get hurt.&rdquo;
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  I started my career not in tech, but in the real world — turning wrenches, running into burning buildings, 
                  and picking up the pieces when things went wrong. Those experiences shaped everything about how I build systems today.
                </p>
                <p className="text-xl text-slate-600 leading-relaxed">
                  As a firefighter, I learned that reliability isn\'t a feature — it\'s a requirement. When the alarm sounds, 
                  your equipment has to work. No exceptions. No excuses. I bring that same standard to every system I architect.
                </p>
                <p className="text-xl text-slate-600 leading-relaxed">
                  After transitioning into technology, I spent 20 years at IBM, Computacenter, and Fortune 100 companies 
                  building the infrastructure that keeps businesses running. I built systems for xAI Colossus — the world\'s 
                  largest AI supercomputer. I architected infrastructure for Mercedes-Benz Stadium. I\'ve seen what works at scale, 
                  and I\'ve seen what fails.
                </p>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
                  <p className="text-2xl font-bold text-slate-900 border-l-4 border-accent pl-6 leading-tight">
                    I watched SMBs get fleeced by vendors selling enterprise dreams with enterprise price tags — 
                    but delivering consumer-grade results. I decided to change that.
                  </p>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed">
                  I\'ve built the expensive version. Now I\'m building the accessible version. Same architecture. 
                  Same governance. Same reliability. Without the Fortune 100 price tag.
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Timeline */}
        <Section className="bg-slate-50 py-32">
          <Container>
            <FadeIn className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                The Path
              </h2>
              <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                Every step taught me something that code alone never could.
              </p>
            </FadeIn>

            <div className="max-w-3xl mx-auto space-y-8">
              {timeline.map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <Card className="p-8 bg-white border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300">
                    <div className="flex gap-6">
                      <div className="p-3 rounded-2xl bg-slate-900 text-white flex-shrink-0 h-fit">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-accent uppercase tracking-widest mb-1">{item.period}</p>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* Credentials */}
        <Section className="bg-white py-32">
          <Container>
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Credentials
              </h2>
            </FadeIn>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {credentials.map((item) => (
                <StaggerItem key={item.text}>
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 h-full">
                    <div className="text-accent flex-shrink-0">{item.icon}</div>
                    <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        {/* Philosophy */}
        <Section className="bg-slate-50 py-32">
          <Container>
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                How I Work
              </h2>
              <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                Three principles that guide every engagement.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {philosophy.map((item, idx) => (
                <FadeIn key={item.title} delay={idx * 0.1}>
                  <Card className="p-8 h-full bg-white border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section className="bg-white py-32">
          <Container>
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800 tracking-tight">
                  Want to Work Together?
                </h2>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  I bring enterprise architecture to companies that thought they couldn\'t afford it. Let\'s talk.
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
        </Section>

      </main>
      <Footer />
    </>
  );
}
