'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { ArrowRight } from 'lucide-react';

export default function CTASimple() {
  return (
    <Section className="bg-slate-50 py-32">
      <Container>
        <FadeIn>
          <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
            
            <div className="relative z-10 text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                I&apos;ve built the expensive version.
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Now I&apos;m building the accessible version. Enterprise-grade architecture, governed AI infrastructure, 
                and the methodology to make it all work — available to everyone.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/portfolio" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 w-full sm:w-auto">
                  See My Work
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button href="/methodology" size="lg" variant="ghost" className="text-white hover:bg-white/10 w-full sm:w-auto">
                  The Methodology
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
