'use client';

import { motion } from 'framer-motion';
import { Eye, CheckSquare, Settings2, Zap, ShieldCheck, Lock } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const steps = [
  {
    level: "P0",
    title: "Full Supervision",
    description: "Every action requires explicit human review and approval. The AI suggests; you execute.",
    icon: Eye,
    color: "bg-slate-100 text-slate-600 border-slate-200",
  },
  {
    level: "P1",
    title: "Pre-approved Actions",
    description: "Routine, safe actions execute automatically. Exceptions and edge cases get flagged for human review.",
    icon: CheckSquare,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    level: "P2",
    title: "Broad Operation",
    description: "Broader authority within defined operational boundaries. Periodic audits ensure alignment.",
    icon: Settings2,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
  {
    level: "P3",
    title: "High Autonomy",
    description: "Handles routine operations end-to-end. Human oversight is strictly reserved for high-risk edge cases.",
    icon: Zap,
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    level: "P4",
    title: "Full Autonomy",
    description: "Near-full autonomy with cryptographic audit trails. The system proves what it did and why.",
    icon: ShieldCheck,
    color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200",
  }
];

export function ProgressiveAutonomySection() {
  return (
    <section id="trust" className="py-24 bg-slate-900 text-slate-50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-purple-300 text-sm font-semibold mb-6"
          >
            <Lock className="w-4 h-4" />
            SOPHIA Framework
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Trust is earned. Never assumed.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            Most AI tools are black boxes. You send a prompt, you get a response, and you hope it didn't email your client list. 
            We developed the <strong className="text-white">Progressive Autonomy Protocol</strong> so you never have to guess.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[28px] left-12 right-12 h-[2px] bg-slate-800/80 hidden md:block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 xl:gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col items-center md:items-start text-center md:text-left h-full"
                >
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 md:mb-6 z-10 mx-auto md:mx-0 shadow-lg ${step.color}`}>
                    <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  
                  <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 flex flex-col w-full h-full hover:bg-slate-800/80 hover:border-slate-600 transition-all">
                    <div className="flex flex-col items-center md:items-start gap-2 mb-3">
                      <span className="text-[10px] tracking-wider font-bold px-2 py-1 rounded bg-slate-700 text-slate-300">
                        {step.level}
                      </span>
                      <h3 className="font-bold text-slate-100 text-base md:text-lg leading-tight">{step.title}</h3>
                    </div>
                    <p className="text-sm text-slate-400 mt-auto leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 text-center flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-left flex-1">
              <h4 className="text-xl font-bold text-white mb-2">Governed AI Is Not Optional</h4>
              <p className="text-slate-400 text-sm">
                "Move fast and break things" doesn't work when handling customer financial data or business-critical ops. 
                Everything starts at P0. The system must prove reliability to advance.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
