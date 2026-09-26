'use client';

import {useState} from 'react';
import {getCareerLayers, type ProfileLocale} from '@/lib/professional-profile';

const words = {
  ar: {label:'استكشف العلاقة بين الأنظمة والتشغيل والتصميم', axes:['الأنظمة','التشغيل','التجربة'], center:'الوضوح', descriptor:'مسار معرفي · ليس خطًا زمنيًا', detail:'ما الذي أضافه هذا المسار؟'},
  en: {label:'Explore the relationship between systems, operations and design',axes:['Systems','Operations','Experience'],center:'Clarity',descriptor:'Connected disciplines · not a timeline',detail:'What did this perspective add?'},
} as const;

/** Career facts are sourced from the CV through getCareerLayers.
 * This graph reveals the relationship among disciplines, not an invented case study.
 */
export function ExperienceTrajectory({locale}: {locale: ProfileLocale}) {
  const [active, setActive] = useState(2);
  const layers = getCareerLayers(locale);
  const c = words[locale];
  const detail = layers[active];

  return (
    <div className="xpTrajectory" data-active={active}>
      <div className="xpTrajectoryNetwork">
        <div className="xpTrajectoryTop">
          <span>DISCIPLINES / 03</span><span>{c.descriptor}</span>
        </div>
        <div className="xpTrajectoryNodes" role="group" aria-label={c.label}>
          {layers.map((item,i)=>
            <button type="button" key={item.period} className="xpTrajectoryNode"
              aria-pressed={active===i} onClick={()=>setActive(i)} data-active={active===i}>
              <span className="xpTrajectoryNodeNo">0{i+1} / {c.axes[i]}</span>
              <strong>{item.title}</strong>
              <small dir="ltr">{item.period}</small>
              <i aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="xpTrajectoryWires" aria-hidden="true">
          <span/><span/><span/>
        </div>
        <div className="xpTrajectoryResolve" aria-hidden="true">
          <span className="xpTrajectoryResolveNode">↗</span>
          <div><small>SHARED METHOD</small><strong>{c.center}</strong></div>
        </div>
      </div>
      <div className="xpTrajectoryDetail" aria-live="polite" aria-atomic="true">
        <span className="xpTrajectoryDetailTag">0{active+1} / {c.detail}</span>
        <div key={active} className="xpTrajectoryContent">
          <h3>{detail.title}</h3>
          <p>{detail.text}</p>
          <small>{detail.evidence}</small>
          <span dir="ltr" className="xpTrajectoryPeriod">{detail.period}</span>
        </div>
        <div className="xpTrajectoryProgress" aria-hidden="true"><i style={{width: `${(active+1)*100/3}%`}}/></div>
      </div>
    </div>
  );
}
