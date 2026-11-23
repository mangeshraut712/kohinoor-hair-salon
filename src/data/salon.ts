/**
 * Single source of truth for business facts. Mirrors CONTENT.md line for line.
 * Fields typed `null` are pending owner confirmation (TODO-for-owner) and
 * must be handled gracefully in the UI.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kohinoor-hair-salon.pages.dev';

export const SALON_INFO = {
  name: 'The Kohinoor AC Salon',
  googleListingName: 'The Kohinoor Ac salon',
  category: 'Hair Salon',
  tagline: 'Hair | Skin',
  address: {
    street: 'Shivaji Chowk, near Bhavani Sweet Home, Sharda Colony',
    locality: 'Pimple Nilakh',
    city: 'Pimpri-Chinchwad, Pune',
    region: 'Maharashtra',
    postalCode: '411027',
    country: 'IN',
    full: 'Shivaji Chowk, near Bhavani Sweet Home, Sharda Colony, Pimple Nilakh, Pimpri-Chinchwad, Pune, Maharashtra 411027, India',
  },
  geo: { latitude: 18.571585, longitude: 73.793096 },
  /** TODO-for-owner: shop phone number (digits with country code, e.g. 91XXXXXXXXXX). */
  phone: null as string | null,
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
