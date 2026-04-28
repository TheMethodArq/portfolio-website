/**
 * Portfolio/Project Data
 * Used by ProductsSection on homepage and Portfolio page
 */

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: 'production' | 'beta' | 'development' | 'community';
  features: string[];
  icon: string;
  category: string;
}

export const products: Product[] = [
  {
    slug: 'thalamus-platform',
    name: 'Thalamus AI Platform',
    tagline: 'Governed AI Infrastructure',
    status: 'production',
    description: '51-microservice governed AI infrastructure with multi-LLM orchestration. Sub-150ms P95 latency. The platform that proves enterprise AI can be built right.',
    features: [
      '51 microservices with full governance layer',
      'Multi-provider LLM orchestration (OpenAI, Anthropic, etc.)',
      'Progressive autonomy from P0 to P4',
      'VPC-isolated deployments for enterprise security',
      'Immutable audit trails and cryptographic verification',
    ],
    icon: 'server',
    category: 'platform',
  },
  {
    slug: 'ipixx',
    name: 'ipixx.ai',
    tagline: 'AI-Powered Real Estate Marketing',
    status: 'production',
    description: 'AI-powered marketing platform for real estate professionals. Intelligent listing optimization, market analysis, and lead generation.',
    features: [
      'AI-driven property listing optimization',
      'Automated market analysis and pricing recommendations',
      'Lead scoring and nurturing automation',
    ],
    icon: 'brain',
    category: 'saas',
  },
  {
    slug: 'hypelocal',
    name: 'HypeLocal',
    tagline: 'Municipal-First Local Discovery',
    status: 'production',
    description: 'Municipal-first local discovery platform. Connecting communities with local businesses, events, and services through intelligent discovery.',
    features: [
      'Municipality-integrated local business directory',
      'Event discovery and community engagement',
      'Location-based recommendation engine',
    ],
    icon: 'map-pin',
    category: 'platform',
  },
  {
    slug: 'xai-colossus',
    name: 'xAI Colossus',
    tagline: 'World\'s Largest AI Supercomputer',
    status: 'production',
    description: 'Infrastructure for the world\'s largest AI supercomputer. Enterprise-scale architecture supporting massive GPU clusters and distributed workloads.',
    features: [
      'World\'s largest AI supercomputer infrastructure',
      'Massive GPU cluster orchestration',
      'Enterprise-grade networking and storage',
    ],
    icon: 'zap',
    category: 'infrastructure',
  },
  {
    slug: 'mercedes-benz-stadium',
    name: 'Mercedes-Benz Stadium',
    tagline: 'Enterprise Infrastructure at Stadium Scale',
    status: 'production',
    description: 'Enterprise infrastructure at stadium scale. Systems designed to handle peak loads of 70,000+ concurrent users with zero downtime.',
    features: [
      'Infrastructure for 70,000+ concurrent users',
      'High-availability architecture with zero downtime',
      'Real-time systems integration',
    ],
    icon: 'building',
    category: 'infrastructure',
  },
  {
    slug: 'cortex-digital',
    name: 'Cortex Digital',
    tagline: 'Adaptive Search Optimization',
    status: 'production',
    description: 'Adaptive Search Optimization for AI search visibility. Not traditional SEO — a fundamentally different approach to being found in the age of AI.',
    features: [
      'Vector Visibility Score (VVS) measurement',
      'Semantic distance optimization',
      'Multi-platform AI search coverage',
    ],
    icon: 'search',
    category: 'saas',
  },
  {
    slug: 'thalamus-standard',
    name: 'Thalamus Standard',
    tagline: 'Open-Source Enterprise Standard',
    status: 'production',
    description: 'Open-source enterprise development standard injectable into any repo. The governance and architecture patterns from the Thalamus Platform, available to everyone.',
    features: [
      'Injectable into any existing repository',
      'Enterprise governance patterns out of the box',
      'Community-driven development standards',
    ],
    icon: 'code',
    category: 'open-source',
  },
];
