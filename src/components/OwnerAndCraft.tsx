import { SALON_INFO } from '@/data/salon';

export function OwnerAndCraft() {
  return (
    <section id="owner" aria-labelledby="owner-title" className="border-b border-rule bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">The Owner</p>
          <h2 id="owner-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">
            {SALON_INFO.owner.name}
          </h2>
          <p className="tabular mt-2 text-sm text-muted">{SALON_INFO.owner.bio}</p>
        </div>
        <div className="space-y-4 text-lg">
          <p>
            Sagar Kale runs The Kohinoor AC Salon at Shivaji Chowk, near Bhavani Sweet Home in Sharda Colony,
            Pimple Nilakh. The shop focuses on men’s hair and skin grooming.
          </p>
          <p>
            Follow his work on{' '}
            <a
              className="font-semibold text-oxblood underline underline-offset-2"
              href={SALON_INFO.owner.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SALON_INFO.owner.handle}
            </a>
            . Details on the team beyond the owner will be added once confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
