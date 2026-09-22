import type {Metadata} from 'next';
import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ARABIC_PORTFOLIO_KEYWORDS} from '@/lib/seo-keywords';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';
import {HeroKeywordLoop} from '@/components/hero-keyword-loop';
import {FloatingContactButton} from '@/components/floating-contact-button';
import {ScrollMotionController} from '@/components/scroll-motion-controller';
import {ContactCard} from '@/components/contact-card';
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  BriefcaseIcon,
  GoogleBrandIcon,
  GraduationCapIcon,
  LinkedInBrandIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
  WorkflowIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
  description: 'مصمم منتجات وتجارب رقمية في السعودية، أحوّل تعقيد الأنظمة وسير العمل إلى تجارب رقمية واضحة وقابلة للتنفيذ.',
  alternates: {
    canonical: '/ar',
    languages: {en: '/', ar: '/ar', 'x-default': '/'},
  },
  keywords: [...ARABIC_PORTFOLIO_KEYWORDS],
  openGraph: {
    url: '/ar',
    title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
    description: 'أحوّل تعقيد الأنظمة وسير العمل إلى تجارب رقمية واضحة عبر UX وتصميم الويب والتفكير بالأنظمة وAI.',
  },
};

export default async function ArabicHomePage() {
  const projects = await getProjects();
  const work = projects.filter((project) => project.classification !== 'playground').slice(0, 3);
  const hasWork = work.length > 0;

  return (
    <main id="main" className="cvPage cvRtl cvV3" dir="rtl" lang="ar">
      <div className="cvFrame">
        <HomeHeader locale="ar" counterpartHref="/" hasWork={hasWork} />
        <FloatingContactButton locale="ar" />
        <ScrollMotionController />

        <section className="cvHero cvHeroV3" aria-labelledby="cv-home-title-ar">
          <div className="cvHeroCopy" data-scroll-motion="rise">
            <p className="cvOverline">إبراهيم العجمي · مصمم منتجات وتجارب رقمية · السعودية</p>
            <h1 id="cv-home-title-ar">
              <span className="cvHeroTitleLine">أنظمة معقدة.</span>
              <em><span className="cvHeroTitleLine">تجارب رقمية واضحة.</span></em>
            </h1>
            <p className="cvLede">
              أربط التفكير بالأنظمة وتجربة المستخدم وتصميم الويب والتنفيذ بمساعدة AI لتحويل تعقيد سير العمل الحقيقي إلى واجهات يفهمها المستخدم ويمكن للفريق تنفيذها.
            </p>
            <HeroKeywordLoop locale="ar" />
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#resolve">
                شاهد كيف يتحول النظام
                <ArrowDownRightIcon className="cvDirectionalIcon" />
              </Link>
            </div>
          </div>

          <CareerMap locale="ar" />
        </section>

        <section className="cvSection cvResolve" id="resolve" data-scroll-motion="rise" aria-labelledby="resolve-title-ar">
          <div className="cvSectionLabel"><span>01</span><span>التحويل</span></div>
          <div className="cvSectionBody">
            <h2 id="resolve-title-ar">أبدأ بالنظام، لا بالشاشة.</h2>
            <p className="cvBigCopy">
              الواجهة نتيجة وليست نقطة البداية. أحدد أولًا ما يحدث خلفها: المستخدمون والقواعد والمعلومات ونقاط التسليم والقيود والأماكن التي يبدأ فيها سير العمل بمقاومة المستخدم.
            </p>

            <div className="cvResolveFlow" aria-label="كيف أحول التعقيد إلى تجربة رقمية">
              <article>
                <span>01 · افهم</span>
                <strong>ارسم النظام</strong>
                <p>المستخدمون والأهداف والبيانات والاعتماديات وهندسة المعلومات والقيود التشغيلية.</p>
              </article>
              <ArrowRightIcon className="cvResolveArrow" aria-hidden="true" />
              <article>
                <span>02 · شخّص</span>
                <strong>اكتشف الاحتكاك</strong>
                <p>فجوات التسليم والخطوات الزائدة وضعف التسلسل والحالات الناقصة ومخاطر قابلية الاستخدام.</p>
              </article>
              <ArrowRightIcon className="cvResolveArrow" aria-hidden="true" />
              <article>
                <span>03 · هيكل</span>
                <strong>حوّل المشكلة إلى قرارات</strong>
                <p>تدفقات المستخدم وتسلسل المحتوى والـWireframes ومنطق التفاعل والسلوك المتجاوب.</p>
              </article>
              <ArrowRightIcon className="cvResolveArrow" aria-hidden="true" />
              <article>
                <span>04 · نفّذ</span>
                <strong>قلّل المسافة إلى البناء</strong>
                <p>واجهات قابلة للوصول ونماذج أولية وحالات واضحة وحوكمة تصميم واستكشاف بمساعدة AI وتسليم للمطورين.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cvTurningPoint cvTurningPointV3" aria-label="مبدأ التصميم" data-scroll-motion="scale">
          <span>مبدأ التصميم</span>
          <p>الوضوح ليس تجميلًا بصريًا. بل قرار على مستوى النظام.</p>
          <Link className="cvTurningPointCta" href="#evidence">لماذا أعمل بهذه الطريقة <ArrowDownRightIcon /></Link>
        </section>

        <section className="cvSection cvEvidenceSection" id="evidence" data-scroll-motion="drift" aria-labelledby="evidence-title-ar">
          <div className="cvSectionLabel"><span>02</span><span>الخلفية</span></div>
          <div className="cvSectionBody">
            <h2 id="evidence-title-ar">طريقة العمل جاءت من المسار الذي سبقها.</h2>
            <p className="cvSectionIntro">
              خلفيتي ليست قسم سيرة ذاتية منفصلًا؛ هي السبب في أنني أرى النظام والتشغيل وقابلية الاستخدام والحوكمة والتنفيذ كأجزاء مترابطة من المشكلة نفسها.
            </p>

            <div className="cvEvidenceRail cvEvidenceRailV3" aria-label="أدلة مهنية">
              <div><div className="cvEvidenceLabel"><GraduationCapIcon /><span>الأساس</span></div><strong>نظم المعلومات الإدارية</strong></div>
              <div><div className="cvEvidenceLabel"><WorkflowIcon /><span>التشغيل</span></div><strong>سير العمل في بيئة صحية</strong></div>
              <div><div className="cvEvidenceLabel"><BriefcaseIcon /><span>الممارسة الحالية</span></div><strong>تصميم الويب · جامعة الإمام عبدالرحمن</strong></div>
              <div><div className="cvEvidenceLabel"><BadgeCheckIcon /><span>الحوكمة</span></div><strong>أعمال رقمية موجهة لمتطلبات DGA</strong></div>
              <div><div className="cvEvidenceLabel"><GoogleBrandIcon className="cvGoogleMark" /><span>التطوير المستمر</span></div><strong>Google UX · Google AI</strong></div>
            </div>

            <div className="cvJourney cvJourneyV3">
              <article>
                <span className="cvStep">2019–2024</span>
                <h3>أصبحت الأنظمة هي العدسة.</h3>
                <p>بكالوريوس نظم المعلومات الإدارية بنى أساس قراءة العمليات والمعلومات والاعتماديات ومنطق العمل قبل تفاصيل الواجهة.</p>
              </article>
              <article>
                <span className="cvStep">2025</span>
                <h3>جعل التشغيل الاحتكاك ملموسًا.</h3>
                <p>تنسيق المرضى في بيئة صحية جعل الانتظار والتحقق ونقاط التسليم واحتكاك الأنظمة المؤسسية مسائل عملية وليست نظرية.</p>
              </article>
              <article>
                <span className="cvStep">2025–الآن</span>
                <h3>أصبح التصميم طبقة الحل.</h3>
                <p>أربط اليوم منظور الأنظمة بواجهات متجاوبة وإمكانية الوصول والحوكمة والنماذج الأولية وتدفقات AI وتسليم التنفيذ.</p>
              </article>
            </div>

            <div className="cvCredentialLine" aria-label="المؤهلات">
              <span>المؤهلات</span>
              <strong>بكالوريوس نظم معلومات إدارية · Google UX Design Professional Certificate · Google AI Professional Certificate</strong>
            </div>
          </div>
        </section>

        {hasWork && (
          <section className="cvSection" id="work" data-scroll-motion="scale" aria-labelledby="work-title-ar">
            <div className="cvSectionLabel"><span>03</span><span>الأعمال</span></div>
            <div className="cvSectionBody">
              <div className="cvSectionHead">
                <h2 id="work-title-ar">القرارات عندما تُختبر في عمل حقيقي.</h2>
                <Link href="/ar/work">عرض جميع الأعمال</Link>
              </div>
              <div className="projectGrid">
                {work.map((project) => <ProjectCard project={project} key={project.projectKey} locale="ar" />)}
              </div>
            </div>
          </section>
        )}

        <section className="cvContact cvContactV3" id="contact" data-scroll-motion="rise" aria-labelledby="contact-title-ar">
          <div>
            <span className="cvContactIndex">{hasWork ? '04' : '03'}</span>
            <p className="cvOverline">تواصل</p>
          </div>
          <div>
            <div className="cvContactContext">
              <span>متاح للتعاون</span>
              <p>فرص المنتجات الرقمية وUI/UX وتجارب الويب واستراتيجية UX والمشاريع التي تركز على تحسين سير العمل داخل السعودية أو عن بعد.</p>
            </div>
            <h2 id="contact-title-ar">هل لديك سير عمل معقد يجب أن يبدو بسيطًا؟</h2>
            <p className="cvContactNote">أرسل السياق. أستطيع المساعدة في فهم النظام وصياغة التجربة وتقريب الحل من التنفيذ.</p>
            <div className="cvContactGrid" aria-label="بيانات التواصل">
              <ContactCard icon={<MailIcon />} label="البريد" value="ibrahim.alajmi407@gmail.com" href="mailto:ibrahim.alajmi407@gmail.com" />
              <ContactCard icon={<LinkedInBrandIcon />} label="LinkedIn" value="ibrahim-al-ajmi-97ba02335" href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335" external className="cvLinkedInLink" />
              <ContactCard icon={<MessageCircleIcon />} label="WhatsApp" value="+966 59 786 6665" href="https://wa.me/966597866665" external />
              <ContactCard icon={<PhoneIcon />} label="الهاتف" value="+966 59 786 6665" href="tel:+966597866665" />
              <ContactCard icon={<MapPinIcon />} label="الموقع" value="السعودية" />
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© إبراهيم</span>
          <span>النظام ← التجربة · تصميم منتجات رقمية · UI/UX · الويب</span>
        </footer>
      </div>
    </main>
  );
}
