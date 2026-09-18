import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '@/components/site-header';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Ibrahim Al-Ajmi, a digital product and experience designer with an MIS background across UX, web design, digital workflows, and DGA-aligned interfaces.',
  alternates: {
    canonical: '/about',
    languages: {en: '/about', ar: '/ar/about', 'x-default': '/about'},
  },
  openGraph: {url: '/about', title: 'About — Ibrahim'},
};

const capabilities = [
  'UI/UX Design',
  'Digital Product Design',
  'Responsive Design',
  'Wireframing & Prototyping',
  'User Research',
  'Information Architecture',
  'Usability Testing',
  'Visual Identity',
  'Generative AI Workflows',
  'Developer Handoff',
  'Saudi DGA Compliance',
];

export default function AboutPage() {
  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref="/ar/about" />

      <section className="pageIntro">
        <div className="eyebrow">About</div>
        <h1>Systems thinking, shaped into experience.</h1>
        <p className="lede">
          I&apos;m Ibrahim Al-Ajmi, a Digital Product & Experience Designer with a Management Information Systems background. I connect operational workflows, user needs, and implementation constraints to create clear digital experiences.
        </p>
      </section>

      <section className="section prose" aria-labelledby="approach-title">
        <h2 id="approach-title">Approach</h2>
        <div>
          <p>I work from structure to interface: understand the workflow, reduce friction, then translate the result into responsive, implementation-aware design.</p>
          <p>My current practice combines UX, web design, digital governance, and generative-AI-assisted workflows to move faster without losing clarity or handoff quality.</p>
        </div>
      </section>

      <section className="section aboutSplit" aria-labelledby="capabilities-title">
        <div>
          <div className="eyebrow">Capabilities</div>
          <h2 id="capabilities-title">What I work across.</h2>
        </div>
        <ul className="capabilityList" aria-label="Design capabilities">
          {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
      </section>

      <section className="section aboutSplit" aria-labelledby="current-title">
        <div>
          <div className="eyebrow">Current</div>
          <h2 id="current-title">Designing inside real systems.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>Web Designer · Imam Abdulrahman Bin Faisal University</strong>
              <span>Aug 2025 — Present</span>
            </div>
            <p>Integrating generative AI with professional design workflows to accelerate delivery of production-ready UI components, while aligning interfaces with Saudi Digital Government Authority design requirements and reducing UX friction.</p>
          </article>
        </div>
      </section>

      <section className="section aboutSplit" aria-labelledby="previously-title">
        <div>
          <div className="eyebrow">Previously</div>
          <h2 id="previously-title">Operational context matters.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>Patient Coordinator · Dr. Sulaiman Al Habib Hospital</strong>
              <span>Apr 2025 — Aug 2025</span>
            </div>
            <p>Restructured patient data-intake workflows to reduce onboarding wait times and strengthened validation practices around sensitive records inside enterprise systems.</p>
          </article>
        </div>
      </section>

      <section className="section aboutSplit" aria-labelledby="credentials-title">
        <div>
          <div className="eyebrow">Foundation</div>
          <h2 id="credentials-title">Systems + design.</h2>
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
        </div>
      </section>

      <section className="section aboutSplit" aria-labelledby="contact-about-title">
        <div>
          <div className="eyebrow">Contact</div>
          <h2 id="contact-about-title">Open to thoughtful digital work.</h2>
        </div>
        <div className="contactActions">
          <Link href="mailto:ibrahim.alajmi407@gmail.com">Email</Link>
          <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn</Link>
        </div>
      </section>
    </main>
  );
}
