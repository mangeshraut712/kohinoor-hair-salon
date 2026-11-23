'use client';

import Image from 'next/image';
import { useState } from 'react';
import { RATE_LABEL, SALON_INFO, SERVICE_BOARD } from '@/data/salon';

const photography: Record<string, string> = {
  hair: '/images/haircut.webp',
  beard: '/images/beard.webp',
  skin: '/images/grooming.webp',
};

export function ServiceBoard() {
  const [filter, setFilter] = useState<string>('all');
  const categories = SERVICE_BOARD.filter((c) => filter === 'all' || c.id === filter);
  const tabs = [{ id: 'all', title: 'All' }, ...SERVICE_BOARD.map((c) => ({ id: c.id, title: c.title }))];

  return (
    <section id="services" tabIndex={-1} aria-labelledby="services-title" className="services-section border-b border-rule">
      <div className="editorial-frame section-space">
        <p className="eyebrow ruled-label">Services</p>
        <h2 id="services-title" className="section-title">
          Hair, beard &amp; skin
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          {RATE_LABEL}. <a href={`tel:${SALON_INFO.phone}`} className="font-semibold underline underline-offset-4">Call ahead for a quote</a>.
        </p>
        <div role="group" aria-label="Filter services" className="service-filters">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={filter === t.id}
              onClick={() => setFilter(t.id)}
              className="filter-button"
            >
              {t.title}
            </button>
          ))}
        </div>
        <div className="service-grid">
          {categories.map((c) => (
            <article key={c.id} className="service-entry">
              <div className="service-photo">
                <Image src={photography[c.id]} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <h3 className="service-name">{c.title}</h3>
              <p className="mt-2 text-muted">{c.blurb}</p>
              {c.items.some((item) => item.priceInr !== null) && <ul className="mt-4 divide-y divide-rule">
                {c.items.map((i) => (
                  <li key={i.name} className="flex items-baseline justify-between gap-3 py-2 [&>*]:min-w-0">
                    <span className="font-semibold">{i.name}</span>
                    <span className="tabular text-right text-xs text-muted">
                      {i.priceInr === null ? RATE_LABEL : `₹${i.priceInr}`}
                    </span>
                  </li>
                ))}
              </ul>}
            </article>
          ))}
        </div>
        <p className="photo-note">Service illustrations use editorial photography. See the salon’s own work on <a href="#instagram">Instagram</a>.</p>
      </div>
    </section>
  );
}
