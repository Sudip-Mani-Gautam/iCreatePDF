'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Tool, ToolCategory } from '@/types/tool';
import { Card } from '@/components/ui/Card';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { getToolIcon } from '@/config/icons';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

export interface ToolCardProps {
  /** Tool data to display */
  tool: Tool;
  /** Current locale for URL generation */
  locale: string;
  /** Optional additional CSS classes */
  className?: string;
  /** Localized content */
  localizedContent?: { title: string; description: string };
}

const categoryTranslationKeys: Record<ToolCategory, string> = {
  'edit-annotate': 'editAnnotate',
  'convert-to-pdf': 'convertToPdf',
  'convert-from-pdf': 'convertFromPdf',
  'organize-manage': 'organizeManage',
  'optimize-repair': 'optimizeRepair',
  'secure-pdf': 'securePdf',
};

const categoryStyles: Record<
  ToolCategory,
  { iconBg: string; iconColor: string; badgeBg: string; badgeText: string }
> = {
  'organize-manage': {
    iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-700 dark:text-rose-300',
  },
  'optimize-repair': {
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
  },
  'convert-to-pdf': {
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-700 dark:text-blue-300',
  },
  'convert-from-pdf': {
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-700 dark:text-amber-300',
  },
  'edit-annotate': {
    iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-700 dark:text-purple-300',
  },
  'secure-pdf': {
    iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-500/10',
    badgeText: 'text-teal-700 dark:text-teal-300',
  },
};

/**
 * ToolCard component displays a single PDF tool with icon, name, and description.
 * Includes hover effects, category badge, and links to the tool page.
 */
export function ToolCard({ tool, locale, className = '', localizedContent }: ToolCardProps) {
  const t = useTranslations();
  const toolUrl = `/${locale}/tools/${tool.slug}`;

  // Get a human-readable name from the tool ID or localized title
  const toolName =
    localizedContent?.title ||
    tool.id
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  // Generate a description from features or localized description
  const description =
    localizedContent?.description ||
    tool.features
      .slice(0, 3)
      .map((f) => f.replace(/-/g, ' '))
      .join(', ');

  const IconComponent = getToolIcon(tool.icon);
  const categoryName = t(`home.categories.${categoryTranslationKeys[tool.category]}`);
  const catStyle = categoryStyles[tool.category] || categoryStyles['edit-annotate'];

  return (
    <Link
      href={toolUrl}
      className={`block focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 rounded-2xl group ${className}`}
      data-testid="tool-card"
    >
      <Card
        className="h-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:border-[hsl(var(--color-primary)/0.5)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col p-5 shadow-sm"
        data-testid="tool-card-container"
      >
        {/* Star Favorite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton toolId={tool.id} size="sm" />
        </div>

        {/* Top Hover Arrow */}
        <div className="absolute top-3 right-10 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[hsl(var(--color-primary))]">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        <div className="flex flex-col h-full">
          {/* Tool Icon with category accent */}
          <div className="flex items-start mb-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${catStyle.iconBg}`}
              data-testid="tool-card-icon"
              aria-hidden="true"
            >
              <IconComponent className={`w-6 h-6 ${catStyle.iconColor}`} data-icon={tool.icon} />
            </div>
          </div>

          {/* Tool Info */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-bold text-[hsl(var(--color-foreground))] truncate mb-1.5 group-hover:text-[hsl(var(--color-primary))] transition-colors tracking-tight"
              data-testid="tool-card-name"
            >
              {toolName}
            </h3>
            <p
              className="text-xs text-[hsl(var(--color-muted-foreground))] line-clamp-2 leading-relaxed mb-4"
              data-testid="tool-card-description"
            >
              {description}
            </p>
          </div>

          {/* Card Footer: Category badge & Open action hint */}
          <div className="mt-auto pt-3 border-t border-[hsl(var(--color-border)/0.6)] flex items-center justify-between text-xs">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors ${catStyle.badgeBg} ${catStyle.badgeText}`}
            >
              {categoryName}
            </span>
            <span className="text-xs font-semibold text-[hsl(var(--color-primary))] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 flex items-center gap-0.5">
              Open <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default ToolCard;
