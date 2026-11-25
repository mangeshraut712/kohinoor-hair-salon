export interface InquiryInput {
  name: string;
  mobile: string;
  service: string;
  day: string;
  slot: string;
  notes: string;
}

/** Strip everything but digits; returns null if the result is not a plausible number (10+ digits). */
export function normalizeNumber(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 10 ? digits : null;
}

/** wa.me and tel:+ need an explicit country code, so bare 10-digit numbers and trunk-prefixed numbers (0 + 10 digits) are rejected. Accept 11+ digits that do not start with 0 (e.g. 91XXXXXXXXXX). */
function normalizeInternational(raw: string | null | undefined): string | null {
  const n = normalizeNumber(raw);
  return n && /^[1-9]\d{10,}$/.test(n) ? n : null;
}

export function buildInquiryMessage(input: InquiryInput): string {
  const lines = [
    'Hello The Kohinoor AC Salon, I would like to book an appointment.',
    '',
    `Name: ${input.name.trim() || '-'}`,
    `Mobile: ${input.mobile.trim() || '-'}`,
    `Service: ${input.service || '-'}`,
    `Preferred day: ${input.day || '-'}`,
    `Preferred time: ${input.slot || '-'}`,
  ];
  if (input.notes.trim()) lines.push(`Notes: ${input.notes.trim()}`);
  lines.push('', 'Please confirm availability. Thank you.');
  return lines.join('\n');
}

/** Returns a wa.me link, or null while the shop WhatsApp number is pending. */
export function buildWhatsAppLink(number: string | null | undefined, message: string): string | null {
  const n = normalizeInternational(number);
  if (!n) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

/** Returns a tel: link, or null while the shop phone number is pending. */
export function buildTelLink(number: string | null | undefined): string | null {
  const n = normalizeInternational(number);
  return n ? `tel:+${n}` : null;
}
