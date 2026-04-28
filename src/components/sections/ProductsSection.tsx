'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Server, Shield, Zap, Search, Brain, Bot, Github, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { products } from '@/content/products';
import type { ProductStatus } from '@/types';

// Extended products array with SOPHIAClaw, SOPHIA and others
const allProducts = [
  {
    slug: 'sophiaclaw-community',
    name: 'SOPHIAClaw Community',
    tagline: 'Open Source AI Infrastructure',
    status: 'beta' as ProductStatus,
    description:
      'Self-hosted, multi-channel AI agents with complete audit trails. 9+ channels, multi-provider AI, and governance-first architecture. Free forever.',
    features: [
      '9+ channel support (Telegram, Discord, Slack, etc.)',
      'Multi-provider AI (OpenAI, Anthropic, Google, Ollama)',
      'SOPHIA governance built-in',
      'MIT Licensed — free forever',
    ],
    ctaText: 'Get Started on GitHub',
    ctaHref: '/products/sophiaclaw-community',
  },
  {
    slug: 'sophiaclaw-pro',
    name: 'SOPHIAClaw Pro',
    tagline: 'Managed AI for Teams',
    status: 'development' as ProductStatus,
    description:
      'Cloud-hosted AI infrastructure with team collaboration, compliance reporting, and industry-specific knowledge profiles. Zero DevOps required.',
    features: [
      'Cloud-native hosting with 99.9% uptime',
      'Team collaboration with RBAC',
      'Industry profiles (Real Estate, Healthcare, Legal)',
      'SOC 2, GDPR, EU AI Act ready',
    ],
    ctaText: 'Join Waitlist',
    ctaHref: '/products/sophiaclaw-pro',
  },
  {
    slug: 'synaptica',
    name: 'SYNAPTICA',
    tagline: 'Neural Network Infrastructure Platform',
    status: 'production' as ProductStatus,
    description:
      '24 microservices that do one job each. Multi-LLM orchestration. Enterprise-grade security. Built by people who\'ve been on both sides of the wall.',
    features: [
      'Routes every request to the best model for the job',
      'Event-driven architecture with clear audit trails',
      'Tenant isolation baked in, not bolted on',
      'Real-time analytics you can explain',
    ],
    ctaText: 'Explore Platform Architecture',
    ctaHref: '/platform/synaptica',
  },
  {
    slug: 'sophia',
    name: 'SOPHIA Governance',
    tagline: 'Context, Cognition & Governance Layer',
    status: 'production' as ProductStatus,
    description:
      'The brain and nervous system of our platform. SOPHIA provides shared intelligence, policy enforcement, memory, and decision coherence across all products. Always open source.',
    features: [
      'Context management across all systems',
      'Cognitive orchestration and routing',
      'Governance and trust enforcement',
      'Open source by Thalamus — always free',
    ],
    ctaText: 'Meet SOPHIA',
    ctaHref: '/sophia',
  },
  {
    slug: 'sophia-code',
    name: 'sophia.code',
    tagline: 'AI-Assisted Development Framework',
    status: 'development' as ProductStatus,
    description:
      'Enterprise development framework with AI governance. SOPHIA sets the rules. SOPHIA enforces them.',
    features: [
      'Intent governance and policy enforcement',
      'Validation gates before anything executes',
      'Audit trails that actually hold up',
      'Conservative defaults that protect the business',
    ],
    ctaText: 'Understand Governance',
    ctaHref: '/platform/sophia-code',
  },
  {
    slug: 'sophia-dev',
    name: 'sophia.dev',
    tagline: 'AI Development Environment',
    status: 'community' as ProductStatus,
    description:
      'Open source AI development environment. Build, test, and deploy governed AI applications with SOPHIA.',
    features: [
      'Local-first AI development',
      'SOPHIA governance integration',
      'Multi-LLM provider support',
      'Community-driven development',
    ],
    ctaText: 'View on GitHub',
    ctaHref: 'https://github.com/thalamus-labz/sophia-dev',
  },
  {
    slug: 'sophia-spec',
    name: 'sophia.spec',
    tagline: 'AI Governance Specifications',
    status: 'community' as ProductStatus,
    description:
      'Open specifications for AI governance. Define policies, intents, and audit trails in a standardized format.',
    features: [
      'Policy definition language',
      'Intent capture specifications',
      'Audit trail standards',
      'Open source community project',
    ],
    ctaText: 'View on GitHub',
    ctaHref: 'https://github.com/thalamus-labz/sophia-spec',
  },
  {
    slug: 'sophia-axiom',
    name: 'sophia.axiom',
    tagline: 'AI Employee Assistants',
    status: 'community' as ProductStatus,
    description:
      'Formerly SOPHIA Ops. AI employee assistants that handle routine work. Context-aware, governed, and always improving.',
    features: [
      'Role-aware AI assistants',
      'Persistent contextual memory',
      'Governed task delegation',
      'Community-driven development',
    ],
    ctaText: 'View on GitHub',
    ctaHref: 'https://github.com/thalamus-labz/sophia-axiom',
  },
  {
    slug: 'executioniq',
    name: 'ExecutionIQ',
    tagline: 'The CRM You Actually Want',
    status: 'development' as ProductStatus,
    description:
      'An intelligent, governed, automated CRM built to replace Go High Level, HubSpot, and Salesforce. Finally, a CRM that works for you—not the other way around.',
    features: [
      'Calendar and email intelligence',
      'CRM and pipeline automation',
      'Workflow orchestration',
      'Governed execution through SOPHIA',
    ],
    ctaText: 'See ExecutionIQ Vision',
    ctaHref: '/platform/executioniq',
  },
  {
    slug: 'aso',
    name: 'ASO',
    tagline: 'Adaptive Search Optimization',
    status: 'beta' as ProductStatus,
    description:
      'AI-powered search rewards real expertise, not keyword games. Vector Visibility Score™ measures semantic distance, not just rankings.',
    features: [
      'Vector Visibility Score™ measurement',
      'Semantic content optimization',
      'AI citation tracking',
      '16 microservices on SYNAPTICA',
    ],
    ctaText: 'Join the ASO Beta',
    ctaHref: '/platform/aso',
  },
];

