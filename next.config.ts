import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Firebase hosting
  output: 'export',
  distDir: 'dist',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,
  
  // Enable strict mode for better error catching
  reactStrictMode: true,

  // Explicitly set Turbopack root to prevent incorrect workspace detection.
  // This fixes the tailwindcss resolution issue caused by a pnpm-lock.yaml
  // in a parent directory that was incorrectly being detected as the workspace root.
  turbopack: {
    root: process.cwd(),
  },

  // Redirects
  async redirects() {
    return [
      // Add redirects here if needed
    ];
  },
};

export default nextConfig;
