import Link from 'next/link';
import { SALON_INFO } from '@/data/salon';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-12">
      <p className="eyebrow">{SALON_INFO.name} · Pimple Nilakh</p>
      <h1 className="my-4 text-4xl text-oxblood">Page not found</h1>
      <p className="text-muted">Find services and opening hours on our home page, or get directions to the salon.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-solid">Salon home</Link>
        <a href={SALON_INFO.links.googleDirections} className="btn btn-line">Google Maps directions</a>
      </div>
    </main>
  );
}
