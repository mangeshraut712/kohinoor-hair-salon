import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SALON_INFO, SITE_URL } from '@/data/salon';

const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-fraunces' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-jakarta' });

const description =
  'Men’s hair and skin grooming at The Kohinoor AC Salon, Shivaji Chowk, Main Road Gavthan, Pimple Nilakh, Pune 411027.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SALON_INFO.listingName} | Men’s Hair & Skin, Pune`,
  description,
  icons: { icon: { url: '/brand/kohinoor-emblem.webp', type: 'image/webp', sizes: '160x160' } },
  ...(process.env.KOHINOOR_PREVIEW === '1' ? { robots: { index: false, follow: false } } : { alternates: { canonical: '/' } }),
  openGraph: {
    title: `${SALON_INFO.listingName} | Pune`,
    description,
    url: '/',
    siteName: SALON_INFO.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary', title: SALON_INFO.name, description },
};

export const viewport: Viewport = {
  themeColor: '#5A141E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

function buildJsonLd() {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: SALON_INFO.listingName,
    alternateName: SALON_INFO.marathiName,
    telephone: SALON_INFO.phone,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SALON_INFO.hours.openDays,
      opens: SALON_INFO.hours.opens,
      closes: SALON_INFO.hours.closes,
    }],
    url: `${SITE_URL}/`,
    description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SALON_INFO.address.street,
      addressLocality: SALON_INFO.address.locality,
      addressRegion: SALON_INFO.address.region,
      postalCode: SALON_INFO.address.postalCode,
      addressCountry: SALON_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SALON_INFO.geo.latitude,
      longitude: SALON_INFO.geo.longitude,
    },
    hasMap: SALON_INFO.links.googleDirections,
    sameAs: [SALON_INFO.instagram.url, SALON_INFO.google.listingUrl],
  };
  return ld;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const json = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c');
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
        {children}
      </body>
    </html>
  );
}
