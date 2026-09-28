'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics';

/**
 * AnalyticsPageViewTracker
 * Tracks client-side SPA route transitions in Next.js without page reload.
 * Deduplicates multiple triggers on same path.
 */
export function AnalyticsPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Construct path without sensitive query parameters
    const currentPath = pathname;

    // Deduplicate identical triggers
    if (lastTrackedPathRef.current === currentPath) {
      return;
    }

    lastTrackedPathRef.current = currentPath;

    // Small delay to allow document.title to update on route transition
    const timer = setTimeout(() => {
      analytics.pageView(currentPath, document.title);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export default AnalyticsPageViewTracker;
