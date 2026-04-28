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
  Eye, Shield, Wallet, Users, Layers, Brain,
  ArrowRight, CheckCircle, XCircle, Target, Heart,
  Flame, Lock, AlertTriangle, Sparkles, MessageSquareQuote
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Philosophy - Why We\'re Building This',
  description:
    "The Fortune 500 playbook shouldn't cost Fortune 500 money. Here's why we're democratizing enterprise AI for small and medium businesses.",
  metadataBase: new URL('https://getthalamus.ai'),
  alternates: {
    canonical: '/philosophy/',
  },
  keywords: [
    'Thalamus AI philosophy',
    'AI democratization',
    'enterprise AI for SMBs',
    'transparent AI',
    'AI governance',
    'bootstrap AI company',
    'AI ethics',
  ]
};

const principles = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'No Bullshit',
    subtitle: 'Transparency Over Marketing',
    points: [
      'We show you what\'s real vs. what\'s visionary',
      'We admit when we don\'t know something',
      'We share technical methodology, not just hype',
      'No fake metrics, no made-up customer stories',
    ],
    realTalk: 'You\'ll see competitors with slicker marketing and bigger promises. We\'re okay with that. We\'re building for people who value honesty.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Safety First',
    subtitle: 'Governance Before Speed',
    points: [
      'SOPHIA enforces the rules before code runs',
      'When uncertain, we stop and ask—not guess',
      'Every decision is logged and traceable',
      'Compliance isn\'t a checkbox, it\'s built-in',
    ],
    realTalk: 'Fast and broken isn\'t impressive. Fast and safe is. We\'d rather annoy you with a confirmation than let you nuke production.',
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: 'Built to Last',
    subtitle: 'No VC Pressure, No Exit Timeline',
    points: [
      '20-year vision, not 5-year flip',
      'Privately owned—no investors rushing us',
      'Sustainable pricing, not burn-and-churn',
      'We\'re here for the long haul',
    ],
    realTalk: 'We\'re not trying to get acquired. We\'re trying to build something that still matters in 2045.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Listen First',
    subtitle: 'Understand Before Building',
    points: [
      'We talk to real people doing real work',
      'We validate problems before solving them',
      'We learn the compliance requirements early',
      'We admit what we don\'t understand',
    ],
    realTalk: 'Too many tech companies build solutions looking for problems. We do it backwards: find the problem, then build the solution.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Never Locked In',
    subtitle: 'Platform Independence',
    points: [
      'When OpenAI ships a feature, we add support',
      'When Anthropic does something better, we switch',
      'You\'re never stuck with one AI provider',
      'Intelligence should be a commodity, not a moat',
    ],
    realTalk: 'Vendor lock-in is how companies die. We built the system so you can switch AI providers like you switch light bulbs.',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Humans in Charge',
    subtitle: 'Augmentation, Not Replacement',
    points: [
      'AI makes you better at your job, doesn\'t take it',
      'Clear lines between what AI does and what you decide',
      'Your expertise scales, it doesn\'t disappear',
      'You stay in control, always',
    ],
    realTalk: 'AI that replaces people is a dystopia. AI that makes people superhuman? That\'s the goal.',
  },
];

