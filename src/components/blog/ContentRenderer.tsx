'use client';

import { cn } from '@/lib/utils';

interface ContentRendererProps {
  content: string;
  className?: string;
}

export function ContentRenderer({ content, className }: ContentRendererProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';
  let currentTable: { headers: string[]; rows: string[][] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    
    const ListTag = currentList.type === 'ul' ? 'ul' : 'ol';
    elements.push(
      <ListTag
        key={elements.length}
        className={cn(
          'my-6 pl-6',
          currentList.type === 'ul' ? 'list-disc' : 'list-decimal'
        )}
      >
        {currentList.items}
      </ListTag>
    );
    currentList = null;
  };

  const flushTable = () => {
    if (!currentTable || currentTable.rows.length === 0) {
      currentTable = null;
      return;
    }
    
    const hasHeaders = currentTable.headers.length > 0;
    const colCount = hasHeaders ? currentTable.headers.length : currentTable.rows[0]?.length || 0;
    
    // Use CSS custom property for dynamic column width
    const tableStyle = { '--col-width': `${100 / colCount}%` } as React.CSSProperties;
    
    elements.push(
      <div key={elements.length} className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse table-fixed" style={tableStyle}>
          <caption className="sr-only">Data table with {colCount} columns</caption>
          {hasHeaders && (
            <thead>
              <tr className="border-b-2 border-border-glass">
                {currentTable.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="py-3 px-4 text-left font-semibold text-text-primary bg-surface-elevated table-col"
                  >
                    {renderInlineFormatting(header)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {currentTable.rows.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                className={cn(
                  'border-b border-border-glass',
                  rowIdx % 2 === 1 && 'bg-surface-elevated/50'
                )}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="py-3 px-4 text-text-secondary align-top table-col"
                  >
                    {renderInlineFormatting(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    
    currentTable = null;
  };

  const flushCodeBlock = () => {
    if (!inCodeBlock || !codeContent) return;
    
    elements.push(
      <pre
        key={elements.length}
        className="my-6 p-4 bg-slate-900 rounded-xl overflow-x-auto"
      >
        <code className="text-sm font-mono text-slate-100">
          {codeContent.trim()}
        </code>
      </pre>
    );
    
    inCodeBlock = false;
    codeContent = '';
    codeLanguage = '';
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Code blocks
    if (trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock();
      } else {
        flushList();
        inCodeBlock = true;
        codeLanguage = trimmedLine.slice(3).trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      return;
    }

    // Skip empty lines
    if (!trimmedLine) {
      flushList();
      return;
    }

    // H1 - Convert to H2 for article content (H1 should be page title)
    if (trimmedLine.startsWith('# ')) {
      flushList();
      const text = trimmedLine.replace('# ', '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      elements.push(
        <h2
          key={`${index}-${text}`}
          id={id}
          className="text-3xl font-bold text-text-primary mt-12 mb-6 scroll-mt-24"
        >
          {text}
        </h2>
      );
      return;
    }

    // H2
    if (trimmedLine.startsWith('## ')) {
      flushList();
      const text = trimmedLine.replace('## ', '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      elements.push(
        <h2
          key={`${index}-${text}`}
          id={id}
          className="text-2xl font-bold text-text-primary mt-12 mb-4 scroll-mt-24"
        >
          {text}
        </h2>
      );
      return;
    }

    // H3
    if (trimmedLine.startsWith('### ')) {
      flushList();
      const text = trimmedLine.replace('### ', '');
      elements.push(
        <h3
          key={`${index}-${text}`}
          className="text-xl font-bold text-accent mt-8 mb-3"
        >
          {text}
        </h3>
      );
      return;
    }

    // H4
    if (trimmedLine.startsWith('#### ')) {
      flushList();
      const text = trimmedLine.replace('#### ', '');
      elements.push(
        <h4
          key={`${index}-${text}`}
          className="text-lg font-semibold text-text-primary mt-6 mb-2"
        >
          {text}
        </h4>
      );
      return;
    }

    // Unordered list
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      const text = trimmedLine.slice(2);
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(
        <li key={currentList.items.length} className="text-text-secondary mb-2 leading-relaxed">
          {renderInlineFormatting(text)}
        </li>
      );
      return;
    }

    // Ordered list
    const orderedMatch = trimmedLine.match(/^(\d+)\.\s(.+)$/);
    if (orderedMatch) {
      const text = orderedMatch[2];
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(
        <li key={currentList.items.length} className="text-text-secondary mb-2 leading-relaxed">
          {renderInlineFormatting(text)}
        </li>
      );
      return;
    }

    // Blockquote
    if (trimmedLine.startsWith('> ')) {
      flushList();
      const text = trimmedLine.replace('> ', '');
      elements.push(
        <blockquote
          key={`${index}-quote`}
          className="my-6 pl-6 border-l-4 border-accent italic text-text-secondary"
        >
          {renderInlineFormatting(text)}
        </blockquote>
      );
      return;
    }

    // Table row - collect rows to render as single table
    if (trimmedLine.includes('|')) {
      flushList();
      flushCodeBlock();
      
      // Skip table separator lines (| --- | --- |)
      if (trimmedLine.match(/^\|[-\s:|]+\|$/)) return;
      
      const cells = trimmedLine
        .split('|')
        .map((cell) => cell.trim())
        .filter(Boolean);
      
      if (cells.length > 0) {
        if (!currentTable) {
          // First row becomes headers
          currentTable = { headers: cells, rows: [] };
        } else {
          // Subsequent rows are data rows
          currentTable.rows.push(cells);
        }
      }
      return;
    } else if (currentTable) {
      // End of table - flush it
      flushTable();
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={`${index}-p`} className="text-text-secondary mb-4 leading-relaxed">
        {renderInlineFormatting(trimmedLine)}
      </p>
    );
  });

  // Flush any remaining list
  flushList();
  // Flush any remaining code block
  if (inCodeBlock) {
    flushCodeBlock();
  }
  // Flush any remaining table
  flushTable();

  return (
    <article className={cn('prose prose-lg max-w-none', className)}>
      {elements}
    </article>
  );
}

// Helper function to render inline formatting (bold, italic, links, code)
function renderInlineFormatting(text: string): React.ReactNode {
  // Handle inline code
  const parts: React.ReactNode[] = [];
  const remaining = text;
  let key = 0;

  // Regex patterns
  const patterns = [
    { regex: /`([^`]+)`/g, type: 'code' },
    { regex: /\*\*([^*]+)\*\*/g, type: 'bold' },
    { regex: /\*([^*]+)\*/g, type: 'italic' },
    { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' },
  ];

  // Simple approach: process bold first, then handle rest
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  
  segments.forEach((segment, idx) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      parts.push(
        <strong key={key++} className="text-text-primary font-semibold">
          {segment.slice(2, -2)}
        </strong>
      );
    } else {
      // Process inline code
      const codeSegments = segment.split(/(`[^`]+`)/g);
      codeSegments.forEach((codeSeg, codeIdx) => {
        if (codeSeg.startsWith('`') && codeSeg.endsWith('`')) {
          parts.push(
            <code
              key={key++}
              className="px-1.5 py-0.5 bg-background-tertiary rounded text-sm font-mono text-accent"
            >
              {codeSeg.slice(1, -1)}
            </code>
          );
        } else {
          // Process italic
          const italicSegments = codeSeg.split(/(\*[^*]+\*)/g);
          italicSegments.forEach((italicSeg, italicIdx) => {
            if (italicSeg.startsWith('*') && italicSeg.endsWith('*')) {
              parts.push(
                <em key={key++} className="italic">
                  {italicSeg.slice(1, -1)}
                </em>
              );
            } else {
              // Process links
              const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
              let match;
              let lastIndex = 0;
              const linkParts: React.ReactNode[] = [];
              
              while ((match = linkRegex.exec(italicSeg)) !== null) {
                if (match.index > lastIndex) {
                  linkParts.push(italicSeg.slice(lastIndex, match.index));
                }
                const [fullMatch, linkText, linkUrl] = match;
                linkParts.push(
                  <a
                    key={key++}
                    href={linkUrl}
                    className="text-accent hover:text-accent-hover underline"
                    target={linkUrl.startsWith('http') ? '_blank' : undefined}
                    rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {linkText}
                  </a>
                );
                lastIndex = match.index + fullMatch.length;
              }
              
              if (linkParts.length === 0) {
                parts.push(italicSeg);
              } else {
                if (lastIndex < italicSeg.length) {
                  linkParts.push(italicSeg.slice(lastIndex));
                }
                parts.push(...linkParts);
              }
            }
          });
        }
      });
    }
  });

  return <>{parts}</>;
}
