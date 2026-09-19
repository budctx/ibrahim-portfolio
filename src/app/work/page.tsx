import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';
import {ProjectCard} from '@/components/project-card';
import {getProjects} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected digital product design, UI/UX, web design, UX strategy, responsive interface, workflow design, and implementation-aware experience design work.',
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
  const firstHref = flagship.length ? '#flagship-projects' : selected.length ? '#selected-work' : '/#contact';

  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref="/ar/work" />
      <section className="pageIntro">
        <div className="eyebrow">Work</div>
        <h1>See how the decisions hold up.</h1>
        <p className="lede">Case studies in digital product design, UI/UX, web design, workflow design, responsive interfaces, UX strategy, and implementation-aware delivery.</p>
        <a className="sectionLink" href={firstHref}>{projects.length ? 'Start with the work' : 'No public case studies yet — contact me'}</a>
      </section>

      <ProjectGroup
        id="flagship-projects"
        title="Flagship projects"
        projects={flagship}
        nextHref={selected.length ? '#selected-work' : '/#contact'}
        nextLabel={selected.length ? 'Continue to selected work' : 'Have a similar challenge? Let’s talk.'}
      />
      <ProjectGroup
        id="selected-work"
        title="Selected work"
        projects={selected}
        nextHref="/#contact"
        nextLabel="Have a similar challenge? Let’s talk."
      />

      {projects.length === 0 && (
        <section className="section">
          <div className="empty"><span className="emptySignal" aria-hidden="true" /><span>Real case studies are being prepared for publication. The structure is ready; the evidence will be added only when it is real and cleared.</span></div>
          <a className="sectionLink" href="/#contact">Discuss a digital product, UI/UX, or web design need</a>
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
          <ProjectCard project={project} key={project.projectKey} locale="en" />
        ))}
      </div>
      <a className="sectionLink" href={nextHref}>{nextLabel}</a>
    </section>
  );
}
