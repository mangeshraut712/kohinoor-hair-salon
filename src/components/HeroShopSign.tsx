import Image from 'next/image';
import { SALON_INFO } from '@/data/salon';
import { ContactActions } from './ContactActions';

function HeroPhotoSlot() {
  if (SALON_INFO.heroPhotoUrl) {
    return (
      <figure className="border border-oxblood-line bg-parchment p-3">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={SALON_INFO.heroPhotoUrl}
            alt="The Kohinoor AC Salon, Shivaji Chowk, Pimple Nilakh"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <figcaption className="tabular mt-2 text-xs text-muted">Shop photo</figcaption>
      </figure>
    );
  }
  const { hours, address } = SALON_INFO;
  return (
    <aside aria-label="Salon opening hours" className="shop-placard">
      <div className="shop-placard-inner">
        <Image src="/brand/kohinoor-emblem.webp" alt="" width={104} height={104} className="mx-auto rounded-full" />
        <div className="placard-hours">
          <h2 className="font-display text-3xl md:text-4xl">Shop hours</h2>
          <p className="mt-2 text-sm">{hours.openDaysLabel}</p>
          <p className="my-1 font-display text-xl sm:text-3xl">{hours.display}</p>
          <p className="text-sm">{hours.closedDay} closed</p>
        </div>
        <p className="placard-locality border-t border-current/40 pt-3 text-xs font-bold uppercase tracking-widest">{address.locality} · Pune</p>
      </div>
    </aside>
  );
}

export function HeroShopSign() {
  return (
    <section id="top" aria-labelledby="hero-title" className="border-b border-rule bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.3fr_1fr] md:items-center md:py-20 [&>*]:min-w-0">
        <div className="min-w-0">
          <p className="eyebrow">Men’s grooming · Pimple Nilakh, Pune</p>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[clamp(2.15rem,9vw,4.5rem)] font-extrabold uppercase leading-[0.95] text-oxblood md:text-7xl lg:text-8xl"
          >
            The Kohinoor
            <br />
            AC Salon
          </h1>
          <p lang="mr" className="mt-3 text-lg font-semibold leading-normal text-oxblood">{SALON_INFO.marathiName}</p>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Haircuts, beard grooming and skin care at Shivaji Chowk, near Bhavani Sweet Home.
          </p>
          <ContactActions className="mt-8" />
        </div>
        <HeroPhotoSlot />
      </div>
    </section>
  );
}
