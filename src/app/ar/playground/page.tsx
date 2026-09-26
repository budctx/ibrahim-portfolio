import type {Metadata} from 'next';
import {ExperienceInterior} from '@/components/experience-interior';
export const metadata: Metadata = {
  title: 'الاستكشاف',
  description: 'تجارب تفاعلية واستكشافات للواجهات والأنظمة، منفصلة عن الأعمال المهنية.',
  alternates: {canonical: '/ar/playground', languages: {ar: '/ar/playground', en: '/playground', 'x-default': '/ar/playground'}},
  openGraph: {url: '/ar/playground', title: 'الاستكشاف — Ibrahim', description: 'تجارب تفاعلية واستكشافات للواجهات والأنظمة، منفصلة عن الأعمال المهنية.'},
};
export default function Page() { return <ExperienceInterior locale="ar" kind="playground" />; }
