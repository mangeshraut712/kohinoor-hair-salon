import { MessageCircle } from 'lucide-react';
import { SALON_INFO } from '@/data/salon';

export function ShopContact() {
  return (
    <section id="appointment" tabIndex={-1} aria-labelledby="appointment-title" className="bg-cream">
      <div className="mx-auto grid [&>*]:min-w-0 max-w-6xl items-center gap-6 px-4 py-14 md:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow">Before you visit</p>
          <h2 id="appointment-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">Ask the shop</h2>
          <p className="mt-3 max-w-xl text-muted">Message the salon on Instagram to check hours, prices or availability. The shop can confirm a time with you directly.</p>
        </div>
        <a href={SALON_INFO.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
          <MessageCircle size={18} aria-hidden="true" /> Open shop Instagram
        </a>
      </div>
    </section>
  );
}
