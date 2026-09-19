'use client';

import {useEffect, useState} from 'react';

const keywords = {
  en: [
    'Digital Product Design',
    'UI/UX Design',
    'UX Strategy',
    'Information Architecture',
    'Responsive Web Design',
    'Design Systems',
    'Generative AI Workflows',
    'Developer Handoff',
    'DGA-aligned UX',
  ],
  ar: [
    'تصميم المنتجات الرقمية',
    'UI/UX Design',
    'تجربة المستخدم UX',
    'هندسة المعلومات',
    'تصميم الويب المتجاوب',
    'Design Systems',
    'Generative AI Workflows',
    'Developer Handoff',
    'متطلبات DGA',
  ],
} as const;

export function HeroKeywordLoop({locale = 'en'}: {locale?: 'en' | 'ar'}) {
  const items = keywords[locale];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div className="cvHeroKeywordLoop" aria-label={locale === 'ar' ? 'مجالات التركيز' : 'Focus areas'}>
      <span>{locale === 'ar' ? 'أعمل عبر' : 'Working across'}</span>
      <strong key={items[index]}>{items[index]}</strong>
    </div>
  );
}
