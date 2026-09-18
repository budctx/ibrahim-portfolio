import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  BriefcaseIcon,
  GoogleBrandIcon,
  GraduationCapIcon,
  LinkedInBrandIcon,
  MailIcon,
  SparklesIcon,
  WorkflowIcon,
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
              Before I decide what an interface should look like, I want to understand what the system needs to make clearer.
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
              I care about what happens before the screen: the workflow, the constraints, the handoffs and the people moving through them.
            </p>
            <div className="cvEvidenceRail" aria-label="Professional evidence">
              <div><div className="cvEvidenceLabel"><GraduationCapIcon /><span>Started with</span></div><strong>Bachelor&apos;s in MIS</strong></div>
              <div><div className="cvEvidenceLabel"><WorkflowIcon /><span>Saw firsthand</span></div><strong>Healthcare workflows</strong></div>
              <div><div className="cvEvidenceLabel"><BriefcaseIcon /><span>Designing now</span></div><strong>Web design · IAU</strong></div>
              <div><div className="cvEvidenceLabel"><BadgeCheckIcon /><span>Working within</span></div><strong>Saudi DGA compliance</strong></div>
              <div><div className="cvEvidenceLabel"><SparklesIcon /><span>Expanding with</span></div><strong>Google UX · Google AI</strong></div>
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

        <section className="cvTurningPoint" aria-label="Turning point">
          <span>That changed what good design meant to me.</span>
          <p>Not just a cleaner screen — a clearer system for the person using it.</p>
        </section>

        <section className="cvSection" id="capabilities" aria-labelledby="capabilities-title">
          <div className="cvSectionLabel"><span>03</span><span>How I work</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title">So today, this is how I work.</h2>
            <p className="cvSectionIntro">Each layer became a decision-making habit I carry into the next problem.</p>
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
                <div className="cvCredentialBrand cvCredentialBrandNeutral">
                  <GraduationCapIcon />
                  <span>Academic</span>
                </div>
                <strong>Bachelor of Management Information Systems</strong>
                <span>Imam Abdulrahman Bin Faisal University · 2019–2024</span>
              </div>
              <div>
                <div className="cvCredentialBrand cvGoogleBrand">
                  <GoogleBrandIcon />
                  <span>Google</span>
                </div>
                <strong>UX Design Professional Certificate</strong>
                <span>Formal training in user-centered product and experience design.</span>
              </div>
              <div>
                <div className="cvCredentialBrand cvGoogleBrand">
                  <GoogleBrandIcon />
                  <span>Google</span>
                </div>
                <strong>AI Professional Certificate</strong>
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

        <section className="cvNow" aria-label="Current focus">
          <span>Now</span>
          <p>I&apos;m continuing to work where systems, experience and delivery meet — especially when digital products have real operational constraints.</p>
        </section>

        <section className="cvContact" id="contact" aria-labelledby="contact-title">
          <div>
            <span className="cvContactIndex">{hasWork ? '06' : '05'}</span>
            <p className="cvOverline">Contact</p>
          </div>
          <div>
            <h2 id="contact-title">Have a system that needs to become a better experience?</h2>
            <p className="cvContactNote">Let&apos;s make it clearer to understand, easier to use and more practical to build.</p>
            <div className="cvContactLinks">
              <Link href="mailto:ibrahim.alajmi407@gmail.com">
                <MailIcon />
                Email
              </Link>
              <Link className="cvLinkedInLink" href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">
                <LinkedInBrandIcon />
                LinkedIn
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
