import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Accordion } from '@/components/ui/Accordion';
import { ComparisonTable } from '@/components/layout/ComparisonTable';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Target,
  FileText,
  Calculator,
  Search,
  Lightbulb,
  Check,
  X,
  FileCode,
  BookOpen,
  AlertCircle,
  Users,
  Shield,
  MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ASO Methodology: How Vector Visibility Score Works',
  description:
    'Learn the complete ASO methodology: VVS calculation process, intent centroid mapping, semantic distance measurement, and our transparent optimization approach.',
  metadataBase: new URL('https://getthalamus.ai'),
  alternates: {
    canonical: '/methodology/',
  },
  keywords: [
    'ASO methodology',
    'Vector Visibility Score',
    'VVS calculation',
    'AI search optimization',
    'transparent SEO',
    'semantic search',
    'intent centroid',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getthalamus.ai/methodology/',
    siteName: 'Thalamus AI',
    title: 'ASO Methodology: How Vector Visibility Score Works',
    description:
      'No black box. No secrets. See exactly how we calculate VVS scores, optimize content, and improve your AI search visibility.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The ASO Methodology - Thalamus AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASO Methodology: How Vector Visibility Score Works',
    description:
      'No black box. No secrets. See exactly how we calculate VVS scores, optimize content, and improve your AI search visibility.',
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

// 5-Step Process Items
const processSteps = [
  {
    step: '01',
    title: 'Intent Centroid Calculation',
    description: 'We calculate what "perfect" looks like for your keywords',
    icon: Target,
    details: [
      'Scrape top 20 results for your target keyword',
      'Extract semantic meaning (not just keywords)',
      'Create vector embeddings of all content',
      'Calculate weighted average (position 1 = highest weight)',
      'This becomes the "intent centroid"',
    ],
    transparency: [
      'Which 20 URLs we analyzed',
      'Their vector embeddings',
      'Weight calculations',
      'Final centroid coordinates',
    ],
  },
  {
    step: '02',
    title: 'Your Content Embedding',
    description: 'We measure where you actually are',
    icon: FileText,
    details: [
      'Crawl your target page',
      'Extract main content (remove nav, ads, etc.)',
      'Chunk into semantic sections',
      'Create vector embeddings using same model',
      'Calculate average position in vector space',
    ],
    transparency: [
      'Your content chunks',
      "Each chunk's embedding",
      'Distance from centroid per section',
      'Which sections help vs hurt',
    ],
  },
  {
    step: '03',
    title: 'VVS Score Calculation',
    description: 'We calculate your semantic distance from intent',
    icon: Calculator,
    details: [
      'Calculate cosine distance between your content and centroid',
      'Convert to 0-100 VVS score',
      'Score interpretation: 80-100 = Excellent, 60-79 = Good, 40-59 = Moderate, 0-39 = Poor',
    ],
    transparency: [
      'Raw cosine distance calculation',
      'Breakdown by content section',
      'Comparison to top 10 competitors',
      'Historical trend (if previous scans exist)',
    ],
  },
  {
    step: '04',
    title: 'Gap Analysis',
    description: "We identify exactly what's missing",
    icon: Search,
    details: [
      'Compare your content vectors to centroid',
      'Identify semantic gaps (topics you don\'t cover)',
      'Identify over-optimization (keyword stuffing)',
      'Map content opportunities',
    ],
    transparency: [
      'Specific topics missing',
      'Frequency comparison tables',
      'Competitor content excerpts',
      'Recommended additions',
    ],
  },
  {
    step: '05',
    title: 'Optimization Recommendations',
    description: 'We tell you exactly what to do (or do it for you)',
    icon: Lightbulb,
    details: [
      'Foundation tier: Written recommendations with expected impact',
      'Accelerate/Dominate tier: Full implementation with tracking',
      'Continuous VVS improvement monitoring',
    ],
    transparency: [
      'Every recommendation made',
      'Expected VVS impact',
      'Actual VVS impact after implementation',
      'A/B test results if applicable',
    ],
  },
];

// Technical Deep Dive FAQ
const technicalFaqs = [
  {
    id: 'embedding-model',
    question: 'What embedding model do you use?',
    answer:
      "We use OpenAI's text-embedding-3-large (3,072 dimensions) for consistency. We're testing open-source alternatives (MXBAI, BGE) for cost reduction. When we switch, you keep your historical data—we'll handle the translation layer.",
  },
  {
    id: 'recalculate-frequency',
    question: 'How often do you recalculate?',
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Foundation:</strong> Monthly
        </p>
        <p>
          <strong>Accelerate:</strong> Weekly
        </p>
        <p>
          <strong>Dominate:</strong> Real-time (on every content change)
        </p>
      </div>
    ),
  },
  {
    id: 'algorithm-updates',
    question: 'What about algorithm updates?',
    answer:
      "We monitor Google AI overviews, ChatGPT behavior, and other AI search platforms weekly. When they change, we adjust our centroids. You're always optimized for current reality, not last year's playbook.",
  },
  {
    id: 'multilingual',
    question: 'How do you handle multiple languages?',
    answer:
      'Each language has its own vector space. We calculate separate VVS scores per language. Currently support: English, Spanish, French, German. More coming based on demand.',
  },
  {
    id: 'data-training',
    question: 'Is my data used to train your models?',
    answer:
      'No. Your data improves your account only. We do use anonymized, aggregated patterns across all customers to improve our general recommendations (e.g., "pages with FAQ sections average +12 VVS"). But your specific data never leaves your account.',
  },
  {
    id: 'export-data',
    question: 'Can I export my VVS data?',
    answer:
      'Yes. Full JSON export including all vectors, embeddings, and calculations. We believe your data belongs to you.',
  },
  {
    id: 'disagree-score',
    question: 'What if I disagree with the VVS score?',
    answer:
      "Let's talk. The score is based on mathematical distance, but search is nuanced. We review edge cases together and adjust our methodology when warranted.",
  },
  {
    id: 'compare-seo',
    question: 'How does this compare to traditional SEO metrics?',
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Traditional:</strong> "You're #8 for keyword X"
        </p>
        <p>
          <strong>ASO:</strong> "Your semantic distance from intent is 0.32. You're missing coverage on topics A, B, C. Adding them would reduce distance to 0.18, predicting a move to #3-4."
        </p>
        <p className="font-semibold text-accent pt-2">
          Traditional tells you WHERE you are. ASO tells you WHY and HOW TO
          IMPROVE.
        </p>
      </div>
    ),
  },
];

