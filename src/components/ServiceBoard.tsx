'use client';

import { useState } from 'react';
import { RATE_LABEL, SERVICE_BOARD } from '@/data/salon';

export function ServiceBoard() {
  const [filter, setFilter] = useState<string>('all');
  const categories = SERVICE_BOARD.filter((c) => filter === 'all' || c.id === filter);
  const tabs = [{ id: 'all', title: 'All' }, ...SERVICE_BOARD.map((c) => ({ id: c.id, title: c.title }))];

  return (
    <section id="services" aria-labelledby="services-title" className="border-b border-rule bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">Service Board</p>
        <h2 id="services-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">
          Hair | Skin
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Rates are confirmed at the shop. We list no prices until the owner shares the menu.
        </p>
        <div role="group" aria-label="Filter services" className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={filter === t.id}
              onClick={() => setFilter(t.id)}
              className={`btn ${filter === t.id ? 'btn-solid' : 'btn-line'}`}
            >
              {t.title}
            </button>
          ))}
        </div>
        <div className="mt-8 grid [&>*]:min-w-0 gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <article key={c.id} className="border border-oxblood-line bg-cream p-5">
              <h3 className="border-b-2 border-oxblood pb-2 text-xl font-bold uppercase text-oxblood">{c.title}</h3>
              <p className="mt-3 text-sm text-muted">{c.blurb}</p>
              <ul className="mt-4 divide-y divide-rule">
                {c.items.map((i) => (
                  <li key={i.name} className="flex items-baseline justify-between gap-3 py-2 [&>*]:min-w-0">
                    <span className="font-semibold">{i.name}</span>
                    <span className="tabular text-right text-xs text-muted">
                      {i.priceInr === null ? RATE_LABEL : `₹${i.priceInr}`}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
