import {CaseStudy} from '@/components/case-study';
import type {Metadata} from 'next';
import {draftMode} from 'next/headers';
import {notFound} from 'next/navigation';
import {getProjectBySlug} from '@/lib/content';
import {ARABIC_PORTFOLIO_KEYWORDS} from '@/lib/seo-keywords';

type ProjectPageProps = {
  params: Promise<{slug: string}>;
};

export async function generateMetadata({params}: ProjectPageProps): Promise<Metadata> {
  const {slug} = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const preview = (await draftMode()).isEnabled || process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';

  return {
    title: project.titleAr,
    description: project.problemAr || project.contextAr || `دراسة مشروع: ${project.titleAr}`,
    keywords: [...ARABIC_PORTFOLIO_KEYWORDS],
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

  return <CaseStudy project={project} locale="ar" />;
}