// Methodology FAQ
const methodologyFaqs = [
  {
    id: 'vvs-vs-seo',
    question: 'How is VVS different from traditional SEO scores?',
    answer:
      "Traditional scores (Domain Authority, etc.) are proprietary and opaque. VVS is a mathematical calculation you can verify. It's based on semantic distance, not authority manipulation.",
  },
  {
    id: 'calculate-yourself',
    question: 'Can I calculate VVS myself?',
    answer:
      "Yes! We publish our methodology. You'd need embedding access and vector math tools, but it's reproducible. Or just use our free VVS scanner.",
  },
  {
    id: 'high-vvs-low-rankings',
    question: 'What if my VVS is high but rankings are low?',
    answer:
      'That tells us something. Usually means technical issues (site speed, mobile) or authority/signals issues. We investigate and fix.',
  },
  {
    id: 'improvement-timeline',
    question: 'How quickly does VVS improve after optimization?',
    answer:
      'Usually 4-8 weeks for Google to re-crawl and re-rank. AI search (ChatGPT, etc.) can update faster as models refresh.',
  },
  {
    id: 'ai-content',
    question: 'Do you use AI to write content?',
    answer:
      'We use AI for analysis and recommendations. Content writing is human + AI collaborative. You approve everything before publication.',
  },
  {
    id: 'search-platforms',
    question: 'What search platforms does VVS cover?',
    answer:
      'All of them. Traditional (Google, Bing), AI (ChatGPT, Perplexity, Claude), Voice (Alexa, Siri), Social (LinkedIn, TikTok search). One score reflects all.',
  },
  {
    id: 'semantic-seo',
    question: 'Is VVS the same as semantic SEO?',
    answer:
      'Related, but different. Semantic SEO is a tactic. VVS is a measurement. We use semantic techniques to improve VVS.',
  },
  {
    id: 'share-report',
    question: 'Can I share my VVS report with my team/agency?',
    answer: "Yes. Download as PDF or share via link. It's your data.",
  },
];

