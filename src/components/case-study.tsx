import Image from 'next/image';
import {EditorialText} from '@/components/editorial-text';
import Link from 'next/link';
import {InteriorPageShell} from '@/components/interior-page-shell';
import {RelatedWorkCarousel} from '@/components/related-work-carousel';
import type {ProjectImage, ProjectSummary} from '@/lib/content';

export function CaseStudy({project: p, locale}: {project: ProjectSummary; locale: 'en' | 'ar'}) {
  const ar = locale === 'ar';
  const work = ar ? '/#work' : '/en#work';
  const title = ar ? p.titleAr : p.titleEn;
  const summary = ar ? p.summaryAr : p.summaryEn;
  const evidenceNote = ar ? p.evidenceNoteAr : p.evidenceNoteEn;
  const sections = [
    {id: 'problem', title: ar ? 'المشكلة والفرصة' : 'The opportunity', body: ar ? p.problemAr : p.problemEn},
    {id: 'context', title: ar ? 'المنتج ودوري' : 'The product & my role', body: ar ? p.contextAr : p.contextEn},
    {id: 'process', title: ar ? 'رحلة الهوست' : 'The host journey', body: ar ? p.processAr : p.processEn},
    {id: 'decisions', title: ar ? 'قرارات التصميم' : 'Design decisions', body: ar ? p.decisionsAr : p.decisionsEn},
    {id: 'outcome', title: ar ? 'النتائج والتعلّم' : 'Outcomes & reflection', body: ar ? p.outcomeAr : p.outcomeEn},
  ].filter(s => s.body).map(section => {
    const custom = p.presentations?.find(item => item.section === section.id);
    return {...section, title: (ar ? custom?.titleAr : custom?.titleEn) || section.title};
  });
  const media = (images: ProjectImage[]) => images.map((im, i) => <figure className="caseEvidence" key={`${im.url}-${i}`}>
    <a href={im.url} target="_blank" rel="noreferrer" aria-label={ar ? 'افتح الصورة بالحجم الكامل' : 'Open full-size screenshot'}>
      <Image src={im.url} alt={(ar ? im.altAr : im.altEn) || ''} width={1600} height={1000} sizes="(min-width: 1480px) 1320px, 91vw" />
    </a>
    {(ar ? im.captionAr : im.captionEn) && <figcaption>{ar ? im.captionAr : im.captionEn}</figcaption>}
  </figure>);
  return <InteriorPageShell locale={locale} counterpartHref={ar ? `/projects/${p.slug}` : `/ar/projects/${p.slug}`} className={`caseStudy caseMedia-${p.mediaStyle || 'wide'}`} compactHeader>
    {(process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development') && <aside className="caseReview">{ar ? 'معاينة إصدار تجريبي — النسخة الرسمية متاحة على البورتفوليو.' : 'Preview build — the published version is available on the portfolio.'}</aside>}
    <header className="caseHeading">
      <Link href={work} className="sectionLink">{ar ? 'العودة للأعمال' : 'Back to work'}</Link>
      <div className="eyebrow">{ar ? p.typeAr : p.typeEn}</div>
      <h1>{title}</h1>
      <p className="caseRole">{ar ? p.roleAr : p.roleEn}</p>
      {summary && <p className="caseSummary">{summary}</p>}
    </header>
    {p.cover && media([p.cover])}
    <nav className="caseContents" aria-label={ar ? 'أقسام الدراسة' : 'Case study contents'}>{sections.map((s,i) => <a href={`#${s.id}`} key={s.id}><span>{String(i+1).padStart(2,'0')}</span> {s.title}</a>)}</nav>
    {sections.map((s,i) => {
      const presentation = p.presentations?.find(item => item.section === s.id);
      const lead = ar ? presentation?.leadAr : presentation?.leadEn;
      const items = presentation?.items.filter(item => ar ? item.titleAr || item.bodyAr : item.titleEn || item.bodyEn) || [];
      const images = (p.gallery || []).filter(im => im.section === s.id);
      return <section className={`section caseChapter caseLayout-${presentation?.layout || 'editorial'}`} id={s.id} key={s.id}>
        <div className="caseChapterHeading"><span className="eyebrow">{String(i+1).padStart(2,'0')}</span><h2>{s.title}</h2></div>
        <div className="caseCopy">
          {lead && <p className="caseLead">{lead}</p>}
          {s.body && <EditorialText text={s.body} />}
          {items.length > 0 && <ol className={`caseItems caseItems-${presentation?.layout}`}>
            {items.map((item,j) => <li key={j}>
              <span className="caseItemNumber" aria-hidden="true">{String(j+1).padStart(2,'0')}</span>
              <div><h3>{ar ? item.titleAr : item.titleEn}</h3><p>{ar ? item.bodyAr : item.bodyEn}</p></div>
            </li>)}
          </ol>}
        </div>
        {images.length > 0 && <div className="caseChapterMedia">{media(images)}</div>}
      </section>;
    })}
    {(p.gallery || []).some(im => !im.section || im.section === 'gallery') && <section aria-label={ar ? 'صور إضافية' : 'Additional images'}>{media((p.gallery || []).filter(im => !im.section || im.section === 'gallery'))}</section>}
    {(evidenceNote || p.tools?.length) && <details className="caseEvidenceNote">
      <summary>{ar ? 'نطاق الأدلة وأدوات التنفيذ' : 'Evidence scope & implementation tools'}</summary>
      {evidenceNote?.split(/\n\s*\n/).map((text, i) => <p key={i}>{text}</p>)}
      {p.tools?.length ? <p className="caseTools">{p.tools.join(' · ')}</p> : null}
    </details>}
    <RelatedWorkCarousel key={p.slug} locale={locale} currentSlug={p.slug} />
    <nav className="projectFooterNav" aria-label={ar ? 'تنقل المشروع' : 'Project navigation'}>
      <Link href={work}>{ar ? 'العودة للأعمال' : 'Back to work'}</Link>
      {p.projectUrl && <a className="caseExternalAction" href={p.projectUrl} target="_blank" rel="noreferrer">{ar ? 'زيارة المنتج' : 'Visit live product'}</a>}
    </nav>
  </InteriorPageShell>;
}
