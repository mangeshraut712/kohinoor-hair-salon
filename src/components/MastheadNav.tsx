'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { SALON_INFO } from '@/data/salon';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#location', label: 'Location' },
  { href: '#appointment', label: 'Contact' },
];

export function MastheadNav() {
  const menu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menu.current?.removeAttribute('open');
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const details = menu.current;
      if (e.key === 'Escape' && details?.open && details.contains(document.activeElement)) {
        e.preventDefault();
        details.open = false;
        details.querySelector('summary')?.focus();
      }
    };
    const onPointer = (e: Event) => {
      if (menu.current && !menu.current.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, []);
  return (
    <header className="sticky top-0 z-30 border-b border-oxblood-line bg-oxblood text-cream on-oxblood">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="#top" className="flex min-w-0 items-center gap-2.5 font-display text-sm font-bold uppercase leading-tight tracking-wide sm:text-base md:text-lg">
          <Image src="/brand/kohinoor-emblem.webp" alt="" width={40} height={40} className="size-10 shrink-0 rounded-full" preload />
          <span>{SALON_INFO.name}</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-3 text-sm lg:gap-5 font-semibold md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="underline-offset-4 hover:underline">
              {l.label}
            </a>
          ))}
          <a
            href={SALON_INFO.links.googleDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            Get Directions
          </a>
        </nav>
        <details ref={menu} onBlur={(event) => {
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
        }} className="relative shrink-0 md:hidden">
          <summary className="cursor-pointer list-none border border-cream px-3 py-2 text-sm font-semibold">
            Menu
          </summary>
          <nav
            aria-label="Primary mobile"
            className="absolute right-0 mt-2 flex max-h-[calc(100dvh-8.5rem)] w-48 flex-col overflow-y-auto border border-oxblood-line bg-oxblood p-2"
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => { closeMenu(); const id = l.href.slice(1); requestAnimationFrame(() => { const target = document.getElementById(id); target?.scrollIntoView({ block: 'start' }); target?.focus({ preventScroll: true }); }); }} className="flex min-h-11 items-center px-3 py-2 text-sm font-semibold hover:bg-oxblood-dark">
                {l.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
