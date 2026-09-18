'use client';

import {useEffect, useState} from 'react';
import {MoonIcon, SunIcon} from '@/components/icons';

type ThemeToggleProps = {
  locale?: 'en' | 'ar';
};

export function ThemeToggle({locale = 'en'}: ThemeToggleProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const label = locale === 'ar'
    ? (dark ? 'استخدام الوضع الفاتح' : 'استخدام الوضع الداكن')
    : (dark ? 'Use light mode' : 'Use dark mode');

  return (
    <button
      className="themeToggle"
      type="button"
      aria-pressed={dark}
      aria-label={label}
      title={label}
      onClick={() => {
        const next = !dark;
        setDark(next);
        const theme = next ? 'dark' : 'light';
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem('portfolio-theme', theme);
      }}
    >
      {dark ? <SunIcon className="cvControlIcon" /> : <MoonIcon className="cvControlIcon" />}
    </button>
  );
}
