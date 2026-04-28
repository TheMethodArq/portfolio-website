'use client';

import { motion } from 'framer-motion';
import { XCircle, CheckCircle, ShieldAlert, BadgeDollarSign, HeartHandshake, BoxSelect } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const options = [
  {
    title: "Option 1: Consumer AI",
    subtitle: "(ChatGPT, Claude, Custom Solutions)",
    icon: ShieldAlert,
    color: "text-blue-600",
    bg: "bg-blue-50/50",
    border: "border-blue-200",
    points: [
      "Powerful but dangerous",
      "No governance, no audit trails",
      "Your data trains someone else's models",
      "No control over what happens next",
    ],
    isThalamus: false,
  },
  {
    title: "Option 2: Enterprise AI",
    subtitle: "(Microsoft Copilot, Salesforce Einstein)",
    icon: BadgeDollarSign,
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50/50",
    border: "border-fuchsia-200",
    points: [
      "Expensive per-user licensing",
      "Long deployment cycles",
      "Consultant armies required",
      "Vendor lock-in from day one",
    ],
    isThalamus: false,
  },
  {
    title: "Option 3: The Thalamus Answer",
    subtitle: "Enterprise-grade. Accessible to everyone.",
    icon: HeartHandshake,
    color: "text-purple-600",
    bg: "bg-gradient-to-br from-indigo-50 to-purple-50",
    border: "border-purple-300 shadow-xl shadow-purple-500/10",
    points: [
      "Enterprise-grade governance and security",
      "Pricing that scales with what you actually need",
      "Production-ready from day one",
      "Your data never leaves your control",
      "Open source core you can audit and fork",
    ],
    isThalamus: true,
  }
];

export function ProblemSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-50/50 rounded-bl-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-purple-50/50 rounded-tr-[100px] -z-10" />

      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            The gatekeeping is over.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600"
          >
            Right now, if you're not a Fortune 500 company, you're told to make do with consumer tools and hope nothing breaks. Or worse, you're told AI "isn't for you yet."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative flex flex-col h-full rounded-2xl border p-8 ${option.bg} ${option.border} ${option.isThalamus ? 'shadow-xl' : 'opacity-90 hover:opacity-100 transition-opacity'}`}
            >
              {option.isThalamus && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-md">
                  The Bridge
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 ${option.bg === 'bg-white' ? 'bg-slate-50' : 'bg-white'} ${option.color}`}>
                <option.icon className="w-6 h-6" />
              </div>
              
              <h3 className={`text-xl font-bold mb-1 ${option.isThalamus ? 'text-slate-900' : 'text-slate-800'}`}>
                {option.title}
              </h3>
              <p className="text-sm text-slate-500 mb-8 h-10">
                {option.subtitle}
              </p>

              <ul className="space-y-4 mb-8 flex-1">
                {option.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    {option.isThalamus ? (
                      <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className={option.isThalamus ? 'font-medium' : ''}>{point}</span>
                  </li>
                ))}
              </ul>
              
              {option.isThalamus && (
                <div className="mt-auto pt-6 border-t border-purple-200">
                  <p className="text-sm font-semibold text-purple-700 text-center">
                    This is what democratization looks like.
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
