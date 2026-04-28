'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building, User, HeartHandshake, Zap, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';

const idealFor = [
  { icon: User, label: 'Executives & Founders' },
  { icon: Building, label: 'Real Estate & Financial' },
  { icon: HeartHandshake, label: 'Agencies & Service Pros' },
];

const benefits = [
  { icon: Zap, title: 'Zero Coding Required', description: 'We architect, install, and configure everything for you.' },
  { icon: Clock, title: 'Days, Not Quarters', description: 'Get a fully-governed AI infrastructure deployed in 7-14 days.' },
  { icon: Shield, title: 'Enterprise Security', description: 'Your private data, your models, your secure environment.' },
];

export function AIConciergeSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden border-y border-slate-200">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/80 -z-10" />
      
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              High-Demand Concierge Service
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
            >
              Not a developer? <br />
              <span className="text-gradient">We've got you covered.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 max-w-xl"
            >
              You're an expert in your domain. You shouldn't have to be an expert in deploying open-source AI infrastructure. The <strong className="text-slate-800">AI Concierge</strong> is our white-glove service that builds and installs your complete Thalamus ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6 mb-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{benefit.title}</h4>
                      <p className="text-sm text-slate-500">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Button href="/ai-concierge" size="lg" className="w-full sm:w-auto">
                Explore Concierge Services
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-sm text-slate-400 sm:ml-4">
                Starting at $1,800
              </p>
            </motion.div>
          </div>

          {/* Visual Element Side */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl border border-slate-700 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
              
              <h3 className="text-xl font-semibold text-white mb-6">Built For Industry Leaders</h3>
              
              <div className="space-y-4 mb-8">
                {idealFor.map((item, i) => (
                   <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700"
                  >
                    <div className="p-2 bg-slate-700 rounded-lg text-slate-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-200 font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-700">
                <p className="text-slate-400 text-sm leading-relaxed">
                  "I want the power of Fortune 500 AI, but I don't want to hire a DevOps team to keep it running." <br/>
                  <strong className="text-slate-200 mt-2 block">— This is exactly why we built our concierge service.</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
