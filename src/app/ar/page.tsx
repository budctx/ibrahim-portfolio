import type {Metadata} from 'next';
import Link from 'next/link';
import {getProjects} from '@/lib/sanity';
import {SiteHeader} from '@/components/site-header';

export const metadata: Metadata = {
  title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
  description: 'أحوّل الأنظمة وسير العمل المعقدة إلى تجارب رقمية واضحة.',
  alternates: {
    canonical: '/ar',
    languages: {
      en: '/',
      ar: '/ar',
      'x-default': '/',
    },
  },
  openGraph: {
    url: '/ar',
    title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
    description: 'أحوّل الأنظمة وسير العمل المعقدة إلى تجارب رقمية واضحة.',
  },
};

export default async function ArabicHomePage() {
  const projects = await getProjects();
  const work = projects.filter((project) => project.classification !== 'playground').slice(0, 4);

  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref="/" />

      <section className="hero">
        <div>
          <div className="eyebrow">مصمم منتجات وتجارب رقمية</div>
          <h1>التعقيد، بوضوح.</h1>
          <p className="lede">أحوّل الأنظمة وسير العمل المعقدة إلى تجارب رقمية واضحة.</p>
        </div>
        <div className="structure" aria-hidden="true" />
      </section>

      <section className="section" aria-labelledby="selected-work-title-ar">
        <div className="sectionHead">
          <h2 id="selected-work-title-ar">أعمال مختارة</h2>
          <Link className="eyebrow" href="/ar/work">عرض كل الأعمال</Link>
        </div>
        {work.length === 0 ? (
          <div className="empty">يجري تجهيز الأعمال الحقيقية للنشر.</div>
        ) : (
          <div className="projectGrid">
            {work.map((project) => (
              <Link className="projectCard" key={project.projectKey} href={`/ar/projects/${project.slug}`}>
                <div>
                  <div className="eyebrow">{project.classification}</div>
                  <h3>{project.titleAr}</h3>
                </div>
                <div className="meta">
                  <span>{project.roleAr ?? ''}</span>
                  <span>{project.year ?? ''}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="section" id="contact" aria-labelledby="contact-title-ar">
        <div className="eyebrow" id="contact-title-ar">تواصل</div>
        <p className="contact">لنحوّل التعقيد إلى وضوح.</p>
      </section>

      <footer className="footer">
        <span>© Ibrahim</span>
        <span>عربي / English · فاتح / داكن</span>
      </footer>
    </main>
  );
}
