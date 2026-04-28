'use client';

import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, Building2, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/animations/FadeIn';

export function PhilosophySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section divider - strong visual break */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

      <Container className="relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
              The Fortune 500 Playbook
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Without the Fortune 500 Price Tag
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Enterprise AI capabilities exist. They work. They're proven.
              <br />
              <span className="font-semibold text-slate-800">So why can't small businesses use them?</span>
            </p>
          </div>
        </FadeIn>

        {/* The Problem/Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* The Problem */}
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">The Old Way</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">$100K+ to implement</p>
                    <p className="text-sm text-slate-600">Plus $200-500/hour consultants</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">6-12 months to see results</p>
                    <p className="text-sm text-slate-600">If it works at all</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Locked into one vendor</p>
                    <p className="text-sm text-slate-600">Can't switch without starting over</p>
                  </div>
                </li>
              </ul>
              <p className="mt-6 pt-6 border-t border-slate-300 text-slate-700 italic">
                "Enterprise-grade requires enterprise budgets."
              </p>
            </div>
          </FadeIn>

          {/* Our Approach */}
          <FadeIn delay={0.2}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-200/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Our Way</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Accessible pricing for SMBs</p>
                    <p className="text-sm text-slate-600">No enterprise budget required</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Results in weeks, not months</p>
                    <p className="text-sm text-slate-600">Start seeing value immediately</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Never locked in</p>
                    <p className="text-sm text-slate-600">Switch AI providers like light bulbs</p>
                  </div>
                </li>
              </ul>
              <p className="mt-6 pt-6 border-t border-purple-200 text-slate-700 font-semibold">
                "Enterprise-grade requires enterprise discipline, not enterprise budgets."
              </p>
            </div>
          </FadeIn>
        </div>

        {/* The Bottom Line */}
        <FadeIn delay={0.3}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-8 rounded-2xl bg-white border-2 border-slate-200 shadow-sm">
              <p className="text-2xl font-bold text-slate-800 mb-4">
                The Bottom Line
              </p>
              <p className="text-lg text-slate-700 mb-6">
                If you're good at what you do, you deserve the same tools as the Fortune 500.
                <br />
                <span className="text-purple-600 font-semibold">We’re making that happen.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/philosophy">
                  Read Our Full Philosophy
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/roadmap" variant="secondary">
                  See What&apos;s Coming
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Transparency Note */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">20-year horizon.</span> Bootstrap economics. Private ownership.
              <br />
              We're building for permanence, not exits or headlines.
            </p>
          </div>
        </FadeIn>
      </Container>
      
      {/* Bottom section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
