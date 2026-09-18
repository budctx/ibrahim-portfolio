import type {Metadata} from 'next';
import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';

export const metadata: Metadata = {
  title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
  description: 'أصمم المنتجات الرقمية من فهم النظام إلى وضوح التجربة.',
  alternates: {
    canonical: '/ar',
    languages: {en: '/', ar: '/ar', 'x-default': '/'},
  },
  openGraph: {
    url: '/ar',
    title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
    description: 'أصمم المنتجات الرقمية من فهم النظام إلى وضوح التجربة.',
  },
};

export default async function ArabicHomePage() {
  const projects = await getProjects();
  const work = projects.filter((project) => project.classification !== 'playground').slice(0, 3);
  const hasWork = work.length > 0;

  return (
    <main id="main" className="cvPage cvRtl" dir="rtl" lang="ar">
      <div className="cvFrame">
        <HomeHeader locale="ar" counterpartHref="/" hasWork={hasWork} />

        <section className="cvHero" aria-labelledby="cv-home-title-ar">
          <div className="cvHeroCopy">
            <p className="cvOverline">إبراهيم العجمي · مصمم منتجات وتجارب رقمية</p>
            <h1 id="cv-home-title-ar">أصمم المنتجات الرقمية <em>من فهم النظام إلى وضوح التجربة.</em></h1>
            <p className="cvLede">
              خلفيتي في نظم المعلومات والعمل التشغيلي جعلتني أبدأ من سير العمل والقيود قبل الواجهة، ثم أحوّل التعقيد إلى تجربة يمكن للناس استخدامها ويمكن للفريق تنفيذها.
            </p>
            <div className="cvIdentitySignals" aria-label="التركيز المهني">
              <span>نظم المعلومات</span><span>التشغيل</span><span>UX</span><span>DGA</span><span>تنفيذ مدعوم بالذكاء الاصطناعي</span>
            </div>
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#journey">كيف وصلت إلى هنا <span aria-hidden="true">↙</span></Link>
              <Link className="cvButton" href="#capabilities">كيف أعمل</Link>
            </div>
          </div>

          <CareerMap locale="ar" />
        </section>

        <section className="cvSection" id="about" aria-labelledby="about-title-ar">
          <div className="cvSectionLabel"><span>01</span><span>عني</span></div>
          <div className="cvSectionBody">
            <h2 id="about-title-ar">الواجهة هي آخر طبقة، وليست أولها.</h2>
            <p className="cvBigCopy">
              وصلت إلى التصميم عبر الأنظمة والعمل التشغيلي. لذلك أنظر طبيعيًا إلى ما وراء الشاشة: سير العمل، والأشخاص داخله، والقيود المحيطة به، وما الذي سيحدث بعد أن يغادر التصميم ملفاته.
            </p>
            <div className="cvEvidenceRail" aria-label="أدلة مهنية">
              <div><span>الأساس</span><strong>بكالوريوس نظم معلومات</strong></div>
              <div><span>التشغيل</span><strong>سير عمل في بيئة صحية</strong></div>
              <div><span>الممارسة الحالية</span><strong>تصميم ويب · جامعة الإمام عبدالرحمن</strong></div>
              <div><span>المعايير</span><strong>امتثال لمتطلبات DGA</strong></div>
              <div><span>الشهادات</span><strong>Google UX · Google AI</strong></div>
            </div>
          </div>
        </section>

        <section className="cvSection" id="journey" aria-labelledby="journey-title-ar">
          <div className="cvSectionLabel"><span>02</span><span>الرحلة</span></div>
          <div className="cvSectionBody">
            <h2 id="journey-title-ar">ليست قائمة وظائف. بل سلسلة أشياء تعلمت أن ألاحظها.</h2>
            <div className="cvJourney cvJourneyRefined">
              <article>
                <span className="cvStep">افهم</span>
                <h3>أقرأ النظام</h3>
                <p>علّمتني نظم المعلومات أن أبحث عن البيانات والاعتماديات والعملية التي تقف خلف الواجهة الظاهرة.</p>
              </article>
              <article>
                <span className="cvStep">لاحظ</span>
                <h3>أرى الاحتكاك</h3>
                <p>جعل العمل التشغيلي التسليمات والقيود وسير العمل غير الواضح أشياء ملموسة وليست افتراضات نظرية.</p>
              </article>
              <article>
                <span className="cvStep">شكّل</span>
                <h3>أصمم التغيير</h3>
                <p>أصبح UI/UX الطريقة التي أحوّل بها ما أفهمه عن النظام إلى تجربة أوضح يمكن للناس استخدامها.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cvSection" id="capabilities" aria-labelledby="capabilities-title-ar">
          <div className="cvSectionLabel"><span>03</span><span>المهارات</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title-ar">تظهر قيمة مهاراتي عندما تعمل معًا.</h2>
            <div className="cvCapabilityPairs">
              <div>
                <span>التفكير بالأنظمة</span>
                <strong>قرارات UX أفضل</strong>
                <p>أفهم سير العمل والاعتماديات قبل أن أحدد ما الذي يجب أن تفعله الواجهة.</p>
              </div>
              <div>
                <span>الحوكمة</span>
                <strong>قيود قابلة للاستخدام</strong>
                <p>أحوّل المعايير والمتطلبات إلى تجربة تبقى واضحة وإنسانية.</p>
              </div>
              <div>
                <span>تدفقات AI</span>
                <strong>استكشاف أسرع</strong>
                <p>أستخدم الذكاء الاصطناعي التوليدي لتوسيع الخيارات وتحسينها دون أن أستبدل الحكم التصميمي.</p>
              </div>
              <div>
                <span>تسليم المطورين</span>
                <strong>تصميم قابل للتنفيذ</strong>
                <p>أحافظ على اتصال التصميم بالتنفيذ عبر الحالات والسلوك والتعاون الواضح.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cvSection" id="credentials" aria-labelledby="credentials-title-ar">
          <div className="cvSectionLabel"><span>04</span><span>المؤهلات</span></div>
          <div className="cvSectionBody">
            <h2 id="credentials-title-ar">الجانب الرسمي الذي يدعم الممارسة.</h2>
            <div className="cvCredentials">
              <div><strong>بكالوريوس نظم المعلومات الإدارية</strong><span>جامعة الإمام عبدالرحمن بن فيصل · 2019–2024</span></div>
              <div><strong>مصمم ويب</strong><span>جامعة الإمام عبدالرحمن بن فيصل · أغسطس 2025–الآن</span></div>
              <div><strong>Google UX Design Professional Certificate</strong><span>تأهيل مهني في التصميم المتمحور حول المستخدم وتجربة المنتج.</span></div>
              <div><strong>Google AI Professional Certificate</strong><span>أساس تطبيقي لاستخدام الذكاء الاصطناعي داخل سير العمل المهني.</span></div>
            </div>
          </div>
        </section>

        {hasWork && (
          <section className="cvSection" id="work" aria-labelledby="work-title-ar">
            <div className="cvSectionLabel"><span>05</span><span>الأعمال</span></div>
            <div className="cvSectionBody">
              <div className="cvSectionHead">
                <h2 id="work-title-ar">أعمال مختارة</h2>
                <Link href="/ar/work">عرض كل الأعمال</Link>
              </div>
              <div className="projectGrid">
                {work.map((project) => <ProjectCard project={project} key={project.projectKey} locale="ar" />)}
              </div>
            </div>
          </section>
        )}

        <section className="cvContact" id="contact" aria-labelledby="contact-title-ar">
          <div>
            <span className="cvContactIndex">{hasWork ? '06' : '05'}</span>
            <p className="cvOverline">تواصل</p>
          </div>
          <div>
            <h2 id="contact-title-ar">أعطني سير العمل والقيود والمنطقة الفوضوية بينهما.</h2>
            <p className="cvContactNote">سأبحث عن النظام خلف الشاشة، ثم أجعل التجربة أوضح للاستخدام وأسهل للتنفيذ.</p>
            <div className="cvContactLinks">
              <Link href="mailto:ibrahim.alajmi407@gmail.com">البريد الإلكتروني ↗</Link>
              <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn ↗</Link>
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© Ibrahim</span>
          <span>الأنظمة ← التجربة · عربي / English</span>
        </footer>
      </div>
    </main>
  );
}
