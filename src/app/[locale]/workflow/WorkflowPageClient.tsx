'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { type Locale } from '@/lib/i18n/config';

// 动态导入 WorkflowEditor 以避免 SSR 问题（ReactFlow 需要 window 对象）
const WorkflowEditor = dynamic(
    () => import('@/components/workflow/WorkflowEditor').then(mod => mod.WorkflowEditor),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-3 border-[hsl(var(--color-primary))] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[hsl(var(--color-muted-foreground))]">Loading workflow editor...</p>
                </div>
            </div>
        )
    }
);

interface WorkflowPageClientProps {
    locale: Locale;
}

export default function WorkflowPageClient({ locale }: WorkflowPageClientProps) {
    return (
        <div className="h-screen flex flex-col bg-[hsl(var(--color-background))] overflow-hidden">
            <Header locale={locale} />

            {/* Workflow Editor - fills remaining height below the unified header */}
            <main id="main-content" className="flex-1 pt-16 sm:pt-18 md:pt-20 overflow-hidden" tabIndex={-1}>
                <WorkflowEditor />
            </main>
        </div>
    );
}
