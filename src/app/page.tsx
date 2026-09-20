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
    <main id="main" className="cvPage">
      <div className="cvFrame">
        <HomeHeader locale="en" counterpartHref="/ar" hasWork={hasWork} />
        <FloatingContactButton locale="en" />
        <ScrollMotionController />

        <section className="cvHero" aria-labelledby="cv-home-title">
          <div className="cvHeroCopy" data-scroll-motion="rise">
            <p className="cvOverline">Ibrahim Al-Ajmi · Digital Product Designer · Saudi Arabia</p>
            <h1 id="cv-home-title">
              <span className="cvHeroTitleLine">I design digital products</span>
              <em><span className="cvHeroTitleLine">that are easier to use.</span></em>
            </h1>
            <p className="cvLede">
              UI/UX, web design, and systems thinking for real workflows — from problem framing to a usable, implementation-ready interface.
            </p>
            <HeroKeywordLoop locale="en" />
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#about">
                Start with how I think
                <ArrowDownRightIcon className="cvDirectionalIcon" />
              </Link>
            </div>
          </div>

          <CareerMap locale="en" />
        </section>

        <section className="cvSection" id="about" data-scroll-motion="rise" aria-labelledby="about-title">
          <div className="cvSectionLabel"><span>01</span><span>About</span></div>
          <div className="cvSectionBody">
            <h2 id="about-title">Before the interface, I map the system.</h2>
            <p className="cvBigCopy">
              Workflows, users, data, handoffs, constraints, and implementation come first. UI/UX gets clearer when the system behind it is clear.
            </p>
            <div className="cvEvidenceRail" aria-label="Professional evidence">
              <div><div className="cvEvidenceLabel"><GraduationCapIcon /><span>Started with</span></div><strong>Bachelor&apos;s in MIS</strong></div>
              <div><div className="cvEvidenceLabel"><WorkflowIcon /><span>Saw firsthand</span></div><strong>Healthcare workflows</strong></div>
              <div><div className="cvEvidenceLabel"><BriefcaseIcon /><span>Designing now</span></div><strong>Web design · IAU</strong></div>
              <div><div className="cvEvidenceLabel"><BadgeCheckIcon /><span>Working within</span></div><strong>Saudi DGA compliance</strong></div>
              <div><div className="cvEvidenceLabel"><GoogleBrandIcon className="cvGoogleMark" /><span>Expanding with</span></div><strong>Google UX · Google AI</strong></div>
            </div>
            <Link className="cvSectionNext" href="#journey">
              <strong>See what shaped this approach</strong>
              <ArrowDownRightIcon className="cvDirectionalIcon" />
            </Link>
          </div>
        </section>

        <section className="cvSection" id="journey" data-scroll-motion="slide" aria-labelledby="journey-title">
          <div className="cvSectionLabel"><span>02</span><span>Journey</span></div>
          <div className="cvSectionBody">
            <h2 id="journey-title">Systems → operations → UI/UX.</h2>
            <p className="cvSectionIntro">Each step changed what I notice in a digital product — and what I solve first.</p>
            <div className="cvJourney cvJourneyRefined">
              <article>
                <span className="cvStep">Understand</span>
                <span className="cvJourneyMeta cvBadge">2019–2024 · MIS</span>
                <h3>Map the logic</h3>
                <p>Management Information Systems trained me to read data, dependencies, workflows, and information architecture before the screen.</p>
              </article>
              <article>
                <span className="cvStep">Observe</span>
                <span className="cvJourneyMeta cvBadge">2025 · Healthcare operations</span>
                <h3>Find the friction</h3>
                <p>Healthcare operations made wait time, handoffs, validation, and enterprise workflow problems concrete instead of theoretical.</p>
              </article>
              <article>
                <span className="cvStep">Shape</span>
                <span className="cvJourneyMeta cvBadge">2025–Now · Web design</span>
                <h3>Shape the flow</h3>
                <p>UI/UX, responsive web design, wireframes, prototypes, and usability became the tools for turning friction into a clearer user journey.</p>
              </article>
            </div>
            <Link className="cvSectionNext" href="#capabilities">
              <strong>See how that becomes design decisions</strong>
              <ArrowDownRightIcon className="cvDirectionalIcon" />
            </Link>
          </div>
        </section>

        <section className="cvTurningPoint" aria-label="Turning point" data-scroll-motion="scale">
          <span>The shift</span>
          <p>Design the workflow and the interface together.</p>
          <Link className="cvTurningPointCta" href="#capabilities">See how I work now <ArrowDownRightIcon /></Link>
        </section>

        <section className="cvSection" id="capabilities" data-scroll-motion="drift" aria-labelledby="capabilities-title">
          <div className="cvSectionLabel"><span>03</span><span>How I work</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title">I turn complexity into decisions a team can build.</h2>
            <p className="cvSectionIntro">UX strategy, interface design, governance, AI-assisted workflows, and developer handoff stay connected from the start.</p>
            <div className="cvCapabilityPairs">
              <div>
                <span className="cvCapabilitySource cvBadge cvBadgeAccent">UX strategy · Systems thinking</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>Structure before screens</strong>
                <p>Map user flows, dependencies, information architecture, and product logic before deciding what the interface should do.</p>
              </div>
              <div>
                <span className="cvCapabilitySource cvBadge cvBadgeAccent">UI/UX · Responsive design</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>Usable across devices</strong>
                <p>Turn flows into responsive interfaces, interaction states, wireframes, prototypes, and accessible patterns.</p>
              </div>
              <div>
                <span className="cvCapabilitySource cvBadge cvBadgeAccent">Governance · DGA</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>Clear within constraints</strong>
                <p>Design with digital standards, accessibility, consistency, and Saudi DGA requirements as part of the product — not a final check.</p>
              </div>
              <div>
                <span className="cvCapabilitySource cvBadge cvBadgeAccent">Generative AI · Developer handoff</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>Closer to implementation</strong>
                <p>Use AI-assisted exploration, clear states, specifications, and handoff to reduce the gap between design and build.</p>
              </div>
            </div>
            <Link className="cvSectionNext" href="#credentials">
              <strong>Check the foundation behind the practice</strong>
              <ArrowDownRightIcon className="cvDirectionalIcon" />
            </Link>
          </div>
        </section>

        <section className="cvSection" id="credentials" data-scroll-motion="rise" aria-labelledby="credentials-title">
          <div className="cvSectionLabel"><span>04</span><span>Credentials</span></div>
          <div className="cvSectionBody">
            <h2 id="credentials-title">Systems, UX, and AI training behind the work.</h2>
            <div className="cvCredentials">
              <div>
                <div className="cvCredentialBrand cvCredentialBrandNeutral">
                  <GraduationCapIcon />
                  <span className="cvBadge cvBadgeIssuer">Academic</span>
                </div>
                <strong>Bachelor of Management Information Systems</strong>
                <span>Imam Abdulrahman Bin Faisal University · 2019–2024</span>
              </div>
              <div>
                <div className="cvCredentialBrand cvGoogleBrand">
                  <GoogleBrandIcon />
                  <span className="cvBadge cvBadgeIssuer">Google</span>
                </div>
                <strong>UX Design Professional Certificate</strong>
                <span>User research, interaction design, wireframing, prototyping, usability testing, and user-centered product design.</span>
              </div>
              <div>
                <div className="cvCredentialBrand cvGoogleBrand">
                  <GoogleBrandIcon />
                  <span className="cvBadge cvBadgeIssuer">Google</span>
                </div>
                <strong>AI Professional Certificate</strong>
                <span>Applied foundation for generative AI, AI-assisted workflows, productivity, and professional delivery.</span>
              </div>
            </div>
            <Link className="cvSectionNext" href={hasWork ? '#work' : '#contact'}>
              <strong>{hasWork ? 'See the work behind the claims' : 'Turn the context into a conversation'}</strong>
              <ArrowDownRightIcon className="cvDirectionalIcon" />
            </Link>
          </div>
        </section>

        {hasWork && (
          <section className="cvSection" id="work" data-scroll-motion="scale" aria-labelledby="work-title">
            <div className="cvSectionLabel"><span>05</span><span>Work</span></div>
            <div className="cvSectionBody">
              <div className="cvSectionHead">
                <h2 id="work-title">See the decisions in real work.</h2>
                <Link href="/work">View all work</Link>
              </div>
              <div className="projectGrid">
                {work.map((project) => <ProjectCard project={project} key={project.projectKey} locale="en" />)}
              </div>
              <Link className="cvSectionNext" href="#contact">
                <strong>Have a similar challenge? Let’s talk.</strong>
                <ArrowDownRightIcon className="cvDirectionalIcon" />
              </Link>
            </div>
          </section>
        )}

        <section className="cvContact" id="contact" data-scroll-motion="rise" aria-labelledby="contact-title">
          <div>
            <span className="cvContactIndex">{hasWork ? '06' : '05'}</span>
            <p className="cvOverline">Contact</p>
          </div>
          <div>
            <div className="cvContactContext">
              <span>Available</span>
              <p>Digital product design, UI/UX, web design, UX strategy, and experience design opportunities in Saudi Arabia and remote collaboration.</p>
            </div>
            <h2 id="contact-title">Have a product, workflow, or interface that needs clarity?</h2>
            <p className="cvContactNote">Send the context. I can help frame the problem, improve the UX, and move the design closer to implementation.</p>
            <div className="cvContactGrid" aria-label="Contact details">
              <ContactCard
                icon={<MailIcon />}
                label="Email"
                value="ibrahim.alajmi407@gmail.com"
                href="mailto:ibrahim.alajmi407@gmail.com"
              />
              <ContactCard
                icon={<LinkedInBrandIcon />}
                label="LinkedIn"
                value="ibrahim-al-ajmi-97ba02335"
                href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335"
                external
                className="cvLinkedInLink"
              />
              <ContactCard
                icon={<MessageCircleIcon />}
                label="WhatsApp"
                value="+966 59 786 6665"
                href="https://wa.me/966597866665"
                external
              />
              <ContactCard
                icon={<PhoneIcon />}
                label="Phone"
                value="+966 59 786 6665"
                href="tel:+966597866665"
              />
              <ContactCard
                icon={<MapPinIcon />}
                label="Location"
                value="Saudi Arabia"
              />
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© Ibrahim</span>
          <span>Digital Product Design · UI/UX · Web Design · Saudi Arabia</span>
        </footer>
      </div>
    </main>
  );
}
