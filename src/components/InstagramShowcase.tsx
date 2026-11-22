import { SALON_INFO } from '@/data/salon';

export function InstagramShowcase() {
  const { instagram, owner } = SALON_INFO;
  return (
    <section id="instagram" aria-labelledby="instagram-title" className="border-b border-rule bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">On Instagram</p>
        <h2 id="instagram-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">
          Latest cuts and reels
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Photos and reels live on Instagram, where the shop posts them. Nothing is copied here.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-oxblood-line bg-cream p-6 hover:bg-white"
          >
            <p className="eyebrow">Shop</p>
            <p className="mt-2 font-display text-2xl font-bold text-oxblood">{instagram.handle}</p>
            <p className="tabular mt-2 text-sm text-muted">
              {instagram.followers.toLocaleString('en-IN')} followers · {instagram.posts} posts
            </p>
            <p className="mt-4 font-semibold underline underline-offset-2">Open reels and posts</p>
          </a>
          <a
            href={owner.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-oxblood-line bg-cream p-6 hover:bg-white"
          >
            <p className="eyebrow">Owner</p>
            <p className="mt-2 font-display text-2xl font-bold text-oxblood">{owner.handle}</p>
            <p className="tabular mt-2 text-sm text-muted">{owner.name}</p>
            <p className="mt-4 font-semibold underline underline-offset-2">Visit profile</p>
          </a>
        </div>
      </div>
    </section>
  );
}
