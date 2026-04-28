# Thalamus AI Website - Agent Guide

## Project Overview

Thalamus AI Website is a marketing website for Thalamus AI, a startup democratizing Fortune 500 AI capabilities for small and medium businesses (SMBs). The site showcases the company's AI platform products, industry solutions, company philosophy, and technical architecture.

**Live URL:** https://getthalamus.ai  
**Version:** 0.1.0  
**Status:** Production

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 16.1.2 |
| Language | TypeScript | ^5 |
| React | React | 19.2.3 |
| Styling | Tailwind CSS | v4 |
| Animations | Framer Motion | 12.18.2 |
| Icons | Lucide React | 0.511.0 |
| Lottie | @lottiefiles/react-lottie-player | 3.5.4 |
| Testing | Jest + React Testing Library | 30.2.0 |
| Fonts | Space Grotesk + IBM Plex Mono (Google Fonts) | - |
| Build | Turbopack (Next.js dev) | - |
| Deployment | Firebase Hosting | Static export |

---

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout with fonts and metadata
│   ├── globals.css           # Global styles + Tailwind theme config
│   ├── not-found.tsx         # 404 page
│   ├── architecture/         # Technical & Security pages
│   ├── aso/                  # ASO (Adaptive Search Optimization)
│   ├── beta/                 # Beta signup page
│   ├── blog/                 # Blog with dynamic routes
│   ├── company/              # About, Team, Story pages
│   ├── contact/              # Contact form
│   ├── evidence/             # Evidence/ad-waste, organic-seo-broken
│   ├── industries/           # Industry pages (8 industries)
│   ├── philosophy/           # Company philosophy
│   ├── platform/             # Product pages
│   ├── roadmap/              # Product roadmap
│   ├── solutions/            # Solutions pages
│   ├── sophia/               # Meet SOPHIA page
│   └── vision/               # Vision page
├── components/
│   ├── ui/                   # Reusable UI (Button, Card, Badge, Input, etc.)
│   ├── layout/               # Layout components (Navbar, Footer, Container, Section)
│   ├── sections/             # Page sections (Hero, CTA, etc.)
│   └── animations/           # Animation wrappers (FadeIn, Stagger)
├── content/                  # Static content data
│   ├── blog.ts               # Blog posts data
│   ├── industries.ts         # Industry definitions
│   ├── products.ts           # Product definitions
│   └── team.ts               # Team member bios
├── lib/
│   └── utils.ts              # Utility functions (cn, formatDate, etc.)
├── types/
│   └── index.ts              # TypeScript type definitions
└── __tests__/                # Jest tests
    └── components/           # Component tests
```

---

## Build and Development Commands

```bash
# Install dependencies
npm install

# Development server (with Turbopack)
npm run dev

# Clean development (clears .next and cache)
npm run dev:clean

# Production build
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run ESLint
npm run lint

# TypeScript type checking
npm run type-check
```

---

## Code Style Guidelines

### File Naming Conventions
- **Components:** PascalCase (e.g., `Button.tsx`, `Navbar.tsx`)
- **Utilities/Hooks:** camelCase (e.g., `utils.ts`, `useScroll.ts`)
- **Pages:** camelCase for directories, `page.tsx` for route files
- **Types:** PascalCase interfaces in `types/index.ts`

### Component Structure
```tsx
'use client'; // Only if using hooks or browser APIs

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentProps } from '@/types';

// Variant/style definitions as objects
const variants = {
  primary: '...',
  secondary: '...',
};

export const Component = forwardRef<...>((props, ref) => {
  // Implementation
});

