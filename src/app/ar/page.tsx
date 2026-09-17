import Link from 'next/link';
import {getProjects} from '@/lib/sanity';
import {ThemeToggle} from '@/components/theme-toggle';

export default async function ArabicHomePage(){
  const projects = await getProjects();
  const work = projects.filter((project)=>project.classification!=='playground');

  return <main id="main" className="shell rtl" dir="rtl" lang="ar">
    <header className="header">
      <Link className="brand" href="/ar">Ibrahim</Link>
      <nav className="nav" aria-label="التنقل الرئيسي">
        <a href="#work">الأعمال</a>
        <Link href="/ar/playground">التجارب</Link>
        <Link href="/ar/about">عني</Link>
        <a href="#contact">تواصل</a>
        <Link href="/" lang="en">EN</Link>
        <ThemeToggle />
      </nav>
    </header>

    <section className="hero">
      <div>
        <div className="eyebrow">مصمم منتجات وتجارب رقمية</div>
        <h1>التعقيد، بوضوح.</h1>
        <p className="lede">أحوّل الأنظمة وسير العمل المعقدة إلى تجارب رقمية واضحة.</p>
      </div>
      <div className="structure" aria-hidden="true" />
    </section>

    <section className="section" id="work">
      <div className="sectionHead"><h2>أعمال مختارة</h2><span className="eyebrow">الدليل أولًا</span></div>
      {work.length===0 ? <div className="empty">يجري تجهيز الأعمال الحقيقية للنشر.</div> : <div className="projectGrid">{work.map((project)=><Link className="projectCard" key={project.projectKey} href={`/ar/projects/${project.slug}`}><div><div className="eyebrow">{project.classification}</div><h3>{project.titleAr}</h3></div><div className="meta"><span>{project.roleAr ?? ''}</span><span>{project.year ?? ''}</span></div></Link>)}</div>}
    </section>

    <section className="section" id="contact">
      <div className="eyebrow">تواصل</div>
      <p className="contact">لنحوّل التعقيد إلى وضوح.</p>
    </section>

    <footer className="footer"><span>© Ibrahim</span><span>عربي / English · فاتح / داكن</span></footer>
  </main>;
}
