import { expect, test } from '@playwright/test';
import { buildTelLink, buildWhatsAppLink, normalizeNumber } from '../../src/lib/whatsapp';

test('normalizeNumber keeps digits only and rejects implausible numbers', () => {
  expect(normalizeNumber('+91 97640 48382')).toBe('919764048382');
  expect(normalizeNumber('97640 483-827')).toBe('97640483827');
  expect(normalizeNumber('12345')).toBeNull();
  expect(normalizeNumber('   ')).toBeNull();
  expect(normalizeNumber(null)).toBeNull();
  expect(normalizeNumber(undefined)).toBeNull();
});

test('contact links require a country code so wa.me and tel: work internationally', () => {
  expect(buildWhatsAppLink('9764048382', 'Hello')).toBeNull();
  expect(buildTelLink('9764048382')).toBeNull();
  expect(buildWhatsAppLink('+91 97640 48382', 'Hi & hello?')).toBe('https://wa.me/919764048382?text=Hi%20%26%20hello%3F');
  expect(buildTelLink(' +91 97640 48382 ')).toBe('tel:+919764048382');
});

test('contact links stay null while the shop number is pending', () => {
  expect(buildWhatsAppLink(null, 'Hello')).toBeNull();
  expect(buildWhatsAppLink('', 'Hello')).toBeNull();
  expect(buildTelLink(undefined)).toBeNull();
});
