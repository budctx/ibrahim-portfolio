import type {MetadataRoute} from 'next';
import {getProjects} from '@/lib/content';

const siteUrl = 'https://ibrahim-portfolio-blush.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['/', '/en', '/work', '/playground', '/about', '/ar/work', '/ar/playground', '/ar/about'];
  const projects = await getProjects();
  const projectPaths = projects.flatMap((project) => [
    `/projects/${project.slug}`,
    `/ar/projects/${project.slug}`,
  ]);

  return [...staticPaths, ...projectPaths].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path.includes('/projects/') ? 'monthly' : 'weekly',
    priority: path === '/' ? 1 : path === '/en' ? 0.9 : path.includes('/projects/') ? 0.8 : 0.7,
  }));
}
