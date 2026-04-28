'use client';

import { motion } from 'framer-motion';
import { Github, Code2, Users, ArrowUpRight, Scale } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

const projects = [
  {
    name: 'SOPHIA Code',
    description: 'Open-source AI governance and enterprise development framework.',
  },
  {
    name: 'SOPHIAClaw',
    description: 'AI agent with Progressive Autonomy governance built-in.',
  },
  {
    name: 'SOPHIA Core',
    description: 'The core governance engine that powers our commercial products.',
  }
];

export function OpenSourceSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light opacity-50 pointer-events-none" />

      <div className="relative z-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 border border-slate-300 text-slate-700 text-sm font-semibold mb-6 shadow-sm"
              >
                <Github className="w-4 h-4" />
                Thalamus Labz
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight"
              >
                Open source,<br />or it didn't happen.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg prose-slate"
              >
                <p className="text-slate-600 mb-6">
                  You shouldn't have to trust us with AI governance if you can't verify it yourself. We build community editions of the vast majority of what we produce. 
                </p>
                <p className="text-slate-600 mb-8 font-medium">
                  Use our open-source tools. Build your business. Automate your operations. Serve more clients. Scale your team. When you grow to the point where you need hosted infrastructure and enterprise features—that's when we grow together.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <Button href="https://github.com/thalamuslabz" external variant="secondary" size="lg" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400">
                  <Github className="w-5 h-5 mr-2" />
                  View GitHub
                </Button>
              </motion.div>
            </div>

            <div className="flex-1 w-full">
              <div className="grid gap-4">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-purple-500" />
                        {project.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-500">{project.description}</p>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 mt-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Scale className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Bootstrap Economics</h4>
                    <p className="text-sm text-slate-600">We're building to stay, not building to sell. No growth-at-all-costs metrics compromising the mission.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
