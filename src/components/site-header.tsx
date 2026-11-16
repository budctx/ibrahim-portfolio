import Link from 'next/link';
import {ThemeToggle} from '@/components/theme-toggle';
import {getProjects} from '@/lib/content';

type SiteHeaderProps = {
  locale?: 'en' | 'ar';
  counterpartHref: string;
  compact?: boolean;
};

/**
 * The public homepage is the approved static Readex Pro scene,
 * with an editorial wordmark and compact circular controls.
 * Interior pages share that visual language without recreating full-screen scenes.
 */
export async function SiteHeader({locale = 'en', counterpartHref, compact = false}: SiteHeaderProps) {
  const ar = locale === 'ar';
  const homePath = ar ? '/' : '/en';
  const prefix = ar ? '/ar' : '';
  const hasExperiments = (await getProjects()).some(project => project.classification === 'playground');

  return (
    <header className="portfolioHeader">
      <Link className="portfolioWordmark" href={homePath} aria-label={ar ? 'العودة إلى الرئيسية' : 'Back to homepage'}>
        <span>{ar ? 'إبراهيم العجمي' : 'Ibrahim Al-Ajmi'}</span>
        <small>PORTFOLIO</small>
      </Link>
      <nav className="portfolioNavigation" aria-label={ar ? 'التنقل الرئيسي' : 'Primary navigation'}>
        <a href={`${homePath}#work`}>{ar ? 'الأعمال' : 'Work'}</a>
        {!compact && <Link href={`${prefix}/about`}>{ar ? 'عني' : 'About'}</Link>}
        {!compact && hasExperiments && <Link href={`${prefix}/playground`}>{ar ? 'التجارب' : 'Playground'}</Link>}
        {!compact && <Link href={`${homePath}#contact`}>{ar ? 'تواصل' : 'Contact'}</Link>}
      </nav>
      <div className="portfolioControls">
        {/* A locale boundary needs a fresh root document, including html and skip link. */}
        <a className="portfolioLanguage" href={counterpartHref} lang={ar ? 'en' : 'ar'} aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}>{ar ? 'EN' : 'AR'}</a>
        <ThemeToggle locale={locale} />
      </div>
    </header>
  );
}
