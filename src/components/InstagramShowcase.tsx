import { ArrowUpRight, Instagram } from 'lucide-react';
import { SALON_INFO } from '@/data/salon';

export function InstagramShowcase() {
  const { instagram } = SALON_INFO;
  return (
    <section id="instagram" tabIndex={-1} aria-labelledby="instagram-title" className="reels-section on-oxblood">
      <div className="editorial-frame reels-layout">
        <div>
          <p className="reels-label"><Instagram size={16} aria-hidden="true" /> {instagram.handle}</p>
          <h2 id="instagram-title" className="reels-title">Cuts from <em>the shop.</em></h2>
          <p className="reels-copy">See the salon’s own cuts and grooming work in its Instagram reels.</p>
        </div>
        <a href={`${instagram.url}reels/`} target="_blank" rel="noopener noreferrer" className="reels-link">
          Watch the salon’s reels <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
