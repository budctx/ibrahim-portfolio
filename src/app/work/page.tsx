import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '@/components/site-header';
import {getProjects} from '@/lib/sanity';

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
          <div className="empty">Real work is being prepared for publication.</div>
        </section>
      )}
    </main>
  );
}

function ProjectGroup({title, projects}: {title: string; projects: Awaited<ReturnType<typeof getProjects>>}) {
  if (projects.length === 0) return null;
  return (
    <section className="section" aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}>
      <div className="sectionHead">
        <h2 id={title.replace(/\s+/g, '-').toLowerCase()}>{title}</h2>
      </div>
      <div className="projectGrid">
        {projects.map((project) => (
          <Link className="projectCard" key={project.projectKey} href={`/projects/${project.slug}`}>
            <div>
              <div className="eyebrow">{project.typeEn ?? project.classification}</div>
              <h3>{project.titleEn}</h3>
            </div>
            <div className="meta">
              <span>{project.roleEn ?? ''}</span>
              <span>{project.year ?? ''}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
