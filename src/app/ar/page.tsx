import type {Metadata} from 'next';
import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {SiteHeader} from '@/components/site-header';
import {StructureField} from '@/components/structure-field';

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

      <section className="hero" aria-labelledby="home-title-ar">
        <div className="heroCopy">
          <div className="eyebrow">مصمم منتجات وتجارب رقمية</div>
          <h1 id="home-title-ar">التعقيد، بوضوح.</h1>
          <p className="lede">أحوّل الأنظمة وسير العمل المعقدة إلى تجارب رقمية واضحة.</p>
          <Link className="heroAction" href="#selected-work-title-ar">الأعمال المختارة <span aria-hidden="true">↓</span></Link>
        </div>
        <div className="structureFieldFrame">
          <StructureField />
        </div>
      </section>

      <section className="section workSection" aria-labelledby="selected-work-title-ar">
        <div className="sectionHead">
          <h2 id="selected-work-title-ar">أعمال مختارة</h2>
          <Link className="sectionLink" href="/ar/work">عرض كل الأعمال</Link>
        </div>
        {work.length === 0 ? (
          <div className="empty">
            <span className="emptySignal" aria-hidden="true" />
            <span>يجري تجهيز الأعمال الحقيقية للنشر.</span>
          </div>
        ) : (
          <div className="projectGrid">
            {work.map((project) => (
              <ProjectCard project={project} key={project.projectKey} locale="ar" />
            ))}
          </div>
        )}
      </section>

      <section className="section contactSection" id="contact" aria-labelledby="contact-title-ar">
        <div className="eyebrow" id="contact-title-ar">تواصل</div>
        <div>
          <p className="contact">لنحوّل التعقيد إلى وضوح.</p>
          <div className="contactActions">
            <Link href="mailto:ibrahim.alajmi407@gmail.com">البريد الإلكتروني</Link>
            <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© Ibrahim</span>
        <span>عربي / English · فاتح / داكن</span>
      </footer>
    </main>
  );
}
