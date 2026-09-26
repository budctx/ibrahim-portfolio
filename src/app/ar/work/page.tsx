import type {Metadata} from 'next';
import {ExperienceInterior} from '@/components/experience-interior';
export const metadata: Metadata = {
  title: 'الأعمال',
  description: 'دراسات حالة حقيقية ومنشورة في المنتجات والتجارب الرقمية.',
  alternates: {canonical: '/ar/work', languages: {ar: '/ar/work', en: '/work', 'x-default': '/ar/work'}},
  openGraph: {url: '/ar/work', title: 'الأعمال — Ibrahim', description: 'دراسات حالة حقيقية ومنشورة في المنتجات والتجارب الرقمية.'},
};
export default function Page() { return <ExperienceInterior locale="ar" kind="work" />; }
