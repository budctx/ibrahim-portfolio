import {CaseStudy} from '@/components/case-study';
import type {Metadata} from 'next';
import {draftMode} from 'next/headers';
import {notFound} from 'next/navigation';
import {getProjectBySlug} from '@/lib/content';

type ProjectPageProps = {
  params: Promise<{slug: string}>;
};

export async function generateMetadata({params}: ProjectPageProps): Promise<Metadata> {
  const {slug} = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const preview = (await draftMode()).isEnabled || process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';

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

  return <CaseStudy project={project} locale="en" />;
}
