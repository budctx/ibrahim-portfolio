'use client';

import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';
import {LanguagesIcon, MailIcon} from '@/components/icons';
import {ThemeToggle} from '@/components/theme-toggle';

type HomeHeaderProps = {
  locale?: 'en' | 'ar';
  counterpartHref: string;
  hasWork?: boolean;
};

export function HomeHeader({locale = 'en', counterpartHref, hasWork = false}: HomeHeaderProps) {
  const ar = locale === 'ar';
  const [activeSection, setActiveSection] = useState('');

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
        email: 'راسلني بالبريد',
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
        email: 'Email me',
      };

  const navItems = useMemo(
    () => [
      {id: 'about', label: labels.about},
      {id: 'journey', label: labels.journey},
      {id: 'capabilities', label: labels.capabilities},
      {id: 'credentials', label: labels.credentials},
      ...(hasWork ? [{id: 'work', label: labels.work}] : []),
      {id: 'contact', label: labels.contact},
    ],
    [hasWork, labels.about, labels.capabilities, labels.contact, labels.credentials, labels.journey, labels.work],
  );

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0, 0.15, 0.4, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <header className="cvHeader">
      <Link className="cvBrand" href={ar ? '/ar' : '/'} aria-label={labels.home}>
        <span className="cvBrandMark" aria-hidden="true"><b>I</b><i>/</i><b>A</b></span>
        <span className="cvBrandName">{ar ? 'إبراهيم العجمي' : 'Ibrahim Al-Ajmi'}</span>
      </Link>

      <nav className="cvNav" aria-label={ar ? 'التنقل الرئيسي' : 'Primary'}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={'#' + item.id}
            aria-current={activeSection === item.id ? 'location' : undefined}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="cvTools">
        <a
          className="cvHeaderContact"
          href="mailto:ibrahim.alajmi407@gmail.com"
          aria-label={labels.email}
          data-tooltip={labels.email}
        >
          <MailIcon className="cvControlIcon" />
        </a>
        <Link className="cvLang" href={counterpartHref} lang={ar ? 'en' : 'ar'} aria-label={labels.language}>
          <LanguagesIcon className="cvControlIcon" />
          <span>{ar ? 'EN' : 'AR'}</span>
        </Link>
        <ThemeToggle locale={locale} />
      </div>
    </header>
  );
}
