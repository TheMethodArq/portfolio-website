# Blog CTA Components

A comprehensive suite of Call-to-Action components designed specifically for Thalamus AI's blog content strategy.

## Overview

This module implements the CTA strategy defined in `/docs/BLOG_CTA_STRATEGY.md`. It provides:

- **Newsletter CTAs** — Email capture with audience-specific messaging
- **Lead Magnet CTAs** — Downloadables, calculators, and templates
- **Product Bridge CTAs** — Contextual product promotion
- **Transparency CTAs** — Trust-building for exposé content
- **Related Content CTAs** — Hub/spoke navigation
- **Layout Components** — Sticky sidebars, footers, exit intent
- **Tracking** — Comprehensive analytics integration

## Quick Start

```tsx
import {
  BlogNewsletterCTA,
  VVSCalculatorCTA,
  SynapticaCTA,
  BlogStickySidebar,
  CTATracker,
} from '@/components/blog';

// Wrap CTAs in tracker for analytics
<CTATracker 
  ctaId="unique-cta-id"
  ctaType="newsletter"
  contentType="hub"
  pageSlug="article-slug"
>
  <BlogNewsletterCTA variant="technical" placement="inline" />
</CTATracker>
```

## Component Categories

### 1. Newsletter CTAs (`BlogNewsletterCTA`)

Email capture with 5 audience variants:
- `general` — Default messaging
- `technical` — Engineering-focused
- `executive` — Decision-maker focused
- `skeptical` — Trust-building for exposé readers
- `insiders` — Beta program positioning

### 2. Lead Magnet CTAs (`BlogLeadMagnetCTA`)

Content upgrades with modal capture:
- `calculator` — Interactive tools
- `template` — Notion/Sheets downloads
- `report` — PDF research
- `checklist` — Actionable guides
- `guide` — Long-form content
- `blueprint` — Technical architecture
- `framework` — Decision frameworks

Preset components available:
- `VVSCalculatorCTA`
- `IntentMappingTemplateCTA`
- `TrueCostCalculatorCTA`
- `SOPHIACodeGuideCTA`
- `BuildVsBuyFrameworkCTA`

### 3. Product Bridge CTAs (`BlogProductBridgeCTA`)

Contextual product promotion:
- Products: SYNAPTICA, SOPHIA, ASO
- Variants: direct, demo, sandbox, documentation

Preset components:
- `SynapticaCTA`, `SynapticaSandboxCTA`
- `SophiaCTA`, `SophiaDemoCTA`
- `ASOCTA`, `ASODocsCTA`

### 4. Transparency CTAs (`BlogTransparencyCTA`)

Trust-building for skeptical audiences:
- `methodology` — Data/source transparency
- `pricing` — Cost transparency
- `stack` — Tech stack openness
- `philosophy` — Values alignment
- `receipts` — Evidence/verification
- `human-chat` — No-pressure conversation

### 5. Related Content CTAs (`BlogRelatedContentCTA`)

Content journey navigation:
- Hub promotion
- Spoke continuation
- Series navigation
- Topic clusters

### 6. Layout Components

- `BlogStickySidebar` — Desktop sticky sidebar (scroll-triggered)
- `BlogStickyFooter` — Mobile sticky footer
- `BlogExitIntentModal` — Desktop exit intent capture

## Hooks

- `useCTAVisibility` — Intersection observer for visibility tracking
- `useScrollProgress` — Scroll depth tracking
- `useExitIntent` — Exit intent detection
- `useEngagementTime` — Time-on-page tracking
- `useCTAVariant` — A/B test variant selection

## Tracking

- `CTATracker` — Wrapper component for analytics
- `useCTATracking` — Hook for programmatic event tracking
- `useBlogPageTracking` — Page-level scroll depth tracking

## Design System Integration

All components use Thalamus AI's design system:
- Colors from `globals.css` theme
- Tailwind utility classes
- Framer Motion for animations
- Lucide icons
- Consistent with existing Button, Card components

## Accessibility

- WCAG AA compliant contrast ratios
- Keyboard navigable
- Screen reader friendly
- Respects `prefers-reduced-motion`
- Proper focus management

## Mobile Considerations

- Sidebar hidden on mobile (<1024px)
- Sticky footer for mobile CTAs
- Exit intent disabled on mobile
- Touch-friendly tap targets (min 44px)

## Performance

- Components lazy-load heavy content
- Intersection Observer for efficient visibility tracking
- Session storage for dismissal state
- Minimal impact on Core Web Vitals

## File Structure

```
src/components/blog/
├── cta/
│   ├── BlogNewsletterCTA.tsx
│   ├── BlogLeadMagnetCTA.tsx
│   ├── BlogProductBridgeCTA.tsx
│   ├── BlogTransparencyCTA.tsx
│   ├── BlogRelatedContentCTA.tsx
│   ├── BlogStickySidebar.tsx
│   ├── BlogStickyFooter.tsx
│   ├── BlogExitIntentModal.tsx
│   └── index.ts
├── hooks/
│   ├── useCTAVisibility.ts
│   └── index.ts
├── tracking/
│   ├── CTATracker.tsx
│   └── index.ts
├── index.ts
└── README.md
```

## Implementation Guide

See `/docs/BLOG_CTA_IMPLEMENTATION_EXAMPLE.md` for detailed usage examples.

## Strategy Reference

Full CTA strategy documentation: `/docs/BLOG_CTA_STRATEGY.md`
