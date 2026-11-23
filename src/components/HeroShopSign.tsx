import Image from 'next/image';
import { Clock3 } from 'lucide-react';
import { SALON_INFO } from '@/data/salon';
import { ContactActions } from './ContactActions';

export function HeroShopSign() {
  const { heroPhotoUrl, hours, address } = SALON_INFO;
  return (
    <section id="top" aria-labelledby="hero-title" className="cover">
      <div className="editorial-frame cover-grid">
        <div className="cover-copy">
          <p className="eyebrow ruled-label">Men’s grooming · Pune</p>
          <h1 id="hero-title" className="cover-title">The Kohinoor <em>AC Salon</em></h1>
          <p lang="mr" className="cover-marathi">{SALON_INFO.marathiName}</p>
          <p className="cover-intro">Haircuts, beard grooming and skin care at Shivaji Chowk, near Bhavani Sweet Home.</p>
          <ContactActions className="cover-actions" />
          <aside aria-label="Salon opening hours" className="cover-hours">
            <Clock3 size={18} aria-hidden="true" />
            <div><strong>{hours.display}</strong><span>{hours.openDaysLabel} · {hours.closedDay} closed</span></div>
          </aside>
        </div>
        <figure className="cover-figure">
          <div className="cover-image">
            <Image src={heroPhotoUrl ?? '/images/haircut.webp'} alt={heroPhotoUrl ? SALON_INFO.name : ''} fill preload sizes="(min-width: 1152px) 540px, (min-width: 768px) 47vw, 100vw" className="object-cover" />
          </div>
          <figcaption><span>{heroPhotoUrl ? 'Shop photograph' : 'Editorial photography'}</span><span>{heroPhotoUrl ? address.locality : 'Hair & cuts'}</span></figcaption>
        </figure>
      </div>
    </section>
  );
}
