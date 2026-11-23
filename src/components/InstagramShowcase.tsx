import { SALON_INFO } from '@/data/salon';

export function InstagramShowcase() {
  const { instagram } = SALON_INFO;
  return (
    <section id="instagram" tabIndex={-1} aria-labelledby="instagram-title" className="border-b border-rule bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">On Instagram</p>
        <h2 id="instagram-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">
          Latest cuts and reels
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          See cuts and grooming work on the salon’s official Instagram.
        </p>
        <div className="mt-8 grid [&>*]:min-w-0 gap-6 md:max-w-xl">
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-oxblood-line bg-cream p-6 hover:bg-[#FFFDF8]"
          >
            <p className="eyebrow">Shop</p>
            <p className="mt-2 font-display text-2xl font-bold text-oxblood">{instagram.handle}</p>
            <p className="mt-4 font-semibold underline underline-offset-2">Open reels and posts</p>
          </a>
        </div>
      </div>
    </section>
  );
}
