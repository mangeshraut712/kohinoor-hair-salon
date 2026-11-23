import { ShareDirections } from './VisitTools';
import { SALON_INFO } from '@/data/salon';

export function LocationAndDirections() {
  const { address, links } = SALON_INFO;
  return (
    <section id="location" tabIndex={-1} aria-labelledby="location-title" className="border-b border-rule bg-parchment">
      <div className="mx-auto grid [&>*]:min-w-0 max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">Find the Shop</p>
          <h2 id="location-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">
            Shivaji Chowk, Pimple Nilakh
          </h2>
          <address className="mt-4 not-italic text-lg">{address.full}</address>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={links.googleDirections} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Google Maps directions
            </a>
            <a href={links.appleDirections} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              Apple Maps directions
            </a>
          </div>
          <ShareDirections />
        </div>
        <div className="border border-oxblood-line bg-cream p-6 md:self-center">
          <p className="eyebrow">Nearby landmark</p>
          <p className="mt-2 font-display text-2xl font-bold text-oxblood">Bhavani Sweet Home</p>
          <p className="mt-2 text-muted">The salon is near this Shivaji Chowk landmark on Main Road Gavthan.</p>
          <a href={SALON_INFO.google.listingUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-oxblood underline underline-offset-4">View the Google business profile</a>
        </div>
      </div>
    </section>
  );
}
