import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';

export default async function HomePage() {
  const projects = await getProjects();
  const work = projects.filter((project) => project.classification !== 'playground').slice(0, 3);
  const hasWork = work.length > 0;

  return (
    <main id="main" className="cvPage">
      <div className="cvFrame">
        <HomeHeader locale="en" counterpartHref="/ar" hasWork={hasWork} />

        <section className="cvHero" aria-labelledby="cv-home-title">
          <div className="cvHeroCopy">
            <p className="cvOverline">MIS · Operations · Experience design · Governance · AI-assisted delivery</p>
            <h1 id="cv-home-title">I design digital products <em>from the system outward.</em></h1>
            <p className="cvLede">
              My background in information systems and real operations shapes how I design: understand the workflow, work within constraints, then turn complexity into an experience people can actually use and teams can actually build.
            </p>
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#journey">See how I got here <span aria-hidden="true">↘</span></Link>
              <Link className="cvButton" href="#capabilities">How I work</Link>
            </div>
          </div>

          <CareerMap locale="en" />
        </section>

        <section className="cvSection" id="about" aria-labelledby="about-title">
          <div className="cvSectionLabel"><span>01</span><span>About</span></div>
          <div className="cvSectionBody">
            <h2 id="about-title">The screen is the last layer, not the first.</h2>
            <p className="cvBigCopy">
              I came into design through systems and operations. That means I naturally look beyond the interface: at the workflow, the people inside it, the constraints around it, and what has to happen after the design leaves the screen.
            </p>
            <div className="cvEvidenceRail" aria-label="Professional evidence">
              <div><span>Foundation</span><strong>MIS</strong></div>
              <div><span>Operational context</span><strong>Healthcare</strong></div>
              <div><span>Design practice</span><strong>UI/UX + digital products</strong></div>
              <div><span>Constraints</span><strong>Governance + DGA</strong></div>
              <div><span>Delivery</span><strong>Developer handoff + GenAI</strong></div>
            </div>
          </div>
        </section>

        <section className="cvSection" id="journey" aria-labelledby="journey-title">
          <div className="cvSectionLabel"><span>02</span><span>Journey</span></div>
          <div className="cvSectionBody">
            <h2 id="journey-title">Not a timeline. A chain of things I learned to notice.</h2>
            <div className="cvJourney cvJourneyRefined">
              <article>
                <span className="cvStep">Understand</span>
                <h3>Read the system</h3>
                <p>MIS taught me to look for the data, dependencies and process underneath the visible interface.</p>
              </article>
              <article>
                <span className="cvStep">Observe</span>
                <h3>See the friction</h3>
                <p>Operational work made handoffs, constraints and unclear workflows tangible rather than theoretical.</p>
              </article>
              <article>
                <span className="cvStep">Shape</span>
                <h3>Design the change</h3>
                <p>UI/UX became the way I turn what I understand about the system into a clearer experience people can use.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cvSection" id="capabilities" aria-labelledby="capabilities-title">
          <div className="cvSectionLabel"><span>03</span><span>Capabilities</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title">What I know matters most when the pieces connect.</h2>
            <div className="cvCapabilityPairs">
              <div>
                <span>Systems thinking</span>
                <strong>Better UX decisions</strong>
                <p>Understand workflows and dependencies before deciding what the interface should do.</p>
              </div>
              <div>
                <span>Governance</span>
                <strong>Usable constraints</strong>
                <p>Translate standards and requirements into an experience that still feels clear and human.</p>
              </div>
              <div>
                <span>AI workflows</span>
                <strong>Faster exploration</strong>
                <p>Use generative AI to expand and refine options without outsourcing design judgment.</p>
              </div>
              <div>
                <span>Developer handoff</span>
                <strong>Executable design</strong>
                <p>Keep the design connected to implementation through clear states, behavior and collaboration.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cvSection" id="credentials" aria-labelledby="credentials-title">
          <div className="cvSectionLabel"><span>04</span><span>Credentials</span></div>
          <div className="cvSectionBody">
            <h2 id="credentials-title">The formal layer behind the practice.</h2>
            <div className="cvCredentials">
              <div><strong>Management Information Systems</strong><span>Academic foundation in systems, data and business processes.</span></div>
              <div><strong>UI/UX & digital product practice</strong><span>Designing usable interfaces and responsive digital experiences.</span></div>
              <div><strong>Government digital standards</strong><span>Working with governance and DGA-oriented requirements.</span></div>
              <div><strong>AI-assisted workflows</strong><span>Using generative AI to accelerate exploration and production responsibly.</span></div>
            </div>
          </div>
        </section>

        {hasWork && (
          <section className="cvSection" id="work" aria-labelledby="work-title">
            <div className="cvSectionLabel"><span>05</span><span>Work</span></div>
            <div className="cvSectionBody">
              <div className="cvSectionHead">
                <h2 id="work-title">Selected work</h2>
                <Link href="/work">View all work</Link>
              </div>
              <div className="projectGrid">
                {work.map((project) => <ProjectCard project={project} key={project.projectKey} locale="en" />)}
              </div>
            </div>
          </section>
        )}

        <section className="cvContact" id="contact" aria-labelledby="contact-title">
          <div>
            <span className="cvContactIndex">{hasWork ? '06' : '05'}</span>
            <p className="cvOverline">Contact</p>
          </div>
          <div>
            <h2 id="contact-title">If the system is messy, that is usually where I want to start.</h2>
            <div className="cvContactLinks">
              <Link href="mailto:ibrahim.alajmi407@gmail.com">Email ↗</Link>
              <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn ↗</Link>
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© Ibrahim</span>
          <span>EN / AR · Light / Dark</span>
        </footer>
      </div>
    </main>
  );
}
