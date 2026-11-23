import { SALON_INFO } from '@/data/salon';

export function SalonFooter() {
  return (
    <footer className="on-oxblood bg-oxblood px-4 pb-24 pt-10 text-cream md:pb-10">
      <div className="mx-auto grid [&>*]:min-w-0 max-w-6xl gap-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold uppercase">{SALON_INFO.name}</p>
          <p className="mt-2 text-sm">{SALON_INFO.address.full}</p>
        </div>
        <div className="tabular text-sm">
          <a className="underline underline-offset-2" href={SALON_INFO.links.googleDirections} target="_blank" rel="noopener noreferrer">Get directions</a>
        </div>
        <ul className="space-y-1 text-sm font-semibold">
          <li>
            <a className="underline underline-offset-2" href={SALON_INFO.instagram.url} target="_blank" rel="noopener noreferrer">
              {SALON_INFO.instagram.handle}
            </a>
          </li>
          <li>
            <a className="underline underline-offset-2" href={SALON_INFO.google.listingUrl} target="_blank" rel="noopener noreferrer">
              Google listing
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
