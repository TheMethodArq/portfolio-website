'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Github, Sparkles, Shield, MessageSquare, Cpu, CheckCircle } from 'lucide-react';

const features = [
  { icon: MessageSquare, label: '9+ Channels' },
  { icon: Cpu, label: 'Multi-Provider AI' },
  { icon: Shield, label: 'Governance Built-In' },
  { icon: Github, label: 'Open Source' },
];

export function SOPHIAClawFeatureSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Featured Product
              </span>
              <Badge status="production" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Meet <span className="text-violet-600">SOPHIAClaw</span>
            </h2>

            <p className="text-xl text-slate-600 mb-6">
              The AI infrastructure we wish existed. Self-hosted, multi-channel agents
              with complete audit trails—and governance built-in from day one.
            </p>

            <p className="text-slate-500 mb-8">
              SOPHIAClaw Community is <strong className="text-violet-600">free and open source forever</strong>.
              Our secret sauce is how we apply governance, but the building blocks
              should be available to all.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-violet-200 shadow-sm"
                >
                  <feature.icon className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-medium text-slate-700">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button href="/products/sophiaclaw-community">
                <Github className="w-4 h-4" />
                Get Started Free
              </Button>
              <Button href="/products/sophiaclaw-pro" variant="secondary">
                Explore Pro
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-radial from-violet-500/20 to-transparent rounded-full blur-3xl" />

            <div className="relative bg-white rounded-2xl border border-violet-200 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">SOPHIAClaw</p>
                    <p className="text-xs text-slate-500">Community Edition</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                  Running
                </span>
              </div>

              {/* Terminal-like content */}
              <div className="p-6 bg-slate-950 font-mono text-sm">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-green-400">$</span>
                    <span className="text-slate-300">sophiaclaw status</span>
                  </div>

                  <div className="space-y-2 text-slate-400">
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Gateway: <span className="text-emerald-400">Online</span> (port 37521)
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      SOPHIA Governance: <span className="text-emerald-400">Active</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Channels: <span className="text-white">9 connected</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      AI Providers: <span className="text-white">4 configured</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <p className="text-violet-400 text-xs uppercase tracking-wider mb-2">Recent Activity</p>
                    <div className="space-y-2 text-xs">
                      <p className="text-slate-500">
                        <span className="text-slate-400">14:32</span>
                        {' '}Intent captured: "Schedule meeting with team"
                      </p>
                      <p className="text-slate-500">
                        <span className="text-slate-400">14:32</span>
                        {' '}Policy check: <span className="text-emerald-400">PASSED</span>
                      </p>
                      <p className="text-slate-500">
                        <span className="text-slate-400">14:32</span>
                        {' '}Action executed: Calendar event created
                      </p>
                      <p className="text-slate-500">
                        <span className="text-slate-400">14:32</span>
                        {' '}Audit log: <span className="text-violet-400">SHA-256 verified</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer stats */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">100%</p>
                    <p className="text-xs text-slate-500">Open Source</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">9+</p>
                    <p className="text-xs text-slate-500">Channels</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">MIT</p>
                    <p className="text-xs text-slate-500">License</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-violet-200/50"
        >
          <p className="text-center text-slate-500 text-sm mb-6">
            Trusted by developers who believe governed AI is a fundamental right
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">AES-256 Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">SHA-256 Audit Trails</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              <span className="text-sm">Fully Auditable</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
