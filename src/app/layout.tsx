import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Kohinoor AC Salon | Pimple Nilakh, Pune',
  description:
    'Men’s hair and skin grooming at Shivaji Chowk, Sharda Colony, Pimple Nilakh, Pune 411027.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
