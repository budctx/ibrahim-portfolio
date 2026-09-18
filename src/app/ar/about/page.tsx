import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '@/components/site-header';

export const metadata: Metadata = {
  title: 'عني',
  description: 'عن إبراهيم العجمي، مصمم منتجات وتجارب رقمية بخلفية في نظم المعلومات الإدارية وتصميم تجربة المستخدم والويب وسير العمل الرقمي.',
  alternates: {
    canonical: '/ar/about',
    languages: {en: '/about', ar: '/ar/about', 'x-default': '/about'},
  },
  openGraph: {url: '/ar/about', title: 'عني — إبراهيم'},
};

const capabilities = [
  'تصميم UI/UX',
  'تصميم المنتجات الرقمية',
  'التصميم المتجاوب',
  'Wireframing & Prototyping',
  'أبحاث المستخدم',
  'هندسة المعلومات',
  'اختبارات قابلية الاستخدام',
  'الهوية البصرية',
  'سير عمل الذكاء الاصطناعي التوليدي',
  'تسليم التصميم للمطورين',
  'الامتثال لمعايير هيئة الحكومة الرقمية',
];

export default function ArabicAboutPage() {
  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref="/about" />

      <section className="pageIntro">
        <div className="eyebrow">عني</div>
        <h1>تفكير بالأنظمة، يتحول إلى تجربة.</h1>
        <p className="lede">
          أنا إبراهيم العجمي، مصمم منتجات وتجارب رقمية بخلفية في نظم المعلومات الإدارية. أربط بين سير العمل واحتياجات المستخدم وقيود التنفيذ لصناعة تجارب رقمية واضحة.
        </p>
      </section>

      <section className="section prose" aria-labelledby="approach-title-ar">
        <h2 id="approach-title-ar">المنهج</h2>
        <div>
          <p>أبدأ من البنية قبل الواجهة: أفهم سير العمل، أخفف نقاط الاحتكاك، ثم أحول النتيجة إلى تصميم متجاوب وقابل للتنفيذ.</p>
          <p>عملي الحالي يجمع بين تجربة المستخدم وتصميم الويب والحوكمة الرقمية وسير العمل المدعوم بالذكاء الاصطناعي التوليدي لتسريع التنفيذ دون خسارة الوضوح أو جودة التسليم.</p>
        </div>
      </section>

      <section className="section aboutSplit" aria-labelledby="capabilities-title-ar">
        <div>
          <div className="eyebrow">القدرات</div>
          <h2 id="capabilities-title-ar">مجالات أعمل عبرها.</h2>
        </div>
        <ul className="capabilityList" aria-label="قدرات التصميم">
          {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
      </section>

      <section className="section aboutSplit" aria-labelledby="current-title-ar">
        <div>
          <div className="eyebrow">حاليًا</div>
          <h2 id="current-title-ar">تصميم داخل أنظمة حقيقية.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>مصمم ويب · جامعة الإمام عبدالرحمن بن فيصل</strong>
              <span>أغسطس 2025 — حتى الآن</span>
            </div>
            <p>دمج سير عمل الذكاء الاصطناعي التوليدي مع أدوات التصميم لتسريع تسليم مكونات واجهات جاهزة للتطوير، مع مواءمة الواجهات مع متطلبات هيئة الحكومة الرقمية وتقليل الاحتكاك في تجربة المستخدم.</p>
          </article>
        </div>
      </section>

      <section className="section aboutSplit" aria-labelledby="previously-title-ar">
        <div>
          <div className="eyebrow">سابقًا</div>
          <h2 id="previously-title-ar">السياق التشغيلي يصنع فرقًا.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>منسق مرضى · مستشفى الدكتور سليمان الحبيب</strong>
              <span>أبريل 2025 — أغسطس 2025</span>
            </div>
            <p>أعدت تنظيم تدفقات إدخال بيانات المرضى لتقليل وقت بدء الخدمة، وعززت ممارسات التحقق من البيانات الحساسة داخل الأنظمة المؤسسية.</p>
          </article>
        </div>
      </section>

      <section className="section aboutSplit" aria-labelledby="credentials-title-ar">
        <div>
          <div className="eyebrow">الأساس</div>
          <h2 id="credentials-title-ar">أنظمة + تصميم.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>بكالوريوس نظم المعلومات الإدارية</strong>
              <span>2019 — 2024</span>
            </div>
            <p>جامعة الإمام عبدالرحمن بن فيصل · الخبر، السعودية</p>
          </article>
          <article className="credentialItem">
            <div className="credentialTop"><strong>Google AI Professional Certificate</strong></div>
          </article>
          <article className="credentialItem">
            <div className="credentialTop"><strong>Google UX Design Professional Certificate</strong></div>
          </article>
        </div>
      </section>

      <section className="section aboutSplit" aria-labelledby="contact-about-title-ar">
        <div>
          <div className="eyebrow">تواصل</div>
          <h2 id="contact-about-title-ar">متاح لأعمال رقمية ذات معنى.</h2>
        </div>
        <div className="contactActions">
          <Link href="mailto:ibrahim.alajmi407@gmail.com">البريد الإلكتروني</Link>
          <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn</Link>
        </div>
      </section>
    </main>
  );
}
