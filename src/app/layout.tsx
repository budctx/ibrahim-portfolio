import type {Metadata} from 'next';
import {cookies, draftMode, headers} from 'next/headers';
import type {ReactNode} from 'react';
import {IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic} from 'next/font/google';
import './globals.css';
import './portfolio.css';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
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
    default: 'Ibrahim — Digital Product & Experience Designer',
    template: '%s — Ibrahim',
  },
  description: 'Digital product designer in Saudi Arabia working across UI/UX, web design, UX strategy, information architecture, responsive interfaces, digital workflows, generative AI, and developer handoff.',
  keywords: [
    'Digital Product Designer',
    'Product Designer Saudi Arabia',
    'UX Designer Saudi Arabia',
    'UI UX Designer',
    'UX Designer',
    'UI Designer',
    'Digital Product Design',
    'Product UX',
    'User Experience Design',
    'User Interface Design',
    'Web Designer',
    'Web Design',
    'Responsive Web Design',
    'UX Strategy',
    'Systems Thinking',
    'Information Architecture',
    'User Research',
    'Wireframing',
    'Prototyping',
    'Usability Testing',
    'Interaction Design',
    'Design Systems',
    'Accessibility',
    'WCAG',
    'Digital Governance',
    'Digital Government Authority',
    'DGA',
    'DGA compliance',
    'Developer Handoff',
    'Generative AI',
    'AI-assisted design',
    'AI workflows',
    'Enterprise UX',
    'Workflow Design',
    'Saudi Arabia',
  ],
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
    description: 'UI/UX, web design, systems thinking, responsive interfaces, digital governance, generative AI workflows, and implementation-aware product design.',
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
