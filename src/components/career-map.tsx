'use client';

import {useEffect, useRef, useState, type KeyboardEvent} from 'react';
import {
  BadgeCheckIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  SparklesIcon,
  WorkflowIcon,
} from '@/components/icons';

type Locale = 'en' | 'ar';

type Node = {
  id: string;
  label: string;
  short: string;
  detail: string;
  evidence: string;
};

const copy: Record<Locale, {
  kicker: string;
  title: string;
  hint: string;
  detailLabel: string;
  evidenceLabel: string;
  nodes: Node[];
}> = {
  en: {
    kicker: 'Why I design this way',
    title: 'Five layers behind my product decisions.',
    hint: 'Choose a layer, then continue to how I work.',
    detailLabel: 'What changed',
    evidenceLabel: 'Evidence',
    nodes: [
      {
        id: 'mis',
        label: 'Management Information Systems',
        short: 'Understand the system first.',
        detail: 'Data, dependencies, workflows, and information architecture come before interface decisions.',
        evidence: 'Management Information Systems',
      },
      {
        id: 'operations',
        label: 'Healthcare operations',
        short: 'See friction in real workflows.',
        detail: 'Wait time, handoffs, validation, and enterprise workflows made UX friction concrete.',
        evidence: 'Healthcare operations',
      },
      {
        id: 'experience',
        label: 'UI/UX Design',
        short: 'Turn friction into a clearer flow.',
        detail: 'User journeys, information architecture, wireframes, prototypes, responsive UI, and usability turn system logic into experience.',
        evidence: 'UI/UX · Digital product design',
      },
      {
        id: 'governance',
        label: 'Digital governance & DGA',
        short: 'Design inside real requirements.',
        detail: 'Digital standards, accessibility, consistency, and DGA requirements belong inside the design process from the start.',
        evidence: 'Digital governance · DGA-oriented work',
      },
      {
        id: 'delivery',
        label: 'AI + Developer Handoff',
        short: 'Reduce the gap to implementation.',
        detail: 'Generative AI speeds exploration; clear states, specifications, and developer handoff keep the design buildable.',
        evidence: 'Generative AI workflows · Developer handoff',
      },
    ],
  },
  ar: {
    kicker: 'لماذا أصمم بهذه الطريقة',
    title: 'خمس طبقات خلف قراراتي في المنتج.',
    hint: 'اختر طبقة، ثم أكمل إلى طريقة العمل.',
    detailLabel: 'ما الذي تغيّر',
    evidenceLabel: 'الدليل',
    nodes: [
      {
        id: 'mis',
        label: 'نظم المعلومات الإدارية',
        short: 'أفهم النظام أولًا.',
        detail: 'البيانات والاعتماديات وسير العمل وهندسة المعلومات تسبق قرارات الواجهة.',
        evidence: 'نظم المعلومات الإدارية',
      },
      {
        id: 'operations',
        label: 'العمليات الصحية',
        short: 'أرى الاحتكاك داخل سير عمل حقيقي.',
        detail: 'وقت الانتظار ونقاط التسليم والتحقق من البيانات والأنظمة المؤسسية جعلت احتكاك UX ملموسًا.',
        evidence: 'عمليات في بيئة صحية',
      },
      {
        id: 'experience',
        label: 'UI/UX Design',
        short: 'أحوّل الاحتكاك إلى تدفق أوضح.',
        detail: 'User Journeys وهندسة المعلومات وWireframes وPrototypes وResponsive UI وقابلية الاستخدام تحوّل منطق النظام إلى تجربة.',
        evidence: 'UI/UX · تصميم المنتجات الرقمية',
      },
      {
        id: 'governance',
        label: 'الحوكمة الرقمية وDGA',
        short: 'أصمم داخل متطلبات حقيقية.',
        detail: 'المعايير الرقمية وإمكانية الوصول والاتساق ومتطلبات DGA جزء من عملية التصميم منذ البداية.',
        evidence: 'الحوكمة الرقمية · متطلبات DGA',
      },
      {
        id: 'delivery',
        label: 'AI + Developer Handoff',
        short: 'أقلل المسافة إلى التنفيذ.',
        detail: 'Generative AI يسرّع الاستكشاف، والحالات والمواصفات وDeveloper Handoff تحافظ على قابلية التنفيذ.',
        evidence: 'تدفقات AI · تسليم المطورين',
      },
    ],
  },
};

