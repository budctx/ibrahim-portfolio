import type {Metadata} from 'next';
import {ExperienceInterior} from '@/components/experience-interior';
export const metadata: Metadata = {
  title: 'عني',
  description: 'إبراهيم العجمي؛ نظم معلومات وتجربة تشغيلية وتصميم منتجات وتجارب رقمية.',
  alternates: {canonical: '/ar/about', languages: {ar: '/ar/about', en: '/about', 'x-default': '/ar/about'}},
  openGraph: {url: '/ar/about', title: 'عني — Ibrahim', description: 'إبراهيم العجمي؛ نظم معلومات وتجربة تشغيلية وتصميم منتجات وتجارب رقمية.'},
};
export default function Page() { return <ExperienceInterior locale="ar" kind="about" />; }
