'use client';

import { useEffect, useId, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamically import mermaid to reduce initial bundle size
const mermaidPromise = typeof window !== 'undefined' 
  ? import('mermaid')
  : Promise.resolve({ default: null });

const mermaidConfig = {
  startOnLoad: false,
  securityLevel: 'strict' as const,
  theme: 'base' as const,
  themeVariables: {
    primaryColor: '#E0F2FE',
    primaryTextColor: '#0F172A',
    primaryBorderColor: '#93C5FD',
    lineColor: '#94A3B8',
    secondaryColor: '#CCFBF1',
    tertiaryColor: '#FEF3C7',
    fontFamily: 'var(--font-family-sans)',
  },
};

interface MermaidProps {
  chart: string;
  className?: string;
  caption?: string;
}

export function Mermaid({ chart, className, caption }: MermaidProps) {
  const id = useId().replace(/:/g, '');
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let canceled = false;
    
    const renderChart = async () => {
      try {
        const mermaid = (await mermaidPromise).default;
        if (!mermaid || canceled) return;
        
        mermaid.initialize(mermaidConfig);
        const { svg: renderedSvg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!canceled) {
          setSvg(renderedSvg);
        }
      } catch (error) {
        if (!canceled) {
          setSvg(`<pre>${chart}</pre>`);
        }
        console.error('Mermaid render failed', error);
      }
    };

    renderChart();

    return () => {
      canceled = true;
    };
  }, [chart, id]);

  return (
    <figure className={cn('mermaid-block w-full h-full', className)}>
      <div 
        className="flex justify-center items-center w-full h-full min-h-[200px]" 
        dangerouslySetInnerHTML={{ __html: svg }} 
      />
      {caption ? <figcaption className="sr-only">{caption}</figcaption> : null}
    </figure>
  );
}
