'use client';

import { useState } from 'react';
import { DAYS, SALON_INFO, SERVICE_BOARD, TIME_SLOTS } from '@/data/salon';
import { buildInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';

const SERVICES = SERVICE_BOARD.map((c) => c.title);

export function AppointmentInquiry() {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    service: SERVICES[0],
    day: DAYS[0] as string,
    slot: TIME_SLOTS[0] as string,
    notes: '',
  });
  const [status, setStatus] = useState('');

  const message = buildInquiryMessage(form);
  const waLink = buildWhatsAppLink(SALON_INFO.whatsapp, message);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus('Message copied. Paste it into Instagram DM or WhatsApp.');
    } catch {
      setStatus('Copy failed. Please select the message above and copy it manually.');
    }
  }

  return (
    <section id="appointment" aria-labelledby="appointment-title" className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <p className="eyebrow">Appointment Inquiry</p>
          <h2 id="appointment-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">
            Ask for a time
          </h2>
          <p className="mt-3 text-muted">
            Fill in the details and we prepare a ready message. Nothing is sent from this page, and the shop confirms
            your slot.
          </p>
          {waLink ? null : (
            <p className="mt-4 border border-oxblood-line bg-parchment p-3 text-sm">
              Number pending — message{' '}
              <a
                href={SALON_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                {SALON_INFO.instagram.handle}
              </a>{' '}
              on Instagram. Copy the message and paste it into the DM.
            </p>
          )}
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="inq-name" className="mb-1 block text-sm font-semibold">Name</label>
            <input id="inq-name" className="field" autoComplete="name" value={form.name} onChange={set('name')} />
          </div>
          <div>
            <label htmlFor="inq-mobile" className="mb-1 block text-sm font-semibold">Mobile number</label>
            <input
              id="inq-mobile"
              className="field"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.mobile}
              onChange={set('mobile')}
            />
          </div>
          <div>
            <label htmlFor="inq-service" className="mb-1 block text-sm font-semibold">Service interest</label>
            <select id="inq-service" className="field" value={form.service} onChange={set('service')}>
              {SERVICES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inq-day" className="mb-1 block text-sm font-semibold">Preferred day</label>
              <select id="inq-day" className="field" value={form.day} onChange={set('day')}>
                {DAYS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="inq-slot" className="mb-1 block text-sm font-semibold">Preferred time</label>
              <select id="inq-slot" className="field" value={form.slot} onChange={set('slot')}>
                {TIME_SLOTS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="inq-notes" className="mb-1 block text-sm font-semibold">Notes</label>
            <textarea id="inq-notes" className="field" rows={3} value={form.notes} onChange={set('notes')} />
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold">Your message</p>
            <pre className="tabular whitespace-pre-wrap border border-rule bg-parchment p-3 text-sm" aria-live="polite">
              {message}
            </pre>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {waLink ? (
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                Send on WhatsApp
              </a>
            ) : null}
            <button type="button" onClick={copy} className={`btn ${waLink ? 'btn-line' : 'btn-solid'}`}>
              Copy message
            </button>
          </div>
          <p role="status" className="text-sm text-muted">{status}</p>
        </form>
      </div>
    </section>
  );
}
