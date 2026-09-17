import Link from 'next/link';
import {getProjects} from '@/lib/sanity';
import {SiteHeader} from '@/components/site-header';

export default async function HomePage() {
  const projects = await getProjects();
  const work = projects.filter((project) => project.classification !== 'playground').slice(0, 4);

  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref="/ar" />

      <section className="hero">
        <div>
          <div className="eyebrow">Digital Product & Experience Designer</div>
          <h1>Complexity, resolved.</h1>
          <p className="lede">I turn complex systems and workflows into clear digital experiences.</p>
        </div>
        <div className="structure" aria-hidden="true" />
      </section>

      <section className="section" aria-labelledby="selected-work-title">
        <div className="sectionHead">
          <h2 id="selected-work-title">Selected work</h2>
          <Link className="eyebrow" href="/work">View all work</Link>
        </div>
        {work.length === 0 ? (
          <div className="empty">Real work is being prepared for publication.</div>
        ) : (
          <div className="projectGrid">
            {work.map((project) => (
              <Link className="projectCard" key={project.projectKey} href={`/projects/${project.slug}`}>
                <div>
                  <div className="eyebrow">{project.classification}</div>
                  <h3>{project.titleEn}</h3>
                </div>
                <div className="meta">
                  <span>{project.roleEn ?? ''}</span>
                  <span>{project.year ?? ''}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="eyebrow" id="contact-title">Contact</div>
        <p className="contact">Let&apos;s make complex things clear.</p>
      </section>

      <footer className="footer">
        <span>© Ibrahim</span>
        <span>EN / AR · Light / Dark</span>
      </footer>
    </main>
  );
}
