import type {ReactNode} from 'react';
import {SiteHeader} from '@/components/site-header';

type InteriorPageProps = {
  locale: 'en' | 'ar';
  counterpartHref: string;
  children: ReactNode;
  className?: string;
};

/**
 * The homepage owns the portfolio's design foundation.
 * Interior routes use the same full-width page surface and 1600px content grid.
 */
export function InteriorPageShell({locale, counterpartHref, children, className}: InteriorPageProps) {
  const ar = locale === 'ar';
  return (
    <main
      id="main"
      className={['cvPage', 'cvInteriorPage', ar ? 'cvRtl rtl' : '', className].filter(Boolean).join(' ')}
      dir={ar ? 'rtl' : 'ltr'}
      lang={locale}
    >
      <div className="cvFrame cvInteriorFrame">
        <SiteHeader locale={locale} counterpartHref={counterpartHref} />
        {children}
      </div>
    </main>
  );
}
