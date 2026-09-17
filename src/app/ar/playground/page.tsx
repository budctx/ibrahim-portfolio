import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '@/components/site-header';
import {getProjects} from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'التجارب',
  description: 'تجارب واستكشافات في المنتجات والتفاعل والأنظمة الرقمية.',
  alternates: {
    canonical: '/ar/playground',
    languages: {en: '/playground', ar: '/ar/playground', 'x-default': '/playground'},
  },
  openGraph: {url: '/ar/playground', title: 'التجارب — إبراهيم'},
};

export default async function ArabicPlaygroundPage() {
  const projects = (await getProjects()).filter((project) => project.classification === 'playground');

  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref="/playground" />
      <section className="pageIntro">
        <div className="eyebrow">التجارب</div>
        <h1>تجارب لها هدف.</h1>
        <p className="lede">استكشافات تختبر التفاعل والأنظمة والأفكار البصرية دون تقديمها كأعمال عملاء.</p>
      </section>
      <section className="section">
        {projects.length === 0 ? (
          <div className="empty">لا توجد تجارب منشورة للعامة حتى الآن.</div>
        ) : (
          <div className="projectGrid">
            {projects.map((project) => (
              <Link className="projectCard" key={project.projectKey} href={`/ar/projects/${project.slug}`}>
                <div>
                  <div className="eyebrow">{project.typeAr ?? 'تجربة'}</div>
                  <h3>{project.titleAr}</h3>
                </div>
                <div className="meta"><span>{project.roleAr ?? ''}</span><span>{project.year ?? ''}</span></div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
