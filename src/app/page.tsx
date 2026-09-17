import Link from 'next/link';
import {getProjects} from '@/lib/sanity';
import {ThemeToggle} from '@/components/theme-toggle';

export default async function HomePage(){
  const projects = await getProjects();
  const work = projects.filter((project)=>project.classification!=='playground');

  return <main id="main" className="shell">
    <header className="header">
      <Link className="brand" href="/">Ibrahim</Link>
      <nav className="nav" aria-label="Primary">
        <a href="#work">Work</a>
        <Link href="/playground">Playground</Link>
        <Link href="/about">About</Link>
        <a href="#contact">Contact</a>
        <Link href="/ar" lang="ar">AR</Link>
        <ThemeToggle />
      </nav>
    </header>

    <section className="hero">
      <div>
        <div className="eyebrow">Digital Product & Experience Designer</div>
        <h1>Complexity, resolved.</h1>
        <p className="lede">I turn complex systems and workflows into clear digital experiences.</p>
      </div>
      <div className="structure" aria-hidden="true" />
    </section>

    <section className="section" id="work">
      <div className="sectionHead"><h2>Selected work</h2><span className="eyebrow">Evidence first</span></div>
      {work.length===0 ? <div className="empty">Real work is being prepared for publication.</div> : <div className="projectGrid">{work.map((project)=><Link className="projectCard" key={project.projectKey} href={`/projects/${project.slug}`}><div><div className="eyebrow">{project.classification}</div><h3>{project.titleEn}</h3></div><div className="meta"><span>{project.roleEn ?? ''}</span><span>{project.year ?? ''}</span></div></Link>)}</div>}
    </section>

    <section className="section" id="contact">
      <div className="eyebrow">Contact</div>
      <p className="contact">Let&apos;s make complex things clear.</p>
    </section>

    <footer className="footer"><span>© Ibrahim</span><span>EN / AR · Light / Dark</span></footer>
  </main>;
}
