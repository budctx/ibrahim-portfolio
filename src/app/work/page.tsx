import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';
import {ProjectCard} from '@/components/project-card';
import {getProjects} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected digital product and experience design work.',
  alternates: {
    canonical: '/work',
    languages: {en: '/work', ar: '/ar/work', 'x-default': '/work'},
  },
  openGraph: {url: '/work', title: 'Work — Ibrahim'},
};

export default async function WorkPage() {
  const projects = (await getProjects()).filter((project) => project.classification !== 'playground');
  const flagship = projects.filter((project) => project.classification === 'flagship');
  const selected = projects.filter((project) => project.classification === 'selected');

  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref="/ar/work" />
      <section className="pageIntro">
        <div className="eyebrow">Work</div>
        <h1>Evidence over claims.</h1>
        <p className="lede">Selected work focused on making complex products and systems clearer.</p>
      </section>

      <ProjectGroup title="Flagship projects" projects={flagship} />
      <ProjectGroup title="Selected work" projects={selected} />

      {projects.length === 0 && (
        <section className="section">
          <div className="empty"><span className="emptySignal" aria-hidden="true" /><span>Real work is being prepared for publication.</span></div>
        </section>
      )}
    </main>
  );
}

function ProjectGroup({title, projects}: {title: string; projects: Awaited<ReturnType<typeof getProjects>>}) {
  if (projects.length === 0) return null;
  const id = title.replace(/\s+/g, '-').toLowerCase();

  return (
    <section className="section" aria-labelledby={id}>
      <div className="sectionHead">
        <h2 id={id}>{title}</h2>
      </div>
      <div className="projectGrid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.projectKey} locale="en" />
        ))}
      </div>
    </section>
  );
}
