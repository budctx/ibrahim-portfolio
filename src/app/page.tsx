import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  MailIcon,
  SparklesIcon,
} from '@/components/icons';

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
            <p className="cvOverline">Ibrahim Al-Ajmi · Digital Product & Experience Designer</p>
            <h1 id="cv-home-title">I design digital products <em>from the system outward.</em></h1>
            <p className="cvLede">
              My background in information systems and real operations shapes how I design: understand the workflow, work within constraints, then turn complexity into an experience people can use and teams can build.
            </p>
            <div className="cvIdentitySignals" aria-label="Professional focus">
              <span>Systems</span><span>Experience</span><span>Delivery</span>
            </div>
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#journey">
                See how I got here
                <ArrowDownRightIcon className="cvDirectionalIcon" />
              </Link>
              <Link className="cvButton" href="#capabilities">How I work</Link>
            </div>
            <span className="cvSystemPhrase" aria-hidden="true">System → Experience</span>
          </div>

          <CareerMap locale="en" />
        </section>

        <section className="cvSection" id="about" aria-labelledby="about-title">
          <div className="cvSectionLabel"><span>01</span><span>About</span></div>
          <div className="cvSectionBody">
            <h2 id="about-title">The screen is the last layer, not the first.</h2>
            <p className="cvBigCopy">
              I look beyond the interface to the workflow, the people inside it, the constraints around it, and what must happen after the design leaves the screen.
            </p>
            <div className="cvEvidenceRail" aria-label="Professional evidence">
              <div><span>Foundation</span><strong>Bachelor&apos;s in MIS</strong></div>
              <div><span>Operations</span><strong>Healthcare workflows</strong></div>
              <div><span>Current practice</span><strong>Web design · IAU</strong></div>
              <div><span>Standards</span><strong>Saudi DGA compliance</strong></div>
              <div><span>Certificates</span><strong>Google UX · Google AI</strong></div>
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
                <span className="cvJourneyMeta">2019–2024 · MIS</span>
                <h3>Read the system</h3>
                <p>MIS taught me to look for data, dependencies and process underneath the visible interface.</p>
              </article>
              <article>
                <span className="cvStep">Observe</span>
                <span className="cvJourneyMeta">2025 · Healthcare operations</span>
                <h3>See the friction</h3>
                <p>Operational work made handoffs, constraints and unclear workflows tangible rather than theoretical.</p>
              </article>
              <article>
                <span className="cvStep">Shape</span>
                <span className="cvJourneyMeta">2025–Now · Web design</span>
                <h3>Design the change</h3>
                <p>UI/UX became the way I turn what I understand about the system into a clearer experience people can use.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cvSection" id="capabilities" aria-labelledby="capabilities-title">
          <div className="cvSectionLabel"><span>03</span><span>How I work</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title">What I know matters most when the pieces connect.</h2>
            <div className="cvCapabilityPairs">
              <div>
                <span className="cvCapabilitySource">Systems thinking</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>Better UX decisions</strong>
                <p>Understand workflows and dependencies before deciding what the interface should do.</p>
              </div>
              <div>
                <span className="cvCapabilitySource">Governance</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>Usable constraints</strong>
                <p>Translate standards and requirements into an experience that still feels clear and human.</p>
              </div>
              <div>
                <span className="cvCapabilitySource">AI workflows</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>Faster exploration</strong>
                <p>Use generative AI to expand and refine options without outsourcing design judgment.</p>
              </div>
              <div>
                <span className="cvCapabilitySource">Developer handoff</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
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
              <div>
                <GraduationCapIcon className="cvCredentialIcon" />
                <strong>Bachelor of Management Information Systems</strong>
                <span>Imam Abdulrahman Bin Faisal University · 2019–2024</span>
              </div>
              <div>
                <BadgeCheckIcon className="cvCredentialIcon" />
                <strong>Google UX Design Professional Certificate</strong>
                <span>Formal training in user-centered product and experience design.</span>
              </div>
              <div>
                <SparklesIcon className="cvCredentialIcon" />
                <strong>Google AI Professional Certificate</strong>
                <span>Applied foundation for AI-assisted professional workflows.</span>
              </div>
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
            <h2 id="contact-title">Bring me the workflow, the constraints and the messy middle.</h2>
            <p className="cvContactNote">I&apos;ll look for the system behind the screen — then make the experience clearer to use and easier to build.</p>
            <div className="cvContactLinks">
              <Link href="mailto:ibrahim.alajmi407@gmail.com">
                <MailIcon />
                Email
              </Link>
              <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">
                LinkedIn
                <ExternalLinkIcon />
              </Link>
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© Ibrahim</span>
          <span>Systems → Experience · EN / AR</span>
        </footer>
      </div>
    </main>
  );
}
