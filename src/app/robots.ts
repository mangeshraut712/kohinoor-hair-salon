import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (process.env.KOHINOOR_PREVIEW === '1') return { rules: { userAgent: '*', allow: '/' } };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kohinoor-hair-salon.pages.dev';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
