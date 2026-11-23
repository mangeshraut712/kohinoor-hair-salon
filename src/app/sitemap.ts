import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/salon';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.KOHINOOR_PREVIEW === '1') return [];
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
