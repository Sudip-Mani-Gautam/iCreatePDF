'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Tool, ToolCategory, CATEGORY_INFO } from '@/types/tool';
import { ToolCard } from './ToolCard';
import {
  PenTool,
  FilePlus,
  FileOutput,
  Layers,
  Zap,
  ShieldCheck,
  Search,
} from 'lucide-react';

export interface ToolGridProps {
  /** Array of tools to display */
  tools: Tool[];
  /** Current locale for URL generation */
  locale: string;
  /** Optional category filter */
  category?: ToolCategory;
  /** Optional search query to filter tools */
  searchQuery?: string;
  /** Whether to show category headers */
  showCategoryHeaders?: boolean;
  /** Optional additional CSS classes */
  className?: string;
  /** Localized tool content */
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

const categoryIcons: Record<ToolCategory, React.ComponentType<{ className?: string }>> = {
  'edit-annotate': PenTool,
  'convert-to-pdf': FilePlus,
  'convert-from-pdf': FileOutput,
  'organize-manage': Layers,
  'optimize-repair': Zap,
  'secure-pdf': ShieldCheck,
};

const categoryBadgeStyles: Record<ToolCategory, { iconBg: string; iconColor: string }> = {
  'edit-annotate': { iconBg: 'bg-blue-500/10', iconColor: 'text-blue-600 dark:text-blue-400' },
  'convert-to-pdf': { iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400' },
  'convert-from-pdf': { iconBg: 'bg-amber-500/10', iconColor: 'text-amber-600 dark:text-amber-400' },
  'organize-manage': { iconBg: 'bg-purple-500/10', iconColor: 'text-purple-600 dark:text-purple-400' },
  'optimize-repair': { iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-600 dark:text-cyan-400' },
  'secure-pdf': { iconBg: 'bg-rose-500/10', iconColor: 'text-rose-600 dark:text-rose-400' },
};

export function ToolGrid({
  tools,
  locale,
  category,
  searchQuery,
  showCategoryHeaders = false,
  className = '',
  localizedToolContent,
}: ToolGridProps) {
  const t = useTranslations();

  const categoryTranslationKeys: Record<ToolCategory, string> = {
    'edit-annotate': 'editAnnotate',
    'convert-to-pdf': 'convertToPdf',
    'convert-from-pdf': 'convertFromPdf',
    'organize-manage': 'organizeManage',
    'optimize-repair': 'optimizeRepair',
    'secure-pdf': 'securePdf',
  };

  // Filter tools by category if specified
  const filteredTools = useMemo(() => {
    let result = tools;

    if (category) {
      result = result.filter((tool) => tool.category === category);
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((tool) => {
        // Search in localized content if available
        if (localizedToolContent && localizedToolContent[tool.id]) {
          const { title, description } = localizedToolContent[tool.id];
          if (title.toLowerCase().includes(query) || description.toLowerCase().includes(query)) {
            return true;
          }
        }

        const toolName = tool.id.replace(/-/g, ' ').toLowerCase();
        const features = tool.features.map((f) => f.replace(/-/g, ' ').toLowerCase()).join(' ');
        return toolName.includes(query) || features.includes(query);
      });
    }

    return result;
  }, [tools, category, searchQuery, localizedToolContent]);

  // Group tools by category if showing headers
  const groupedTools = useMemo(() => {
    if (!showCategoryHeaders) {
      return null;
    }

    const groups: Record<ToolCategory, Tool[]> = {
      'edit-annotate': [],
      'convert-to-pdf': [],
      'convert-from-pdf': [],
      'organize-manage': [],
      'optimize-repair': [],
      'secure-pdf': [],
    };

    for (const tool of filteredTools) {
      if (groups[tool.category]) {
        groups[tool.category].push(tool);
      }
    }

    return groups;
  }, [filteredTools, showCategoryHeaders]);

  if (filteredTools.length === 0) {
    return (
      <div
        className={`text-center py-16 px-4 rounded-2xl border border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] ${className}`}
        data-testid="tool-grid-empty"
      >
        <Search className="w-10 h-10 mx-auto text-[hsl(var(--color-muted-foreground))] mb-3 opacity-50" />
        <p className="text-base font-semibold text-[hsl(var(--color-foreground))] mb-1">
          No tools found
        </p>
        <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
          Try searching with different terms or selecting another category.
        </p>
      </div>
    );
  }

  // Render grouped by category
  if (showCategoryHeaders && groupedTools) {
    return (
      <div className={`space-y-14 ${className}`} data-testid="tool-grid">
        {Object.entries(groupedTools).map(([cat, categoryTools]) => {
          if (categoryTools.length === 0) return null;

          const categoryKey = cat as ToolCategory;
          const categoryInfo = CATEGORY_INFO[categoryKey];
          const categoryName = t(`home.categories.${categoryTranslationKeys[categoryKey]}`);
          const CategoryIcon = categoryIcons[categoryKey] || Layers;
          const catStyle = categoryBadgeStyles[categoryKey] || categoryBadgeStyles['edit-annotate'];

          return (
            <section
              key={cat}
              id={`category-${cat}`}
              className="scroll-mt-36"
              data-testid={`tool-grid-category-${cat}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[hsl(var(--color-border))]">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ${catStyle.iconBg} ${catStyle.iconColor}`}
                  >
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl md:text-2xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight">
                        {categoryName}
                      </h2>
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]">
                        {categoryTools.length} tools
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-[hsl(var(--color-muted-foreground))] mt-0.5">
                      {categoryInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    locale={locale}
                    localizedContent={localizedToolContent?.[tool.id]}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  // Render flat grid
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}
      data-testid="tool-grid"
    >
      {filteredTools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          locale={locale}
          localizedContent={localizedToolContent?.[tool.id]}
        />
      ))}
    </div>
  );
}

export default ToolGrid;
