import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';
import {ProjectCard} from '@/components/project-card';
import {getProjects} from '@/lib/content';

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
          <div className="empty"><span className="emptySignal" aria-hidden="true" /><span>لا توجد تجارب منشورة للعامة حتى الآن.</span></div>
        ) : (
          <div className="projectGrid">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.projectKey} locale="ar" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
