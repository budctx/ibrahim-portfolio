'use client';

import {useEffect, useState} from 'react';
import {MailIcon} from '@/components/icons';

/**
 * The floating contact dock never covers the mobile interaction controls.
 * While the console is in the viewport, the permanent header contact action
 * remains available. This is not tied to a one-shot hash navigation state.
 */
export function ContactDock({href, label, shortLabel}: {href: string; label: string; shortLabel: string}) {
  const [consoleObscured, setConsoleObscured] = useState(false);
  useEffect(() => {
    const element = document.querySelector('.xpConsole');
    if (!element || !('IntersectionObserver' in window)) return;
    const narrow = window.matchMedia('(max-width: 760px)');
    let inView = false;
    const update = () => setConsoleObscured(narrow.matches && inView);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, {rootMargin: '-24px 0px -24px 0px', threshold: 0});
    observer.observe(element);
    narrow.addEventListener('change', update);
    return () => {
      observer.disconnect();
      narrow.removeEventListener('change', update);
    };
  }, []);
  return (
    <a href={href} className="xpFloatingContact" data-console-obscured={consoleObscured}
      aria-label={label} title={label}>
      <MailIcon aria-hidden="true" /><span>{shortLabel}</span>
    </a>
  );
}
