'use client';

import type {MouseEvent} from 'react';
import {MessageCircleIcon} from '@/components/icons';

export function FloatingContactButton({locale = 'en'}: {locale?: 'en' | 'ar'}) {
  const label = locale === 'ar' ? 'تواصل معي' : 'Contact me';

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById('contact');
    if (!target) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({behavior: reducedMotion ? 'auto' : 'smooth', block: 'start'});
    window.history.replaceState(null, '', '#contact');
  };

  return (
    <a
      className="cvFloatingContact"
      href="#contact"
      aria-label={label}
      data-label={label}
      onClick={handleClick}
    >
      <MessageCircleIcon />
    </a>
  );
}
