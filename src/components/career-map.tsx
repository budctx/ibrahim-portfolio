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
    kicker: 'How I got here',
    title: 'Five layers that changed what I notice.',
    hint: 'Choose a layer to see how it changed the way I design today.',
    detailLabel: 'What changed',
    evidenceLabel: 'Evidence',
    nodes: [
      {
        id: 'mis',
        label: 'MIS foundation',
        short: 'I started with systems, not screens.',
        detail: 'MIS taught me to look underneath an interface first: at data, dependencies, workflows and the logic that keeps the whole thing moving.',
        evidence: 'Management Information Systems',
      },
      {
        id: 'operations',
        label: 'Operational experience',
        short: 'Then I saw friction in real life.',
        detail: 'In healthcare operations, a confusing workflow was not a diagram problem. Someone had to deal with it, wait for it or work around it.',
        evidence: 'Healthcare operations',
      },
      {
        id: 'experience',
        label: 'Experience design',
        short: 'Design gave me a way to change it.',
        detail: 'UI/UX became the point where understanding a system could turn into a clearer journey, a usable interface and a better digital experience.',
        evidence: 'UI/UX · Digital product design',
      },
      {
        id: 'governance',
        label: 'Governance & DGA',
        short: 'Constraints became part of the design.',
        detail: 'Governance and digital standards taught me to design with real requirements from the start instead of treating compliance as a final check.',
        evidence: 'Digital governance · DGA-oriented work',
      },
      {
        id: 'delivery',
        label: 'AI-assisted delivery',
        short: 'Then I learned to close the gap to build.',
        detail: 'Generative AI helps me explore and refine faster, while developer handoff keeps the design connected to what a team can actually ship.',
        evidence: 'Generative AI workflows · Developer handoff',
      },
    ],
  },
  ar: {
    kicker: 'كيف وصلت إلى هنا',
    title: 'خمس طبقات غيّرت ما ألاحظه في المنتج.',
    hint: 'اختر طبقة لترى كيف غيّرت طريقة تصميمي اليوم.',
    detailLabel: 'ما الذي تغيّر',
    evidenceLabel: 'الدليل',
    nodes: [
      {
        id: 'mis',
        label: 'أساس نظم المعلومات',
        short: 'بدأت بالأنظمة، لا بالشاشات.',
        detail: 'علّمتني نظم المعلومات أن أنظر أولًا إلى ما تحت الواجهة: البيانات والاعتماديات وسير العمل والمنطق الذي يحرك النظام.',
        evidence: 'نظم المعلومات الإدارية',
      },
      {
        id: 'operations',
        label: 'الخبرة التشغيلية',
        short: 'ثم رأيت الاحتكاك في الواقع.',
        detail: 'في العمل التشغيلي الصحي لم يكن سير العمل المربك مشكلة على مخطط فقط؛ كان هناك شخص ينتظر أو يتعامل معه أو يجد طريقة للالتفاف حوله.',
        evidence: 'عمليات في بيئة صحية',
      },
      {
        id: 'experience',
        label: 'تصميم التجربة',
        short: 'أعطاني التصميم وسيلة لتغييره.',
        detail: 'أصبح UI/UX النقطة التي يتحول عندها فهم النظام إلى رحلة أوضح وواجهة قابلة للاستخدام وتجربة رقمية أفضل.',
        evidence: 'UI/UX · تصميم المنتجات الرقمية',
      },
      {
        id: 'governance',
        label: 'الحوكمة وDGA',
        short: 'أصبحت القيود جزءًا من التصميم.',
        detail: 'علّمتني الحوكمة والمعايير الرقمية أن أصمم مع المتطلبات الواقعية منذ البداية، بدل التعامل مع الامتثال كفحص أخير.',
        evidence: 'الحوكمة الرقمية · متطلبات DGA',
      },
      {
        id: 'delivery',
        label: 'تنفيذ مدعوم بالذكاء الاصطناعي',
        short: 'ثم تعلمت تقليل المسافة إلى التنفيذ.',
        detail: 'يساعدني الذكاء الاصطناعي التوليدي على الاستكشاف والتحسين بسرعة أكبر، بينما يحافظ تسليم المطورين على ارتباط التصميم بما يستطيع الفريق تنفيذه فعلًا.',
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
