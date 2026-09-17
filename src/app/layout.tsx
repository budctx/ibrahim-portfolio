import type {Metadata} from 'next';
import {headers} from 'next/headers';
import type {ReactNode} from 'react';
import './globals.css';

const siteUrl = 'https://ibrahim-portfolio-blush.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ibrahim — Digital Product & Experience Designer',
    template: '%s — Ibrahim',
  },
  description: 'Digital product and experience designer turning complex systems and workflows into clear digital experiences.',
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ar: '/ar',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Ibrahim — Digital Product & Experience Designer',
    description: 'Turning complex systems and workflows into clear digital experiences.',
    siteName: 'Ibrahim Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInit = `
try {
  const saved = localStorage.getItem('portfolio-theme');
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = saved === 'dark' || saved === 'light' ? saved : preferred;
} catch (_) {}
`;

export default async function RootLayout({children}: {children: ReactNode}) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-portfolio-locale') === 'ar' ? 'ar' : 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: themeInit}} />
      </head>
      <body>
        <a className="skip" href="#main">{locale === 'ar' ? 'تجاوز إلى المحتوى' : 'Skip to content'}</a>
        {children}
      </body>
    </html>
  );
}
