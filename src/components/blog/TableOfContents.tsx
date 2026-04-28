'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { List, ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Derive TOC items from content without an effect
  const items = useMemo<TOCItem[]>(() => {
    const extracted: TOCItem[] = [];
    const lines = content.split('\n');

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('## ')) {
        const text = trimmedLine.replace('## ', '');
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        extracted.push({ id, text, level: 2 });
      }
    });

    return extracted;
  }, [content]);

  // Track active section on scroll
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className={cn('bg-surface-glass backdrop-blur-xl rounded-xl border border-border-glass', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-glass-hover transition-colors rounded-xl"
      >
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-accent" />
          <span className="font-semibold text-text-primary">Table of Contents</span>
        </div>
        <ChevronRight
          className={cn(
            'w-4 h-4 text-text-tertiary transition-transform duration-200',
            isExpanded && 'rotate-90'
          )}
        />
      </button>

      {isExpanded && (
        <ul className="px-4 pb-4 space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'block py-2 px-3 text-sm rounded-lg transition-all duration-200',
                  'hover:bg-accent/10 hover:text-accent',
                  activeId === item.id
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-text-secondary'
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
