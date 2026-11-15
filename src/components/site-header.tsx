import {HomeHeader} from '@/components/home-header';

type SiteHeaderProps = {
  locale?: 'en' | 'ar';
  counterpartHref: string;
};

/** Keep interior navigation visually and semantically aligned with the portfolio homepage. */
export function SiteHeader({locale = 'en', counterpartHref}: SiteHeaderProps) {
  return <HomeHeader locale={locale} counterpartHref={counterpartHref} mode="interior" />;
}