Component.displayName = 'Component';
```

### Styling Approach
- Use Tailwind CSS utility classes
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Define component variants as constant objects (e.g., `buttonVariants`)
- Reference design tokens from `globals.css` theme
- Follow the design system colors (see Design System section)

### Path Aliases
- `@/*` maps to `src/*`
- Use for all imports: `@/components`, `@/lib/utils`, `@/types`

---

## Testing Instructions

### Test Setup
- **Framework:** Jest 30.2.0 with jsdom environment
- **Location:** `src/__tests__/`
- **Setup File:** `jest.setup.tsx`

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage with 70% threshold
```

### Test Patterns
- One test file per component: `ComponentName.test.tsx`
- Use React Testing Library (`render`, `screen`, `fireEvent`)
- Mock external dependencies (next/navigation, next/image, framer-motion)
- Test variants, states, and accessibility

### Example Test Structure
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  describe('Rendering', () => { ... });
  describe('Sizes', () => { ... });
  describe('States', () => { ... });
  describe('Accessibility', () => { ... });
});
```

### Mocked Dependencies
The following are mocked in `jest.setup.tsx`:
- `next/navigation` (useRouter, usePathname, useSearchParams)
- `next/image`
- `framer-motion`
- `IntersectionObserver`
- `ResizeObserver`
- `window.matchMedia`

---

## Design System

### Color Palette (Light Theme)
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#F8FAFC` | Page background |
| Background Secondary | `#F1F5F9` | Elevated surfaces |
| Accent (Primary) | `#2563EB` | Primary buttons, links |
| Accent Hover | `#1D4ED8` | Hover states |
| Accent Secondary | `#14B8A6` | Teal accent |
| Success | `#10B981` | Success states |
| Warning | `#F59E0B` | Beta/caution |
| Error | `#EF4444` | Error states |
| Text Primary | `#0F172A` | Headings, body text |
| Text Secondary | `#475569` | Subtext, descriptions |
| Text Tertiary | `#64748B` | Captions, metadata |

### Typography
- **Sans Font:** Space Grotesk (variable: `--font-thalamus-sans`)
- **Mono Font:** IBM Plex Mono (variable: `--font-thalamus-mono`)
- **Base Size:** 16px
- **Line Height:** 1.5 (body), 1.25 (headings)

### Component Variants
Components use object-based variant definitions:
```tsx
const buttonVariants = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-transparent text-accent border-2 border-accent',
  ghost: 'bg-transparent text-text-secondary',
  danger: 'bg-error text-white',
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};
```

---

## Deployment

### Firebase Hosting (Production)

The site is deployed as a static export to Firebase Hosting.

**Prerequisites:**
- Firebase CLI installed (`npm install -g firebase-tools`)
- Authenticated with Firebase (`firebase login`)

**Build and Deploy:**
```bash
# Build the static site
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

**Configuration:**
- `output: 'export'` in `next.config.ts` generates static HTML
- `distDir: 'dist'` sets output directory
- `firebase.json` configures hosting settings
- Images are unoptimized (required for static export)

---

## Security Considerations

### Configuration
- `poweredByHeader: false` in `next.config.ts`
- `reactStrictMode: true` enabled
- Non-root user in Docker container

### Form Handling
- Contact and Beta forms currently have no backend (static only)
- When implementing forms, validate all inputs server-side
- Use rate limiting for form submissions
- Implement CSRF protection

### Dependencies
- Keep dependencies updated (`npm audit`)
- Review new dependencies for security vulnerabilities
- Pin versions in `package.json`

---

## Content Management

Static content is stored in TypeScript files in `src/content/`:
- `blog.ts` - Blog posts with full content
- `industries.ts` - Industry definitions
- `products.ts` - Product information
- `team.ts` - Team member bios

### Adding New Content
1. Add data to appropriate content file
2. Update types in `src/types/index.ts` if needed
3. Create corresponding page in `src/app/`

---

## Navigation Structure

The main navigation is defined in `src/components/layout/Navbar.tsx`:
- Products (Platform, SYNAPTICA, SOPHIA, etc.)
- Solutions (Custom Development, Consulting, Training)
- Industries (Real Estate, Professional Services, etc.)
- Resources (Roadmap, Blog, Evidence, Architecture)
- Company (About, SOPHIA, Philosophy, Team)

Navigation items support dropdowns with descriptions and external links.

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts, metadata, viewport |
| `src/app/globals.css` | Complete design system + Tailwind v4 theme |
| `src/components/layout/Navbar.tsx` | Main navigation with dropdowns |
| `src/lib/utils.ts` | Utility functions (cn, formatDate, etc.) |
| `src/types/index.ts` | All TypeScript type definitions |
| `next.config.ts` | Next.js configuration (static export) |
| `jest.config.ts` | Jest testing configuration |
| `jest.setup.tsx` | Test mocks and setup |
| `firebase.json` | Firebase Hosting configuration |

---

## Common Tasks

### Adding a New Page
1. Create directory in `src/app/my-page/`
2. Add `page.tsx` with default export
3. Add `metadata` export for SEO
4. Update navigation in `Navbar.tsx` if needed

### Adding a New Component
1. Create file in appropriate directory (ui/, layout/, sections/)
2. Export from `index.ts` if needed
3. Add types to `src/types/index.ts`
4. Create test file in `src/__tests__/components/`

### Adding a New Blog Post
1. Add entry to `src/content/blog.ts`
2. Include slug, title, content, author, date, category
3. The dynamic route `src/app/blog/[slug]/page.tsx` will handle rendering

---

## Troubleshooting

### Turbopack Issues
If you see workspace detection errors, the `turbopack.root` is set to `process.cwd()` in `next.config.ts` to prevent parent directory lockfile issues.

### Font Loading
Builds require network access to fetch Google Fonts. For offline builds, switch to locally hosted fonts.

### Test Failures
Ensure all mocks are up to date in `jest.setup.tsx` when adding new dependencies that interact with browser APIs.
