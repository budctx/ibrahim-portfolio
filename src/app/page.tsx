import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {SiteHeader} from '@/components/site-header';
import {StructureField} from '@/components/structure-field';

export default async function HomePage() {
  const projects = await getProjects();
  const work = projects.filter((project) => project.classification !== 'playground').slice(0, 4);

  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref="/ar" />

      <section className="hero heroExperience" aria-labelledby="home-title">
        <div className="heroCopy">
          <div className="eyebrow">Digital Product & Experience Designer</div>
          <h1 id="home-title">
            <span>Complexity,</span>
            <span className="heroResolveWord">resolved.</span>
          </h1>
          <p className="lede">I turn complex systems and workflows into clear digital experiences.</p>
          <div className="heroSystemLine" aria-hidden="true">
            <span>Signal</span>
            <span>Structure</span>
            <span>Work</span>
          </div>
          <Link className="heroAction" href="#selected-work-title">Selected work <span aria-hidden="true">↓</span></Link>
        </div>
        <div className="structureFieldFrame">
          <StructureField />
        </div>
      </section>

      <section className="section workSection" aria-labelledby="selected-work-title">
        <div className="sectionHead">
          <h2 id="selected-work-title">Selected work</h2>
          <Link className="sectionLink" href="/work">View all work</Link>
        </div>
        {work.length === 0 ? (
          <div className="empty">
            <span className="emptySignal" aria-hidden="true" />
            <span>Real work is being prepared for publication.</span>
          </div>
        ) : (
          <div className="projectGrid">
            {work.map((project) => (
              <ProjectCard project={project} key={project.projectKey} locale="en" />
            ))}
          </div>
        )}
      </section>

      <section className="section contactSection" id="contact" aria-labelledby="contact-title">
        <div className="eyebrow" id="contact-title">Contact</div>
        <div>
          <p className="contact">Let&apos;s make complex things clear.</p>
          <div className="contactActions">
            <Link href="mailto:ibrahim.alajmi407@gmail.com">Email</Link>
            <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© Ibrahim</span>
        <span>EN / AR · Light / Dark</span>
      </footer>
    </main>
  );
}
