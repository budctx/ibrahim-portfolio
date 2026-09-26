import Link from 'next/link';
import {ThemeToggle} from '@/components/theme-toggle';
import {MailIcon} from '@/components/icons';

type Locale = 'ar' | 'en';
type Props = {locale: Locale; counterpartHref: string; isHome?: boolean};

export function ExperienceNavigation({locale, counterpartHref, isHome = false}: Props) {
  const ar = locale === 'ar';
  const home = ar ? '/' : '/en';
  const labels = ar
    ? ['الفكرة', 'الرحلة', 'القدرات', 'المؤهلات', 'الأعمال']
    : ['Approach', 'Journey', 'Capabilities', 'Credentials', 'Work'];
  const href = (id: string) => (isHome ? '' : home) + '#' + id;

  return (
    <header className="xpHeader">
      <div className="xpShell xpHeaderInner">
        <Link href={home} className="xpBrand" aria-label={ar ? 'العودة للرئيسية' : 'Go to homepage'}>
          <span className="xpBrandGlyph" aria-hidden="true">i<span>·</span></span>
          <span>IBRAHIM <small> / DIGITAL EXPERIENCE</small></span>
        </Link>
        <nav className="xpNav" aria-label={ar ? 'التنقل الرئيسي' : 'Primary navigation'}>
          {['approach','journey','capabilities','credentials','work'].map((id,i) => (
            <a key={id} href={href(id)}>{labels[i]}</a>
          ))}
        </nav>
        <div className="xpControls">
          <a className="xpHeaderContact" href={(isHome ? '' : home) + '#contact'}
            aria-label={ar ? 'الانتقال إلى التواصل' : 'Jump to contact'}>
            <MailIcon aria-hidden="true" />
          </a>
          <a href={counterpartHref} className="xpLanguage"
            aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}
            lang={ar ? 'en' : 'ar'}>{ar ? 'English' : 'العربية'}</a>
          <ThemeToggle locale={locale} />
        </div>
      </div>
    </header>
  );
}
