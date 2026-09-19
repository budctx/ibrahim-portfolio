import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '@/components/site-header';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Ibrahim Al-Ajmi, a digital product designer in Saudi Arabia working across UI/UX, UX strategy, web design, information architecture, digital workflows, DGA requirements, generative AI, and developer handoff.',
  alternates: {
    canonical: '/about',
    languages: {en: '/about', ar: '/ar/about', 'x-default': '/about'},
  },
  openGraph: {url: '/about', title: 'About — Ibrahim'},
};

const capabilities = [
  'Digital Product Design',
  'UI/UX Design',
  'UX Strategy',
  'Responsive Web Design',
  'Information Architecture',
  'Wireframing & Prototyping',
  'Interaction Design',
  'User Research',
  'Usability Testing',
  'Design Systems',
  'Accessibility & WCAG',
  'Digital Governance',
  'Saudi DGA Requirements',
  'Generative AI Workflows',
  'Developer Handoff',
];

export default function AboutPage() {
  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref="/ar/about" />

      <section className="pageIntro">
        <div className="eyebrow">About</div>
        <h1>I design from systems to screens.</h1>
        <p className="lede">
          I&apos;m Ibrahim Al-Ajmi, a digital product designer in Saudi Arabia. My work connects UI/UX, web design, user flows, information architecture, operational context, and implementation.
        </p>
        <Link className="sectionLink" href="#approach">Start with the approach</Link>
      </section>

      <section className="section prose" id="approach" aria-labelledby="approach-title">
        <h2 id="approach-title">Map the workflow. Then design the interface.</h2>
        <div>
          <p>I start with users, tasks, data, dependencies, constraints, and handoffs. Then I shape the user journey, information architecture, responsive UI, and interaction states.</p>
          <p>That keeps UX strategy, accessibility, digital governance, generative AI workflows, and developer handoff connected to the same product problem.</p>
          <Link className="sectionLink" href="#capabilities">See the capabilities</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="capabilities" aria-labelledby="capabilities-title">
        <div>
          <div className="eyebrow">Capabilities</div>
          <h2 id="capabilities-title">Product, UX, web, and delivery.</h2>
        </div>
        <div>
          <ul className="capabilityList" aria-label="Design capabilities">
            {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
          <Link className="sectionLink" href="#current">See where I apply them now</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="current" aria-labelledby="current-title">
        <div>
          <div className="eyebrow">Current</div>
          <h2 id="current-title">Applying UX inside real systems.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>Web Designer · Imam Abdulrahman Bin Faisal University</strong>
              <span>Aug 2025 — Present</span>
            </div>
            <p>Combining web design, UI/UX, generative AI workflows, implementation-ready interface work, and Saudi Digital Government Authority requirements inside a real institutional environment.</p>
          </article>
          <Link className="sectionLink" href="#previously">See the operational context behind it</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="previously" aria-labelledby="previously-title">
        <div>
          <div className="eyebrow">Previously</div>
          <h2 id="previously-title">Operations changed what I notice in UX.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>Patient Coordinator · Dr. Sulaiman Al Habib Hospital</strong>
              <span>Apr 2025 — Aug 2025</span>
            </div>
            <p>Worked directly with patient data-intake workflows, wait time, handoffs, validation, and sensitive records inside enterprise systems — practical context that now informs how I read UX friction.</p>
          </article>
          <Link className="sectionLink" href="#foundation">See the formal foundation</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="foundation" aria-labelledby="credentials-title">
        <div>
          <div className="eyebrow">Foundation</div>
          <h2 id="credentials-title">Systems + UX + AI.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>Bachelor of Management Information Systems</strong>
              <span>2019 — 2024</span>
            </div>
            <p>Imam Abdulrahman Bin Faisal University · Khobar, Saudi Arabia</p>
          </article>
          <article className="credentialItem">
            <div className="credentialTop"><strong>Google AI Professional Certificate</strong></div>
          </article>
          <article className="credentialItem">
            <div className="credentialTop"><strong>Google UX Design Professional Certificate</strong></div>
          </article>
          <Link className="sectionLink" href="#about-contact">Ready to connect the pieces?</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="about-contact" aria-labelledby="contact-about-title">
        <div>
          <div className="eyebrow">Contact</div>
          <h2 id="contact-about-title">Have a product or workflow that needs clarity?</h2>
        </div>
        <div className="contactActions">
          <Link href="mailto:ibrahim.alajmi407@gmail.com">Email</Link>
          <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn</Link>
        </div>
      </section>
    </main>
  );
}
