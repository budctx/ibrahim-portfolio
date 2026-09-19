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
    title: project.titleAr,
    description: project.problemAr || project.contextAr || `دراسة مشروع: ${project.titleAr}`,
    robots: preview ? {index: false, follow: false, noarchive: true} : undefined,
    alternates: {
      canonical: `/ar/projects/${project.slug}`,
      languages: {
        en: `/projects/${project.slug}`,
        ar: `/ar/projects/${project.slug}`,
        'x-default': `/projects/${project.slug}`,
      },
    },
    openGraph: {
      url: `/ar/projects/${project.slug}`,
      title: `${project.titleAr} — إبراهيم`,
      description: project.problemAr || project.contextAr || undefined,
      images: project.cover?.url ? [{url: project.cover.url, alt: project.cover.altAr || project.titleAr}] : undefined,
    },
  };
}

export default async function ArabicProjectPage({params}: ProjectPageProps) {
  const {slug} = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    {id: 'problem', title: 'المشكلة', body: project.problemAr},
    {id: 'context', title: 'السياق', body: project.contextAr},
    {id: 'process', title: 'العملية', body: project.processAr},
    {id: 'decisions', title: 'القرارات الرئيسية', body: project.decisionsAr},
    {id: 'outcome', title: 'النتيجة', body: project.outcomeAr},
  ].filter((section): section is {id: string; title: string; body: string} => Boolean(section.body));

  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref={`/projects/${project.slug}`} />

      <section className="projectIntro">
        <div>
          <div className="eyebrow">{project.typeAr ?? project.classification}</div>
          <h1>{project.titleAr}</h1>
          <div className="projectMeta">
            {project.roleAr && <span>{project.roleAr}</span>}
            {project.year && <span>{project.year}</span>}
            {project.tools?.length ? <span>{project.tools.join(' · ')}</span> : null}
          </div>
        </div>
        {project.cover?.url ? (
          <figure className="projectHeroMedia">
            <Image
              src={project.cover.url}
              alt={project.cover.altAr || ''}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </figure>
        ) : (
          <div className="mediaFallback">ستظهر وسائط المشروع هنا بعد اعتمادها للعرض العام.</div>
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
                <Link className="sectionLink" href={'#' + next.id}>التالي: {next.title}</Link>
              ) : project.projectUrl ? (
                <Link className="sectionLink" href={project.projectUrl} target="_blank" rel="noreferrer">شاهد المشروع المباشر</Link>
              ) : (
                <Link className="sectionLink" href="/ar/work">أكمل إلى المزيد من الأعمال</Link>
              )}
            </div>
          </section>
        );
      })}

      {project.gallery?.length ? (
        <section className="section gallery" aria-label="معرض المشروع">
          {project.gallery.map((image, index) => (
            <figure className="galleryItem" key={`${image.url}-${index}`}>
              <Image src={image.url} alt={image.altAr || ''} fill sizes="(max-width: 760px) 100vw, 50vw" />
            </figure>
          ))}
        </section>
      ) : null}

      <nav className="projectFooterNav" aria-label="التنقل بين المشاريع">
        <Link href="/ar/work">العودة إلى الأعمال</Link>
      </nav>
    </main>
  );
}
