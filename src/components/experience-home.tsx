import {ExperienceTrajectory} from '@/components/experience-trajectory';
import {ContactDock} from '@/components/contact-dock';
import {getCredentials, profileContact} from '@/lib/professional-profile';
import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {ExperienceNavigation} from '@/components/experience-navigation';
import {ExperienceConsole} from '@/components/experience-console';
import {
  ArrowDownRightIcon, ArrowRightIcon, GraduationCapIcon, WorkflowIcon,
  BriefcaseIcon, GoogleBrandIcon, LinkedInBrandIcon, MailIcon,
} from '@/components/icons';

type Locale = 'ar' | 'en';
const narratives = {
  ar: {
    home: '/', other: '/en', otherLabel: 'English', langLabel: 'Switch to English',
    nav: ['الفكرة', 'الرحلة', 'القدرات', 'المؤهلات', 'الأعمال'],
    eyebrow: 'إبراهيم العجمي / مصمم منتجات وتجارب رقمية',
    titleA: 'أفهم التعقيد.',
    titleB: 'وأصمم له وضوحًا.',
    lede: 'أربط المستخدم وسير العمل والبيانات في تجربة رقمية مفهومة، من أول قرار إلى واجهة قابلة للتنفيذ.',
    explore: 'اكتشف طريقة تفكيري', coordinate: 'السعودية · تصميم المنتجات الرقمية · UI/UX',
    introTag: '01 / المنهج', introTitle: 'ليست المسألة أين نضع الزر. بل ماذا يجب أن يحدث قبله وبعده.',
    introText: 'أبدأ من منطق التجربة: من يستخدم النظام؟ أين يتعطل التدفق؟ وما الذي يحتاجه الشخص ليكمل مهمته بثقة؟ ثم أعيد بناء الواجهة حول الإجابة.',
    principles: [
      {num:'01',title:'أفهم السياق',text:'المستخدم والهدف والقيود ونقاط التسليم قبل أي شاشة.'},
      {num:'02',title:'أربط العلاقات',text:'البيانات والاعتماديات وحالات الاستخدام في تدفق واحد.'},
      {num:'03',title:'أصمم القرار',text:'واجهة واضحة، تفاعل مفهوم، ومواصفات يمكن تنفيذها.'},
    ],
    journeyTag: '02 / التكوين', journeyTitle: 'مسارات مختلفة. طريقة تفكير واحدة.',
    journeyText: 'ما تعلّمته في الأنظمة والتشغيل والتصميم يجتمع في طريقة واحدة لحل المشكلات.',
    capabilityTag:'03 / ما أقدمه', capabilityTitle:'أحوّل الفهم إلى قرارات قابلة للبناء.',
    capabilityText:'ليست مهارات متفرقة؛ بل طبقات مترابطة من تعريف المشكلة حتى التسليم.',
    capabilities:[
      {number:'01',category:'DISCOVER',title:'فهم التجربة',text:'UX Research · User Flows · Information Architecture'},
      {number:'02',category:'DESIGN',title:'تشكيل الواجهة',text:'UI/UX · Prototyping · Responsive Web · Design Systems'},
      {number:'03',category:'ALIGN',title:'التصميم ضمن القيود',text:'Accessibility · Digital Governance · DGA requirements'},
      {number:'04',category:'DELIVER',title:'تقريب الفكرة من التنفيذ',text:'Developer Handoff · Generative AI Workflows · Specifications'},
    ],
    credentialsTag:'04 / الأساس المعرفي',credentialsTitle:'معرفة تدعم الممارسة.',
    workTag:'05 / الأعمال',workTitle:'العمل الحقيقي يتكلم عن نفسه.',
    workText:'تُضاف دراسات الحالة هنا بعد اكتمال توثيقها واعتمادها للنشر. يمكنك الآن استكشاف طريقة تفكيري وقدراتي داخل هذه التجربة نفسها.',
    emptyTitle:'لا توجد أعمال منشورة حاليًا.',emptyText:'لن أعرض مشروعًا افتراضيًا بوصفه عملًا حقيقيًا. بنية الأعمال جاهزة لإضافة الحالات المستقبلية دون إعادة تصميم.',
    workLink:'تصفح الأعمال',
    contactTag:'06 / تواصل',contactTitle:'عندك تحدٍ يحتاج وضوحًا؟',
    contactText:'أرسل لي سياق المنتج أو سير العمل أو تجربة المستخدم التي تعمل عليها. نبدأ من المشكلة، لا من شكل الشاشة.',
    email:'راسلني بالبريد',linkedin:'الملف المهني',contactFloat:'انتقل إلى التواصل',footer:'إبراهيم العجمي · تصميم المنتجات والتجارب الرقمية',
    console:['افهم','اربط','صمّم'],
  },
  en: {
    home: '/en', other: '/', otherLabel: 'العربية', langLabel: 'التبديل إلى العربية',
    nav: ['Approach', 'Journey', 'Capabilities', 'Credentials', 'Work'],
    eyebrow: 'Ibrahim Al-Ajmi / Digital Product & Experience Designer',
    titleA: 'Understand complexity.',
    titleB: 'Design for clarity.',
    lede: 'I connect people, workflows and data into digital experiences that make sense — from the first decision to a buildable interface.',
    explore: 'Explore my thinking', coordinate: 'Saudi Arabia · Digital products · UI/UX',
    introTag: '01 / APPROACH', introTitle: 'It is not just where the button goes. It is what happens before and after it.',
    introText: 'I start with the logic of the experience: who uses the system, where the flow breaks, and what they need to finish with confidence. Then the interface follows.',
    principles: [
      {num:'01',title:'Read the context',text:'People, goals, constraints and handoffs before screens.'},
      {num:'02',title:'Connect the system',text:'Data, dependencies and use cases in one coherent flow.'},
      {num:'03',title:'Design the decision',text:'Clear interfaces, understandable interactions and implementable states.'},
    ],
    journeyTag:'02 / FORMATION',journeyTitle:'Different disciplines. One way of thinking.',
    journeyText:'Systems, operations and design come together in how I approach problems.',
    capabilityTag:'03 / CAPABILITIES',capabilityTitle:'Turning understanding into buildable decisions.',
    capabilityText:'Not isolated skills — connected layers from framing through delivery.',
    capabilities:[
      {number:'01',category:'DISCOVER',title:'Understand the experience',text:'UX Research · User Flows · Information Architecture'},
      {number:'02',category:'DESIGN',title:'Shape the interface',text:'UI/UX · Prototyping · Responsive Web · Design Systems'},
      {number:'03',category:'ALIGN',title:'Design within constraints',text:'Accessibility · Digital Governance · DGA requirements'},
      {number:'04',category:'DELIVER',title:'Move closer to implementation',text:'Developer Handoff · Generative AI Workflows · Specifications'},
    ],
    credentialsTag:'04 / FOUNDATION',credentialsTitle:'Knowledge behind the practice.',
    workTag:'05 / WORK',workTitle:'Let real work speak for itself.',
    workText:'Case studies appear here once documented and cleared for publication. For now, this experience itself reveals how I think and what I do.',
    emptyTitle:'No public work yet.',emptyText:'A fictional project will never be presented as a real case study. The content system is ready for future work without redesign.',
    workLink:'Explore all work',
    contactTag:'06 / CONTACT',contactTitle:'A challenge worth making clear?',
    contactText:'Send the context behind your product, workflow or user experience. We can start with the problem, not the screen.',
    email:'Send an email',linkedin:'Professional profile',contactFloat:'Jump to contact',footer:'Ibrahim Al-Ajmi · Digital Product & Experience Design',
    console:['Understand','Connect','Design'],
  },
} as const;

