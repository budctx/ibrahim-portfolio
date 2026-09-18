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
            <p className="cvOverline">Systems · People · Design · Real impact</p>
            <h1 id="cv-home-title">Turning complexity into <em>clear digital experiences.</em></h1>
            <p className="cvLede">
              I design digital products with a systems mindset — connecting people, processes and technology to create simple, compliant and human experiences.
            </p>
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#journey">Explore my journey <span aria-hidden="true">↘</span></Link>
              <Link className="cvButton" href="#capabilities">See my capabilities</Link>
            </div>
          </div>

          <CareerMap locale="en" />
        </section>

        <section className="cvSection" id="about" aria-labelledby="about-title">
          <div className="cvSectionLabel"><span>01</span><span>About</span></div>
          <div className="cvSectionBody">
            <h2 id="about-title">I design the interface, but I start with the system behind it.</h2>
            <p className="cvBigCopy">
              My path combines information systems, operational experience and digital product design. That mix shaped a practical way of working: understand the workflow, identify the friction, then design what makes it clearer.
            </p>
          </div>
        </section>

        <section className="cvSection" id="journey" aria-labelledby="journey-title">
          <div className="cvSectionLabel"><span>02</span><span>Journey</span></div>
          <div className="cvSectionBody">
            <h2 id="journey-title">A career shaped by how systems actually work.</h2>
            <div className="cvJourney">
              <article>
                <span className="cvStep">01</span>
                <h3>MIS foundation</h3>
                <p>Systems, data and process thinking became the technical and analytical base behind my design decisions.</p>
              </article>
              <article>
                <span className="cvStep">02</span>
                <h3>Operational reality</h3>
                <p>Healthcare operations added a real-world view of workflows, constraints, handoffs and the cost of unclear processes.</p>
              </article>
              <article>
                <span className="cvStep">03</span>
                <h3>Digital product design</h3>
                <p>UI/UX brought those foundations together — turning complex requirements into responsive, usable digital experiences.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cvSection" id="capabilities" aria-labelledby="capabilities-title">
          <div className="cvSectionLabel"><span>03</span><span>Capabilities</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title">Design, systems and delivery — connected.</h2>
            <div className="cvCapabilityRows">
              <div><span>Design</span><p>UI/UX · Interaction design · Responsive interfaces · Information architecture</p></div>
              <div><span>Systems</span><p>Workflow thinking · Requirements · MIS · Digital governance · DGA awareness</p></div>
              <div><span>Delivery</span><p>Developer handoff · Cross-functional collaboration · Iteration · Design-to-build alignment</p></div>
              <div><span>AI</span><p>Generative AI workflows · Prompting · Rapid exploration · Assisted refinement</p></div>
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
            <h2 id="contact-title">Let&apos;s make complex things clearer.</h2>
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
