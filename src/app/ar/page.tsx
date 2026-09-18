import type {Metadata} from 'next';
import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';

export const metadata: Metadata = {
  title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
  description: 'أحوّل الأنظمة وسير العمل المعقدة إلى تجارب رقمية واضحة.',
  alternates: {
    canonical: '/ar',
    languages: {en: '/', ar: '/ar', 'x-default': '/'},
  },
  openGraph: {
    url: '/ar',
    title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
    description: 'أحوّل الأنظمة وسير العمل المعقدة إلى تجارب رقمية واضحة.',
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
            <p className="cvOverline">أنظمة · أشخاص · تصميم · أثر حقيقي</p>
            <h1 id="cv-home-title-ar">أحوّل التعقيد إلى <em>تجارب رقمية واضحة.</em></h1>
            <p className="cvLede">
              أصمم المنتجات الرقمية بعقلية تفهم النظام أولًا — أربط الأشخاص والعمليات والتقنية لصناعة تجارب بسيطة، متوافقة وإنسانية.
            </p>
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#journey">استكشف رحلتي <span aria-hidden="true">↙</span></Link>
              <Link className="cvButton" href="#capabilities">استعرض مهاراتي</Link>
            </div>
          </div>

          <CareerMap locale="ar" />
        </section>

        <section className="cvSection" id="about" aria-labelledby="about-title-ar">
          <div className="cvSectionLabel"><span>01</span><span>عني</span></div>
          <div className="cvSectionBody">
            <h2 id="about-title-ar">أصمم الواجهة، لكنني أبدأ دائمًا من النظام الذي خلفها.</h2>
            <p className="cvBigCopy">
              تجمع رحلتي بين نظم المعلومات والخبرة التشغيلية وتصميم المنتجات الرقمية. هذا المزيج صنع أسلوبي العملي: أفهم سير العمل، أحدد موضع التعقيد، ثم أصمم ما يجعله أوضح.
            </p>
          </div>
        </section>

        <section className="cvSection" id="journey" aria-labelledby="journey-title-ar">
          <div className="cvSectionLabel"><span>02</span><span>الرحلة</span></div>
          <div className="cvSectionBody">
            <h2 id="journey-title-ar">مسيرة شكّلها فهم طريقة عمل الأنظمة في الواقع.</h2>
            <div className="cvJourney">
              <article>
                <span className="cvStep">01</span>
                <h3>أساس نظم المعلومات</h3>
                <p>فهم الأنظمة والبيانات والعمليات أصبح القاعدة التقنية والتحليلية خلف قراراتي التصميمية.</p>
              </article>
              <article>
                <span className="cvStep">02</span>
                <h3>الواقع التشغيلي</h3>
                <p>العمل في بيئة تشغيلية صحية أضاف فهمًا واقعيًا لسير العمل والقيود والتسليمات وأثر العمليات غير الواضحة.</p>
              </article>
              <article>
                <span className="cvStep">03</span>
                <h3>تصميم المنتجات الرقمية</h3>
                <p>جمع UI/UX هذه الأسس وحول المتطلبات المعقدة إلى واجهات متجاوبة وتجارب رقمية قابلة للاستخدام.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cvSection" id="capabilities" aria-labelledby="capabilities-title-ar">
          <div className="cvSectionLabel"><span>03</span><span>المهارات</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title-ar">التصميم والأنظمة والتنفيذ — كمنظومة واحدة.</h2>
            <div className="cvCapabilityRows">
              <div><span>التصميم</span><p>UI/UX · تصميم التفاعل · واجهات متجاوبة · هندسة المعلومات</p></div>
              <div><span>الأنظمة</span><p>سير العمل · المتطلبات · نظم المعلومات · الحوكمة الرقمية · متطلبات DGA</p></div>
              <div><span>التنفيذ</span><p>تسليم المطورين · التعاون بين الفرق · التكرار · ربط التصميم بالبناء</p></div>
              <div><span>الذكاء الاصطناعي</span><p>تدفقات عمل توليدية · هندسة البرومت · الاستكشاف السريع · التحسين المساعد</p></div>
            </div>
          </div>
        </section>

        <section className="cvSection" id="credentials" aria-labelledby="credentials-title-ar">
          <div className="cvSectionLabel"><span>04</span><span>المؤهلات</span></div>
          <div className="cvSectionBody">
            <h2 id="credentials-title-ar">الجانب الرسمي الذي يدعم الممارسة.</h2>
            <div className="cvCredentials">
              <div><strong>نظم المعلومات الإدارية</strong><span>أساس أكاديمي في الأنظمة والبيانات وعمليات الأعمال.</span></div>
              <div><strong>UI/UX والمنتجات الرقمية</strong><span>تصميم واجهات قابلة للاستخدام وتجارب رقمية متجاوبة.</span></div>
              <div><strong>المعايير الحكومية الرقمية</strong><span>العمل مع متطلبات الحوكمة وتوجهات DGA.</span></div>
              <div><strong>تدفقات العمل المدعومة بالذكاء الاصطناعي</strong><span>استخدام الذكاء الاصطناعي التوليدي لتسريع الاستكشاف والإنتاج بمسؤولية.</span></div>
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
            <h2 id="contact-title-ar">لنحوّل الأشياء المعقدة إلى شيء أوضح.</h2>
            <div className="cvContactLinks">
              <Link href="mailto:ibrahim.alajmi407@gmail.com">البريد الإلكتروني ↗</Link>
              <Link href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">LinkedIn ↗</Link>
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© Ibrahim</span>
          <span>عربي / English · فاتح / داكن</span>
        </footer>
      </div>
    </main>
  );
}
