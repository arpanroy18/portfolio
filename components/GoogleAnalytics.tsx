// app/components/GoogleAnalytics.tsx
'use client'

import Script from 'next/script'

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-2KK3XXKRDK'
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}