import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';

export const metadata: Metadata = {
  title: 'عني',
  description: 'عن إبراهيم، مصمم منتجات وتجارب رقمية يركز على تحويل التعقيد إلى وضوح.',
  alternates: {
    canonical: '/ar/about',
    languages: {en: '/about', ar: '/ar/about', 'x-default': '/about'},
  },
  openGraph: {url: '/ar/about', title: 'عني — إبراهيم'},
};

export default function ArabicAboutPage() {
  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref="/about" />
      <section className="pageIntro">
        <div className="eyebrow">عني</div>
        <h1>الوضوح هو العمل.</h1>
        <p className="lede">أصمم المنتجات والتجارب الرقمية بتحويل الأنظمة وسير العمل والقيود المعقدة إلى واجهات يمكن فهمها واستخدامها بسهولة.</p>
      </section>
      <section className="section prose" aria-labelledby="approach-title-ar">
        <h2 id="approach-title-ar">المنهج</h2>
        <p>البنية أولًا. الدليل قبل الزخرفة. والحركة فقط عندما تشرح حالة أو نية أو استمرارية.</p>
        <p>يبقى التاريخ المهني عنصرًا ثانويًا؛ الأعمال وطريقة التفكير خلفها تأتي أولًا.</p>
      </section>
    </main>
  );
}
