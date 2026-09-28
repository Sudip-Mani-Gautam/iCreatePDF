'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Home,
  ChevronRight,
  ChevronDown,
  FileText,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ListOrdered,
} from 'lucide-react';
import { Tool, ToolContent, HowToStep, UseCase, FAQ, ToolCategory } from '@/types/tool';
import { Card } from '@/components/ui/Card';
import { getToolById } from '@/config/tools';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';
import { ToolProvider } from '@/lib/contexts/ToolContext';
import { getToolIcon } from '@/config/icons';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { sanitizeHtml } from '@/lib/utils/html-sanitizer';
import { analytics } from '@/lib/analytics';

export interface ToolPageProps {
  /** Tool data */
  tool: Tool;
  /** Tool content for SEO and documentation */
  content: ToolContent;
  /** Current locale */
  locale: string;
  /** Children for the tool interface area */
  children?: React.ReactNode;
  /** Localized content for related tools */
  localizedRelatedTools?: Record<string, { title: string; description: string }>;
}

const categoryTranslationKeys: Record<ToolCategory, string> = {
  'edit-annotate': 'editAnnotate',
  'convert-to-pdf': 'convertToPdf',
  'convert-from-pdf': 'convertFromPdf',
  'organize-manage': 'organizeManage',
  'optimize-repair': 'optimizeRepair',
  'secure-pdf': 'securePdf',
};

const categoryBadgeStyles: Record<
  ToolCategory,
  { iconBg: string; iconColor: string; badgeBg: string; badgeText: string }
> = {
  'edit-annotate': {
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-700 dark:text-blue-300',
  },
  'convert-to-pdf': {
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
  },
  'convert-from-pdf': {
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-700 dark:text-amber-300',
  },
  'organize-manage': {
    iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-700 dark:text-purple-300',
  },
  'optimize-repair': {
    iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
  },
  'secure-pdf': {
    iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    iconColor: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-700 dark:text-rose-300',
  },
};

/**
 * ToolPage layout component provides the structure for individual tool pages.
 * Includes tool interface, description, how-to, use cases, FAQ, and related tools.
 */
export function ToolPage({
  tool,
  content,
  locale,
  children,
  localizedRelatedTools = {},
}: ToolPageProps) {
  // Get related tools data
  const relatedTools = tool.relatedTools
    .map((id) => getToolById(id))
    .filter((t): t is Tool => t !== undefined);

  const t = useTranslations();

  // Get tool display name
  const toolDisplayName =
    content.title ||
    tool.id
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  React.useEffect(() => {
    analytics.toolOpen({
      tool_name: tool.id,
      tool_category: tool.category,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    });
  }, [tool.id, tool.category]);

  return (
    <ToolProvider toolSlug={tool.slug} toolName={toolDisplayName}>
      <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]" data-testid="tool-page">
        <Header locale={locale as Locale} />

        <main id="main-content" className="flex-1 pt-20 sm:pt-22 md:pt-24 pb-16" tabIndex={-1}>
          <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center text-xs text-[hsl(var(--color-muted-foreground))] flex-wrap gap-1.5"
            >
              <Link
                href={`/${locale}`}
                className="flex items-center hover:text-[hsl(var(--color-primary))] transition-colors"
                title={t('common.navigation.home')}
              >
                <Home className="w-3.5 h-3.5" />
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--color-border))]" />
              <Link
                href={`/${locale}/tools`}
                className="hover:text-[hsl(var(--color-primary))] transition-colors"
              >
                {t('common.navigation.tools')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--color-border))]" />
              <Link
                href={`/${locale}/tools/category/${tool.category}`}
                className="hover:text-[hsl(var(--color-primary))] transition-colors"
              >
                {t(`home.categories.${categoryTranslationKeys[tool.category]}`)}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--color-border))]" />
              <span
                className="font-medium text-[hsl(var(--color-foreground))] truncate max-w-[200px] sm:max-w-md"
                aria-current="page"
              >
                {content.title || toolDisplayName}
              </span>
            </nav>

            {/* Tool Header */}
            <ToolHeader tool={tool} content={content} locale={locale} />

            {/* Tool Interface Area */}
            <section
              className="mt-6 mb-16"
              data-testid="tool-page-interface"
              aria-label="Tool interface"
            >
              {children}
            </section>

            {/* Description Section */}
            <DescriptionSection description={content.description} />

            {/* How to Use Section */}
            <HowToUseSection steps={content.howToUse} />

            {/* Use Cases Section */}
            <UseCasesSection useCases={content.useCases} />

            {/* FAQ Section with interactive accordion */}
            <FAQSection faq={content.faq} />

            {/* Related Tools Section */}
            <RelatedToolsSection
              tools={relatedTools}
              locale={locale}
              localizedRelatedTools={localizedRelatedTools}
            />
          </div>
        </main>

        <Footer locale={locale as Locale} />
      </div>
    </ToolProvider>
  );
}

/**
 * Tool header with icon, name, and brief description
 */
interface ToolHeaderProps {
  tool: Tool;
  content: ToolContent;
  locale: string;
}

