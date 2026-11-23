import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.KOHINOOR_PREVIEW === '1') return [];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kohinoor-hair-salon.pages.dev';
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
