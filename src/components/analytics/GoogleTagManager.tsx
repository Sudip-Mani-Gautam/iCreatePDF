import React from 'react';
import Script from 'next/script';

/**
 * GoogleTagManager Component
 * 
 * Implements Google Tag Manager (GTM) and optional direct GA4 fallback.
 * 
 * Architecture:
 * 1. Primary: Website -> dataLayer -> GTM (which triggers GA4 tag configured inside GTM container).
 * 2. Fallback: If only GA4 Measurement ID is provided (without GTM), loads gtag.js directly.
 * 3. Mutual Exclusion: Never loads both simultaneously to prevent duplicate tracking.
 * 4. Safety: If no ID or placeholder 'GTM-XXXXXXXX' is present, initializes empty dataLayer safely.
 */
export const DEFAULT_GTM_ID = 'GTM-5JQS9499';

export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || DEFAULT_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  // Validate GTM ID (must start with GTM- and not be the placeholder)
  const isGtmValid = Boolean(gtmId && gtmId !== 'GTM-XXXXXXXX' && /^GTM-[A-Z0-9]+$/i.test(gtmId));

  // Validate GA4 ID (must start with G- and not be placeholder)
  const isGaValid = Boolean(gaId && gaId !== 'G-XXXXXXXXXX' && /^G-[A-Z0-9]+$/i.test(gaId));

  return (
    <>
      {/* 1. Global dataLayer initialization (always runs so analytics calls never throw) */}
      <Script
        id="gtm-datalayer-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];`,
        }}
      />

      {/* 2. Primary: Google Tag Manager */}
      {isGtmValid && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        </>
      )}

      {/* 3. Fallback: Direct GA4 (Only when GTM is NOT active, preventing duplicate tracking) */}
      {!isGtmValid && isGaValid && (
        <>
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', {
  send_page_view: false, // Handled client-side for SPA route transitions
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure'
});`,
            }}
          />
        </>
      )}
    </>
  );
}

/**
 * GTM NoScript Fallback for Body
 * Only rendered if GTM ID is valid.
 */
export function GoogleTagManagerNoScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || DEFAULT_GTM_ID;
  const isGtmValid = Boolean(gtmId && gtmId !== 'GTM-XXXXXXXX' && /^GTM-[A-Z0-9]+$/i.test(gtmId));

  if (!isGtmValid) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

export default GoogleTagManager;
