import {ContactDock} from '@/components/contact-dock';
import {getCareerLayers, getCredentials, profileContact} from '@/lib/professional-profile';
import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {ExperienceNavigation} from '@/components/experience-navigation';
import {ExperienceConsole} from '@/components/experience-console';
import {ArrowRightIcon, MailIcon} from '@/components/icons';

type Locale = 'ar' | 'en';
type Kind = 'about' | 'work' | 'playground';

const pages = {
  ar: {
    about: {tag:'01 / عنّي',title:'التصميم يبدأ بفهم ما وراء الشاشة.',lead:'أنا إبراهيم، مصمم منتجات وتجارب رقمية. خلف قراراتي مزيج من نظم المعلومات والخبرة التشغيلية وتصميم تجربة المستخدم.',cta:'استكشف طريقة تفكيري'},
    work: {tag:'02 / الأعمال',title:'أعمال تستند إلى قرارات حقيقية.',lead:'هنا تُعرض دراسات الحالة المنشورة والمعتمدة فقط، بما فيها المشكلة والدور والقرارات وما يمكن إثباته.',cta:'استكشف قدراتي'},
    playground: {tag:'03 / الاستكشاف',title:'أختبر التفاعل قبل أن أقدمه كحل.',lead:'مساحة لتجارب التفاعل والأنظمة والذكاء الاصطناعي؛ منفصلة بوضوح عن الأعمال المهنية المنشورة.',cta:'اكتشف طريقة العمل'},
    aboutTitle:'من الأنظمة إلى تجربة الاستخدام.',
    workEmptyTitle:'لا توجد دراسات حالة منشورة بعد.',
    workEmpty:'عندما يكون هناك عمل حقيقي مكتمل ومرخّص للعرض، يُنشر هنا من Keystatic. لا تُعرض تجارب افتراضية بوصفها أعمالًا مهنية.',
    playgroundTitle:'نموذج تفاعل حي داخل هذا الموقع',
    playgroundText:'واجهة تفاعلية توضح الانتقال من فهم السياق إلى ربط النظام ثم قرار التصميم. هذا النموذج من تجربة الموقع نفسه، وليس مشروع عميل أو نتيجة موثقة.',
    console:['افهم','اربط','صمّم'],
    contact:'ناقش فكرة أو تجربة رقمية',back:'العودة إلى التجربة',foot:'إبراهيم العجمي · تصميم المنتجات والتجارب الرقمية',
  },
  en: {
    about:{tag:'01 / ABOUT',title:'Design starts behind the screen.',lead:'I am Ibrahim, a digital product and experience designer. My decisions connect information systems, operations and user experience design.',cta:'Explore my approach'},
    work:{tag:'02 / WORK',title:'Work grounded in real decisions.',lead:'Only cleared, published case studies appear here, with the problem, role, decisions and what can genuinely be evidenced.',cta:'Explore my capabilities'},
    playground:{tag:'03 / EXPLORE',title:'Test interaction before calling it a solution.',lead:'Explorations in interaction, systems and AI, clearly separated from published professional work.',cta:'Explore the approach'},
    aboutTitle:'From systems to usable experiences.',
    workEmptyTitle:'No public case studies yet.',
    workEmpty:'When real work is complete and approved for publication, it is added through Keystatic. Fictional demos are never presented as professional work.',
    playgroundTitle:'A live interaction study on this website',
    playgroundText:'An interactive interface illustrating context, system relationships and design decisions. This is part of the site experience, not a client project or independently measured outcome.',
    console:['Understand','Connect','Design'],
    contact:'Discuss a digital experience',back:'Back to experience',foot:'Ibrahim Al-Ajmi · Digital Product & Experience Design',
  },
} as const;

export async function ExperienceInterior({locale, kind}: {locale: Locale; kind: Kind}) {
  const copy = pages[locale];
  const page = copy[kind];
  const ar = locale === 'ar';
  const home = ar ? '/' : '/en';
  const counterpartHref = ar ? '/' + kind : '/ar/' + kind;
  const all = kind !== 'about' ? await getProjects() : [];
  const projects = all.filter(p => kind === 'playground' ? p.classification === 'playground' : p.classification !== 'playground');

  return (
    <main id="main" className="xp xpInterior" lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <ExperienceNavigation locale={locale} counterpartHref={counterpartHref} />
      <section className="xpInnerHero xpShell">
        <p className="xpInnerTag">{page.tag}</p>
        <h1>{page.title}</h1>
        <p>{page.lead}</p>
        <Link className="xpTextLink" href={home + (kind === 'work' ? '#capabilities' : '#approach')}>{page.cta}<ArrowRightIcon aria-hidden="true"/></Link>
      </section>

      {kind === 'about' && <section className="xpInnerBody xpShell" aria-labelledby="xp-about-deep">
        <h2 id="xp-about-deep">{copy.aboutTitle}</h2>
        <div className="xpInsideStatements">{getCareerLayers(locale).map((item,i)=>
          <article key={item.period}>
            <span>0{i+1}</span>
            <p><strong>{item.evidence}</strong><br />{item.text}<small dir="ltr">{item.period}</small></p>
          </article>
        )}</div>
        <div className="xpInsideCredentials">{getCredentials(locale).map((item,i)=>
          <p key={item.title}><span>0{i+1}</span><b dir="auto">{item.title}</b><small>{item.detail}</small></p>
        )}</div>
      </section>}

      {kind === 'work' && <section className="xpInnerBody xpShell" aria-label={ar ? 'دراسات الحالة' : 'Case studies'}>
        {projects.length ? <div className="xpProjectGrid">{projects.map(p=><ProjectCard key={p.projectKey} project={p} locale={locale}/>)}</div> :
          <div className="xpEmptyWork"><span className="xpEmptySymbol" aria-hidden="true">↗</span><div><h2>{copy.workEmptyTitle}</h2><p>{copy.workEmpty}</p></div><span className="xpEmptyLabel">REAL WORK / VERIFIED ONLY</span></div>}
      </section>}

      {kind === 'playground' && <section className="xpInnerBody xpShell" aria-labelledby="xp-playground-lab">
        <div className="xpLabIntro"><span>INTERACTION STUDY / 001</span><h2 id="xp-playground-lab">{copy.playgroundTitle}</h2><p>{copy.playgroundText}</p></div>
        <div className="xpLabFrame"><ExperienceConsole locale={locale} labels={[...copy.console]}/></div>
        {projects.length > 0 && <div className="xpProjectGrid xpLabProjects">{projects.map(p=><ProjectCard key={p.projectKey} project={p} locale={locale}/>)}</div>}
      </section>}

      <section className="xpInnerContact xpShell">
        <p>CONTACT / IBRAHIM</p>
        <a href={"mailto:" + profileContact.email}>{copy.contact}<MailIcon aria-hidden="true"/></a>
      </section>
      <footer className="xpFooter xpShell"><span>{copy.foot}</span><Link href={home}>{copy.back} ↑</Link></footer>
      <ContactDock href={home + '#contact'} label={copy.contact} shortLabel={ar ? 'تواصل' : 'Contact'}/>
    </main>
  );
}
