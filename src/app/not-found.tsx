import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="shell">
      <section className="pageIntro">
        <div className="eyebrow">404</div>
        <h1>Nothing here.</h1>
        <p className="lede">The page may have moved, or the project is not public.</p>
        <p><Link className="projectLink" href="/work">Back to work</Link></p>
      </section>
    </main>
  );
}
