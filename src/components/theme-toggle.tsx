'use client';

import {useEffect, useState} from 'react';

type ThemeToggleProps = {
  locale?: 'en' | 'ar';
};

export function ThemeToggle({locale = 'en'}: ThemeToggleProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const label = locale === 'ar'
    ? (dark ? 'الوضع الفاتح' : 'الوضع الداكن')
    : (dark ? 'Light' : 'Dark');

  return (
    <button
      className="themeToggle"
      type="button"
      aria-pressed={dark}
      aria-label={label}
      onClick={() => {
        const next = !dark;
        setDark(next);
        const theme = next ? 'dark' : 'light';
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem('portfolio-theme', theme);
      }}
    >
      <span className="themeGlyph" aria-hidden="true">{dark ? '○' : '●'}</span>
      <span>{label}</span>
    </button>
  );
}
