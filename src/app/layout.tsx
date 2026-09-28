import type { Metadata } from 'next';
import '@/app/globals.css';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/analytics';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  other: {
    'google-adsense-account': 'ca-pub-4841042792929065',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

// Root layout - provides the basic HTML structure
// The actual layout with i18n is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-4841042792929065" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4841042792929065"
          crossOrigin="anonymous"
        />
        <meta name="color-scheme" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: 'html{scrollbar-gutter:stable}' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (_) {}

              // Filter out browser extension DOM mutation hydration warnings (Bitdefender bis_skin_checked, etc.)
              (function() {
                var origError = console.error;
                console.error = function() {
                  var msg = arguments && arguments[0] ? String(arguments[0]) : '';
                  if (
                    msg.indexOf('bis_skin_checked') !== -1 ||
                    msg.indexOf('bis_register') !== -1 ||
                    msg.indexOf('__processed_') !== -1 ||
                    (msg.indexOf('hydrated') !== -1 && msg.indexOf('browser extension') !== -1) ||
                    (msg.indexOf('hydrated') !== -1 && msg.indexOf('attribute') !== -1)
                  ) {
                    return;
                  }
                  origError.apply(console, arguments);
                };
              })();
            `,
          }}
        />
        <script
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/coi-serviceworker.js`}
          data-coi="true"
          async
        />
        <GoogleTagManager />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground antialiased">
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  );
}