export async function ExperienceHome({locale}: {locale: Locale}) {
  const c = narratives[locale];
  const projects = (await getProjects()).filter((project) => project.classification !== 'playground').slice(0, 3);
  const ar = locale === 'ar';
  return (
    <main id="main" className="xp" lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <ExperienceNavigation locale={locale} counterpartHref={c.other} isHome />

      <section className="xpHero xpShell" aria-labelledby="xp-title">
        <div className="xpHeroCopy">
          <div className="xpEyebrow"><span className="xpPulse" aria-hidden="true" />{c.eyebrow}</div>
          <h1 id="xp-title"><span>{c.titleA}</span><em>{c.titleB}</em></h1>
          <p className="xpLead">{c.lede}</p>
          <a className="xpPrimaryLink" href="#approach">{c.explore}<ArrowDownRightIcon aria-hidden="true" /></a>
          <div className="xpHeroMeta"><span>01—06 / EXPERIENCE</span><span>{c.coordinate}</span></div>
        </div>
        <ExperienceConsole locale={locale} labels={[...c.console]} />
      </section>

      <div className="xpTicker" aria-hidden="true"><div className="xpShell">
        <span>RESEARCH</span><span>→</span><span>SYSTEMS</span><span>→</span><span>INTERACTION</span><span>→</span><span>DELIVERY</span>
      </div></div>

      <section className="xpSection xpShell" id="approach" aria-labelledby="xp-approach-title">
        <div className="xpSectionIndex"><span>{c.introTag}</span><span className="xpVerticalLine" /></div>
        <div className="xpSectionContent">
          <h2 id="xp-approach-title" className="xpStatement">{c.introTitle}</h2>
          <p className="xpSectionLead">{c.introText}</p>
          <div className="xpPrinciples">{c.principles.map((item)=>
            <article className="xpPrinciple" key={item.num}>
              <span>{item.num} /</span><h3>{item.title}</h3><p>{item.text}</p>
            </article>
          )}</div>
        </div>
      </section>

      <section className="xpBand" id="journey" aria-labelledby="xp-journey-title"><div className="xpShell xpBandInner">
        <div className="xpSectionIndex">{c.journeyTag}</div>
        <div className="xpSectionContent">
          <h2 id="xp-journey-title" className="xpDisplay">{c.journeyTitle}</h2>
          <p className="xpSectionLead">{c.journeyText}</p>
          <ExperienceTrajectory locale={locale}/>
        </div>
      </div></section>

      <section className="xpSection xpShell" id="capabilities" aria-labelledby="xp-capability-title">
        <div className="xpSectionIndex">{c.capabilityTag}</div>
        <div className="xpSectionContent">
          <h2 id="xp-capability-title" className="xpDisplay">{c.capabilityTitle}</h2>
          <p className="xpSectionLead">{c.capabilityText}</p>
          <div className="xpCapabilities">{c.capabilities.map(item=>
            <article key={item.number} className="xpCapability">
              <div className="xpCapTop"><span>{item.number}</span><span>{item.category}</span><ArrowRightIcon aria-hidden="true" /></div>
              <h3>{item.title}</h3><p dir="auto">{item.text}</p>
            </article>
          )}</div>
        </div>
      </section>

      <section className="xpSection xpShell" id="credentials" aria-labelledby="xp-credentials-title">
        <div className="xpSectionIndex">{c.credentialsTag}</div>
        <div className="xpSectionContent">
          <h2 id="xp-credentials-title" className="xpDisplay">{c.credentialsTitle}</h2>
          <div className="xpCredentials">{getCredentials(locale).map((item,i)=>
            <div key={item.issuer} className="xpCredential">
              <span className="xpCredentialIcon" aria-hidden="true">{i === 0 ? <GraduationCapIcon /> : <GoogleBrandIcon />}</span>
              <div><small>{item.issuer}</small><h3 dir="auto">{item.title}</h3><p>{item.detail}</p></div>
            </div>
          )}</div>
        </div>
      </section>

      <section className="xpBand xpWork" id="work" aria-labelledby="xp-work-title"><div className="xpShell xpBandInner">
        <div className="xpSectionIndex">{c.workTag}</div>
        <div className="xpSectionContent">
          <h2 id="xp-work-title" className="xpDisplay">{c.workTitle}</h2>
          <p className="xpSectionLead">{c.workText}</p>
          {projects.length ? (
            <div className="xpProjectGrid">{projects.map(project=><ProjectCard project={project} key={project.projectKey} locale={locale}/>)}</div>
          ) : <div className="xpEmptyWork"><span className="xpEmptySymbol" aria-hidden="true">↗</span>
            <div><h3>{c.emptyTitle}</h3><p>{c.emptyText}</p></div>
            <span className="xpEmptyLabel">CONTENT / REAL ONLY</span></div>}
          <Link className="xpTextLink" href={ar ? '/ar/work' : '/work'}>{c.workLink}<ArrowRightIcon aria-hidden="true" /></Link>
        </div>
      </div></section>

      <section className="xpContact xpShell" id="contact" aria-labelledby="xp-contact-title">
        <span className="xpContactTag">{c.contactTag}</span>
        <h2 id="xp-contact-title">{c.contactTitle}</h2>
        <p>{c.contactText}</p>
        <div className="xpContactActions">
          <a className="xpPrimaryLink" href={"mailto:" + profileContact.email}><MailIcon aria-hidden="true" />{c.email}<ArrowRightIcon aria-hidden="true" /></a>
          <a className="xpSecondaryLink" href={profileContact.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInBrandIcon aria-hidden="true" />{c.linkedin}<span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <footer className="xpFooter xpShell"><span>{c.footer}</span><a href="#main">{ar ? 'العودة للأعلى' : 'Back to top'} ↑</a></footer>
      <ContactDock href="#contact" label={c.contactFloat} shortLabel={ar ? 'تواصل' : 'Contact'}/>
    </main>
  );
}
