import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Ibrahim, a digital product and experience designer focused on clarity in complex systems.',
  alternates: {
    canonical: '/about',
    languages: {en: '/about', ar: '/ar/about', 'x-default': '/about'},
  },
  openGraph: {url: '/about', title: 'About — Ibrahim'},
};

export default function AboutPage() {
  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref="/ar/about" />
      <section className="pageIntro">
        <div className="eyebrow">About</div>
        <h1>Clarity is the work.</h1>
        <p className="lede">I design digital products and experiences by turning complex systems, workflows, and constraints into interfaces people can understand and use.</p>
      </section>
      <section className="section prose" aria-labelledby="approach-title">
        <h2 id="approach-title">Approach</h2>
        <p>Structure first. Evidence over decoration. Motion only when it explains state, intent, or continuity.</p>
        <p>Past roles stay secondary here; the work and the thinking behind it come first.</p>
      </section>
    </main>
  );
}
