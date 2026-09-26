'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { detectBrowserLanguage } from '@/lib/i18n/detectBrowserLanguage';
import { defaultLocale } from '@/lib/i18n/config';

// Root page handles client-side redirection based on browser language and user preference
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const bestLocale = detectBrowserLanguage();
      router.replace(`/${bestLocale}`);
    } catch {
      router.replace(`/${defaultLocale}`);
    }
  }, [router]);

  // Render nothing while redirecting
  return null;
}