const productIcons: Record<string, React.ReactNode> = {
  'sophiaclaw-community': <Github className="w-6 h-6" />,
  'sophiaclaw-pro': <Sparkles className="w-6 h-6" />,
  synaptica: <Server className="w-6 h-6" />,
  sophia: <Brain className="w-6 h-6" />,
  'sophia-code': <Shield className="w-6 h-6" />,
  'sophia-dev': <Github className="w-6 h-6" />,
  'sophia-spec': <Github className="w-6 h-6" />,
  'sophia-axiom': <Github className="w-6 h-6" />,
  executioniq: <Zap className="w-6 h-6" />,
  aso: <Search className="w-6 h-6" />,
};

// Subtle tile background colors
const productTileColors: Record<string, string> = {
  'sophiaclaw-community': 'bg-gradient-to-br from-violet-50/80 to-white',
  'sophiaclaw-pro': 'bg-gradient-to-br from-violet-50/80 to-white',
  synaptica: 'bg-gradient-to-br from-blue-50/80 to-white',
  sophia: 'bg-gradient-to-br from-purple-50/80 to-white',
  'sophia-code': 'bg-gradient-to-br from-indigo-50/80 to-white',
  'sophia-dev': 'bg-gradient-to-br from-slate-50/80 to-white',
  'sophia-spec': 'bg-gradient-to-br from-slate-50/80 to-white',
  'sophia-axiom': 'bg-gradient-to-br from-slate-50/80 to-white',
  executioniq: 'bg-gradient-to-br from-fuchsia-50/80 to-white',
  aso: 'bg-gradient-to-br from-blue-50/80 to-white',
};

const productBorderColors: Record<string, string> = {
  'sophiaclaw-community': 'border-violet-200/60 hover:border-violet-300',
  'sophiaclaw-pro': 'border-violet-200/60 hover:border-violet-300',
  synaptica: 'border-blue-200/60 hover:border-blue-300',
  sophia: 'border-purple-200/60 hover:border-purple-300',
  'sophia-code': 'border-indigo-200/60 hover:border-indigo-300',
  'sophia-dev': 'border-slate-200/60 hover:border-slate-300',
  'sophia-spec': 'border-slate-200/60 hover:border-slate-300',
  'sophia-axiom': 'border-slate-200/60 hover:border-slate-300',
  executioniq: 'border-fuchsia-200/60 hover:border-fuchsia-300',
  aso: 'border-blue-200/60 hover:border-blue-300',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function ProductsSection() {
  return (
    <section id="platform" className="relative py-24 overflow-hidden">
      {/* Section divider - strong visual break */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      {/* Background */}
      <div className="absolute inset-0 bg-lines-subtle" />

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-50 border border-purple-200/50 shadow-sm"
          >
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">The Thalamus Stack</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            What We&apos;ve <span className="text-gradient">Built</span>
          </h2>
          
          {/* Enterprise vs SMB blurb */}
          <div className="max-w-3xl mx-auto mb-6">
            <p className="text-xl text-slate-600 mb-4">
              For decades, enterprise software vendors have locked small businesses out of the tools that drive real growth.
            </p>
            <p className="text-lg text-slate-600">
              They built walls. We&apos;re building bridges. 
              <span className="text-purple-600 font-semibold"> Everything Fortune 500 companies use—now within reach for your business.</span>
            </p>
          </div>
          
          <p className="text-slate-500">
            SYNAPTICA powers everything. <span className="text-purple-600 font-medium">SOPHIA</span> governs everything.
          </p>
        </motion.div>

        {/* Products Grid - 3 columns on large screens */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allProducts.map((product) => (
            <motion.div
              key={product.slug}
              variants={itemVariants}
              className="group"
            >
              <div className={`h-full p-6 rounded-2xl ${productTileColors[product.slug]} backdrop-blur-sm border ${productBorderColors[product.slug]} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 text-accent group-hover:from-accent/20 group-hover:to-accent-secondary/20 transition-colors duration-300"
                    >
                      {productIcons[product.slug]}
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-accent transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500">{product.tagline}</p>
                    </div>
                  </div>
                  <Badge status={product.status as ProductStatus} />
                </div>

                {/* Card Body */}
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Features List */}
                <ul className="space-y-1.5 mb-4">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-500"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-200/50">
                  <Button 
                    href={product.ctaHref} 
                    variant="ghost" 
                    size="sm"
                    className="text-accent hover:text-accent-hover hover:bg-accent/5 -ml-4"
                  >
                    {product.ctaText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Transparency Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/60 text-center max-w-3xl mx-auto"
        >
          <p className="text-slate-600">
            <span className="text-purple-600 font-semibold">Transparency:</span>{' '}
            Status badges show what&apos;s real.{' '}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">Green = Production</span>,{' '}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Blue = Development</span>,{' '}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">Purple = Beta</span>,{' '}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">Gray = Community</span>.
          </p>
        </motion.div>
      </Container>
      
      {/* Bottom section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