// Comparison data for ASO vs Traditional SEO
const comparisonData = [
  {
    name: 'Aspect',
    features: [
      { name: 'What they measure', value: 'What they measure' },
      { name: 'Success metric', value: 'Success metric' },
      { name: 'Optimization approach', value: 'Optimization' },
      { name: 'Reporting style', value: 'Reporting' },
      { name: 'Updates handling', value: 'Updates' },
      { name: 'Transparency', value: 'Transparency' },
      { name: 'Prediction capability', value: 'Prediction' },
    ],
  },
  {
    name: 'Traditional SEO',
    features: [
      { name: 'What they measure', value: 'Keyword density, backlinks, rankings' },
      { name: 'Success metric', value: 'Position #1-10' },
      { name: 'Optimization approach', value: 'Stuff keywords, build links' },
      { name: 'Reporting style', value: "You're #8 for 'crm software'" },
      { name: 'Updates handling', value: 'Reactive to algorithm changes' },
      { name: 'Transparency', value: 'Black box, proprietary' },
      { name: 'Prediction capability', value: "We'll try to improve rankings" },
    ],
  },
  {
    name: 'ASO (Our Approach)',
    highlighted: true,
    features: [
      { name: 'What they measure', value: 'Semantic meaning, intent alignment' },
      { name: 'Success metric', value: 'VVS Score (0-100)' },
      { name: 'Optimization approach', value: 'Align content with intent centroid' },
      {
        name: 'Reporting style',
        value: "VVS is 68. Here's exactly why and how to improve.",
      },
      { name: 'Updates handling', value: 'Proactive adaptation to AI evolution' },
      { name: 'Transparency', value: 'Full methodology, exportable data' },
      {
        name: 'Prediction capability',
        value: 'These changes predict +12 VVS, moving you to #3-4',
      },
    ],
    cta: {
      label: 'Learn More',
      href: '/aso',
    },
  },
];

// Transparency promises
const promises = [
  {
    title: 'Show Our Work',
    description:
      "You'll never wonder what we're doing. Every recommendation includes the data and reasoning behind it.",
    icon: Eye,
  },
  {
    title: 'Explain the Math',
    description:
      "No hand-waving. No 'trust us.' We explain the calculations and you can verify them.",
    icon: Calculator,
  },
  {
    title: 'Admit Uncertainty',
    description:
      "Sometimes we don't know. We'll tell you when something is an experiment vs. proven.",
    icon: AlertCircle,
  },
  {
    title: 'Learn in Public',
    description:
      "When we're wrong, we say so. When we improve our methodology, you benefit immediately.",
    icon: Users,
  },
  {
    title: 'Your Data = Your Property',
    description: 'Export everything. Leave anytime. No vendor lock-in.',
    icon: Shield,
  },
];

