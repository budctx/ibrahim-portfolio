import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '@/components/site-header';
import {getProjects} from '@/lib/sanity';

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
          <div className="empty">No public experiments yet.</div>
        ) : (
          <div className="projectGrid">
            {projects.map((project) => (
              <Link className="projectCard" key={project.projectKey} href={`/projects/${project.slug}`}>
                <div>
                  <div className="eyebrow">{project.typeEn ?? 'Experiment'}</div>
                  <h3>{project.titleEn}</h3>
                </div>
                <div className="meta"><span>{project.roleEn ?? ''}</span><span>{project.year ?? ''}</span></div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
