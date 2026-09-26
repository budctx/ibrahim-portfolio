import type {Metadata} from 'next';
import {ExperienceInterior} from '@/components/experience-interior';
export const metadata: Metadata = {
  title: 'Work',
  description: 'Published real digital product and UI/UX case studies by Ibrahim.',
  alternates: {canonical: '/work', languages: {ar: '/ar/work', en: '/work', 'x-default': '/ar/work'}},
  openGraph: {url: '/work', title: 'Work — Ibrahim', description: 'Published real digital product and UI/UX case studies by Ibrahim.'},
};
export default function Page() { return <ExperienceInterior locale="en" kind="work" />; }
