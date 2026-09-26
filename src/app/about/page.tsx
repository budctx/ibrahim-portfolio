import type {Metadata} from 'next';
import {ExperienceInterior} from '@/components/experience-interior';
export const metadata: Metadata = {
  title: 'About',
  description: 'Ibrahim Al-Ajmi: information systems, operations, digital product and user experience design.',
  alternates: {canonical: '/about', languages: {ar: '/ar/about', en: '/about', 'x-default': '/ar/about'}},
  openGraph: {url: '/about', title: 'About — Ibrahim', description: 'Ibrahim Al-Ajmi: information systems, operations, digital product and user experience design.'},
};
export default function Page() { return <ExperienceInterior locale="en" kind="about" />; }
