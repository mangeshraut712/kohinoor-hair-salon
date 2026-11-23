import type { Metadata } from 'next';
import { SALON_INFO, SITE_URL } from '@/data/salon';
import { ShopContact } from '@/components/ShopContact';
import { HeroShopSign } from '@/components/HeroShopSign';
import { InstagramShowcase } from '@/components/InstagramShowcase';
import { LocationAndDirections } from '@/components/LocationAndDirections';
import { MastheadNav } from '@/components/MastheadNav';
import { MobileActionDock } from '@/components/MobileActionDock';
import { SalonFooter } from '@/components/SalonFooter';
import { ServiceBoard } from '@/components/ServiceBoard';

const description =
  'Visit The Kohinoor AC Salon for men’s haircuts, beard grooming and skin care at Shivaji Chowk in Pimple Nilakh, Pune. Find opening hours, directions and the shop phone number.';

export const metadata: Metadata = {
  title: `${SALON_INFO.listingName} | Men’s Salon in Pune`,
  description,
  ...(process.env.KOHINOOR_PREVIEW === '1' ? { robots: { index: false, follow: false } } : { alternates: { canonical: '/' } }),
  openGraph: {
    title: `${SALON_INFO.listingName} | Pune`,
    description,
    url: '/',
    siteName: SALON_INFO.name,
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/brand/kohinoor-emblem.webp', width: 160, height: 160, alt: SALON_INFO.name }],
  },
  twitter: { card: 'summary', title: SALON_INFO.name, description },
};

function buildJsonLd() {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: SALON_INFO.listingName,
    alternateName: SALON_INFO.marathiName,
    telephone: SALON_INFO.phone,
    image: new URL('/brand/kohinoor-emblem.webp', SITE_URL).href,
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

export default function HomePage() {
  const json = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c');
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:font-bold focus:text-oxblood"
      >
        Skip to content
      </a>
      <MastheadNav />
      <main id="main-content" tabIndex={-1}>
        <HeroShopSign />
        <ServiceBoard />
        <InstagramShowcase />
        <LocationAndDirections />
        <ShopContact />
        <aside aria-labelledby="kashish-title" className="border-b border-rule bg-cream">
          <div className="mx-auto grid max-w-6xl gap-5 px-5 py-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow">Thergaon, Pune</p>
              <h2 id="kashish-title" className="mt-2 text-2xl font-bold text-oxblood">Kashish Beauty Parlour &amp; Training Center</h2>
              <p className="mt-2 text-muted">Visit Kashish for women’s hair styling and bridal makeup, or learn makeup, hairstyling and beauty care in its professional classes.</p>
            </div>
            <nav aria-label="Explore Kashish" className="flex flex-wrap gap-3 md:justify-end">
              <a className="btn btn-line" href="https://mangeshraut712.github.io/kashishbeautyparlour/en/services/">Women’s beauty services</a>
              <a className="btn btn-line" href="https://mangeshraut712.github.io/kashishbeautyparlour/en/training/">Professional beauty classes</a>
            </nav>
          </div>
        </aside>
      </main>
      <SalonFooter />
      <MobileActionDock />
    </>
  );
}
