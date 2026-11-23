import { ArrowUpRight } from 'lucide-react';
import { SALON_INFO } from '@/data/salon';

export function InstagramShowcase() {
  const { instagram } = SALON_INFO;
  return (
    <section id="instagram" tabIndex={-1} aria-labelledby="instagram-title" className="on-oxblood bg-oxblood text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-12 md:grid-cols-[1fr_auto] [&>*]:min-w-0">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest">{instagram.handle}</p>
          <h2 id="instagram-title" className="mt-3 font-display text-4xl md:text-5xl">Cuts from the shop</h2>
          <p className="mt-3">Browse the salon’s cuts and grooming reels before your visit.</p>
        </div>
        <a href={instagram.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-3 border border-cream px-5 py-3 font-bold hover:bg-[#FFFDF8] hover:text-oxblood">
          See the work on Instagram <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
