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
  return (
    <figure className="border border-oxblood-line bg-parchment p-3">
      <div className="relative aspect-[4/5] w-full border border-rule bg-cream">
        <svg
          viewBox="0 0 400 500"
          role="img"
          aria-label="Illustrated Kohinoor shop sign"
          className="h-full w-full"
        >
          <rect x="24" y="24" width="352" height="452" fill="none" stroke="#7E2C36" strokeWidth="1" />
          <rect x="36" y="36" width="328" height="428" fill="none" stroke="#D7CBB9" strokeWidth="1" />
          {/* Shop-front elevation */}
          <rect x="70" y="120" width="260" height="40" fill="#5A141E" />
          <text x="200" y="146" textAnchor="middle" fontSize="16" fill="#FAF6EE" fontFamily="Georgia, serif" letterSpacing="3">
            KOHINOOR
          </text>
          <path d="M70 160 L90 200 L110 160 L130 200 L150 160 L170 200 L190 160 L210 200 L230 160 L250 200 L270 160 L290 200 L310 160 L330 200 V160 Z" fill="#7E2C36" />
          <rect x="90" y="220" width="90" height="170" fill="#F2EADF" stroke="#5A141E" strokeWidth="2" />
          <rect x="220" y="220" width="90" height="170" fill="#F2EADF" stroke="#5A141E" strokeWidth="2" />
          <line x1="200" y1="200" x2="200" y2="390" stroke="#5A141E" strokeWidth="2" />
          <line x1="70" y1="390" x2="330" y2="390" stroke="#5A141E" strokeWidth="2" />
          <text x="200" y="436" textAnchor="middle" fontSize="13" fill="#574842" fontFamily="ui-monospace, monospace">
            PIMPLE NILAKH  ·  PUNE
          </text>
        </svg>
      </div>
      <figcaption className="tabular mt-2 text-xs text-muted">
        The Kohinoor shop sign · Illustration
      </figcaption>
    </figure>
  );
}

export function HeroShopSign() {
  return (
    <section id="top" aria-labelledby="hero-title" className="border-b border-rule bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr] md:items-center md:py-20 [&>*]:min-w-0">
        <div className="min-w-0">
          <p className="eyebrow">Men’s Hair | Skin · Pimple Nilakh, Pune</p>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[clamp(2.15rem,9vw,4.5rem)] font-extrabold uppercase leading-[0.95] text-oxblood md:text-7xl"
          >
            The Kohinoor
            <br />
            AC Salon
          </h1>
          <p lang="mr" className="mt-3 text-lg font-semibold leading-normal text-oxblood">{SALON_INFO.marathiName}</p>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Men’s hair and skin grooming at Shivaji Chowk, near Bhavani Sweet Home.
          </p>
          <ContactActions className="mt-8" />
        </div>
        <HeroPhotoSlot />
      </div>
    </section>
  );
}
