import type {Metadata} from 'next';
import {cookies, draftMode, headers} from 'next/headers';
import type {ReactNode} from 'react';
import {IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic} from 'next/font/google';
import {ARABIC_PORTFOLIO_KEYWORDS} from '@/lib/seo-keywords';
import './globals.css';
import './portfolio.css';
import './portfolio-polish.css';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-plex-arabic',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const siteUrl = 'https://ibrahim-portfolio-blush.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'إبراهيم — مصمم منتجات وتجارب رقمية',
    template: '%s — إبراهيم',
  },
  description: 'مصمم منتجات وتجارب رقمية في السعودية، أحوّل تعقيد الأنظمة وسير العمل إلى تجارب رقمية واضحة وقابلة للتنفيذ.',
  keywords: [...ARABIC_PORTFOLIO_KEYWORDS],
  alternates: {
    canonical: '/',
    languages: {
      ar: '/',
      en: '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
    description: 'أنظمة معقدة وتجارب رقمية واضحة عبر UX وتصميم الويب والتفكير بالأنظمة وAI والتنفيذ القابل للبناء.',
    siteName: 'بورتفوليو إبراهيم',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInit = `
try {
  const saved = localStorage.getItem('portfolio-theme');
  document.documentElement.dataset.theme = saved === 'dark' || saved === 'light' ? saved : 'dark';
} catch (_) {}
`;

export default async function RootLayout({children}: {children: ReactNode}) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-portfolio-locale') === 'ar' ? 'ar' : 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const draft = await draftMode();
  const branch = draft.isEnabled ? (await cookies()).get('ks-branch')?.value : undefined;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${plexSans.variable} ${plexArabic.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{__html: themeInit}} />
      </head>
      <body>
        <a className="skip" href="#main">{locale === 'ar' ? 'تجاوز إلى المحتوى' : 'Skip to content'}</a>
        {children}
        {draft.isEnabled && (
          <aside className="previewBar" aria-label="Draft preview">
            <span>Draft preview{branch ? ` · ${branch}` : ''}</span>
            <form method="POST" action="/preview/end">
              <button type="submit">End preview</button>
            </form>
          </aside>
        )}
      </body>
    </html>
  );
}
