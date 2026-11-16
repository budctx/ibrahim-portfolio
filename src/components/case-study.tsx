import Image from 'next/image';
import Link from 'next/link';
import {InteriorPageShell} from '@/components/interior-page-shell';
import {RelatedWorkCarousel} from '@/components/related-work-carousel';
import type {ProjectImage, ProjectSummary} from '@/lib/content';

export function CaseStudy({project: p, locale}: {project: ProjectSummary; locale: 'en' | 'ar'}) {
  const ar = locale === 'ar';
  const work = ar ? '/#work' : '/en#work';
  const home = ar ? '/' : '/en';
  const title = ar ? p.titleAr : p.titleEn;
  const sections = [
    {id: 'problem', title: ar ? 'المشكلة والفرصة' : 'The opportunity', body: ar ? p.problemAr : p.problemEn},
    {id: 'context', title: ar ? 'المنتج ودوري' : 'The product & my role', body: ar ? p.contextAr : p.contextEn},
    {id: 'process', title: ar ? 'رحلة المضيف' : 'The host journey', body: ar ? p.processAr : p.processEn},
    {id: 'decisions', title: ar ? 'قرارات التصميم' : 'Design decisions', body: ar ? p.decisionsAr : p.decisionsEn},
    {id: 'outcome', title: ar ? 'النتائج والتعلّم' : 'Outcomes & reflection', body: ar ? p.outcomeAr : p.outcomeEn},
  ].filter(s => s.body);
  const media = (images: ProjectImage[]) => images.map((im, i) => <figure className="caseEvidence" key={`${im.url}-${i}`}>
    <a href={im.url} target="_blank" rel="noreferrer" aria-label={ar ? 'افتح الصورة بالحجم الكامل' : 'Open full-size screenshot'}>
      <Image src={im.url} alt={(ar ? im.altAr : im.altEn) || ''} width={1600} height={1000} sizes="(max-width: 760px) 100vw, 85vw" />
    </a>
    {(ar ? im.captionAr : im.captionEn) && <figcaption>{ar ? im.captionAr : im.captionEn}</figcaption>}
  </figure>);
  return <InteriorPageShell locale={locale} counterpartHref={ar ? `/projects/${p.slug}` : `/ar/projects/${p.slug}`} className="caseStudy">
    {(process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development') && <aside className="caseReview">{ar ? 'معاينة إصدار تجريبي — النسخة الرسمية متاحة على البورتفوليو.' : 'Preview build — the published version is available on the portfolio.'}</aside>}
    <header className="caseHeading">
      <Link href={work} className="sectionLink">{ar ? 'العودة للأعمال' : 'Back to work'}</Link>
      <div className="eyebrow">{ar ? p.typeAr : p.typeEn} · {p.year}</div>
      <h1>{title}</h1>
      <p className="caseRole">{ar ? p.roleAr : p.roleEn}</p>
      <p className="caseTools">{p.tools?.join(' · ')}</p>
    </header>
    {p.cover && media([{...p.cover, captionEn: 'Live product · Arabic interface · Captured 15 November 2026', captionAr: 'المنتج الفعلي · واجهة عربية · التُقطت في 15 نوفمبر 2026'}])}
    <nav className="caseContents" aria-label={ar ? 'أقسام الدراسة' : 'Case study contents'}>{sections.map((s,i) => <a href={`#${s.id}`} key={s.id}><span>{String(i+1).padStart(2,'0')}</span> {s.title}</a>)}</nav>
    {sections.map((s,i) => <section className="section caseChapter" id={s.id} key={s.id}>
      <div className="caseChapterHeading"><span className="eyebrow">{String(i+1).padStart(2,'0')}</span><h2>{s.title}</h2></div>
      <div className="caseCopy">{s.body?.split(/\n\s*\n/).map((text,j) => <p key={j}>{text}</p>)}</div>
      {(p.gallery || []).filter(im => im.section === s.id).length > 0 && <div className="caseChapterMedia">{media((p.gallery || []).filter(im => im.section === s.id))}</div>}
    </section>)}
    {(p.gallery || []).some(im => !im.section || im.section === 'gallery') && <section aria-label={ar ? 'صور إضافية' : 'Additional images'}>{media((p.gallery || []).filter(im => !im.section || im.section === 'gallery'))}</section>}
    <RelatedWorkCarousel key={p.slug} locale={locale} currentSlug={p.slug} />
    <nav className="projectFooterNav" aria-label={ar ? 'تنقل المشروع' : 'Project navigation'}>
      <Link href={work}>{ar ? 'العودة إلى الأعمال' : 'Back to work'}</Link>
      <Link href={home}>{ar ? 'العودة للرئيسية' : 'Back to homepage'}</Link>
      {p.projectUrl && <a href={p.projectUrl} target="_blank" rel="noreferrer">{ar ? 'زيارة المنتج' : 'Visit live product'}</a>}
    </nav>
  </InteriorPageShell>;
}
