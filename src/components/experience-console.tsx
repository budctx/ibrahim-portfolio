'use client';

import {useEffect, useRef, useState} from 'react';

type Locale = 'ar' | 'en';
const screens = {
  ar: [
    {kicker:'01 / OBSERVE', title:'افهم ما يحدث فعلًا.', description:'المستخدم والهدف والبيانات ونقاط التعثر قبل الواجهة.', signal:'INPUT / CONTEXT', output:'مشكلة محددة'},
    {kicker:'02 / CONNECT', title:'اربط عناصر النظام.', description:'تتحول الأجزاء المبعثرة إلى علاقات وسير عمل قابل للفهم.', signal:'SYSTEM / FLOW', output:'منطق واضح'},
    {kicker:'03 / DESIGN', title:'صمّم ما يساعد المستخدم.', description:'النتيجة ليست شكلًا جديدًا فقط؛ بل قرارًا أوضح وتجربة قابلة للاستخدام.', signal:'INTERFACE / STATE', output:'تجربة مفهومة'},
  ],
  en: [
    {kicker:'01 / OBSERVE', title:'Understand what actually happens.', description:'People, goals, data and friction before the interface.', signal:'INPUT / CONTEXT', output:'A defined problem'},
    {kicker:'02 / CONNECT', title:'Connect the system.', description:'Separate parts become a comprehensible flow and relationship.', signal:'SYSTEM / FLOW', output:'Clear logic'},
    {kicker:'03 / DESIGN', title:'Design for the person using it.', description:'Not just a different screen: a clearer decision and a usable experience.', signal:'INTERFACE / STATE', output:'A usable experience'},
  ],
} as const;

export function ExperienceConsole({locale, labels}: {locale: Locale; labels: string[]}) {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const entries = screens[locale];
  const current = entries[active];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold: .15});
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || manual || !visible) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % entries.length), 8000);
    return () => window.clearInterval(timer);
  }, [entries.length, manual, paused, reduced, visible]);

  function select(index: number) {
    setActive(index);
    setManual(true);
  }

  return (
    <div ref={rootRef} className="xpConsole" data-step={active} onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)}
      onBlurCapture={event => {if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);}}>
      <div className="xpConsoleHead"><span>IBRAHIM / SYSTEM VIEW</span><span className="xpConsoleLive"><i /> INTERACTIVE MODEL</span></div>
      <div className="xpConsoleGraphic" aria-hidden="true">
        <svg viewBox="0 0 460 312" preserveAspectRatio="xMidYMid meet" role="presentation">
          <defs><pattern id="xp-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth=".4" opacity=".28"/></pattern></defs>
          <rect width="460" height="312" fill="url(#xp-grid)" opacity=".5"/>
          <g className="xpGraphicLines" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M62 74H181L230 156H394"/><path d="M62 156H181L230 156V238H394"/><path d="M62 238H181L230 156"/>
          </g>
          <g className="xpGraphicNodes" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="40" y="54" width="44" height="40" rx="4"/><rect x="40" y="136" width="44" height="40" rx="4"/><rect x="40" y="218" width="44" height="40" rx="4"/>
            <circle cx="230" cy="156" r="18"/><rect x="374" y="134" width="44" height="44" rx="4"/>
          </g>
          <g className="xpGraphicAccent" fill="currentColor"><circle cx="62" cy="74" r="3"/><circle cx="62" cy="156" r="3"/><circle cx="62" cy="238" r="3"/><circle cx="230" cy="156" r="4"/><circle cx="396" cy="156" r="4"/></g>
          <g className="xpGraphicLabels" fill="currentColor" fontSize="10" fontFamily="monospace"><text x="40" y="43">01 / INPUT</text><text x="193" y="116">02 / FLOW</text><text x="349" y="122">03 / OUTPUT</text><text x="220" y="290">SIGNAL → DECISION</text></g>
        </svg>
        <div className="xpGraphicMark">0{active + 1}<span> / 03</span></div>
      </div>
      <div className="xpConsoleTabs" role="group" aria-label={locale === 'ar' ? 'استكشف مراحل التصميم' : 'Explore design stages'}>
        {labels.map((label,i) => <button key={label} className={i===active?'is-active':''} type="button"
          aria-pressed={i===active} onClick={() => select(i)}><span>0{i+1}</span>{label}</button>)}
      </div>
      <div className="xpConsoleDetail" aria-live={manual ? 'polite' : 'off'}>
        <span className="xpConsoleKicker">{current.kicker}</span>
        <h2>{current.title}</h2>
        <p>{current.description}</p>
        <div className="xpConsoleResult"><span>{current.signal}</span><b>↗</b><strong>{current.output}</strong></div>
      </div>
      <div className="xpConsoleFoot"><span>INTERACT TO EXPLORE</span><span>{reduced ? 'STATIC / MOTION REDUCED' : manual ? 'MANUAL CONTROL' : 'AUTO / 08 SEC'}</span></div>
    </div>
  );
}
