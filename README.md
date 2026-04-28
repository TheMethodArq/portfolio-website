Thalamus AI website built with [Next.js](https://nextjs.org).

## Getting Started

Install dependencies and run the dev server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 to view the site.

Edit `src/app/page.tsx` to update the homepage. The page auto-updates as you edit the file.

This project uses `next/font` with Google Fonts (Space Grotesk + IBM Plex Mono). Builds require network access to fetch fonts unless you switch to locally hosted fonts.

## Deploy to Firebase Hosting

The site is deployed as a static export to Firebase Hosting.

### Build and deploy

```bash
# Build the static site
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

The site uses `output: 'export'` in `next.config.ts` for static HTML generation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
