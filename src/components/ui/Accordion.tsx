'use client';

import { forwardRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, allowMultiple = false, defaultOpen = [], className, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

    const toggleItem = useCallback(
      (id: string) => {
        setOpenItems((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            if (!allowMultiple) {
              newSet.clear();
            }
            newSet.add(id);
          }
          return newSet;
        });
      },
      [allowMultiple]
    );

    return (
      <div
        ref={ref}
        className={cn('divide-y divide-border-glass', className)}
        {...props}
      >
        {items.map((item) => {
          const isOpen = openItems.has(item.id);
          return (
            <div key={item.id} className="py-2">
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className={cn(
                  'w-full flex items-center justify-between',
                  'py-4 px-2 -mx-2 rounded-lg',
                  'text-left',
                  'transition-colors duration-150',
                  'hover:bg-surface-glass',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
                )}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
              >
                <span className="font-semibold text-text-primary pr-4">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="flex-shrink-0 text-text-secondary"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`accordion-content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.2, ease: 'easeInOut' },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 pt-1 px-2 text-text-secondary leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
