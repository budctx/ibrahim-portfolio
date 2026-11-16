'use client';

import {useEffect} from 'react';

type RelatedWorkProps = {locale: 'en' | 'ar'; currentSlug: string};

/**
 * Native Work carousel reused via /portfolio/work-ui.js and work-projects.js:
 * this component only provides React's host markup and route lifecycle.
 */
export function RelatedWorkCarousel({locale, currentSlug}: RelatedWorkProps) {
  const ar = locale === 'ar';

  useEffect(() => {
    const script = document.getElementById('portfolio-related-work-module');
    if (!script) {
      const module = document.createElement('script');
      module.id = 'portfolio-related-work-module';
      module.type = 'module';
      module.src = '/portfolio/work-related.js';
      document.head.append(module);
    } else {
      document.dispatchEvent(new Event('portfolio:related-work-mount'));
    }
  }, [locale, currentSlug]);

  return (
    <section className="relatedWork" data-related-work data-current={currentSlug} data-locale={locale} aria-labelledby="related-work-title">
      <link rel="stylesheet" href="/portfolio/related-work.css" />
      <header className="relatedWorkHeader">
        <div>
          <span className="relatedWorkIndex">06 / {ar ? 'استكشف' : 'Explore'}</span>
          <h2 id="related-work-title">{ar ? 'أعمال أخرى' : 'Explore more work'}</h2>
          <p>{ar ? 'اختر مشروعًا آخر للاطلاع على تفاصيله.' : 'Select another project to explore its story.'}</p>
        </div>
      </header>
      <p className="relatedWorkLoading" data-related-status role="status">{ar ? 'جارٍ عرض الأعمال…' : 'Loading other work…'}</p>
      <div className="relatedWorkBody">
        <div className="project-track" data-related-track role="region" tabIndex={0} aria-label={ar ? 'كاروسيل أعمال أخرى' : 'More projects carousel'} />
        <div className="carousel-controls" aria-label={ar ? 'التنقل بين الأعمال' : 'Project carousel controls'}>
          <button className="carousel-arrow" type="button" data-related-prev aria-label={ar ? 'العمل السابق' : 'Previous project'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M14 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span className="carousel-count" data-related-count aria-live="polite" aria-atomic="true" />
          <button className="carousel-arrow" type="button" data-related-next aria-label={ar ? 'العمل التالي' : 'Next project'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M10 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
      <dialog className="project-modal" aria-labelledby="modal-title" aria-describedby="modal-description">
        <button type="button" className="modal-close" id="modal-close" aria-label={ar ? 'إغلاق' : 'Close'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="modal-art" id="modal-art" aria-hidden="true" />
        <div className="modal-copy">
          <p className="modal-label" id="modal-category" />
          <h2 id="modal-title" />
          <p className="modal-description" id="modal-description" />
          <a className="modal-link" id="modal-link" hidden>{ar ? 'عرض المشروع' : 'View project'}</a>
        </div>
      </dialog>
    </section>
  );
}