const whatWeAreNot = [
  { 
    title: 'Not a Consulting Business', 
    desc: 'We build products you can use yourself. No $200/hour consultants required.',
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
  { 
    title: 'Not an AI Research Lab', 
    desc: 'We don\'t invent new AI models. We orchestrate the ones that already work.',
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
  { 
    title: 'Not a Lead Gen Service', 
    desc: 'We don\'t sell your data. We don\'t sell leads. We sell software.',
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
  { 
    title: 'Not a Quick Flip', 
    desc: 'No exit pressure. No VC timeline. No pivot-of-the-month.',
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
  { 
    title: 'Not Replacing Your Systems', 
    desc: 'We connect to what you already use. We don\'t force you to switch.',
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        
        {/* Hero Section */}
        <Section size="lg" className="bg-white relative overflow-hidden flex items-center">
          <div className="absolute inset-0 bg-mesh-light opacity-50" />
          <Container className="relative z-10">
            <FadeIn>
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-slate-50 border border-slate-200">
                  <Heart className="w-4 h-4 text-accent" />
                  <span className="text-sm font-bold text-slate-800 uppercase tracking-widest">Our North Star</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
                  The Fortune 500 Playbook <br />
                  <span className="text-accent underline decoration-slate-200 underline-offset-8 decoration-4">Shouldn't Cost</span> <br />
                  <span className="text-slate-800">Fortune 500 Money</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-8 leading-relaxed">
                  Enterprise AI capabilities exist. They work. They're proven. But they're locked behind 
                  six-figure price tags and armies of consultants. That's not a technology problem—
                  <span className="text-slate-900 font-bold"> it's artificial gatekeeping.</span>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contact" size="lg">
                    Join the Mission
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </Section>

        {/* The Problem Grid */}
        <Section className="bg-slate-50 py-32 border-b border-slate-200">
          <Container>
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                The Artificial Gap
              </h2>
              <p className="text-xl text-slate-500 mt-4 max-w-2xl mx-auto">
                Why we're dismantling the traditional enterprise software model.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* The Gatekeeping Column */}
              <FadeIn delay={0.1}>
                <div className="p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Flame className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-red-50 text-red-600">
                      <Flame className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">The Black Box Model</h3>
                  </div>
                  <ul className="space-y-5">
                    {[
                      'Enterprise AI costs $100K+ to implement',
                      'Requires consultants at $200-500/hour',
                      'Takes 6-12 months to see marginal results',
                      'SMBs get locked out by complexity and cost',
                      'The "Gap" is a profitable business model'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-600 font-medium">
                        <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* The Position Column */}
              <FadeIn delay={0.2}>
                <div className="p-10 rounded-[2.5rem] bg-slate-900 border border-slate-800 text-white shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute bottom-0 right-0 p-8 opacity-5">
                    <Target className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-accent text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">The Thalamus Position</h3>
                  </div>
                  <ul className="space-y-5">
                    {[
                      'The technology already exists and works',
                      'The gap is purely artificial, not technical',
                      'SMBs deserve Fortune 500 capabilities',
                      'We deliver the same value at 1/10th the cost',
                      'Democratization is an ideological mandate'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-300 font-medium">
                        <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>

        {/* Speed & Trust Section */}
        <Section className="bg-white py-32">
          <Container size="md">
            <FadeIn>
              <div className="text-center mb-16 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                  Speed Without Trust Is Just <span className="text-red-600">Chaos</span>
                </h2>
                <p className="text-xl text-slate-500 mt-6 leading-relaxed max-w-2xl mx-auto">
                  Intelligence must be subordinate to control. AI should be smart, but you should always be in charge.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                 <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                       <AlertTriangle className="w-4 h-4" /> The Risk
                    </h4>
                    <ul className="space-y-4">
                      {[
                        'Decisions made without rationale',
                        'Customer failures with zero audit trail',
                        'Regulation without evidentiary proof',
                        'Automation creating liability over value'
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div className="p-10 rounded-3xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-2">
                       <Shield className="w-4 h-4" /> The SOPHIA Enforcer
                    </h4>
                    <p className="text-indigo-900 font-bold text-xl leading-snug">
                       "Governance isn't an afterthought—it's the chassis. We provide deterministic policy enforcment so AI can work safely at scale."
                    </p>
                 </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Our Principles - Premium Grid */}
        <Section className="bg-slate-50 py-32 border-y border-slate-200">
          <Container>
            <FadeIn className="text-center mb-20 px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Six Pillars of Operation
              </h2>
              <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                How we navigate building a 20-year infrastructure company.
              </p>
            </FadeIn>

            <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {principles.map((principle) => (
                <StaggerItem key={principle.title}>
                  <Card className="h-full bg-white border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300 p-8 flex flex-col group">
                    <div className="p-3 rounded-2xl bg-slate-950 text-white w-fit mb-6 shadow-lg group-hover:bg-accent transition-colors">
                      {principle.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{principle.title}</h3>
                    <p className="text-sm text-accent font-bold uppercase tracking-widest mb-6">{principle.subtitle}</p>
                    
                    <ul className="space-y-3 mb-8 flex-grow">
                      {principle.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-6 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquareQuote className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Insight Note</span>
                      </div>
                      <p className="text-xs text-slate-500 italic leading-relaxed">
                        {principle.realTalk}
                      </p>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        {/* Clear boundaries */}
        <Section className="bg-white py-32">
          <Container>
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Defining What We Are Not
              </h2>
              <p className="text-lg text-slate-500 mt-4">Transparent constraints lead to better outcomes.</p>
            </FadeIn>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {whatWeAreNot.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center h-full hover:bg-slate-100/50 transition-colors">
                    <div className="mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        {/* Built for the Long Game */}
        <Section className="bg-slate-900 text-white relative overflow-hidden py-32 border-t border-slate-800">
           <div className="absolute inset-0 bg-mesh-dark opacity-30" />
           <Container size="md" className="relative z-10">
              <FadeIn className="text-center mb-16">
                <Badge status="production" className="mb-6 !bg-white/10 !text-white !border-white/20" />
                <h2 className="text-4xl md:text-5xl font-bold mb-8">The 20-Year Horizon</h2>
                <div className="w-20 h-1 bg-white mx-auto mb-10 rounded-full" />
                <p className="text-xl text-slate-400 leading-relaxed">
                   Real infrastructure takes time. We aren't building a SaaS tool to flip in 3 years. We are building the engine of the governed future, privately owned and fiercely independent.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                 <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                       We're privately owned. No investors rushing us. No exit timeline. No pressure 
                       to compromise on quality for quarterly growth. We're building something that 
                       will remain part of the core internet fabric in 2045.
                    </p>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                       <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Ownership Manifesto</h4>
                       <p className="text-sm text-slate-400 italic">
                          "Transparency isn't a feature we charge for. It's the foundation everything else is built on. When everyone can inspect, verify, and improve the governance layer, we all benefit."
                       </p>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    {[
                      { year: '1-3', task: 'Foundational Infrastructure & Core Platform Deployment.' },
                      { year: '4-7', task: 'Market Sector Specialization & Deep Domain Expansion.' },
                      { year: '8-15', task: 'Global Infrastructure Standard & Ecosystem Maturity.' },
                      { year: '16-20', task: 'Consolidation and Multi-Platform Orchestration Hub.' }
                    ].map(item => (
                      <div key={item.year} className="flex gap-4 p-4 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all">
                         <span className="text-accent font-bold text-sm w-12 flex-shrink-0">Y{item.year}</span>
                         <span className="text-sm text-slate-300">{item.task}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </Container>
        </Section>

        {/* Final CTA */}
        <Section className="bg-white py-32">
          <Container>
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800 tracking-tight">
                  Aligned With Our Mission?
                </h2>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join the movement for governed, transparent AI. Whether you are a solo founder or an enterprise architect, we have a seat at the table.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button href="/contact" size="lg">
                    Join the Mission
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button href="/architecture" variant="secondary" size="lg">
                    See the Architecture
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
