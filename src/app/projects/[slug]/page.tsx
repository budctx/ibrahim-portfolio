import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {draftMode} from 'next/headers';
import {notFound} from 'next/navigation';
import {SiteHeader} from '@/components/site-header';
import {getProjectBySlug} from '@/lib/content';

type ProjectPageProps = {
  params: Promise<{slug: string}>;
};

export async function generateMetadata({params}: ProjectPageProps): Promise<Metadata> {
  const {slug} = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const preview = (await draftMode()).isEnabled;

  return {
    title: project.titleEn,
    description: project.problemEn || project.contextEn || `Project case study: ${project.titleEn}`,
    robots: preview ? {index: false, follow: false, noarchive: true} : undefined,
    alternates: {
      canonical: `/projects/${project.slug}`,
      languages: {
        en: `/projects/${project.slug}`,
        ar: `/ar/projects/${project.slug}`,
        'x-default': `/projects/${project.slug}`,
      },
    },
    openGraph: {
      url: `/projects/${project.slug}`,
      title: `${project.titleEn} — Ibrahim`,
      description: project.problemEn || project.contextEn || undefined,
      images: project.cover?.url ? [{url: project.cover.url, alt: project.cover.altEn || project.titleEn}] : undefined,
    },
  };
}

export default async function ProjectPage({params}: ProjectPageProps) {
  const {slug} = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    {id: 'problem', title: 'Problem', body: project.problemEn},
    {id: 'context', title: 'Context', body: project.contextEn},
    {id: 'process', title: 'Process', body: project.processEn},
    {id: 'decisions', title: 'Key decisions', body: project.decisionsEn},
    {id: 'outcome', title: 'Outcome', body: project.outcomeEn},
  ].filter((section): section is {id: string; title: string; body: string} => Boolean(section.body));

  return (
    <main id="main" className="shell">
      <SiteHeader locale="en" counterpartHref={`/ar/projects/${project.slug}`} />

      <section className="projectIntro">
        <div>
          <div className="eyebrow">{project.typeEn ?? project.classification}</div>
          <h1>{project.titleEn}</h1>
          <div className="projectMeta">
            {project.roleEn && <span>{project.roleEn}</span>}
            {project.year && <span>{project.year}</span>}
            {project.tools?.length ? <span>{project.tools.join(' · ')}</span> : null}
          </div>
        </div>
        {project.cover?.url ? (
          <figure className="projectHeroMedia">
            <Image
              src={project.cover.url}
              alt={project.cover.altEn || ''}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </figure>
        ) : (
          <div className="mediaFallback">Project media will appear here when it is cleared for public display.</div>
        )}
      </section>

      {sections.map((section, index) => {
        const next = sections[index + 1];

        return (
          <section className="section caseSection" id={section.id} key={section.id}>
            <div className="eyebrow">{section.title}</div>
            <div>
              <p>{section.body}</p>
              {next ? (
                <Link className="sectionLink" href={'#' + next.id}>Next: {next.title}</Link>
              ) : project.projectUrl ? (
                <Link className="sectionLink" href={project.projectUrl} target="_blank" rel="noreferrer">See the live project</Link>
              ) : (
                <Link className="sectionLink" href="/work">Continue to more work</Link>
              )}
            </div>
          </section>
        );
      })}

      {project.gallery?.length ? (
        <section className="section gallery" aria-label="Project gallery">
          {project.gallery.map((image, index) => (
            <figure className="galleryItem" key={`${image.url}-${index}`}>
              <Image src={image.url} alt={image.altEn || ''} fill sizes="(max-width: 760px) 100vw, 50vw" />
            </figure>
          ))}
        </section>
      ) : null}

      <nav className="projectFooterNav" aria-label="Project navigation">
        <Link href="/work">Back to work</Link>
      </nav>
    </main>
  );
}
