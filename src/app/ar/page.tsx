import type {Metadata} from 'next';
import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  BriefcaseIcon,
  GoogleBrandIcon,
  GraduationCapIcon,
  LinkedInBrandIcon,
  MailIcon,
  WorkflowIcon,
} from '@/components/icons';

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
            <h1 id="cv-home-title-ar">
              <span className="cvHeroTitleLine">أصمم المنتجات الرقمية</span>
              <em>
                <span className="cvHeroTitleLine">من فهم النظام إلى</span>
                <span className="cvHeroTitleLine">وضوح التجربة.</span>
              </em>
            </h1>
            <p className="cvLede">
              قبل أن أحدد كيف يجب أن تبدو الواجهة، أريد أن أفهم ما الذي يحتاج النظام إلى جعله أوضح.
            </p>
            <div className="cvIdentitySignals" aria-label="التركيز المهني">
              <span>الأنظمة</span><span>التجربة</span><span>التنفيذ</span>
            </div>
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#journey">
                كيف وصلت إلى هنا
                <ArrowDownRightIcon className="cvDirectionalIcon" />
              </Link>
              <Link className="cvButton" href="#capabilities">كيف أعمل</Link>
            </div>
            <span className="cvSystemPhrase" aria-hidden="true">من النظام إلى التجربة</span>
          </div>

          <CareerMap locale="ar" />
        </section>

        <section className="cvSection" id="about" aria-labelledby="about-title-ar">
          <div className="cvSectionLabel"><span>01</span><span>عني</span></div>
          <div className="cvSectionBody">
            <h2 id="about-title-ar">الواجهة هي آخر طبقة، وليست أولها.</h2>
            <p className="cvBigCopy">
              يهمني ما يحدث قبل الشاشة: سير العمل، والقيود، ونقاط التسليم، والأشخاص الذين يتحركون داخل هذه المنظومة.
            </p>
            <div className="cvEvidenceRail" aria-label="أدلة مهنية">
              <div><div className="cvEvidenceLabel"><GraduationCapIcon /><span>بدأت من</span></div><strong>بكالوريوس نظم معلومات</strong></div>
              <div><div className="cvEvidenceLabel"><WorkflowIcon /><span>رأيت عمليًا</span></div><strong>سير عمل في بيئة صحية</strong></div>
              <div><div className="cvEvidenceLabel"><BriefcaseIcon /><span>أصمم اليوم</span></div><strong>تصميم ويب · جامعة الإمام عبدالرحمن</strong></div>
              <div><div className="cvEvidenceLabel"><BadgeCheckIcon /><span>أعمل ضمن</span></div><strong>امتثال لمتطلبات DGA</strong></div>
              <div><div className="cvEvidenceLabel"><GoogleBrandIcon className="cvGoogleMark" /><span>وأتوسع عبر</span></div><strong>Google UX · Google AI</strong></div>
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
                <span className="cvJourneyMeta">2019–2024 · نظم المعلومات</span>
                <h3>أقرأ النظام</h3>
                <p>علّمتني نظم المعلومات أن أبحث عن البيانات والاعتماديات والعملية التي تقف خلف الواجهة الظاهرة.</p>
              </article>
              <article>
                <span className="cvStep">لاحظ</span>
                <span className="cvJourneyMeta">2025 · عمليات صحية</span>
                <h3>أرى الاحتكاك</h3>
                <p>جعل العمل التشغيلي التسليمات والقيود وسير العمل غير الواضح أشياء ملموسة وليست افتراضات نظرية.</p>
              </article>
              <article>
                <span className="cvStep">شكّل</span>
                <span className="cvJourneyMeta">2025–الآن · تصميم ويب</span>
                <h3>أصمم التغيير</h3>
                <p>أصبح UI/UX الطريقة التي أحوّل بها ما أفهمه عن النظام إلى تجربة أوضح يمكن للناس استخدامها.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cvTurningPoint" aria-label="نقطة التحول">
          <span>وهنا تغيّر معنى التصميم الجيد بالنسبة لي.</span>
          <p>لم يعد مجرد واجهة أوضح، بل نظامًا يصبح أسهل على الشخص الذي يستخدمه.</p>
        </section>

        <section className="cvSection" id="capabilities" aria-labelledby="capabilities-title-ar">
          <div className="cvSectionLabel"><span>03</span><span>كيف أعمل</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title-ar">لهذا، هكذا أعمل اليوم.</h2>
            <p className="cvSectionIntro">تحولت كل طبقة إلى عادة قرار أستخدمها عندما أواجه المشكلة التالية.</p>
            <div className="cvCapabilityPairs">
              <div>
                <span className="cvCapabilitySource">التفكير بالأنظمة</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>قرارات UX أفضل</strong>
                <p>أفهم سير العمل والاعتماديات قبل أن أحدد ما الذي يجب أن تفعله الواجهة.</p>
              </div>
              <div>
                <span className="cvCapabilitySource">الحوكمة</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>قيود قابلة للاستخدام</strong>
                <p>أحوّل المعايير والمتطلبات إلى تجربة تبقى واضحة وإنسانية.</p>
              </div>
              <div>
                <span className="cvCapabilitySource">تدفقات AI</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>استكشاف أسرع</strong>
                <p>أستخدم الذكاء الاصطناعي التوليدي لتوسيع الخيارات وتحسينها دون أن أستبدل الحكم التصميمي.</p>
              </div>
              <div>
                <span className="cvCapabilitySource">تسليم المطورين</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
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
              <div>
                <div className="cvCredentialBrand cvCredentialBrandNeutral">
                  <GraduationCapIcon />
                  <span>أكاديمي</span>
                </div>
                <strong>بكالوريوس نظم المعلومات الإدارية</strong>
                <span>جامعة الإمام عبدالرحمن بن فيصل · 2019–2024</span>
              </div>
              <div>
                <div className="cvCredentialBrand cvGoogleBrand">
                  <GoogleBrandIcon />
                  <span>Google</span>
                </div>
                <strong>UX Design Professional Certificate</strong>
                <span>تأهيل مهني في التصميم المتمحور حول المستخدم وتجربة المنتج.</span>
              </div>
              <div>
                <div className="cvCredentialBrand cvGoogleBrand">
                  <GoogleBrandIcon />
                  <span>Google</span>
                </div>
                <strong>AI Professional Certificate</strong>
                <span>أساس تطبيقي لاستخدام الذكاء الاصطناعي داخل سير العمل المهني.</span>
              </div>
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
            <div className="cvContactContext">
              <span>الآن</span>
              <p>أواصل العمل عند نقطة التقاء الأنظمة والتجربة والتنفيذ، خصوصًا عندما تكون للمنتجات الرقمية قيود تشغيلية حقيقية.</p>
            </div>
            <h2 id="contact-title-ar">لديك نظام يحتاج أن يصبح تجربة أفضل؟</h2>
            <p className="cvContactNote">لنحوّله إلى شيء أوضح للفهم، وأسهل للاستخدام، وأكثر واقعية في التنفيذ.</p>
            <div className="cvContactLinks">
              <Link href="mailto:ibrahim.alajmi407@gmail.com">
                <MailIcon />
                البريد الإلكتروني
              </Link>
              <Link className="cvLinkedInLink" href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" target="_blank" rel="noreferrer">
                <LinkedInBrandIcon />
                LinkedIn
              </Link>
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© Ibrahim</span>
          <span>من الأنظمة إلى التجربة · عربي / English</span>
        </footer>
      </div>
    </main>
  );
}