function ToolHeader({ tool, content, locale }: ToolHeaderProps) {
  const t = useTranslations();
  const toolName = tool.id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const IconComponent = getToolIcon(tool.icon);
  const categoryName = t(`home.categories.${categoryTranslationKeys[tool.category]}`);
  const catStyle = categoryBadgeStyles[tool.category] || categoryBadgeStyles['edit-annotate'];

  return (
    <header
      className="text-center max-w-3xl mx-auto py-2"
      data-testid="tool-page-header"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <meta itemProp="applicationCategory" content="UtilitiesApplication" />
      <meta itemProp="operatingSystem" content="Web Browser" />
      <meta itemProp="offers" itemScope itemType="https://schema.org/Offer" content="" />
      <meta itemProp="price" content="0" />
      <meta itemProp="priceCurrency" content="USD" />

      {/* Tool Icon */}
      <div className="flex items-center justify-center mb-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${catStyle.iconBg} ${catStyle.iconColor}`}
          aria-hidden="true"
        >
          <IconComponent className="w-8 h-8" />
        </div>
      </div>

      {/* Tool Title */}
      <h1
        className="text-3xl sm:text-4xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight mb-2.5"
        data-testid="tool-page-title"
        itemProp="name"
      >
        {content.title || toolName}
      </h1>

      {/* Tool Description */}
      <p
        className="text-sm sm:text-base text-[hsl(var(--color-muted-foreground))] leading-relaxed mb-5 max-w-2xl mx-auto"
        data-testid="tool-page-subtitle"
        itemProp="description"
      >
        {content.metaDescription}
      </p>

      {/* Meta Row: Category Pill & Favorite Button */}
      <div className="flex items-center justify-center gap-3">
        <Link
          href={`/${locale}/tools/category/${tool.category}`}
          className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${catStyle.badgeBg} ${catStyle.badgeText}`}
        >
          {categoryName}
        </Link>
        <FavoriteButton toolId={tool.id} size="sm" showLabel />
      </div>
    </header>
  );
}

/**
 * Description section with detailed tool information
 */
interface DescriptionSectionProps {
  description: string;
}

function DescriptionSection({ description }: DescriptionSectionProps) {
  const t = useTranslations();
  const sanitizedDescription = useMemo(() => sanitizeHtml(description), [description]);
  if (!description) return null;

  return (
    <section
      className="mt-14 scroll-mt-28"
      data-testid="tool-page-description"
      aria-labelledby="description-heading"
    >
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[hsl(var(--color-border))]">
        <div className="w-9 h-9 rounded-xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center">
          <FileText className="w-4.5 h-4.5" />
        </div>
        <h2
          id="description-heading"
          className="text-xl sm:text-2xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight"
        >
          {t('tools.about')}
        </h2>
      </div>

      <div className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 sm:p-8 shadow-sm">
        <div
          className="prose prose-sm sm:prose-base max-w-none text-[hsl(var(--color-foreground))/0.85] leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>
    </section>
  );
}

/**
 * How to use section with numbered steps
 */
interface HowToUseSectionProps {
  steps: HowToStep[];
}

function HowToUseSection({ steps }: HowToUseSectionProps) {
  const t = useTranslations();
  if (!steps || steps.length === 0) return null;

  const gridColsClass =
    steps.length === 3
      ? 'grid-cols-1 md:grid-cols-3'
      : steps.length === 4
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      className="mt-14 scroll-mt-28"
      data-testid="tool-page-how-to-use"
      aria-labelledby="how-to-use-heading"
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[hsl(var(--color-border))]">
        <div className="w-9 h-9 rounded-xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center">
          <ListOrdered className="w-4.5 h-4.5" />
        </div>
        <h2
          id="how-to-use-heading"
          className="text-xl sm:text-2xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight"
          itemProp="name"
        >
          {t('tools.howToUse')}
        </h2>
      </div>

      <ol className={`grid gap-4.5 ${gridColsClass}`} data-testid="how-to-use-steps">
        {steps.map((step) => (
          <li
            key={step.step}
            className="flex flex-col h-full"
            data-testid={`how-to-step-${step.step}`}
            id={`step-${step.step}`}
            itemScope
            itemProp="step"
            itemType="https://schema.org/HowToStep"
          >
            <meta itemProp="position" content={String(step.step)} />
            <div className="flex-1 h-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-sm hover:border-[hsl(var(--color-primary)/0.4)] hover:shadow-md transition-all flex flex-col group">
              <div
                className="w-8 h-8 rounded-lg bg-[hsl(var(--color-primary)/0.12)] text-[hsl(var(--color-primary))] flex items-center justify-center font-bold text-xs mb-3.5 group-hover:bg-[hsl(var(--color-primary))] group-hover:text-white transition-colors"
                aria-hidden="true"
              >
                {step.step}
              </div>
              <h3
                className="text-base font-bold text-[hsl(var(--color-foreground))] mb-1.5 tracking-tight group-hover:text-[hsl(var(--color-primary))] transition-colors"
                itemProp="name"
              >
                {step.title}
              </h3>
              <p
                className="text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed flex-1"
                itemProp="text"
              >
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Use cases section with practical scenarios
 */
interface UseCasesSectionProps {
  useCases: UseCase[];
}

function UseCasesSection({ useCases }: UseCasesSectionProps) {
  const t = useTranslations();
  if (!useCases || useCases.length === 0) return null;

  return (
    <section
      className="mt-14 scroll-mt-28"
      data-testid="tool-page-use-cases"
      aria-labelledby="use-cases-heading"
    >
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[hsl(var(--color-border))]">
        <div className="w-9 h-9 rounded-xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center">
          <Sparkles className="w-4.5 h-4.5" />
        </div>
        <h2
          id="use-cases-heading"
          className="text-xl sm:text-2xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight"
        >
          {t('tools.useCases')}
        </h2>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5"
        data-testid="use-cases-grid"
      >
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="h-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-sm hover:border-[hsl(var(--color-primary)/0.4)] hover:shadow-md transition-all flex items-start gap-3.5 group"
            data-testid={`use-case-${index}`}
          >
            <div
              className="w-10 h-10 rounded-xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(var(--color-primary))] group-hover:text-white transition-all duration-300"
              aria-hidden="true"
            >
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[hsl(var(--color-foreground))] mb-1 group-hover:text-[hsl(var(--color-primary))] transition-colors tracking-tight">
                {useCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                {useCase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * FAQ section with interactive accordion and microdata
 */
interface FAQSectionProps {
  faq: FAQ[];
}

function FAQSection({ faq }: FAQSectionProps) {
  const t = useTranslations();
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));

  if (!faq || faq.length === 0) return null;

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      className="mt-14 scroll-mt-28"
      data-testid="tool-page-faq"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[hsl(var(--color-border))]">
        <div className="w-9 h-9 rounded-xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center">
          <HelpCircle className="w-4.5 h-4.5" />
        </div>
        <h2
          id="faq-heading"
          className="text-xl sm:text-2xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight"
        >
          {t('tools.faq')}
        </h2>
      </div>

      <div className="space-y-3" data-testid="faq-list">
        {faq.map((item, index) => {
          const isOpen = openIndices.has(index);
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[hsl(var(--color-primary)/0.4)] bg-[hsl(var(--color-card))] shadow-sm'
                  : 'border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:border-[hsl(var(--color-primary)/0.3)]'
              }`}
              data-testid={`faq-item-${index}`}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[hsl(var(--color-foreground))] hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-bold tracking-tight" itemProp="name">
                  {item.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? 'rotate-180 bg-[hsl(var(--color-primary)/0.12)] text-[hsl(var(--color-primary))]'
                      : 'text-[hsl(var(--color-muted-foreground))] bg-[hsl(var(--color-muted))]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div
                  className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed border-t border-[hsl(var(--color-border)/0.6)]"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Related tools section
 */
interface RelatedToolsSectionProps {
  tools: Tool[];
  locale: string;
  localizedRelatedTools: Record<string, { title: string; description: string }>;
}

function RelatedToolsSection({ tools, locale, localizedRelatedTools }: RelatedToolsSectionProps) {
  const t = useTranslations();
  if (!tools || tools.length === 0) return null;

  return (
    <section
      className="mt-14 scroll-mt-28"
      data-testid="tool-page-related-tools"
      aria-labelledby="related-tools-heading"
    >
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[hsl(var(--color-border))]">
        <div className="w-9 h-9 rounded-xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] flex items-center justify-center">
          <ArrowRight className="w-4.5 h-4.5" />
        </div>
        <h2
          id="related-tools-heading"
          className="text-xl sm:text-2xl font-extrabold text-[hsl(var(--color-foreground))] tracking-tight"
        >
          {t('tools.relatedTools')}
        </h2>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5"
        data-testid="related-tools-grid"
      >
        {tools.map((tool) => {
          const localized = localizedRelatedTools[tool.id];
          const toolName =
            localized?.title ||
            tool.id
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

          const IconComponent = getToolIcon(tool.icon);
          const categoryName = t(`home.categories.${categoryTranslationKeys[tool.category]}`);
          const catStyle = categoryBadgeStyles[tool.category] || categoryBadgeStyles['edit-annotate'];

          return (
            <Link
              key={tool.id}
              href={`/${locale}/tools/${tool.slug}`}
              className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] rounded-2xl"
            >
              <div className="h-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-sm hover:border-[hsl(var(--color-primary)/0.4)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform ${catStyle.iconBg} ${catStyle.iconColor}`}
                    aria-hidden="true"
                  >
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-sm sm:text-base text-[hsl(var(--color-foreground))] block truncate group-hover:text-[hsl(var(--color-primary))] transition-colors tracking-tight">
                      {toolName}
                    </span>
                    <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                      {categoryName}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[hsl(var(--color-muted-foreground))] group-hover:text-[hsl(var(--color-primary))] group-hover:bg-[hsl(var(--color-primary)/0.08)] transition-all flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default ToolPage;
