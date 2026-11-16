import {getWorkDiscoveryProjects} from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  const projects = await getWorkDiscoveryProjects();
  const records = projects
    .filter(project => project.cover?.url)
    .map(project => ({
      id: project.slug,
      title: {ar: project.titleAr, en: project.titleEn},
      category: {ar: project.typeAr || 'مشروع رقمي', en: project.typeEn || 'Digital product'},
      description: {
        ar: (project.problemAr || project.contextAr || '').split(/\n\s*\n/)[0].slice(0, 260),
        en: (project.problemEn || project.contextEn || '').split(/\n\s*\n/)[0].slice(0, 260),
      },
      art: 'product',
      image: project.cover?.url,
      url: {ar: `/ar/projects/${project.slug}`, en: `/projects/${project.slug}`},
      action: 'case-study',
    }));

  return Response.json(records, {
    headers: {'Cache-Control': 'private, no-store, max-age=0'},
  });
}
