import type {Metadata} from 'next';
import {ExperienceHome} from '@/components/experience-home';
import {ARABIC_PORTFOLIO_KEYWORDS} from '@/lib/seo-keywords';

export const metadata: Metadata = {
  title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
  description: 'إبراهيم العجمي؛ أصمم تجارب رقمية تجمع فهم الأنظمة وسير العمل والمستخدم في واجهات واضحة وقابلة للتنفيذ.',
  keywords: [...ARABIC_PORTFOLIO_KEYWORDS],
  alternates: {canonical: '/', languages: {ar: '/', en: '/en', 'x-default': '/'}},
  openGraph: {url: '/', title: 'إبراهيم — مصمم منتجات وتجارب رقمية', description: 'أفهم التعقيد وأصمم له وضوحًا.'},
};
export default function HomePage() { return <ExperienceHome locale="ar" />; }
