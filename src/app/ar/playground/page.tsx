import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';
import {ProjectCard} from '@/components/project-card';
import {getProjects} from '@/lib/content';

export const metadata: Metadata = {
  title: 'التجارب',
  description: 'تجارب واستكشافات في تصميم المنتجات الرقمية وUI/UX وتصميم التفاعل والويب المتجاوب وأنظمة التصميم والذكاء الاصطناعي التوليدي.',
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
        <h1>اختبر الفكرة قبل أن تسميها حلًا.</h1>
        <p className="lede">استكشافات في Interaction Design وUI/UX والويب المتجاوب وDesign Systems وسير العمل الرقمي وGenerative AI — منفصلة بوضوح عن أعمال العملاء أو الإنتاج.</p>
        <a className="sectionLink" href="#experiments-ar">شاهد التجارب</a>
      </section>
      <section className="section" id="experiments-ar">
        {projects.length === 0 ? (
          <div>
            <div className="empty"><span className="emptySignal" aria-hidden="true" /><span>لا توجد تجارب منشورة للعامة حتى الآن. ستظهر هنا تجارب التفاعل والواجهات والذكاء الاصطناعي عندما تكون جديرة بالعرض.</span></div>
            <a className="sectionLink" href="/ar#contact">عندك فكرة تستحق الاختبار؟ ابدأ محادثة.</a>
          </div>
        ) : (
          <div>
            <div className="projectGrid">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.projectKey} locale="ar" />
              ))}
            </div>
            <a className="sectionLink" href="/ar#contact">عندك فكرة تستحق الاختبار؟ ابدأ محادثة.</a>
          </div>
        )}
      </section>
    </main>
  );
}
