'use client';

import { useState, useSyncExternalStore } from 'react';
import { Share2 } from 'lucide-react';
import { SALON_INFO } from '@/data/salon';

const puneClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

function scheduledStatus() {
  const parts = Object.fromEntries(puneClock.formatToParts(new Date()).map(({ type, value }) => [type, value]));
  const time = `${parts.hour}:${parts.minute}`;
  const { hours } = SALON_INFO;
  const open = hours.openDays.some(day => day === parts.weekday) && time >= hours.opens && time < hours.closes;
  return open ? 'Open now · Pune time' : 'Closed now · Pune time';
}

function watchClock(update: () => void) {
  const timer = window.setInterval(update, 15000);
  document.addEventListener('visibilitychange', update);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener('visibilitychange', update);
  };
}

export function ShopHoursStatus() {
  const status = useSyncExternalStore(watchClock, scheduledStatus, () => 'Opening hours · Pune time');
  return <p className="mt-5 font-semibold text-oxblood">{status}</p>;
}

export function ShareDirections() {
  const [message, setMessage] = useState('');
  async function share() {
    const url = SALON_INFO.links.googleDirections;
    try {
      if (navigator.share) {
        await navigator.share({ title: SALON_INFO.name, url });
        setMessage('');
      } else {
        await navigator.clipboard.writeText(url);
        setMessage('Google Maps link copied.');
      }
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) {
        setMessage('Open Google Maps directions above and use its Share option.');
      }
    }
  }
  return (
    <div className="mt-3">
      <button type="button" className="inline-flex min-h-11 items-center gap-2 font-semibold text-oxblood underline underline-offset-4" onClick={share}>
        <Share2 size={16} aria-hidden="true" /> Share the shop location
      </button>
      <p role="status" className="text-sm text-muted">{message}</p>
    </div>
  );
}
