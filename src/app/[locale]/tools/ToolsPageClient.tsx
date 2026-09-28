'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  X,
  Filter,
  Star,
  LayoutGrid,
  PenTool,
  FilePlus,
  FileOutput,
  Layers,
  Zap,
  ShieldCheck,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getAllTools, getToolsByCategory, getToolById } from '@/config/tools';
import { toolMatchesQuery } from '@/lib/utils/search';
import { type Locale } from '@/lib/i18n/config';
import { type ToolCategory } from '@/types/tool';
import { useFavorites } from '@/hooks/useFavorites';

type CategoryFilter = ToolCategory | 'all' | 'favorites';

interface ToolsPageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}


export default function ToolsPageClient({ locale, localizedToolContent }: ToolsPageClientProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const allTools = getAllTools();
  const { favorites, isLoaded: favoritesLoaded, favoritesCount } = useFavorites();

  const categoryTranslationKeys: Record<ToolCategory, string> = {
    'edit-annotate': 'editAnnotate',
    'convert-to-pdf': 'convertToPdf',
    'convert-from-pdf': 'convertFromPdf',
    'organize-manage': 'organizeManage',
    'optimize-repair': 'optimizeRepair',
    'secure-pdf': 'securePdf',
  };

  // Read initial values from URL search params (client-side)
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(
    (initialCategory as ToolCategory) || 'all'
  );

  // Sync state with URL params when they change
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const query = searchParams.get('q') || '';
    setSelectedCategory(category as CategoryFilter);
    setSearchQuery(query);
  }, [searchParams]);

  const [showFilters, setShowFilters] = useState(false);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    let tools = allTools;

    // Filter by category
    if (selectedCategory === 'favorites') {
      tools = favorites
        .map((id) => getToolById(id))
        .filter((tool): tool is NonNullable<typeof tool> => tool !== undefined);
    } else if (selectedCategory !== 'all') {
      tools = getToolsByCategory(selectedCategory as ToolCategory);
    }

    // Filter by search query (supports current language search)
    if (searchQuery.trim()) {
      tools = tools.filter((tool) =>
        toolMatchesQuery(tool, searchQuery, localizedToolContent?.[tool.id])
      );
    }

    return tools;
  }, [allTools, selectedCategory, searchQuery, favorites, localizedToolContent]);

  // Category options with distinct icons
  const categories: { value: CategoryFilter; label: string; icon: React.ReactNode }[] = [
    {
      value: 'all',
      label: t('toolsPage.allTools'),
      icon: <LayoutGrid className="w-3.5 h-3.5" />,
    },
    {
      value: 'favorites',
      label: t('tools.favorite.title'),
      icon: <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />,
    },
    {
      value: 'edit-annotate',
      label: t('home.categories.editAnnotate'),
      icon: <PenTool className="w-3.5 h-3.5" />,
    },
    {
      value: 'convert-to-pdf',
      label: t('home.categories.convertToPdf'),
      icon: <FilePlus className="w-3.5 h-3.5" />,
    },
    {
      value: 'convert-from-pdf',
      label: t('home.categories.convertFromPdf'),
      icon: <FileOutput className="w-3.5 h-3.5" />,
    },
    {
      value: 'organize-manage',
      label: t('home.categories.organizeManage'),
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      value: 'optimize-repair',
      label: t('home.categories.optimizeRepair'),
      icon: <Zap className="w-3.5 h-3.5" />,
    },
    {
      value: 'secure-pdf',
      label: t('home.categories.securePdf'),
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
  ];

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
  }, []);

  const jumpToCategory = (catId: string) => {
    const el = document.getElementById(`category-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
      <Header locale={locale} />

      <main className="flex-1 pt-20 sm:pt-22 md:pt-24 pb-20">
        {/* Modern Hero Section */}
        <section className="relative pt-6 pb-10 overflow-hidden">
          {/* Subtle Ambient Glow Blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-4 left-1/4 w-96 h-96 bg-[hsl(var(--color-primary)/0.06)] rounded-full blur-3xl" />
            <div className="absolute top-8 right-1/4 w-96 h-96 bg-[hsl(var(--color-accent)/0.06)] rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[hsl(var(--color-foreground))] mb-3.5">
                Professional{' '}
                <span className="bg-gradient-to-r from-[hsl(var(--color-primary))] via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  PDF Tools
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-[hsl(var(--color-muted-foreground))] mb-7 max-w-2xl mx-auto leading-relaxed">
                {allTools.length}+ secure, free tools to edit, convert, compress, sign, and organize
                documents directly in your browser. Zero server uploads.
              </p>

              {/* Modern Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative group">
                  <Search
                    className="absolute left-4.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[hsl(var(--color-primary))] transition-colors z-10"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tools (e.g. merge, compress, sign, word, password)..."
                    className="w-full pl-12 pr-16 py-3.5 text-base md:text-lg rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] shadow-sm focus:outline-none focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)] focus:border-[hsl(var(--color-primary))] transition-all"
                    aria-label="Search tools"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {searchQuery ? (
                      <button
                        onClick={handleClearSearch}
                        className="p-1.5 hover:bg-[hsl(var(--color-muted))] rounded-full transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
                      </button>
                    ) : (
                      <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] border border-[hsl(var(--color-border))]">
                        /
                      </kbd>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Tools Container */}
        <section className="container mx-auto px-4 max-w-7xl">
          {/* Sleek Sticky Filter Bar */}
          <div className="sticky top-16 md:top-20 z-30 py-2.5 px-3 md:px-4 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.9] backdrop-blur-xl shadow-md mb-6 transition-all">
            {/* Mobile Filter Toggle */}
            <div className="flex md:hidden items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-xs"
                onClick={() => setShowFilters(!showFilters)}
                aria-expanded={showFilters}
                aria-controls="category-filters"
              >
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Filter Categories: {categories.find((c) => c.value === selectedCategory)?.label}</span>
              </Button>
            </div>

            {/* Category Filter Tabs */}
            <div
              className={`
                flex items-center gap-1.5 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full
                ${showFilters ? 'flex flex-wrap mt-3 pt-3 border-t border-[hsl(var(--color-border))]' : 'hidden md:flex'}
              `}
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                const isFav = cat.value === 'favorites';
                let count: number | null = null;

                if (isFav) {
                  count = favoritesLoaded ? favoritesCount : null;
                } else if (cat.value === 'all') {
                  count = allTools.length;
                } else {
                  count = getToolsByCategory(cat.value as ToolCategory).length;
                }

                return (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      if (showFilters) setShowFilters(false);
                    }}
                    aria-pressed={isSelected}
                    className={`
                      px-2.5 lg:px-3 py-1.5 rounded-xl text-xs lg:text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 cursor-pointer
                      ${
                        isSelected
                          ? isFav
                            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/25 font-semibold'
                            : 'bg-[hsl(var(--color-primary))] text-white shadow-sm shadow-primary/25 font-semibold'
                          : 'text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]'
                      }
                    `}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                    {count !== null && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                          isSelected
                            ? 'bg-white/25 text-white'
                            : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Clear Filters Button */}
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={handleClearFilters}
                  className="ml-auto text-xs font-semibold text-[hsl(var(--color-primary))] hover:underline px-2.5 py-1 rounded-lg flex-shrink-0 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>{t('toolsPage.clearAll')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Category Anchors (Shown only when browsing all tools with no search) */}
          {selectedCategory === 'all' && !searchQuery && (
            <div className="flex flex-wrap items-center gap-2 mb-8 px-1">
              <span className="text-xs font-semibold text-[hsl(var(--color-muted-foreground))] mr-1">
                Jump to:
              </span>
              {(
                [
                  ['edit-annotate', 'Edit & Annotate'],
                  ['convert-to-pdf', 'Convert to PDF'],
                  ['convert-from-pdf', 'Convert from PDF'],
                  ['organize-manage', 'Organize & Manage'],
                  ['optimize-repair', 'Optimize & Repair'],
                  ['secure-pdf', 'Secure PDF'],
                ] as const
              ).map(([catId, label]) => (
                <button
                  key={catId}
                  onClick={() => jumpToCategory(catId)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[hsl(var(--color-muted)/0.7)] text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary)/0.08)] transition-all cursor-pointer font-medium"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Results Summary Row */}
          <div className="flex items-center justify-between mb-6 px-1">
            <p className="text-xs md:text-sm text-[hsl(var(--color-muted-foreground))]">
              {selectedCategory === 'favorites'
                ? `${filteredTools.length} ${t('tools.favorite.title').toLowerCase()}`
                : filteredTools.length === allTools.length
                  ? t('toolsPage.showingAll', { count: allTools.length })
                  : t('toolsPage.showingFiltered', {
                      filtered: filteredTools.length,
                      total: allTools.length,
                    })}
              {searchQuery && ` ${t('toolsPage.forQuery', { query: searchQuery })}`}
              {selectedCategory !== 'all' &&
                selectedCategory !== 'favorites' &&
                ` ${t('toolsPage.inCategory', {
                  category: t(`home.categories.${categoryTranslationKeys[selectedCategory as ToolCategory]}`),
                })}`}
            </p>

            <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 font-medium hidden sm:flex">
              <Shield className="w-3.5 h-3.5" /> 100% Client-Side Privacy
            </span>
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            selectedCategory === 'all' && !searchQuery ? (
              // Grouped by Category
              <ToolGrid
                tools={filteredTools}
                locale={locale}
                localizedToolContent={localizedToolContent}
                showCategoryHeaders
              />
            ) : (
              // Filtered Flat Grid
              <ToolGrid
                tools={filteredTools}
                locale={locale}
                localizedToolContent={localizedToolContent}
              />
            )
          ) : selectedCategory === 'favorites' ? (
            // Empty Favorites State
            <Card className="p-16 text-center rounded-2xl border-dashed border-2 border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-sm">
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-5 text-amber-500">
                  <Star className="h-8 w-8 fill-amber-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                  {t('tools.favorite.empty')}
                </h3>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-6 leading-relaxed">
                  {t('tools.favorite.hint')}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 rounded-xl"
                >
                  {t('toolsPage.allTools')}
                </Button>
              </div>
            </Card>
          ) : (
            // No Results State
            <Card className="p-16 text-center rounded-2xl border-dashed border-2 border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-sm">
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-16 h-16 bg-[hsl(var(--color-muted))] rounded-2xl flex items-center justify-center mb-5 text-[hsl(var(--color-muted-foreground))]">
                  <Search className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                  {t('toolsPage.noToolsFound')}
                </h3>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-6 leading-relaxed">
                  {t('tools.search.noResults', { query: searchQuery })}
                </p>
                <Button variant="outline" onClick={handleClearFilters} className="px-6 rounded-xl">
                  {t('toolsPage.clearFilters')}
                </Button>
              </div>
            </Card>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
