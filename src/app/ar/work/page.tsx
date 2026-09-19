import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';
import {ProjectCard} from '@/components/project-card';
import {getProjects} from '@/lib/content';

export const metadata: Metadata = {
  title: 'الأعمال',
  description: 'أعمال مختارة في تصميم المنتجات الرقمية وUI/UX وتصميم الويب وUX Strategy والواجهات المتجاوبة وسير العمل الرقمي والتسليم القابل للتنفيذ.',
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
  const firstHref = flagship.length ? '#flagship-projects' : selected.length ? '#selected-work' : '/ar#contact';

  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref="/work" />
      <section className="pageIntro">
        <div className="eyebrow">الأعمال</div>
        <h1>شاهد كيف تصمد القرارات داخل العمل.</h1>
        <p className="lede">دراسات حالة في تصميم المنتجات الرقمية وUI/UX وتصميم الويب وسير العمل والواجهات المتجاوبة وUX Strategy والتسليم القابل للتنفيذ.</p>
        <a className="sectionLink" href={firstHref}>{projects.length ? 'ابدأ بالأعمال' : 'لا توجد دراسات حالة عامة بعد — تواصل معي'}</a>
      </section>

      <ProjectGroup
        id="flagship-projects"
        title="مشاريع رئيسية"
        projects={flagship}
        nextHref={selected.length ? '#selected-work' : '/ar#contact'}
        nextLabel={selected.length ? 'أكمل إلى الأعمال المختارة' : 'عندك تحدٍ مشابه؟ خلّنا نتكلم.'}
      />
      <ProjectGroup
        id="selected-work"
        title="أعمال مختارة"
        projects={selected}
        nextHref="/ar#contact"
        nextLabel="عندك تحدٍ مشابه؟ خلّنا نتكلم."
      />

      {projects.length === 0 && (
        <section className="section">
          <div className="empty"><span className="emptySignal" aria-hidden="true" /><span>يجري تجهيز دراسات الحالة الحقيقية للنشر. لن يظهر أي عمل إلا عندما يكون حقيقيًا ومعتمدًا للعرض.</span></div>
          <a className="sectionLink" href="/ar#contact">ناقش احتياجًا في تصميم المنتجات أو UI/UX أو الويب</a>
        </section>
      )}
    </main>
  );
}

function ProjectGroup({
  id,
  title,
  projects,
  nextHref,
  nextLabel,
}: {
  id: string;
  title: string;
  projects: Awaited<ReturnType<typeof getProjects>>;
  nextHref: string;
  nextLabel: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section className="section" aria-labelledby={id}>
      <div className="sectionHead">
        <h2 id={id}>{title}</h2>
      </div>
      <div className="projectGrid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.projectKey} locale="ar" />
        ))}
      </div>
      <a className="sectionLink" href={nextHref}>{nextLabel}</a>
    </section>
  );
}
