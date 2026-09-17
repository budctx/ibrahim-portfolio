import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {SiteHeader} from '@/components/site-header';
import {getDevelopmentProjectBySlug} from '@/lib/sanity';

type QAProjectPageProps = {
  params: Promise<{slug: string}>;
};

export const metadata: Metadata = {
  title: 'معاينة QA للمشروع',
  robots: {index: false, follow: false, nocache: true},
};

export default async function ArabicQAProjectPage({params}: QAProjectPageProps) {
  const {slug} = await params;
  const project = await getDevelopmentProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    ['المشكلة', project.problemAr],
    ['السياق', project.contextAr],
    ['العملية', project.processAr],
    ['القرارات الرئيسية', project.decisionsAr],
    ['النتيجة', project.outcomeAr],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref={`/__qa/projects/${project.slug}`} />
      <section className="section">
        <div className="eyebrow">QA فقط · نموذج تطويري · غير مفهرس</div>
        <h1>{project.titleAr}</h1>
        <p className="lede">هذا المسار لاختبار دورة النشر من Sanity إلى الموقع دون تقديم المحتوى التجريبي كعمل حقيقي.</p>
      </section>
      {sections.map(([title, body]) => (
        <section className="section caseSection" key={title}>
          <div className="eyebrow">{title}</div>
          <p>{body}</p>
        </section>
      ))}
    </main>
  );
}
