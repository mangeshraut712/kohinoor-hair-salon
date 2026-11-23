/**
 * Single source of truth for business facts. Documented in docs/CONTENT.md.
 * Fields typed `null` are pending owner confirmation (TODO-for-owner) and
 * must be handled gracefully in the UI.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kohinoor-hair-salon.pages.dev';

export const SALON_INFO = {
  name: 'The Kohinoor AC Salon',
  listingName: 'The Kohinoor AC Salon (Pimple Nilakh)',
  marathiName: 'द कोहिनूर एसी सलून (पिंपळे निलख)',
  googleListingName: 'The Kohinoor Ac salon',
  category: 'Hair Salon',
  tagline: 'Hair | Skin',
  address: {
    street: 'Shivaji Chowk, Near Bhavani Sweet Home, Main Road Gavthan',
    locality: 'Pimple Nilakh',
    city: 'Pimpri-Chinchwad, Pune',
    region: 'Maharashtra',
    postalCode: '411027',
    country: 'IN',
    full: 'Shivaji Chowk, Near Bhavani Sweet Home, Main Road Gavthan, Pimple Nilakh, Pimpri-Chinchwad, Pune - 411027, Maharashtra',
  },
  geo: { latitude: 18.571585, longitude: 73.793096 },
  phone: '+919764048382',
  displayPhone: '+91 97640 48382',
  hours: {
    openDays: ['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    openDaysLabel: 'Sunday and Tuesday–Saturday',
    closedDay: 'Monday',
    opens: '07:30',
    closes: '22:00',
    display: '7:30 AM–10:00 PM',
  },
  /** TODO-for-owner: shop WhatsApp number (digits with country code). */
  whatsapp: null as string | null,
  /** TODO-for-owner: path under /public of Sagar's real, permitted shop photo. */
  heroPhotoUrl: null as string | null,
  instagram: {
    name: 'Kohinoor Salon',
    handle: '@the_kohinoor_salon',
    url: 'https://www.instagram.com/the_kohinoor_salon/',
  },
  google: {
    kgmid: '/g/11fj45w_w0',
    listingUrl: 'https://www.google.com/search?kgmid=/g/11fj45w_w0&q=The+Kohinoor+Ac+salon',
  },
  links: {
    googleDirections: 'https://maps.app.goo.gl/141XQMZtooLVQQN29?g_st=ic',
    appleDirections: 'https://maps.apple.com/?daddr=18.571585,73.793096&q=The+Kohinoor+AC+Salon',
  },
} as const;

export interface ServiceCategory {
  id: string;
  title: string;
  blurb: string;
  items: { name: string; priceInr: number | null }[];
}

/** Prices are `null` until the owner confirms the menu (TODO-for-owner). */
export const SERVICE_BOARD: readonly ServiceCategory[] = [
  {
    id: 'hair',
    title: 'Hair & Cuts',
    blurb: 'Ask the shop about cuts and styling.',
    items: [
      { name: 'Hair', priceInr: null },
    ],
  },
  {
    id: 'beard',
    title: 'Beard & Shave',
    blurb: 'Ask about beard grooming.',
    items: [
      { name: 'Beard & Shave', priceInr: null },
    ],
  },
  {
    id: 'skin',
    title: 'Skin & Grooming',
    blurb: 'Ask the shop about skin grooming.',
    items: [
      { name: 'Skin', priceInr: null },
    ],
  },
];

export const RATE_LABEL = 'Rate confirmed at shop';
