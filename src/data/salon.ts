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
  /** TODO-for-owner: confirmed staff beyond the owner. */
  staff: null as string[] | null,
  /** TODO-for-owner: real, owner-approved review quotes. */
  reviewQuotes: null as string[] | null,
  owner: {
    name: 'Sagar Kale',
    handle: '@sagar._7716',
    bio: 'Professional Hair Artist · Owner @thekohinoorsalon',
    instagramUrl: 'https://www.instagram.com/sagar._7716/',
  },
  instagram: {
    name: 'Kohinoor Salon',
    handle: '@the_kohinoor_salon',
    url: 'https://www.instagram.com/the_kohinoor_salon/',
    followers: 1171,
    posts: 182,
  },
  google: {
    kgmid: '/g/11fj45w_w0',
    listingUrl: 'https://www.google.com/search?kgmid=/g/11fj45w_w0&q=The+Kohinoor+Ac+salon',
    rating: 4.5,
    reviewCount: 49,
  },
  links: {
    googleDirections: 'https://www.google.com/maps/dir/?api=1&destination=18.571585,73.793096',
    appleDirections: 'https://maps.apple.com/?daddr=18.571585,73.793096&q=The+Kohinoor+AC+Salon',
    mapEmbed: 'https://maps.google.com/maps?q=18.571585,73.793096&z=17&output=embed',
  },
} as const;

export interface ServiceCategory {
  id: string;
  title: string;
  blurb: string;
  items: { name: string; priceInr: number | null }[];
}

/** Prices are `null` until the owner confirms the menu (TODO-for-owner). */
export const SERVICE_BOARD: ServiceCategory[] = [
  {
    id: 'hair',
    title: 'Hair & Cuts',
    blurb: 'Men’s hair, the first half of the shop’s “Hair | Skin” focus. Specific services are confirmed at the shop.',
    items: [
      { name: 'Hair', priceInr: null },
    ],
  },
  {
    id: 'beard',
    title: 'Beard & Shave',
    blurb: 'Beard and shave. Specific services are confirmed at the shop.',
    items: [
      { name: 'Beard & Shave', priceInr: null },
    ],
  },
  {
    id: 'skin',
    title: 'Skin & Grooming',
    blurb: 'Skin, the second half of the shop’s “Hair | Skin” focus. Specific services are confirmed at the shop.',
    items: [
      { name: 'Skin', priceInr: null },
    ],
  },
];

export const RATE_LABEL = 'Rate confirmed at shop';

export interface HoursRow {
  day: string;
  short: string;
  hours: string;
  note?: string;
}

export const HOURS_SCHEDULE: HoursRow[] = [
  { day: 'Monday', short: 'Mon', hours: '7:30 AM – 12:00 PM', note: 'Please verify the afternoon schedule with the shop.' },
  { day: 'Tuesday', short: 'Tue', hours: '7:30 AM – 10:00 PM' },
  { day: 'Wednesday', short: 'Wed', hours: '7:30 AM – 10:00 PM' },
  { day: 'Thursday', short: 'Thu', hours: '7:30 AM – 10:00 PM' },
  { day: 'Friday', short: 'Fri', hours: '7:30 AM – 10:00 PM' },
  { day: 'Saturday', short: 'Sat', hours: '7:30 AM – 10:00 PM' },
  { day: 'Sunday', short: 'Sun', hours: '7:30 AM – 10:00 PM' },
];

export const TIME_SLOTS = [
  'Morning (7:30 AM – 12:00 PM)',
  'Afternoon (12:00 – 4:00 PM)',
  'Evening (4:00 – 10:00 PM)',
] as const;

export const DAYS = ['Any day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
