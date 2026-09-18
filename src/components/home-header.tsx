import Link from 'next/link';
import {LanguagesIcon} from '@/components/icons';
import {ThemeToggle} from '@/components/theme-toggle';

type HomeHeaderProps = {
  locale?: 'en' | 'ar';
  counterpartHref: string;
  hasWork?: boolean;
};

export function HomeHeader({locale = 'en', counterpartHref, hasWork = false}: HomeHeaderProps) {
  const ar = locale === 'ar';
  const labels = ar
    ? {
        home: 'الرئيسية',
        about: 'عني',
        journey: 'الرحلة',
        capabilities: 'طريقة العمل',
        credentials: 'المؤهلات',
        work: 'الأعمال',
        contact: 'تواصل',
        language: 'Switch to English',
      }
    : {
        home: 'Home',
        about: 'About',
        journey: 'Journey',
        capabilities: 'How I work',
        credentials: 'Credentials',
        work: 'Work',
        contact: 'Contact',
        language: 'التبديل إلى العربية',
      };

  return (
    <header className="cvHeader">
      <Link className="cvBrand" href={ar ? '/ar' : '/'} aria-label={labels.home}>
        <span className="cvBrandMark" aria-hidden="true"><b>I</b><i>/</i><b>A</b></span>
        <span className="cvBrandName">{ar ? 'إبراهيم العجمي' : 'Ibrahim Al-Ajmi'}</span>
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
        <Link className="cvLang" href={counterpartHref} lang={ar ? 'en' : 'ar'} aria-label={labels.language}>
          <LanguagesIcon className="cvControlIcon" />
          <span>{ar ? 'EN' : 'AR'}</span>
        </Link>
        <ThemeToggle locale={locale} />
      </div>
    </header>
  );
}
