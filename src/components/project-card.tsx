'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import type {MouseEvent} from 'react';
import type {ProjectSummary} from '@/lib/content';

type ProjectCardProps = {
  project: ProjectSummary;
  locale?: 'en' | 'ar';
};

let activeAnimations: Animation[] = [];
let latestIntent = 0;

function isPlainActivation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function ProjectCard({project, locale = 'en'}: ProjectCardProps) {
  const router = useRouter();
  const ar = locale === 'ar';
  const href = ar ? `/ar/projects/${project.slug}` : `/projects/${project.slug}`;
  const title = ar ? project.titleAr : project.titleEn;
  const role = ar ? project.roleAr : project.roleEn;
  const type = ar
    ? project.typeAr || ({flagship: 'مشروع رئيسي', selected: 'عمل مختار', playground: 'تجربة'} as const)[project.classification]
    : project.typeEn || project.classification;
  const alt = ar ? project.cover?.altAr : project.cover?.altEn;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainActivation(event)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    event.preventDefault();
    const intent = ++latestIntent;

    activeAnimations.forEach((animation) => animation.cancel());
    activeAnimations = [];
    document
      .querySelectorAll<HTMLElement>('[data-resolving="true"]')
      .forEach((node) => node.removeAttribute('data-resolving'));

    const card = event.currentTarget;
    card.dataset.resolving = 'true';

    const cardRect = card.getBoundingClientRect();
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const signals = Array.from(card.querySelectorAll<HTMLElement>('[data-signal]')).slice(0, 4);

    signals.forEach((signal, index) => {
      const rect = signal.getBoundingClientRect();
      const signalCenterY = rect.top + rect.height / 2;
      const translateY = Math.max(-24, Math.min(24, (cardCenterY - signalCenterY) * 0.06));
      const duration = 280 + index * 40;

      const animation = signal.animate(
        [
          {transform: 'translate3d(0, 0, 0)', opacity: 1},
          {
            transform: `translate3d(0, ${translateY}px, 0) scale(${index === 0 ? 0.992 : 1})`,
            opacity: index === 1 ? 0.72 : 0.9,
          },
        ],
        {
          duration,
          easing: 'cubic-bezier(.2,.8,.2,1)',
          fill: 'forwards',
        },
      );

      activeAnimations.push(animation);
      animation.finished.catch(() => undefined).then(() => {
        if (intent !== latestIntent) animation.cancel();
      });
    });

    router.push(href);
  };

  return (
    <Link className="projectCard" href={href} onClick={handleClick} data-project-key={project.projectKey}>
      <div className="projectCardMedia" data-signal="media">
        {project.cover?.url ? (
          <Image
            src={project.cover.url}
            alt={alt || ''}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 42vw"
          />
        ) : (
          <div className="projectCardMediaFallback" aria-hidden="true" />
        )}
      </div>
      <div className="projectCardBody">
        <div className="eyebrow projectCardType" data-signal="classification">{type}</div>
        <h3 data-signal="title">{title}</h3>
        <div className="meta" data-signal="meta">
          <span>{role ?? ''}</span>
          <span>{project.year ?? ''}</span>
        </div>
      </div>
    </Link>
  );
}
