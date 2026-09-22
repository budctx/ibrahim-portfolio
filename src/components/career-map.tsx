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
  evidenceLabel: string;
  nodes: Node[];
}> = {
  en: {
    kicker: 'System → Experience',
    title: 'What changes between complexity and clarity.',
    hint: 'The sequence advances automatically. Choose any layer to inspect it.',
    evidenceLabel: 'Grounded in',
    nodes: [
      {
        id: 'system',
        label: 'System',
        short: 'Understand what is actually happening.',
        detail: 'Start with users, information, dependencies, goals, rules, constraints, and the workflow around the interface.',
        evidence: 'Management Information Systems',
      },
      {
        id: 'friction',
        label: 'Friction',
        short: 'Find where the workflow pushes back.',
        detail: 'Look for waiting, handoff gaps, duplicate effort, weak hierarchy, unclear states, validation problems, and avoidable cognitive load.',
        evidence: 'Healthcare operations',
      },
      {
        id: 'structure',
        label: 'Structure',
        short: 'Turn the problem into product logic.',
        detail: 'Shape information architecture, user flows, content hierarchy, states, wireframes, responsive rules, and interaction decisions.',
        evidence: 'UX · Web · Digital product design',
      },
      {
        id: 'experience',
        label: 'Experience',
        short: 'Make the structure understandable.',
        detail: 'Translate product logic into clear interfaces with usable interaction, accessible patterns, visual hierarchy, and intentional motion.',
        evidence: 'UI/UX · Accessibility · DGA-oriented work',
      },
      {
        id: 'delivery',
        label: 'Delivery',
        short: 'Keep the design close to implementation.',
        detail: 'Use prototypes, explicit states, specifications, AI-assisted exploration, and developer handoff to reduce ambiguity between design and build.',
        evidence: 'Google UX · Google AI · Developer handoff',
      },
    ],
  },
  ar: {
    kicker: 'النظام ← التجربة',
    title: 'ما الذي يتغيّر بين التعقيد والوضوح.',
    hint: 'يتقدم التسلسل تلقائيًا. اختر أي طبقة لاستعراضها.',
    evidenceLabel: 'مبني على',
    nodes: [
      {
        id: 'system',
        label: 'النظام',
        short: 'أفهم ما يحدث فعليًا.',
        detail: 'أبدأ بالمستخدمين والمعلومات والاعتماديات والأهداف والقواعد والقيود وسير العمل المحيط بالواجهة.',
        evidence: 'نظم المعلومات الإدارية',
      },
      {
        id: 'friction',
        label: 'الاحتكاك',
        short: 'أحدد أين يقاوم سير العمل المستخدم.',
        detail: 'أبحث عن الانتظار وفجوات التسليم وتكرار الجهد وضعف التسلسل البصري والحالات غير الواضحة ومشاكل التحقق والحمل الذهني غير الضروري.',
        evidence: 'العمليات الصحية',
      },
      {
        id: 'structure',
        label: 'البنية',
        short: 'أحوّل المشكلة إلى منطق منتج.',
        detail: 'أبني هندسة المعلومات وتدفقات المستخدم وتسلسل المحتوى والحالات والـWireframes وقواعد الاستجابة وقرارات التفاعل.',
        evidence: 'UX · الويب · تصميم المنتجات الرقمية',
      },
      {
        id: 'experience',
        label: 'التجربة',
        short: 'أجعل البنية مفهومة وقابلة للاستخدام.',
        detail: 'أحوّل منطق المنتج إلى واجهة واضحة عبر تفاعل قابل للاستخدام وأنماط وصول وتسلسل بصري وحركة ذات غرض.',
        evidence: 'UI/UX · إمكانية الوصول · أعمال موجهة لمتطلبات DGA',
      },
      {
        id: 'delivery',
        label: 'التنفيذ',
        short: 'أبقي التصميم قريبًا من البناء.',
        detail: 'أستخدم النماذج الأولية والحالات الواضحة والمواصفات والاستكشاف بمساعدة AI وDeveloper Handoff لتقليل الغموض بين التصميم والتنفيذ.',
        evidence: 'Google UX · Google AI · Developer Handoff',
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
      className="cvMap cvMapV3"
      data-scroll-motion="slide"
      aria-label={rtl ? 'تحويل النظام إلى تجربة رقمية' : 'System to experience map'}
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
          aria-label={rtl ? 'طبقات التحويل من النظام إلى التجربة' : 'System-to-experience layers'}
        >
          {data.nodes.map((node, index) => {
            const NodeIcon =
              node.id === 'system' ? GraduationCapIcon :
              node.id === 'friction' ? WorkflowIcon :
              node.id === 'structure' ? BriefcaseIcon :
              node.id === 'experience' ? SparklesIcon :
              BadgeCheckIcon;

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
