'use client';

import {useEffect, useRef} from 'react';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function StructureField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scrollFrame = 0;
    let pointerFrame = 0;

    const applyResolvedState = () => {
      field.style.setProperty('--signal-opacity', '0.2');
      field.style.setProperty('--connection-opacity', '0.32');
      field.style.setProperty('--structure-opacity', '1');
      field.style.setProperty('--structure-scale', '1');
      field.style.setProperty('--field-shift-x', '0px');
      field.style.setProperty('--field-shift-y', '0px');
    };

    const updateScroll = () => {
      scrollFrame = 0;

      if (reducedMotion.matches) {
        applyResolvedState();
        return;
      }

      const hero = field.closest<HTMLElement>('.heroExperience');
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const travel = Math.max(window.innerHeight * 0.72, hero.offsetHeight * 0.68);
      const progress = clamp(-rect.top / travel);
      const connection = 0.18 + Math.sin(progress * Math.PI) * 0.72;

      field.style.setProperty('--signal-opacity', String(0.94 - progress * 0.72));
      field.style.setProperty('--connection-opacity', String(connection));
      field.style.setProperty('--structure-opacity', String(0.2 + progress * 0.8));
      field.style.setProperty('--structure-scale', String(0.965 + progress * 0.035));
      field.dataset.resolve = progress > 0.72 ? 'structure' : progress > 0.22 ? 'connection' : 'signal';
    };

    const scheduleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScroll);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === 'touch') return;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);

      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        const x = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 22;
        const y = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 16;
        field.style.setProperty('--field-shift-x', x.toFixed(2) + 'px');
        field.style.setProperty('--field-shift-y', y.toFixed(2) + 'px');
      });
    };

    const onMotionPreference = () => {
      if (reducedMotion.matches) applyResolvedState();
      else updateScroll();
    };

    updateScroll();
    window.addEventListener('scroll', scheduleScroll, {passive: true});
    window.addEventListener('resize', scheduleScroll);
    window.addEventListener('pointermove', onPointerMove, {passive: true});
    reducedMotion.addEventListener('change', onMotionPreference);

    return () => {
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener('scroll', scheduleScroll);
      window.removeEventListener('resize', scheduleScroll);
      window.removeEventListener('pointermove', onPointerMove);
      reducedMotion.removeEventListener('change', onMotionPreference);
    };
  }, []);

  return (
    <div className="structureField signalField" aria-hidden="true" ref={fieldRef} data-resolve="signal">
      <svg
        className="structureFieldSvg structureFieldDesktop"
        viewBox="0 0 1200 820"
        fill="none"
        focusable="false"
      >
        <g className="signalLayer" fill="currentColor">
          <circle cx="86" cy="126" r="7" />
          <circle cx="238" cy="88" r="4" />
          <circle cx="360" cy="196" r="5" />
          <circle cx="1028" cy="120" r="6" />
          <circle cx="1114" cy="270" r="4" />
          <circle cx="920" cy="244" r="5" />
          <circle cx="136" cy="604" r="5" />
          <circle cx="294" cy="716" r="7" />
          <circle cx="994" cy="664" r="5" />
          <circle cx="1110" cy="728" r="7" />
          <rect x="184" y="308" width="11" height="11" />
          <rect x="1032" y="472" width="12" height="12" />
        </g>

        <g className="signalLayer signalFragments" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke">
          <path d="M54 210h128m-64-64v126M286 132h104m-52-52v104M940 86h124m-62-48v102" />
          <path d="M62 540h118m-59-54v108M1010 554h120m-60-60v120M268 642h98m-49-49v98" />
          <path d="M786 180h76M820 142v78M426 666h86M470 624v84" />
        </g>

        <g className="connectionLayer" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke">
          <path d="M86 126H238V88H360V196H478" />
          <path d="M1028 120H918v124H780" />
          <path d="M136 604h158v112h176V598h132" />
          <path d="M1110 728H994v-64H842V548H724" />
          <path d="M184 314h132v94h156M1038 478H906v-70H738" />
          <path d="M478 196v116h92M780 244v68h-70M602 598V508h84" />
        </g>

        <g className="structureLayer" stroke="currentColor" strokeWidth="1.35" vectorEffect="non-scaling-stroke">
          <rect x="468" y="214" width="314" height="386" />
          <rect x="510" y="258" width="230" height="298" opacity=".42" />
          <path d="M468 340H350v142h118M782 340h118v142H782" opacity=".72" />
          <path d="M574 214V120h102v94M574 600v94h102v-94" opacity=".72" />
          <path d="M510 356h230M510 456h230M582 258v298M668 258v298" opacity=".28" />
        </g>

        <g className="structureLayer structureCore" fill="currentColor">
          <circle cx="625" cy="407" r="8" />
          <circle cx="468" cy="340" r="4" />
          <circle cx="782" cy="482" r="4" />
          <circle cx="574" cy="214" r="4" />
          <circle cx="676" cy="600" r="4" />
        </g>
      </svg>

      <svg
        className="structureFieldSvg structureFieldMobile"
        viewBox="0 0 420 680"
        fill="none"
        focusable="false"
      >
        <g className="signalLayer" fill="currentColor">
          <circle cx="42" cy="82" r="5" />
          <circle cx="142" cy="48" r="4" />
          <circle cx="350" cy="92" r="5" />
          <circle cx="382" cy="230" r="4" />
          <circle cx="48" cy="486" r="5" />
          <circle cx="128" cy="620" r="6" />
          <circle cx="354" cy="590" r="5" />
          <rect x="62" y="264" width="9" height="9" />
          <rect x="350" y="394" width="9" height="9" />
        </g>

        <g className="connectionLayer" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke">
          <path d="M42 82h100V48h72v106h42" />
          <path d="M350 92h-78v112h-52" />
          <path d="M48 486h80v134h84v-92h52" />
          <path d="M354 590h-90v-62h-52" />
          <path d="M66 268h70v72h44M354 398h-70v-58h-44" />
        </g>

        <g className="structureLayer" stroke="currentColor" strokeWidth="1.3" vectorEffect="non-scaling-stroke">
          <rect x="92" y="176" width="236" height="330" />
          <rect x="124" y="214" width="172" height="254" opacity=".42" />
          <path d="M92 308H42v88h50M328 282h48v88h-48" opacity=".72" />
          <path d="M166 176v-66h88v66M166 506v68h88v-68" opacity=".72" />
          <path d="M124 304h172M124 388h172M180 214v254M242 214v254" opacity=".28" />
        </g>

        <g className="structureLayer structureCore" fill="currentColor">
          <circle cx="210" cy="341" r="7" />
          <circle cx="92" cy="308" r="4" />
          <circle cx="328" cy="370" r="4" />
        </g>
      </svg>

      <div className="signalFieldReadout" aria-hidden="true">
        <span>signal</span>
        <span>resolve</span>
        <span>structure</span>
      </div>
    </div>
  );
}
