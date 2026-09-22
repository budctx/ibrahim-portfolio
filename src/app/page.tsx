import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';
import {HeroKeywordLoop} from '@/components/hero-keyword-loop';
import {FloatingContactButton} from '@/components/floating-contact-button';
import {ScrollMotionController} from '@/components/scroll-motion-controller';
import {ContactCard} from '@/components/contact-card';
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  BriefcaseIcon,
  GoogleBrandIcon,
  GraduationCapIcon,
  LinkedInBrandIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
  WorkflowIcon,
} from '@/components/icons';

export default async function HomePage() {
  const projects = await getProjects();
  const work = projects.filter((project) => project.classification !== 'playground').slice(0, 3);
  const hasWork = work.length > 0;

  return (
    <main id="main" className="cvPage cvV3">
      <div className="cvFrame">
        <HomeHeader locale="en" counterpartHref="/ar" hasWork={hasWork} />
        <FloatingContactButton locale="en" />
        <ScrollMotionController />

        <section className="cvHero cvHeroV3" aria-labelledby="cv-home-title">
          <div className="cvHeroCopy" data-scroll-motion="rise">
            <p className="cvOverline">Ibrahim Al-Ajmi · Digital Product &amp; Experience Designer · Saudi Arabia</p>
            <h1 id="cv-home-title">
              <span className="cvHeroTitleLine">Complex systems.</span>
              <em><span className="cvHeroTitleLine">Clear digital experiences.</span></em>
            </h1>
            <p className="cvLede">
              I connect systems thinking, UX, web design, and AI-assisted delivery to turn real workflow complexity into interfaces people can understand and teams can build.
            </p>
            <HeroKeywordLoop locale="en" />
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#resolve">
                See the system resolve
                <ArrowDownRightIcon className="cvDirectionalIcon" />
              </Link>
            </div>
          </div>

          <CareerMap locale="en" />
        </section>

        <section className="cvSection cvResolve" id="resolve" data-scroll-motion="rise" aria-labelledby="resolve-title">
          <div className="cvSectionLabel"><span>01</span><span>Resolve</span></div>
          <div className="cvSectionBody">
            <h2 id="resolve-title">I start with the system, not the screen.</h2>
            <p className="cvBigCopy">
              The interface is an outcome. I first identify what is happening underneath it: users, rules, information, handoffs, constraints, and the points where a workflow starts to fight back.
            </p>

            <div className="cvResolveFlow" aria-label="How I turn complexity into a digital experience">
              <article>
                <span>01 · Understand</span>
                <strong>Map the system</strong>
                <p>Users, goals, data, dependencies, information architecture, and operational constraints.</p>
              </article>
              <ArrowRightIcon className="cvResolveArrow" aria-hidden="true" />
              <article>
                <span>02 · Diagnose</span>
                <strong>Find the friction</strong>
                <p>Confusing handoffs, unnecessary steps, weak hierarchy, missing states, and usability risk.</p>
              </article>
              <ArrowRightIcon className="cvResolveArrow" aria-hidden="true" />
              <article>
                <span>03 · Structure</span>
                <strong>Make decisions visible</strong>
                <p>User flows, content hierarchy, wireframes, interaction logic, and responsive behavior.</p>
              </article>
              <ArrowRightIcon className="cvResolveArrow" aria-hidden="true" />
              <article>
                <span>04 · Deliver</span>
                <strong>Close the gap to build</strong>
                <p>Accessible UI, prototypes, clear states, design governance, AI-assisted exploration, and developer handoff.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cvTurningPoint cvTurningPointV3" aria-label="Design principle" data-scroll-motion="scale">
          <span>DESIGN PRINCIPLE</span>
          <p>Clarity is not visual cleanup. It is a system decision.</p>
          <Link className="cvTurningPointCta" href="#evidence">Why I work this way <ArrowDownRightIcon /></Link>
        </section>

        <section className="cvSection cvEvidenceSection" id="evidence" data-scroll-motion="drift" aria-labelledby="evidence-title">
          <div className="cvSectionLabel"><span>02</span><span>Evidence</span></div>
          <div className="cvSectionBody">
            <h2 id="evidence-title">The method comes from the path behind it.</h2>
            <p className="cvSectionIntro">
              My background is not a separate resume section. It explains why I notice systems, operations, usability, governance, and implementation together.
            </p>

            <div className="cvEvidenceRail cvEvidenceRailV3" aria-label="Professional evidence">
              <div><div className="cvEvidenceLabel"><GraduationCapIcon /><span>Foundation</span></div><strong>Management Information Systems</strong></div>
              <div><div className="cvEvidenceLabel"><WorkflowIcon /><span>Operations</span></div><strong>Healthcare workflows</strong></div>
              <div><div className="cvEvidenceLabel"><BriefcaseIcon /><span>Current practice</span></div><strong>Web design · IAU</strong></div>
              <div><div className="cvEvidenceLabel"><BadgeCheckIcon /><span>Governance</span></div><strong>DGA-oriented digital work</strong></div>
              <div><div className="cvEvidenceLabel"><GoogleBrandIcon className="cvGoogleMark" /><span>Continued learning</span></div><strong>Google UX · Google AI</strong></div>
            </div>

            <div className="cvJourney cvJourneyV3">
              <article>
                <span className="cvStep">2019–2024</span>
                <h3>Systems became the lens.</h3>
                <p>A bachelor&apos;s in Management Information Systems built the foundation for reading processes, information, dependencies, and business logic before interface details.</p>
              </article>
              <article>
                <span className="cvStep">2025</span>
                <h3>Operations made friction real.</h3>
                <p>Patient coordination in a healthcare environment made waiting, validation, handoffs, and enterprise-system friction tangible rather than theoretical.</p>
              </article>
              <article>
                <span className="cvStep">2025–Now</span>
                <h3>Design became the resolution layer.</h3>
                <p>Web and UX work now connects that systems perspective to responsive interfaces, accessibility, governance, prototypes, AI workflows, and implementation handoff.</p>
              </article>
            </div>

            <div className="cvCredentialLine" aria-label="Credentials">
              <span>Credentials</span>
              <strong>Bachelor of MIS · Google UX Design Professional Certificate · Google AI Professional Certificate</strong>
            </div>
          </div>
        </section>

        {hasWork && (
          <section className="cvSection" id="work" data-scroll-motion="scale" aria-labelledby="work-title">
            <div className="cvSectionLabel"><span>03</span><span>Work</span></div>
            <div className="cvSectionBody">
              <div className="cvSectionHead">
                <h2 id="work-title">The decisions, tested in real work.</h2>
                <Link href="/work">View all work</Link>
              </div>
              <div className="projectGrid">
                {work.map((project) => <ProjectCard project={project} key={project.projectKey} locale="en" />)}
              </div>
            </div>
          </section>
        )}

        <section className="cvContact cvContactV3" id="contact" data-scroll-motion="rise" aria-labelledby="contact-title">
          <div>
            <span className="cvContactIndex">{hasWork ? '04' : '03'}</span>
            <p className="cvOverline">Contact</p>
          </div>
          <div>
            <div className="cvContactContext">
              <span>Open to collaboration</span>
              <p>Digital product, UI/UX, web experience, UX strategy, and workflow-focused opportunities in Saudi Arabia and remote teams.</p>
            </div>
            <h2 id="contact-title">Have a complex workflow that should feel simple?</h2>
            <p className="cvContactNote">Send the context. I can help understand the system, frame the experience, and move the solution closer to implementation.</p>
            <div className="cvContactGrid" aria-label="Contact details">
              <ContactCard icon={<MailIcon />} label="Email" value="ibrahim.alajmi407@gmail.com" href="mailto:ibrahim.alajmi407@gmail.com" />
              <ContactCard icon={<LinkedInBrandIcon />} label="LinkedIn" value="ibrahim-al-ajmi-97ba02335" href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" external className="cvLinkedInLink" />
              <ContactCard icon={<MessageCircleIcon />} label="WhatsApp" value="+966 59 786 6665" href="https://wa.me/966597866665" external />
              <ContactCard icon={<PhoneIcon />} label="Phone" value="+966 59 786 6665" href="tel:+966597866665" />
              <ContactCard icon={<MapPinIcon />} label="Location" value="Saudi Arabia" />
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© Ibrahim</span>
          <span>Systems → Experience · Digital Product Design · UI/UX · Web</span>
        </footer>
      </div>
    </main>
  );
}
