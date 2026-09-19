import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';
import {ProjectCard} from '@/components/project-card';
import {getProjects} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Exploratory digital product, UI/UX, interaction design, responsive web, design system, and generative AI experiments.',
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
        <h1>Test the idea before calling it a solution.</h1>
        <p className="lede">Explorations in interaction design, UI/UX, responsive web, design systems, digital workflows, and generative AI — clearly separated from client or production work.</p>
        <a className="sectionLink" href="#experiments">See the experiments</a>
      </section>
      <section className="section" id="experiments">
        {projects.length === 0 ? (
          <div>
            <div className="empty"><span className="emptySignal" aria-hidden="true" /><span>No public experiments yet. New interaction, UI, and AI-assisted explorations will appear here when they are worth showing.</span></div>
            <a className="sectionLink" href="/#contact">Have an idea worth testing? Start a conversation.</a>
          </div>
        ) : (
          <div>
            <div className="projectGrid">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.projectKey} locale="en" />
              ))}
            </div>
            <a className="sectionLink" href="/#contact">Have an idea worth testing? Start a conversation.</a>
          </div>
        )}
      </section>
    </main>
  );
}
