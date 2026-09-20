'use client';

import {useEffect} from 'react';

type MotionState = 'before' | 'in' | 'after';

function stateFor(element: HTMLElement): MotionState {
  const rect = element.getBoundingClientRect();
  if (rect.bottom <= 0) return 'after';
  if (rect.top >= window.innerHeight) return 'before';
  return 'in';
}

export function ScrollMotionController() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-motion]'));
    if (!elements.length) return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      elements.forEach((element) => {
        element.dataset.motionState = 'in';
      });
      return;
    }

    elements.forEach((element) => {
      element.dataset.motionState = stateFor(element);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.dataset.motionState = 'in';
          } else {
            element.dataset.motionState = entry.boundingClientRect.bottom <= 0 ? 'after' : 'before';
          }
        });
      },
      {
        rootMargin: '-7% 0px -9% 0px',
        threshold: [0, 0.12, 0.55],
      },
    );

    elements.forEach((element) => observer.observe(element));
    const frame = window.requestAnimationFrame(() => {
      root.dataset.cvMotion = 'ready';
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      delete root.dataset.cvMotion;
    };
  }, []);

  return null;
}
