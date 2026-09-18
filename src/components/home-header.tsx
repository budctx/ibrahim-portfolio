import Link from 'next/link';
import {ThemeToggle} from '@/components/theme-toggle';

type HomeHeaderProps = {
  locale?: 'en' | 'ar';
  counterpartHref: string;
  hasWork?: boolean;
};

export function HomeHeader({locale = 'en', counterpartHref, hasWork = false}: HomeHeaderProps) {
  const ar = locale === 'ar';
  const labels = ar
    ? {home: 'الرئيسية', about: 'عني', journey: 'الرحلة', capabilities: 'المهارات', credentials: 'المؤهلات', work: 'الأعمال', contact: 'تواصل'}
    : {home: 'Home', about: 'About', journey: 'Journey', capabilities: 'Capabilities', credentials: 'Credentials', work: 'Work', contact: 'Contact'};

  return (
    <header className="cvHeader">
      <Link className="cvBrand" href={ar ? '/ar' : '/'} aria-label={labels.home}>
        <span aria-hidden="true">I.</span>
        <span className="cvBrandName">Ibrahim</span>
      </Link>

      <nav className="cvNav" aria-label={ar ? 'التنقل الرئيسي' : 'Primary'}>
        <Link href="#about">{labels.about}</Link>
        <Link href="#journey">{labels.journey}</Link>
        <Link href="#capabilities">{labels.capabilities}</Link>
        <Link href="#credentials">{labels.credentials}</Link>
        {hasWork && <Link href="#work">{labels.work}</Link>}
        <Link href="#contact">{labels.contact}</Link>
      </nav>

      <div className="cvTools">
        <Link className="cvLang" href={counterpartHref} lang={ar ? 'en' : 'ar'}>{ar ? 'EN' : 'AR'}</Link>
        <ThemeToggle locale={locale} />
      </div>
    </header>
  );
}
