'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryModalProps {
  onClose: () => void;
}

const animatedStatements = [
  'What if the playbook was rigged?',
  'What if enterprise tech belonged to you?',
  'What if AI finally served small business?',
];

export function EntryModalContent({ onClose }: EntryModalProps) {
  const [phase, setPhase] = useState<'statements' | 'reveal'>('statements');
  const [statementIndex, setStatementIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (phase !== 'statements') return;

    if (statementIndex >= animatedStatements.length) {
      const revealTimer = setTimeout(() => setPhase('reveal'), 800);
      return () => clearTimeout(revealTimer);
    }

    const statementTimer = setTimeout(() => {
      setStatementIndex((prevIndex) => prevIndex + 1);
    }, 3200);

    return () => clearTimeout(statementTimer);
  }, [phase, statementIndex]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('thalamus-entry-modal-dismissed', 'true');
      onClose();
    }, 600);
  }, [onClose]);

  const handleExplore = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('thalamus-entry-modal-dismissed', 'true');
      window.location.href = '/philosophy';
    }, 600);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950"
      onClick={handleClose}
    >
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 entry-modal-gradient"
        />
        <div 
          className="absolute inset-0 opacity-[0.03] entry-modal-grid"
        />
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors rounded-lg border border-slate-800 hover:border-slate-600"
      >
        Skip Intro
      </motion.button>

      <div 
        className="relative z-10 w-full max-w-4xl mx-auto px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {phase === 'statements' && (
            <motion.div
              key="statements"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center min-h-[300px]"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={statementIndex}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.1, 0.25, 1],
                    opacity: { duration: 0.6 }
                  }}
                  className="text-3xl md:text-5xl lg:text-6xl text-center font-semibold text-white tracking-tight"
                >
                  {animatedStatements[statementIndex]}
                </motion.h1>
              </AnimatePresence>
              
              <div className="flex gap-2 mt-12">
                {animatedStatements.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="w-2 h-2 rounded-full"
                    animate={{
                      backgroundColor: idx === statementIndex 
                        ? 'rgb(139, 92, 246)' 
                        : idx < statementIndex 
                          ? 'rgba(139, 92, 246, 0.4)' 
                          : 'rgba(255, 255, 255, 0.2)',
                      scale: idx === statementIndex ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative inline-block"
              >
                <div className="relative w-20 h-20 mx-auto">
                  <div 
                    className="absolute inset-0 rounded-2xl blur-xl opacity-40 entry-logo-glow"
                  />
                  <div 
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center entry-logo-bg"
                  >
                    <span className="text-3xl font-bold text-white">T</span>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-5">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
                >
                  Thalamus
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="space-y-3"
                >
                  <p className="text-xl md:text-2xl text-purple-400 font-medium">
                    Fortune 500 AI infrastructure.
                  </p>
                  <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto">
                    Without the Fortune 500 gatekeepers.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExplore}
                  className="px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all shadow-lg entry-cta-primary"
                >
                  <span className="flex items-center gap-2">
                    Read Our Philosophy
                    <motion.span 
                      animate={{ x: [0, 4, 0] }} 
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="px-8 py-4 text-lg font-semibold text-slate-300 rounded-xl border border-slate-700 transition-all"
                >
                  Enter Site
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs text-slate-600 pt-4"
              >
                First visit only — won&apos;t show again
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