export function CareerMap({locale = 'en'}: {locale?: Locale}) {
  const data = copy[locale];
  const rtl = locale === 'ar';
  const [activeId, setActiveId] = useState<string>(data.nodes[0].id);
  const [isInView, setIsInView] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(0, data.nodes.findIndex((node) => node.id === activeId));
  const active = data.nodes[activeIndex] ?? data.nodes[0];

  useEffect(() => {
    const element = mapRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      {threshold: 0.25},
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setTimeout(() => {
      setActiveId(data.nodes[(activeIndex + 1) % data.nodes.length].id);
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, data.nodes, isInView, isPaused]);

  const activate = (index: number, focus = true) => {
    const normalized = (index + data.nodes.length) % data.nodes.length;
    setActiveId(data.nodes[normalized].id);
    if (focus) buttonRefs.current[normalized]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowDown') nextIndex = index + 1;
    if (event.key === 'ArrowUp') nextIndex = index - 1;
    if (event.key === 'ArrowRight') nextIndex = rtl ? index - 1 : index + 1;
    if (event.key === 'ArrowLeft') nextIndex = rtl ? index + 1 : index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = data.nodes.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      activate(nextIndex);
    }
  };

  return (
    <div
      ref={mapRef}
      className="cvMap"
      data-scroll-motion="slide"
      aria-label={rtl ? 'خريطة تكويني المهني' : 'Professional formation map'}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Element) || !event.currentTarget.contains(nextTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="cvMapIntro">
        <span>{data.kicker}</span>
        <strong>{data.title}</strong>
      </div>

      <div className="cvMapGrid">
        <div
          className={"cvMapTrack cvMapTrackActive" + (activeIndex + 1)}
          role="group"
          aria-label={rtl ? 'طبقات التكوين المهني' : 'Professional formation layers'}
        >
          {data.nodes.map((node, index) => {
            const NodeIcon =
              node.id === 'mis' ? GraduationCapIcon :
              node.id === 'operations' ? WorkflowIcon :
              node.id === 'experience' ? SparklesIcon :
              node.id === 'governance' ? BadgeCheckIcon :
              BriefcaseIcon;

            return (
            <button
              key={node.id}
              ref={(element) => { buttonRefs.current[index] = element; }}
              type="button"
              className="cvSignal"
              aria-pressed={node.id === activeId}
              onClick={() => activate(index, false)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="cvSignalIndex">{String(index + 1).padStart(2, '0')}</span>
              <span className="cvSignalLine" aria-hidden="true" />
              <span className="cvSignalIcon" aria-hidden="true"><NodeIcon /></span>
              <span className="cvSignalCopy">
                <strong>{node.label}</strong>
                <span>{node.short}</span>
              </span>
            </button>
            );
          })}
        </div>

        <div className="cvMapDetail" aria-live="polite" aria-label={active.label}>
          <div className="cvMapDetailNumber" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')}</div>
          <div className="cvMapDetailStack">
            {data.nodes.map((node, index) => {
              const selected = index === activeIndex;
              return (
                <div
                  key={node.id}
                  className={"cvMapDetailBody" + (selected ? " cvMapDetailBodyActive" : "")}
                  aria-hidden={!selected}
                >
                  <span className="cvMapKicker">{node.label}</span>
                  <strong>{node.short}</strong>
                  <p>{node.detail}</p>
                  <div className="cvMapEvidence">
                    <span>{data.evidenceLabel}</span>
                    <b>{node.evidence}</b>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="cvMapHint">{data.hint}</p>
    </div>
  );
}
