import type {ReactNode} from 'react';
import {SiteHeader} from '@/components/site-header';

type InteriorPageProps = {
  locale: 'en' | 'ar';
  counterpartHref: string;
  children: ReactNode;
  className?: string;
};

/**
 * The actual public homepage (hero-preview) is the visual authority.
 * Interior routes share its color, type and spacing language while remaining scrollable.
 */
export function InteriorPageShell({locale, counterpartHref, children, className}: InteriorPageProps) {
  const ar = locale === 'ar';
  return (
    <main
      id="main"
      className={['cvPage', 'cvInteriorPage', ar ? 'cvRtl' : '', className].filter(Boolean).join(' ')}
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
