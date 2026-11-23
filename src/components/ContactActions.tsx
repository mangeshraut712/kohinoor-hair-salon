import { Calendar, Navigation, Phone, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '@/data/salon';
import { buildTelLink, buildWhatsAppLink } from '@/lib/whatsapp';

/** Call / WhatsApp / Directions row. Falls back honestly while the number is pending. */
export function ContactActions({ className = '' }: { className?: string }) {
  const tel = buildTelLink(SALON_INFO.phone);
  const wa = buildWhatsAppLink(SALON_INFO.whatsapp, 'Hello The Kohinoor AC Salon, I would like to book an appointment.');
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={SALON_INFO.links.googleDirections}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid"
        >
          <Navigation size={18} aria-hidden="true" /> Get Directions
        </a>
        {tel ? (
          <a href={tel} className="btn btn-line">
            <Phone size={18} aria-hidden="true" /> Call the shop
          </a>
        ) : (
          <a href="#appointment" className="btn btn-line">
            <Calendar size={18} aria-hidden="true" /> Message the shop
          </a>
        )}
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}
