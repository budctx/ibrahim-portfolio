import type {Metadata} from 'next';
import {ExperienceHome} from '@/components/experience-home';
import {ENGLISH_PORTFOLIO_KEYWORDS} from '@/lib/seo-keywords';

export const metadata: Metadata = {
  title: 'Ibrahim — Digital Product & Experience Designer',
  description: 'Ibrahim Al-Ajmi designs understandable digital experiences by connecting people, workflows and data.',
  keywords: [...ENGLISH_PORTFOLIO_KEYWORDS],
  alternates: {canonical: '/en', languages: {ar: '/', en: '/en', 'x-default': '/'}},
  openGraph: {url: '/en', title: 'Ibrahim — Digital Product & Experience Designer', description: 'Understand complexity. Design for clarity.'},
};
export default function EnglishHomePage() { return <ExperienceHome locale="en" />; }
