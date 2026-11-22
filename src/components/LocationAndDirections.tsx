import { SALON_INFO } from '@/data/salon';

export function LocationAndDirections() {
  const { address, links, geo } = SALON_INFO;
  return (
    <section id="location" aria-labelledby="location-title" className="border-b border-rule bg-parchment">
      <div className="mx-auto grid [&>*]:min-w-0 max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Find the Shop</p>
          <h2 id="location-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">
            Shivaji Chowk, Pimple Nilakh
          </h2>
          <address className="mt-4 not-italic text-lg">{address.full}</address>
          <p className="tabular mt-2 text-sm text-muted">
            {geo.latitude}, {geo.longitude}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={links.googleDirections} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Google Maps directions
            </a>
            <a href={links.appleDirections} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              Apple Maps directions
            </a>
          </div>
        </div>
        <div className="border border-oxblood-line bg-cream p-2">
          <iframe
            title="Map showing The Kohinoor AC Salon at Shivaji Chowk, Pimple Nilakh"
            src={links.mapEmbed}
            className="h-80 w-full border-0 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
