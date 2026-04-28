import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/animations/FadeIn';
import { Quote, ArrowRight, ShieldCheck, Target, Layers, Network, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'The Thalamus Manifesto | Thalamus AI',
  description: 'Our core belief system: closing the automation trust gap through governed, intent-driven AI that democratizes enterprise capabilities for SMBs.',
  alternates: {
    canonical: '/manifesto/',
  },
};

const pillars = [
  {
    icon: ShieldCheck,
    title: 'The Automation Trust Gap',
    description: 'Generative AI has a trust problem. Enterprises cannot deploy black-box reasoning models directly into production without the fear of catastrophic hallucinations. LLMs are not inherently trustworthy. They become trustworthy only when constrained by deterministic governance, immutable audit ledgers, and strict boundaries.',
    boldAssertion: 'Trust is not given to AI; it is architected.',
    color: 'blue'
  },
  {
    icon: Target,
    title: 'Intent Over Activity',
    description: 'Traditional software relies on manual activity: clicking, logging, updating states. It forces humans to act like machines. The future of software is intent-driven. You voice what you want to achieve, and the system translates that intent into a governed execution pipeline across your entire tech stack.',
    boldAssertion: 'Stop managing databases; start orchestrating intent.',
    color: 'purple'
  },
  {
    icon: Layers,
    title: 'Progressive Autonomy',
    description: 'AI should not be granted full system access on day one. Autonomy is earned, not given out of the box. Organizations must utilize Progressive Autonomy—moving from human-in-the-loop validation (P0) to fully systematic swarms (P4) only as confidence and ROI are explicitly proven at each layer.',
    boldAssertion: 'Autonomy without guardrails is chaos.',
    color: 'indigo'
  },
  {
    icon: Network,
    title: 'Democratizing Enterprise AI',
    description: 'True competitive advantage via AI has been hoarded by Fortune 500s possessing massive infrastructural budgets. Out-of-the-box SaaS subscriptions are not a sustainable moat. We engineer the exact same private RAG pipelines, VPC-isolated deployments, and open-weight model orchestration used by the enterprise, built efficiently for SMBs.',
    boldAssertion: 'Intelligence should be a utility, not a monopoly.',
    color: 'emerald'
  }
];

export default function ManifestoPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        
        {/* Hero Section */}
        <Section size="lg" className="bg-slate-900 text-white relative overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-mesh-dark opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
          
          <Container className="relative z-10">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/20 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8">
                  <Sparkles className="w-4 h-4" />
                  The Vision
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
                  The Thalamus <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent to-purple-500">
                    Manifesto
                  </span>
                </h1>
                <div className="w-24 h-1 bg-accent mx-auto mb-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                  We are ending the era of black-box AI. <br />
                  <span className="text-white font-medium">We are building the governed engine of execution.</span>
                </p>
              </div>
            </FadeIn>
          </Container>
          
          {/* Decorative elements */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest font-bold">Read the Oath</span>
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
        </Section>

        {/* The Disconnect - High Impact Typography */}
        <Section className="bg-white border-b border-slate-100 py-32">
          <Container size="md">
            <FadeIn>
              <div className="space-y-12">
                <div className="flex items-start gap-4">
                  <Quote className="w-12 h-12 text-slate-200 mt-[-10px] shrink-0 fill-slate-50" />
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                    The software industry is <span className="text-red-600">lying to you.</span>
                  </p>
                </div>
                
                <div className="pl-16 space-y-8">
                  <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                    Every SaaS vendor is slapping a chat interface on top of their database and calling it "Artificial Intelligence." They promise autonomy, but they deliver a fragile novelty that you can never truly trust with your critical business constraints.
                  </p>
                  
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
                    <p className="text-lg text-slate-700 leading-relaxed italic relative z-10">
                      "At Thalamus AI, we observed a fundamental disconnect: the models are brilliant, but the framework housing them is naive. An LLM without governance is just a liability generator."
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-slate-900 border-l-4 border-accent pl-6 leading-tight">
                    We are building the middleware of trust. A deterministic governance layer that sits between chaotic intelligence and the rigid reality of enterprise compliance.
                  </p>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* The 4 Pillars - Premium Grid */}
        <Section className="bg-slate-50 relative py-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          
          <Container>
            <FadeIn className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Our Four Core Beliefs
              </h2>
              <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                These are not features. They are the fixed points in our architectural universe.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              {pillars.map((pillar, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <Card className="p-8 md:p-10 h-full bg-white border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <pillar.icon className="w-24 h-24" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-8 shadow-lg group-hover:bg-accent transition-colors">
                        <pillar.icon className="w-7 h-7" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">{pillar.title}</h3>
                      
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {pillar.description}
                      </p>
                      
                      <div className="flex items-center gap-3 py-4 border-t border-slate-100">
                        <AlertCircle className="w-5 h-5 text-accent" />
                        <span className="text-accent font-bold tracking-tight">
                          {pillar.boldAssertion}
                        </span>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* Transition to Philosophy */}
        <Section className="bg-white py-32">
          <Container>
            <FadeIn>
              <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
                
                <div className="relative z-10 text-center space-y-8">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Beyond the Manifesto
                  </h2>
                  <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    A manifesto is a promise. Our philosophy is the daily practice of that promise. Explore the principles that guide our internal engineering and outward partnerships.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button href="/philosophy" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 w-full sm:w-auto">
                      Explore Our Philosophy
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button href="/architecture" size="lg" variant="ghost" className="text-white hover:bg-white/10 w-full sm:w-auto">
                      See the Architecture
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