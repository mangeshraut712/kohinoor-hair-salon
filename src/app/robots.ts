import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/salon';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (process.env.KOHINOOR_PREVIEW === '1') return { rules: { userAgent: '*', allow: '/' } };
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
