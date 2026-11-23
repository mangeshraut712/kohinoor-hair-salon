import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '@/data/salon';

const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-fraunces' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-jakarta' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/brand/kohinoor-emblem.webp', type: 'image/webp', sizes: '160x160' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
};

export const viewport: Viewport = {
  themeColor: '#5A141E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
