import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '@/components/site-header';
import {getProjects} from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'الأعمال',
  description: 'أعمال مختارة في تصميم المنتجات والتجارب الرقمية.',
  alternates: {
    canonical: '/ar/work',
    languages: {en: '/work', ar: '/ar/work', 'x-default': '/work'},
  },
  openGraph: {url: '/ar/work', title: 'الأعمال — إبراهيم'},
};

export default async function ArabicWorkPage() {
  const projects = (await getProjects()).filter((project) => project.classification !== 'playground');
  const flagship = projects.filter((project) => project.classification === 'flagship');
  const selected = projects.filter((project) => project.classification === 'selected');

  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref="/work" />
      <section className="pageIntro">
        <div className="eyebrow">الأعمال</div>
        <h1>الدليل قبل الادعاء.</h1>
        <p className="lede">أعمال مختارة تركّز على جعل المنتجات والأنظمة المعقدة أكثر وضوحًا.</p>
      </section>

      <ProjectGroup title="مشاريع رئيسية" projects={flagship} />
      <ProjectGroup title="أعمال مختارة" projects={selected} />

      {projects.length === 0 && (
        <section className="section">
          <div className="empty">يجري تجهيز الأعمال الحقيقية للنشر.</div>
        </section>
      )}
    </main>
  );
}

function ProjectGroup({title, projects}: {title: string; projects: Awaited<ReturnType<typeof getProjects>>}) {
  if (projects.length === 0) return null;
  const id = `group-${title.length}`;
  return (
    <section className="section" aria-labelledby={id}>
      <div className="sectionHead">
        <h2 id={id}>{title}</h2>
      </div>
      <div className="projectGrid">
        {projects.map((project) => (
          <Link className="projectCard" key={project.projectKey} href={`/ar/projects/${project.slug}`}>
            <div>
              <div className="eyebrow">{project.typeAr ?? project.classification}</div>
              <h3>{project.titleAr}</h3>
            </div>
            <div className="meta">
              <span>{project.roleAr ?? ''}</span>
              <span>{project.year ?? ''}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
