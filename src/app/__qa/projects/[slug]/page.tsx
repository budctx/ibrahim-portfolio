import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {SiteHeader} from '@/components/site-header';
import {getDevelopmentProjectBySlug} from '@/lib/sanity';

type QAProjectPageProps = {
  params: Promise<{slug: string}>;
};

export const metadata: Metadata = {
  title: 'QA Project Preview',
  robots: {index: false, follow: false, nocache: true},
};

export default async function QAProjectPage({params}: QAProjectPageProps) {
  const {slug} = await params;
  const project = await getDevelopmentProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    ['Problem', project.problemEn],
    ['Context', project.contextEn],
    ['Process', project.processEn],
    ['Key decisions', project.decisionsEn],
    ['Outcome', project.outcomeEn],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref={`/ar/__qa/projects/${project.slug}`} />
      <section className="section">
        <div className="eyebrow">QA ONLY · DEVELOPMENT FIXTURE · NOINDEX</div>
        <h1>{project.titleEn}</h1>
        <p className="lede">This route validates the CMS-to-site publishing pipeline without presenting test content as real portfolio work.</p>
      </section>
      {sections.map(([title, body]) => (
        <section className="section caseSection" key={title}>
          <div className="eyebrow">{title}</div>
          <p>{body}</p>
        </section>
      ))}
    </main>
  );
}
