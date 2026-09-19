import type {Metadata} from 'next';
import Link from 'next/link';
import {SiteHeader} from '@/components/site-header';

export const metadata: Metadata = {
  title: 'عني',
  description: 'عن إبراهيم العجمي، مصمم منتجات رقمية في السعودية يعمل عبر UI/UX وUX Strategy وتصميم الويب وهندسة المعلومات وسير العمل الرقمي ومتطلبات DGA والذكاء الاصطناعي التوليدي.',
  alternates: {
    canonical: '/ar/about',
    languages: {en: '/about', ar: '/ar/about', 'x-default': '/about'},
  },
  openGraph: {url: '/ar/about', title: 'عني — إبراهيم'},
};

const capabilities = [
  'تصميم المنتجات الرقمية',
  'تصميم UI/UX',
  'UX Strategy',
  'تصميم الويب المتجاوب',
  'هندسة المعلومات',
  'Wireframing & Prototyping',
  'Interaction Design',
  'أبحاث المستخدم',
  'اختبارات قابلية الاستخدام',
  'Design Systems',
  'Accessibility & WCAG',
  'الحوكمة الرقمية',
  'متطلبات هيئة الحكومة الرقمية DGA',
  'Generative AI Workflows',
  'Developer Handoff',
];

export default function ArabicAboutPage() {
  return (
    <main id="main" className="shell rtl" dir="rtl" lang="ar">
      <SiteHeader locale="ar" counterpartHref="/about" />

      <section className="pageIntro">
        <div className="eyebrow">عني</div>
        <h1>أصمم من النظام إلى الشاشة.</h1>
        <p className="lede">
          أنا إبراهيم العجمي، مصمم منتجات رقمية في السعودية. أربط بين UI/UX وتصميم الويب وUser Flows وهندسة المعلومات والسياق التشغيلي والتنفيذ.
        </p>
        <Link className="sectionLink" href="#approach-ar">ابدأ بالمنهج</Link>
      </section>

      <section className="section prose" id="approach-ar" aria-labelledby="approach-title-ar">
        <h2 id="approach-title-ar">افهم سير العمل. ثم صمّم الواجهة.</h2>
        <div>
          <p>أبدأ من المستخدمين والمهام والبيانات والاعتماديات والقيود ونقاط التسليم. بعدها أبني User Journey وهندسة المعلومات والواجهة المتجاوبة وحالات التفاعل.</p>
          <p>بهذا تبقى UX Strategy وإمكانية الوصول والحوكمة الرقمية وGenerative AI وDeveloper Handoff مرتبطة بنفس مشكلة المنتج.</p>
          <Link className="sectionLink" href="#capabilities-ar">شاهد القدرات</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="capabilities-ar" aria-labelledby="capabilities-title-ar">
        <div>
          <div className="eyebrow">القدرات</div>
          <h2 id="capabilities-title-ar">منتج وUX وويب وتنفيذ.</h2>
        </div>
        <div>
          <ul className="capabilityList" aria-label="قدرات التصميم">
            {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
          <Link className="sectionLink" href="#current-ar">شاهد أين أطبقها الآن</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="current-ar" aria-labelledby="current-title-ar">
        <div>
          <div className="eyebrow">حاليًا</div>
          <h2 id="current-title-ar">تطبيق UX داخل أنظمة حقيقية.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>مصمم ويب · جامعة الإمام عبدالرحمن بن فيصل</strong>
              <span>أغسطس 2025 — حتى الآن</span>
            </div>
            <p>أجمع بين تصميم الويب وUI/UX وGenerative AI وواجهات قابلة للتطوير ومتطلبات هيئة الحكومة الرقمية داخل بيئة مؤسسية حقيقية.</p>
          </article>
          <Link className="sectionLink" href="#previously-ar">شاهد السياق التشغيلي خلف ذلك</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="previously-ar" aria-labelledby="previously-title-ar">
        <div>
          <div className="eyebrow">سابقًا</div>
          <h2 id="previously-title-ar">التشغيل غيّر ما ألاحظه في UX.</h2>
        </div>
        <div className="aboutStack">
          <article className="credentialItem">
            <div className="credentialTop">
              <strong>منسق مرضى · مستشفى الدكتور سليمان الحبيب</strong>
              <span>أبريل 2025 — أغسطس 2025</span>
            </div>
            <p>عملت مباشرة مع تدفقات إدخال بيانات المرضى ووقت الانتظار ونقاط التسليم والتحقق من البيانات والسجلات الحساسة داخل أنظمة مؤسسية؛ سياق عملي يؤثر اليوم في قراءتي لاحتكاك UX.</p>
          </article>
          <Link className="sectionLink" href="#foundation-ar">شاهد الأساس الرسمي</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="foundation-ar" aria-labelledby="credentials-title-ar">
        <div>
          <div className="eyebrow">الأساس</div>
          <h2 id="credentials-title-ar">أنظمة + UX + AI.</h2>
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
          <Link className="sectionLink" href="#about-contact-ar">جاهز نربطها بمشكلة حقيقية؟</Link>
        </div>
      </section>

      <section className="section aboutSplit" id="about-contact-ar" aria-labelledby="contact-about-title-ar">
        <div>
          <div className="eyebrow">تواصل</div>
          <h2 id="contact-about-title-ar">عندك منتج أو سير عمل يحتاج وضوحًا؟</h2>
        </div>
        <div className="contactActions">
          <Link href="mailto:ibrahim.alajmi407@gmail.com">البريد الإلكتروني</Link>
          <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn</Link>
        </div>
      </section>
    </main>
  );
}
