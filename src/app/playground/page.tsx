import type {Metadata} from 'next';
import {ExperienceInterior} from '@/components/experience-interior';
export const metadata: Metadata = {
  title: 'Playground',
  description: 'Exploratory interactions, UX and digital systems by Ibrahim, distinguished from real client work.',
  alternates: {canonical: '/playground', languages: {ar: '/ar/playground', en: '/playground', 'x-default': '/ar/playground'}},
  openGraph: {url: '/playground', title: 'Playground — Ibrahim', description: 'Exploratory interactions, UX and digital systems by Ibrahim, distinguished from real client work.'},
};
export default function Page() { return <ExperienceInterior locale="en" kind="playground" />; }
