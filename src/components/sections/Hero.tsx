'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Zap, Building2, Award, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end 2000px'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Clean minimal grid background */}
      <div className="absolute inset-0 bg-checker-premium" />

      {/* Content with parallax */}
      <motion.div style={{ y, opacity }} className="w-full">
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-white/90 border border-slate-200/50 shadow-lg backdrop-blur-sm"
            >
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-slate-600 tracking-wider">
                ENTERPRISE ARCHITECT &amp; AI STRATEGIST
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05] tracking-tight"
            >
              <span className="text-slate-800">Shawn</span>{' '}
              <span className="text-gradient inline-block">Sloan</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
            >
              &ldquo;When systems fail, people get hurt.&rdquo;
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              20 years building Fortune 100 systems. Now I build them for you{' '}
              <span className="text-slate-800 font-semibold">
                — without the Fortune 100 price tag.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button href="/portfolio" size="lg" className="btn-light-primary group px-8">
                  See My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button href="/methodology" variant="secondary" size="lg" className="btn-light-secondary px-8">
                  The Methodology
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
            >
              {[
                { icon: <Zap className="w-5 h-5" />, label: 'xAI Colossus' },
                { icon: <Building2 className="w-5 h-5" />, label: 'Mercedes-Benz Stadium' },
                { icon: <Award className="w-5 h-5" />, label: '20+ Years Fortune 100' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-slate-500">
                  <div className="text-accent">{item.icon}</div>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-400 font-medium tracking-wide">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-slate-300/50 flex items-start justify-center p-2 bg-white/50 backdrop-blur-sm shadow-sm"
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, #F8FAFC 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
