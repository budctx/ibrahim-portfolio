'use client';

import {useState} from 'react';

type Locale = 'en' | 'ar';

type Node = {
  id: string;
  label: string;
  short: string;
  detail: string;
};

const copy: Record<Locale, {center: string; centerDetail: string; nodes: Node[]; hint: string}> = {
  en: {
    center: 'Systems thinking',
    centerDetail: 'The foundation behind how I understand, design and deliver digital experiences.',
    hint: 'Choose a signal to see how it shaped my work.',
    nodes: [
      {id: 'mis', label: 'MIS foundation', short: 'Systems & data', detail: 'A foundation in information systems shaped how I read workflows, dependencies and data before designing the interface.'},
      {id: 'operations', label: 'Operational experience', short: 'Real workflows', detail: 'Working around real operational processes taught me that good interfaces only work when they respect the system behind them.'},
      {id: 'experience', label: 'Experience design', short: 'Clear interfaces', detail: 'UI/UX became the layer where systems thinking turns into understandable flows, responsive interfaces and usable digital products.'},
      {id: 'governance', label: 'Governance & DGA', short: 'Real constraints', detail: 'Designing within standards and governance constraints strengthened my ability to balance clarity, compliance and implementation.'},
      {id: 'ai', label: 'AI workflows', short: 'Faster delivery', detail: 'Generative AI is part of my workflow for exploration, refinement and faster delivery — not a substitute for design judgment.'},
      {id: 'delivery', label: 'Delivery & collaboration', short: 'From design to build', detail: 'Developer handoff and cross-functional collaboration keep design decisions connected to what is actually shipped.'},
    ],
  },
  ar: {
    center: 'التفكير بالأنظمة',
    centerDetail: 'الأساس الذي أبني عليه فهمي وتصميمي وتنفيذي للتجارب الرقمية.',
    hint: 'اختر عنصرًا لترى كيف ساهم في تكوين أسلوبي.',
    nodes: [
      {id: 'mis', label: 'أساس نظم المعلومات', short: 'الأنظمة والبيانات', detail: 'منحتني نظم المعلومات أساسًا لفهم سير العمل والاعتماديات والبيانات قبل التفكير في شكل الواجهة.'},
      {id: 'operations', label: 'خبرة تشغيلية', short: 'سير عمل حقيقي', detail: 'العمل مع عمليات فعلية علّمني أن الواجهة الجيدة لا تنجح إن تجاهلت النظام الذي تعمل بداخله.'},
      {id: 'experience', label: 'تصميم التجربة', short: 'واجهات أوضح', detail: 'أصبح UI/UX الطبقة التي أحوّل فيها فهم الأنظمة إلى تدفقات مفهومة وواجهات متجاوبة ومنتجات قابلة للاستخدام.'},
      {id: 'governance', label: 'الحوكمة وDGA', short: 'قيود واقعية', detail: 'العمل ضمن المعايير والحوكمة عزز قدرتي على الموازنة بين الوضوح والامتثال وقابلية التنفيذ.'},
      {id: 'ai', label: 'تدفقات عمل بالذكاء الاصطناعي', short: 'تنفيذ أسرع', detail: 'أستخدم الذكاء الاصطناعي التوليدي للاستكشاف والتحسين وتسريع التنفيذ، دون أن يحل محل الحكم التصميمي.'},
      {id: 'delivery', label: 'التسليم والتعاون', short: 'من التصميم للتنفيذ', detail: 'التسليم للمطورين والتعاون مع الفرق يحافظان على اتصال القرار التصميمي بما يتم بناؤه فعليًا.'},
    ],
  },
};

export function CareerMap({locale = 'en'}: {locale?: Locale}) {
  const data = copy[locale];
  const [activeId, setActiveId] = useState<string>('experience');
  const active = data.nodes.find((node) => node.id === activeId) ?? data.nodes[0];

  return (
    <div className="cvMap" aria-label={locale === 'ar' ? 'خريطة تكويني المهني' : 'Professional formation map'}>
      <div className="cvMapGrid">
        {data.nodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            className={"cvSignal cvSignal" + (index + 1)}
            aria-pressed={node.id === activeId}
            onClick={() => setActiveId(node.id)}
          >
            <span className="cvSignalIndex">{String(index + 1).padStart(2, '0')}</span>
            <strong>{node.label}</strong>
            <span>{node.short}</span>
          </button>
        ))}
        <div className="cvCore" aria-hidden="true">
          <span className="cvCoreDot" />
          <strong>{data.center}</strong>
          <span>{data.centerDetail}</span>
        </div>
      </div>

      <div className="cvMapDetail" aria-live="polite">
        <div>
          <span className="cvMapKicker">{locale === 'ar' ? 'العلاقة' : 'Connection'}</span>
          <strong>{active.label}</strong>
        </div>
        <p>{active.detail}</p>
      </div>
      <p className="cvMapHint">{data.hint}</p>
    </div>
  );
}
