import Link from 'next/link';
import {ThemeToggle} from '@/components/theme-toggle';

type SiteHeaderProps = {
  locale?: 'en' | 'ar';
  counterpartHref: string;
};

export function SiteHeader({locale = 'en', counterpartHref}: SiteHeaderProps) {
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';

  return (
    <header className="header">
      <Link className="brand" href={ar ? '/ar' : '/'} aria-label={ar ? 'الصفحة الرئيسية' : 'Home'}>
        Ibrahim
      </Link>
      <nav className="nav" aria-label={ar ? 'التنقل الرئيسي' : 'Primary'}>
        <Link href={`${prefix}/work`}>{ar ? 'الأعمال' : 'Work'}</Link>
        <Link href={`${prefix}/playground`}>{ar ? 'التجارب' : 'Playground'}</Link>
        <Link href={`${prefix}/about`}>{ar ? 'عني' : 'About'}</Link>
        <Link className="contactLink" href={`${prefix || ''}/#contact`}>{ar ? 'تواصل' : 'Contact'}</Link>
        <Link href={counterpartHref} lang={ar ? 'en' : 'ar'}>{ar ? 'EN' : 'AR'}</Link>
        <ThemeToggle locale={locale} />
      </nav>
    </header>
  );
}
