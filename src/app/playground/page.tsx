import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';
import {ProjectCard} from '@/components/project-card';
import {getProjects} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Experiments and exploratory digital work.',
  alternates: {
    canonical: '/playground',
    languages: {en: '/playground', ar: '/ar/playground', 'x-default': '/playground'},
  },
  openGraph: {url: '/playground', title: 'Playground — Ibrahim'},
};

export default async function PlaygroundPage() {
  const projects = (await getProjects()).filter((project) => project.classification === 'playground');

  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref="/ar/playground" />
      <section className="pageIntro">
        <div className="eyebrow">Playground</div>
        <h1>Experiments with purpose.</h1>
        <p className="lede">Explorations that test interaction, systems, and visual ideas without pretending to be client work.</p>
      </section>
      <section className="section">
        {projects.length === 0 ? (
          <div className="empty"><span className="emptySignal" aria-hidden="true" /><span>No public experiments yet.</span></div>
        ) : (
          <div className="projectGrid">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.projectKey} locale="en" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
