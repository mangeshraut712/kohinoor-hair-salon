import { SALON_INFO } from '@/data/salon';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#owner', label: 'Owner' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#reviews-hours', label: 'Hours' },
  { href: '#location', label: 'Location' },
  { href: '#appointment', label: 'Book' },
];

export function MastheadNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-oxblood-line bg-oxblood text-cream on-oxblood">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="font-display text-lg font-bold uppercase tracking-wide md:text-xl">
          {SALON_INFO.name}
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-semibold md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="underline-offset-4 hover:underline">
              {l.label}
            </a>
          ))}
          <a
            href={SALON_INFO.links.googleDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            Get Directions
          </a>
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none border border-cream px-3 py-2 text-sm font-semibold">
            Menu
          </summary>
          <nav
            aria-label="Primary mobile"
            className="absolute right-0 mt-2 flex w-48 flex-col border border-oxblood-line bg-oxblood p-2"
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="px-3 py-2 text-sm font-semibold hover:bg-oxblood-dark">
                {l.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
