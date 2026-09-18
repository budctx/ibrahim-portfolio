'use client';

import {useRef, useState, type KeyboardEvent} from 'react';

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
    kicker: 'How I was shaped',
    title: 'Five layers. One way of working.',
    hint: 'Choose a layer to see what it added to how I design today.',
    detailLabel: 'What it added',
    evidenceLabel: 'Evidence',
    nodes: [
      {
        id: 'mis',
        label: 'MIS foundation',
        short: 'Read the system before the screen.',
        detail: 'Information systems trained me to look at data, dependencies and workflows before jumping into interface decisions.',
        evidence: 'Management Information Systems',
      },
      {
        id: 'operations',
        label: 'Operational experience',
        short: 'See where friction actually happens.',
        detail: 'Working around real healthcare operations exposed the gaps between a process on paper and what people actually have to do.',
        evidence: 'Healthcare operations',
      },
      {
        id: 'experience',
        label: 'Experience design',
        short: 'Turn requirements into usable flows.',
        detail: 'UI/UX became the layer where systems thinking turns into understandable journeys, responsive interfaces and digital products.',
        evidence: 'UI/UX · Digital product design',
      },
      {
        id: 'governance',
        label: 'Governance & DGA',
        short: 'Design inside real constraints.',
        detail: 'Governance and digital standards taught me to treat compliance as part of the design problem rather than something added at the end.',
        evidence: 'Digital governance · DGA-oriented work',
      },
      {
        id: 'delivery',
        label: 'AI-assisted delivery',
        short: 'Move from idea to build with less friction.',
        detail: 'Generative AI supports exploration and refinement, while developer handoff keeps the final design connected to what can actually be built.',
        evidence: 'Generative AI workflows · Developer handoff',
      },
    ],
  },
  ar: {
    kicker: 'كيف تكوّن أسلوبي',
    title: 'خمس طبقات. طريقة عمل واحدة.',
    hint: 'اختر طبقة لترى ماذا أضافت لطريقة تصميمي اليوم.',
    detailLabel: 'ماذا أضافت',
    evidenceLabel: 'الدليل',
    nodes: [
      {
        id: 'mis',
        label: 'أساس نظم المعلومات',
        short: 'أفهم النظام قبل الواجهة.',
        detail: 'علّمتني نظم المعلومات أن أقرأ البيانات والاعتماديات وسير العمل قبل القفز إلى قرارات الواجهة.',
        evidence: 'نظم المعلومات الإدارية',
      },
      {
        id: 'operations',
        label: 'الخبرة التشغيلية',
        short: 'أرى أين يحدث الاحتكاك فعلًا.',
        detail: 'العمل مع عمليات صحية حقيقية أظهر لي الفرق بين العملية كما تُكتب وبين ما يضطر الأشخاص إلى فعله على أرض الواقع.',
        evidence: 'عمليات في بيئة صحية',
      },
      {
        id: 'experience',
        label: 'تصميم التجربة',
        short: 'أحوّل المتطلبات إلى تدفقات قابلة للاستخدام.',
        detail: 'أصبح UI/UX الطبقة التي يتحول فيها فهم الأنظمة إلى رحلات واضحة وواجهات متجاوبة ومنتجات رقمية قابلة للاستخدام.',
        evidence: 'UI/UX · تصميم المنتجات الرقمية',
      },
      {
        id: 'governance',
        label: 'الحوكمة وDGA',
        short: 'أصمم داخل القيود الواقعية.',
        detail: 'علّمتني الحوكمة والمعايير الرقمية أن أتعامل مع الامتثال كجزء من مسألة التصميم، لا كإضافة تأتي في النهاية.',
        evidence: 'الحوكمة الرقمية · متطلبات DGA',
      },
      {
        id: 'delivery',
        label: 'تنفيذ مدعوم بالذكاء الاصطناعي',
        short: 'أقلل الاحتكاك بين الفكرة والتنفيذ.',
        detail: 'يساعدني الذكاء الاصطناعي التوليدي في الاستكشاف والتحسين، بينما يحافظ تسليم المطورين على ارتباط التصميم بما يمكن بناؤه فعليًا.',
        evidence: 'تدفقات AI · تسليم المطورين',
      },
    ],
  },
};

export function CareerMap({locale = 'en'}: {locale?: Locale}) {
  const data = copy[locale];
  const rtl = locale === 'ar';
  const [activeId, setActiveId] = useState<string>('experience');
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(0, data.nodes.findIndex((node) => node.id === activeId));
  const active = data.nodes[activeIndex] ?? data.nodes[0];

  const activate = (index: number) => {
    const normalized = (index + data.nodes.length) % data.nodes.length;
    setActiveId(data.nodes[normalized].id);
    buttonRefs.current[normalized]?.focus();
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
    <div className="cvMap" aria-label={rtl ? 'خريطة تكويني المهني' : 'Professional formation map'}>
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
          {data.nodes.map((node, index) => (
            <button
              key={node.id}
              ref={(element) => { buttonRefs.current[index] = element; }}
              type="button"
              className="cvSignal"
              aria-pressed={node.id === activeId}
              onClick={() => setActiveId(node.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="cvSignalIndex">{String(index + 1).padStart(2, '0')}</span>
              <span className="cvSignalLine" aria-hidden="true" />
              <span className="cvSignalCopy">
                <strong>{node.label}</strong>
                <span>{node.short}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="cvMapDetail" aria-live="polite">
          <div className="cvMapDetailNumber" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')}</div>
          <div key={active.id} className="cvMapDetailBody cvMapDetailBodyMotion">
            <span className="cvMapKicker">{data.detailLabel}</span>
            <span className="cvMapActiveLabel">{active.label}</span>
            <strong>{active.short}</strong>
            <p>{active.detail}</p>
            <div className="cvMapEvidence">
              <span>{data.evidenceLabel}</span>
              <b>{active.evidence}</b>
            </div>
          </div>
        </div>
      </div>

      <p className="cvMapHint">{data.hint}</p>
    </div>
  );
}
