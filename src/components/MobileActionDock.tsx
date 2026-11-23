import { Navigation, Phone, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '@/data/salon';
import { buildTelLink } from '@/lib/whatsapp';

export function MobileActionDock() {
  const tel = buildTelLink(SALON_INFO.phone);
  return (
    <nav
      aria-label="Quick actions"
      className="on-oxblood fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] grid grid-cols-2 border-t border-oxblood-line bg-oxblood text-cream md:hidden"
    >
      <a
        href={SALON_INFO.links.googleDirections}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex min-h-14 items-center justify-center gap-2 font-bold"
      >
        <Navigation size={18} aria-hidden="true" /> Directions
      </a>
      {tel ? (
        <a href={tel} className="relative flex min-h-14 items-center justify-center gap-2 border-l border-oxblood-line font-bold">
          <Phone size={18} aria-hidden="true" /> Call
        </a>
      ) : (
        <a href="#appointment" className="relative flex min-h-14 items-center justify-center gap-2 border-l border-oxblood-line font-bold">
          <MessageCircle size={18} aria-hidden="true" /> Message
        </a>
      )}
    </nav>
  );
}