export default function MethodologyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        {/* Hero Section */}
        <Section size="lg" className="bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
          <Container className="relative z-10">
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                  <Eye className="w-4 h-4" />
                  NO BLACK BOX
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="text-text-primary">How ASO</span>
                  <br />
                  <span className="text-accent">Actually Works</span>
                </h1>
                <p className="text-xl text-text-secondary mb-4 max-w-3xl mx-auto">
                  Most SEO agencies hide behind jargon and &quot;proprietary
                  algorithms.&quot; We show you every step. Here&apos;s exactly how we
                  calculate your Vector Visibility Score and optimize your search
                  presence.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Button href="/beta">
                    Get Your Free VVS Score
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* The Problem: Black Box SEO */}
        <Section className="bg-background-secondary">
          <Container>
            <FadeIn>
              <div className="text-center mb-12">
                <EyeOff className="w-12 h-12 text-error mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-3">
                  The Traditional SEO Problem
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  The old way was opaque, expensive, and frustrating.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="max-w-3xl mx-auto mb-12">
                <div className="bg-surface-glass rounded-2xl p-8 border border-border-glass">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-background-secondary flex items-center justify-center mb-2">
                        <span className="text-2xl">💼</span>
                      </div>
                      <span className="text-sm font-medium">Client</span>
                    </div>
                    <div className="hidden md:block text-text-tertiary">→</div>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-error/10 border-2 border-error/30 flex items-center justify-center mb-2">
                        <span className="text-2xl">📦</span>
                      </div>
                      <span className="text-sm font-medium">Agency Black Box</span>
                    </div>
                    <div className="hidden md:block text-text-tertiary">→</div>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-warning/10 border-2 border-warning/30 flex items-center justify-center mb-2">
                        <span className="text-2xl">🤷</span>
                      </div>
                      <span className="text-sm font-medium text-center">
                        &quot;Trust us,
                        <br />
                        it&apos;s working&quot;
                      </span>
                    </div>
                    <div className="hidden md:block text-text-tertiary">→</div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-text-disabled/20 flex items-center justify-center mb-2">
                        <span className="text-2xl">❓</span>
                      </div>
                      <span className="text-sm font-medium text-center">
                        No visibility
                        <br />
                        into work
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <Card className="text-center border-error/20">
                  <div className="text-3xl mb-2">1</div>
                  <p className="text-sm text-text-secondary">
                    You don&apos;t know what they&apos;re doing
                  </p>
                </Card>
                <Card className="text-center border-error/20">
                  <div className="text-3xl mb-2">2</div>
                  <p className="text-sm text-text-secondary">
                    You can&apos;t verify if it&apos;s working
                  </p>
                </Card>
                <Card className="text-center border-error/20">
                  <div className="text-3xl mb-2">3</div>
                  <p className="text-sm text-text-secondary">
                    When it fails, you have no data
                  </p>
                </Card>
                <Card className="text-center border-error/20">
                  <div className="text-3xl mb-2">4</div>
                  <p className="text-sm text-text-secondary">
                    You&apos;re dependent on their &quot;expertise&quot;
                  </p>
                </Card>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="text-center mt-12">
                <p className="text-lg text-text-primary font-semibold">
                  We think that&apos;s wrong. Here&apos;s our alternative.
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* The ASO Alternative: Full Transparency */}
        <Section className="bg-background" id="process">
          <Container>
            <FadeIn>
              <div className="text-center mb-12">
                <Eye className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-3">
                  The ASO Process: Fully Transparent
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Five steps. Full visibility. No secrets.
                </p>
              </div>
            </FadeIn>

            <div className="max-w-4xl mx-auto">
              {processSteps.map((step, index) => (
                <FadeIn key={step.step} delay={index * 0.1}>
                  <div className="relative pl-8 md:pl-16 pb-12 last:pb-0">
                    {/* Connecting line */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute left-[19px] md:left-[27px] top-12 w-0.5 h-[calc(100%-3rem)] bg-gradient-to-b from-accent to-accent/20" />
                    )}

                    {/* Step number */}
                    <div className="absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg md:text-xl">
                      {step.step}
                    </div>

                    <div className="bg-surface-glass rounded-xl p-6 border border-border-glass">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-text-primary">
                            {step.title}
                          </h3>
                          <p className="text-text-secondary">{step.description}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-accent" />
                            Process
                          </h4>
                          <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                              <li
                                key={i}
                                className="text-sm text-text-secondary flex items-start gap-2"
                              >
                                <span className="text-accent mt-1">•</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-accent/5 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            What You Get
                          </h4>
                          <ul className="space-y-2">
                            {step.transparency.map((item, i) => (
                              <li
                                key={i}
                                className="text-sm text-text-secondary flex items-start gap-2"
                              >
                                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* VVS Formula Section */}
        <Section className="bg-background-secondary">
          <Container>
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-6">The VVS Formula</h3>
                <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm">
                  <div className="font-mono text-lg md:text-xl bg-slate-100 rounded-lg p-6 mb-6">
                    VVS = 100 × (1 - cosine_distance(your_content, intent_centroid))
                  </div>
                  <div className="text-left space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center font-bold text-sm flex-shrink-0">
                        80-100
                      </div>
                      <p className="text-text-secondary">
                        <strong className="text-text-primary">Excellent:</strong>{' '}
                        Strong alignment with search intent
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-sm flex-shrink-0">
                        60-79
                      </div>
                      <p className="text-text-secondary">
                        <strong className="text-text-primary">Good:</strong> Solid
                        foundation, but gaps exist
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-warning/20 text-warning flex items-center justify-center font-bold text-sm flex-shrink-0">
                        40-59
                      </div>
                      <p className="text-text-secondary">
                        <strong className="text-text-primary">Moderate:</strong>{' '}
                        Needs significant work
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-error/20 text-error flex items-center justify-center font-bold text-sm flex-shrink-0">
                        0-39
                      </div>
                      <p className="text-text-secondary">
                        <strong className="text-text-primary">Poor:</strong> Major
                        overhaul needed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Technical Deep Dive Section */}
        <Section className="bg-background">
          <Container size="md">
            <FadeIn>
              <div className="text-center mb-10">
                <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-3">
                  Technical Deep Dive (For the Curious)
                </h2>
                <p className="text-text-secondary">
                  Detailed answers to the questions you actually have.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="border-accent/20">
                <Accordion items={technicalFaqs} />
              </Card>
            </FadeIn>
          </Container>
        </Section>

        {/* Sample Report Section */}
        <Section className="bg-background-secondary">
          <Container>
            <FadeIn>
              <div className="text-center mb-10">
                <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-3">
                  See a Real (Anonymized) Report
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  This is the level of detail you get every month.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-border-light overflow-hidden">
                  {/* Report Header */}
                  <div className="bg-gradient-to-r from-accent to-accent-secondary p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-lg">Thalamus AI</span>
                    </div>
                    <h3 className="text-xl font-bold">
                      Vector Visibility Score Report
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      Company: Anonymized SaaS Company • Date: January 15, 2026
                    </p>
                    <p className="text-white/80 text-sm">
                      Keyword: &quot;enterprise CRM software&quot;
                    </p>
                  </div>

                  {/* Report Body */}
                  <div className="p-6 space-y-6">
                    {/* Score Section */}
                    <div className="text-center pb-6 border-b border-border-light">
                      <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-accent/20 mb-4 relative">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-accent">68</span>
                          <span className="text-text-tertiary">/100</span>
                        </div>
                      </div>
                      <p className="text-text-secondary">
                        Previous: 61/100 <span className="text-success">(+7)</span>
                      </p>
                      <div className="flex justify-center gap-8 mt-4 text-sm">
                        <div>
                          <span className="text-text-tertiary">Industry Avg:</span>{' '}
                          <span className="font-semibold">58/100</span>
                        </div>
                        <div>
                          <span className="text-text-tertiary">Top Competitor:</span>{' '}
                          <span className="font-semibold text-accent">84/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Analysis */}
                    <div>
                      <h4 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-accent" />
                        Your Content Analysis
                      </h4>
                      <div className="space-y-2">
                        {[
                          { section: 'Hero', score: 72, status: 'good' },
                          { section: 'Features', score: 81, status: 'good' },
                          { section: 'Pricing', score: 45, status: 'warning' },
                          { section: 'Case Studies', score: 68, status: 'good' },
                          { section: 'FAQ', score: 34, status: 'poor' },
                        ].map((item) => (
                          <div
                            key={item.section}
                            className="flex items-center justify-between py-2"
                          >
                            <span className="text-text-secondary">
                              {item.section}
                            </span>
                            <div className="flex items-center gap-3">
                              <span
                                className={`font-semibold ${
                                  item.score >= 70
                                    ? 'text-success'
                                    : item.score >= 40
                                      ? 'text-warning'
                                      : 'text-error'
                                }`}
                              >
                                VVS {item.score}/100
                              </span>
                              {item.status === 'good' && (
                                <Check className="w-4 h-4 text-success" />
                              )}
                              {item.status === 'warning' && (
                                <AlertCircle className="w-4 h-4 text-warning" />
                              )}
                              {item.status === 'poor' && (
                                <X className="w-4 h-4 text-error" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-text-tertiary mt-3">
                        Overall Distance from Centroid: 0.32
                      </p>
                    </div>

                    {/* Gap Analysis */}
                    <div className="pt-4 border-t border-border-light">
                      <h4 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Search className="w-5 h-5 text-accent" />
                        Gap Analysis
                      </h4>
                      <div className="bg-error/5 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-error mb-2">
                          Missing Topics (high impact):
                        </p>
                        <ul className="text-sm text-text-secondary space-y-1">
                          <li>
                            • Implementation timeline (0 mentions vs 4.2 avg)
                          </li>
                          <li>• Volume pricing (1 mention vs 5.1 avg)</li>
                          <li>• Enterprise SSO (0 mentions vs 2.8 avg)</li>
                          <li>• Migration support (0 mentions vs 3.2 avg)</li>
                        </ul>
                      </div>
                      <div className="bg-warning/5 rounded-lg p-4">
                        <p className="text-sm font-semibold text-warning mb-2">
                          Over-Emphasized (dilutes focus):
                        </p>
                        <ul className="text-sm text-text-secondary space-y-1">
                          <li>• Company history (8 mentions vs 0.8 avg)</li>
                          <li>• Founding story (4 mentions vs 0.2 avg)</li>
                        </ul>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="pt-4 border-t border-border-light">
                      <h4 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-accent" />
                        Recommendations
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 bg-success/5 rounded-lg p-3">
                          <span className="bg-success text-white text-xs font-bold px-2 py-1 rounded">
                            P1
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              Add FAQ section (Expected +12 VVS)
                            </p>
                            <p className="text-sm text-text-secondary">
                              Cover implementation timeline, volume discounts, SSO
                              providers, and migration process.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-warning/5 rounded-lg p-3">
                          <span className="bg-warning text-white text-xs font-bold px-2 py-1 rounded">
                            P2
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              Reduce company history (Expected +6 VVS)
                            </p>
                            <p className="text-sm text-text-secondary">
                              Cut by 70%, reinvest in use case examples.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Predicted Outcome */}
                    <div className="pt-4 border-t border-border-light bg-accent/5 rounded-lg p-4">
                      <h4 className="font-bold text-accent mb-2">
                        Predicted Outcome
                      </h4>
                      <p className="text-text-secondary">
                        If all recommendations implemented:{' '}
                        <strong>VVS: 68 → 90 (+22)</strong>
                      </p>
                      <p className="text-text-secondary">
                        Estimated Rank Change: <strong>#8 → #3-4</strong>
                      </p>
                      <p className="text-text-secondary">
                        Timeline: <strong>6-8 weeks</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-center mt-10">
                <Button href="/beta" size="lg">
                  Get Your Free VVS Report
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Comparison: ASO vs Traditional SEO */}
        <Section className="bg-background">
          <Container>
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3">
                  ASO vs Traditional SEO: The Technical Difference
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  See exactly how our approach differs from old-school SEO.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ComparisonTable columns={comparisonData} caption="Comparison of ASO methodology with traditional SEO approaches" />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-center mt-10 p-6 bg-gradient-to-r from-accent/5 to-accent-secondary/5 rounded-2xl">
                <p className="text-lg text-text-primary font-semibold">
                  Key Difference:
                </p>
                <p className="text-text-secondary">
                  Traditional SEO fights the algorithm. ASO aligns with how AI
                  actually understands content.
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Our Commitment Section */}
        <Section className="bg-background-secondary">
          <Container>
            <FadeIn>
              <div className="text-center mb-10">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-3">
                  Our Transparency Commitment
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Five promises we make to every customer.
                </p>
              </div>
            </FadeIn>

            <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {promises.map((promise, index) => (
                <StaggerItem key={promise.title}>
                  <Card
                    className={`h-full ${
                      index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <promise.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      {promise.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {promise.description}
                    </p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        {/* FAQ Section */}
        <Section className="bg-background">
          <Container size="md">
            <FadeIn>
              <div className="text-center mb-10">
                <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-text-secondary">
                  Questions about our methodology.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="border-accent/20">
                <Accordion items={methodologyFaqs} />
              </Card>
            </FadeIn>
          </Container>
        </Section>

        {/* Last Updated */}
        <Section className="bg-background-secondary py-8">
          <Container>
            <FadeIn>
              <div className="text-center">
                <p className="text-sm text-text-tertiary">
                  Last Updated: February 2026 • We update this page quarterly as
                  our methodology evolves
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section className="bg-background">
          <Container>
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to See How It Works?
                </h2>
                <p className="text-text-secondary mb-8">
                  Get your free VVS score and see exactly where you stand in AI
                  search.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button href="/beta" size="lg">
                    Get Your Free VVS Score
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button href="/contact" variant="secondary" size="lg">
                    Talk to Our Team
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
