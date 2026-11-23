import { ShopHoursStatus } from './VisitTools';
import { MessageCircle, Phone } from 'lucide-react';
import { SALON_INFO } from '@/data/salon';

export function ShopContact() {
  return (
    <section id="appointment" tabIndex={-1} aria-labelledby="appointment-title" className="bg-cream">
      <div className="mx-auto grid [&>*]:min-w-0 max-w-6xl items-center gap-6 px-4 py-14 md:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow">Before you visit</p>
          <h2 id="appointment-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">Call before you visit</h2>
          <p className="mt-3 max-w-xl text-muted">For a price or an available time, call during the hours below. You can also message the salon on Instagram.</p>
          <ShopHoursStatus />
          <dl className="mt-2 space-y-2 text-sm" aria-label="Opening hours">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold">{SALON_INFO.hours.openDaysLabel}</dt>
              <dd>{SALON_INFO.hours.display}</dd>
            </div>
            <div className="flex gap-x-2">
              <dt className="font-semibold">{SALON_INFO.hours.closedDay}</dt>
              <dd>Closed</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col gap-3 sm:items-start md:items-stretch">
          <a href={`tel:${SALON_INFO.phone}`} className="btn btn-solid">
            <Phone size={18} aria-hidden="true" /> Call {SALON_INFO.displayPhone}
          </a>
          <a href={SALON_INFO.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <MessageCircle size={18} aria-hidden="true" /> Open shop Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
