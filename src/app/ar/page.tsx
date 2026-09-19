import type {Metadata} from 'next';
import Link from 'next/link';
import {getProjects} from '@/lib/content';
import {ARABIC_PORTFOLIO_KEYWORDS} from '@/lib/seo-keywords';
import {ProjectCard} from '@/components/project-card';
import {CareerMap} from '@/components/career-map';
import {HomeHeader} from '@/components/home-header';
import {HeroKeywordLoop} from '@/components/hero-keyword-loop';
import {FloatingContactButton} from '@/components/floating-contact-button';
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
  description: 'مصمم منتجات وتجارب رقمية في السعودية، أعمل عبر UI/UX وتصميم الويب وتجربة المستخدم والأنظمة وسير العمل الرقمي.',
  alternates: {
    canonical: '/ar',
    languages: {en: '/', ar: '/ar', 'x-default': '/'},
  },
  keywords: [...ARABIC_PORTFOLIO_KEYWORDS],
  openGraph: {
    url: '/ar',
    title: 'إبراهيم — مصمم منتجات وتجارب رقمية',
    description: 'مصمم منتجات وتجارب رقمية في السعودية، أعمل عبر UI/UX وتصميم الويب وتجربة المستخدم والأنظمة وسير العمل الرقمي.',
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
        <FloatingContactButton locale="ar" />

        <section className="cvHero" aria-labelledby="cv-home-title-ar">
          <div className="cvHeroCopy">
            <p className="cvOverline">إبراهيم العجمي · مصمم منتجات رقمية · السعودية</p>
            <h1 id="cv-home-title-ar">
              <span className="cvHeroTitleLine">أصمم منتجات رقمية</span>
              <em><span className="cvHeroTitleLine">أوضح وأسهل للاستخدام.</span></em>
            </h1>
            <p className="cvLede">
              UI/UX، تصميم ويب، وتفكير بالأنظمة لسير عمل حقيقي — من فهم المشكلة إلى واجهة قابلة للتنفيذ.
            </p>
            <HeroKeywordLoop locale="ar" />
            <div className="cvHeroActions">
              <Link className="cvButton cvButtonPrimary" href="#about">
                ابدأ بطريقة التفكير
                <ArrowDownRightIcon className="cvDirectionalIcon" />
              </Link>
            </div>
          </div>

          <CareerMap locale="ar" />
        </section>

        <section className="cvSection" id="about" aria-labelledby="about-title-ar">
          <div className="cvSectionLabel"><span>01</span><span>عني</span></div>
          <div className="cvSectionBody">
            <h2 id="about-title-ar">قبل الواجهة، أفهم النظام.</h2>
            <p className="cvBigCopy">
              أبدأ من سير العمل والمستخدمين والبيانات والاعتماديات والقيود ونقاط التسليم. عندما تكون البنية أوضح، تصبح قرارات UI/UX أوضح أيضًا.
            </p>
            <div className="cvEvidenceRail" aria-label="أدلة مهنية">
              <div><div className="cvEvidenceLabel"><GraduationCapIcon /><span>بدأت من</span></div><strong>بكالوريوس نظم معلومات</strong></div>
              <div><div className="cvEvidenceLabel"><WorkflowIcon /><span>رأيت عمليًا</span></div><strong>سير عمل في بيئة صحية</strong></div>
              <div><div className="cvEvidenceLabel"><BriefcaseIcon /><span>أصمم اليوم</span></div><strong>تصميم ويب · جامعة الإمام عبدالرحمن</strong></div>
              <div><div className="cvEvidenceLabel"><BadgeCheckIcon /><span>أعمل ضمن</span></div><strong>امتثال لمتطلبات DGA</strong></div>
              <div><div className="cvEvidenceLabel"><GoogleBrandIcon className="cvGoogleMark" /><span>وأتوسع عبر</span></div><strong>Google UX · Google AI</strong></div>
            </div>
            <Link className="cvSectionNext" href="#journey">
              <span>التالي</span>
              <strong>شاهد ما الذي شكّل هذا المنهج</strong>
              <ArrowDownRightIcon className="cvDirectionalIcon" />
            </Link>
          </div>
        </section>

        <section className="cvSection" id="journey" aria-labelledby="journey-title-ar">
          <div className="cvSectionLabel"><span>02</span><span>الرحلة</span></div>
          <div className="cvSectionBody">
            <h2 id="journey-title-ar">نظم معلومات ← تشغيل ← UI/UX.</h2>
            <p className="cvSectionIntro">كل مرحلة غيّرت ما ألاحظه في المنتج الرقمي، وما أبدأ بحله أولًا.</p>
            <div className="cvJourney cvJourneyRefined">
              <article>
                <span className="cvStep">افهم</span>
                <span className="cvJourneyMeta cvBadge">2019–2024 · نظم المعلومات</span>
                <h3>ارسم منطق النظام</h3>
                <p>علّمتني نظم المعلومات الإدارية قراءة البيانات والاعتماديات وسير العمل وهندسة المعلومات قبل التفكير في الشاشة.</p>
              </article>
              <article>
                <span className="cvStep">لاحظ</span>
                <span className="cvJourneyMeta cvBadge">2025 · عمليات صحية</span>
                <h3>اكتشف الاحتكاك</h3>
                <p>جعلت العمليات الصحية وقت الانتظار ونقاط التسليم والتحقق من البيانات ومشاكل الأنظمة المؤسسية أشياء ملموسة وليست افتراضات.</p>
              </article>
              <article>
                <span className="cvStep">شكّل</span>
                <span className="cvJourneyMeta cvBadge">2025–الآن · تصميم ويب</span>
                <h3>حوّل الاحتكاك إلى تدفق</h3>
                <p>أصبح UI/UX والتصميم المتجاوب وWireframes وPrototypes واختبار قابلية الاستخدام أدوات لتحويل الاحتكاك إلى رحلة أوضح.</p>
              </article>
            </div>
            <Link className="cvSectionNext" href="#capabilities">
              <span>التالي</span>
              <strong>شاهد كيف تتحول الخبرة إلى قرارات تصميم</strong>
              <ArrowDownRightIcon className="cvDirectionalIcon" />
            </Link>
          </div>
        </section>

        <section className="cvTurningPoint" aria-label="نقطة التحول">
          <span>التحول</span>
          <p>أصمم سير العمل والواجهة معًا.</p>
          <Link className="cvTurningPointCta" href="#capabilities">شاهد كيف أعمل الآن <ArrowDownRightIcon /></Link>
        </section>

        <section className="cvSection" id="capabilities" aria-labelledby="capabilities-title-ar">
          <div className="cvSectionLabel"><span>03</span><span>كيف أعمل</span></div>
          <div className="cvSectionBody">
            <h2 id="capabilities-title-ar">أحوّل التعقيد إلى قرارات يستطيع الفريق تنفيذها.</h2>
            <p className="cvSectionIntro">UX Strategy، تصميم الواجهات، الحوكمة، سير العمل المدعوم بالذكاء الاصطناعي، وتسليم المطورين تبقى مترابطة من البداية.</p>
            <div className="cvCapabilityPairs">
              <div>
                <span className="cvCapabilitySource cvBadge cvBadgeAccent">UX Strategy · التفكير بالأنظمة</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>البنية قبل الشاشة</strong>
                <p>أرسم User Flows والاعتماديات وهندسة المعلومات ومنطق المنتج قبل تحديد ما الذي يجب أن تفعله الواجهة.</p>
              </div>
              <div>
                <span className="cvCapabilitySource cvBadge cvBadgeAccent">UI/UX · Responsive Design</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>تجربة قابلة للاستخدام على كل شاشة</strong>
                <p>أحوّل التدفقات إلى واجهات متجاوبة وحالات تفاعل وWireframes وPrototypes وأنماط وصول واضحة.</p>
              </div>
              <div>
                <span className="cvCapabilitySource cvBadge cvBadgeAccent">الحوكمة · DGA</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>وضوح داخل المتطلبات</strong>
                <p>أدمج المعايير الرقمية وإمكانية الوصول والاتساق ومتطلبات هيئة الحكومة الرقمية داخل التصميم منذ البداية.</p>
              </div>
              <div>
                <span className="cvCapabilitySource cvBadge cvBadgeAccent">Generative AI · Developer Handoff</span>
                <ArrowRightIcon className="cvCapabilityArrow" />
                <strong>أقرب إلى التنفيذ</strong>
                <p>أستخدم الاستكشاف المدعوم بالذكاء الاصطناعي والحالات والمواصفات والتسليم الواضح لتقليل المسافة بين التصميم والتطوير.</p>
              </div>
            </div>
            <Link className="cvSectionNext" href="#credentials">
              <span>التالي</span>
              <strong>راجع الأساس الذي يدعم الممارسة</strong>
              <ArrowDownRightIcon className="cvDirectionalIcon" />
            </Link>
          </div>
        </section>

        <section className="cvSection" id="credentials" aria-labelledby="credentials-title-ar">
          <div className="cvSectionLabel"><span>04</span><span>المؤهلات</span></div>
          <div className="cvSectionBody">
            <h2 id="credentials-title-ar">نظم المعلومات وUX وAI خلف الممارسة.</h2>
            <div className="cvCredentials">
              <div>
                <div className="cvCredentialBrand cvCredentialBrandNeutral">
                  <GraduationCapIcon />
                  <span className="cvBadge cvBadgeIssuer">أكاديمي</span>
                </div>
                <strong>بكالوريوس نظم المعلومات الإدارية</strong>
                <span>جامعة الإمام عبدالرحمن بن فيصل · 2019–2024</span>
              </div>
              <div>
                <div className="cvCredentialBrand cvGoogleBrand">
                  <GoogleBrandIcon />
                  <span className="cvBadge cvBadgeIssuer">Google</span>
                </div>
                <strong>UX Design Professional Certificate</strong>
                <span>أبحاث المستخدم، تصميم التفاعل، Wireframing، Prototyping، اختبار قابلية الاستخدام، وتصميم المنتجات المتمحور حول المستخدم.</span>
              </div>
              <div>
                <div className="cvCredentialBrand cvGoogleBrand">
                  <GoogleBrandIcon />
                  <span className="cvBadge cvBadgeIssuer">Google</span>
                </div>
                <strong>AI Professional Certificate</strong>
                <span>أساس تطبيقي في Generative AI وسير العمل المدعوم بالذكاء الاصطناعي والإنتاجية والتسليم المهني.</span>
              </div>
            </div>
            <Link className="cvSectionNext" href={hasWork ? '#work' : '#contact'}>
              <span>التالي</span>
              <strong>{hasWork ? 'شاهد الأعمال خلف الادعاءات' : 'حوّل السياق إلى محادثة'}</strong>
              <ArrowDownRightIcon className="cvDirectionalIcon" />
            </Link>
          </div>
        </section>

        {hasWork && (
          <section className="cvSection" id="work" aria-labelledby="work-title-ar">
            <div className="cvSectionLabel"><span>05</span><span>الأعمال</span></div>
            <div className="cvSectionBody">
              <div className="cvSectionHead">
                <h2 id="work-title-ar">شاهد القرارات داخل أعمال حقيقية.</h2>
                <Link href="/ar/work">عرض كل الأعمال</Link>
              </div>
              <div className="projectGrid">
                {work.map((project) => <ProjectCard project={project} key={project.projectKey} locale="ar" />)}
              </div>
              <Link className="cvSectionNext" href="#contact">
                <span>التالي</span>
                <strong>عندك تحدٍ مشابه؟ خلّنا نتكلم.</strong>
                <ArrowDownRightIcon className="cvDirectionalIcon" />
              </Link>
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
              <span>متاح</span>
              <p>لفرص تصميم المنتجات الرقمية وUI/UX وتصميم الويب وUX Strategy وتجارب المستخدم داخل السعودية أو بتعاون عن بُعد.</p>
            </div>
            <h2 id="contact-title-ar">عندك منتج أو سير عمل أو واجهة تحتاج وضوحًا؟</h2>
            <p className="cvContactNote">أرسل السياق. أقدر أساعد في تحديد المشكلة، تحسين تجربة المستخدم، وتقريب التصميم من التنفيذ.</p>
            <div className="cvContactGrid" aria-label="معلومات التواصل">
              <ContactCard
                icon={<MailIcon />}
                label="البريد الإلكتروني"
                value="ibrahim.alajmi407@gmail.com"
                href="mailto:ibrahim.alajmi407@gmail.com"
                valueDir="ltr"
              />
              <ContactCard
                icon={<LinkedInBrandIcon />}
                label="LinkedIn"
                value="ibrahim-al-ajmi-97ba02335"
                href="https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335"
                external
                valueDir="ltr"
                className="cvLinkedInLink"
              />
              <ContactCard
                icon={<MessageCircleIcon />}
                label="WhatsApp"
                value="+966 59 786 6665"
                href="https://wa.me/966597866665"
                external
                valueDir="ltr"
              />
              <ContactCard
                icon={<PhoneIcon />}
                label="رقم التواصل"
                value="+966 59 786 6665"
                href="tel:+966597866665"
                valueDir="ltr"
              />
              <ContactCard
                icon={<MapPinIcon />}
                label="الموقع"
                value="السعودية"
              />
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <span>© Ibrahim</span>
          <span>تصميم منتجات رقمية · UI/UX · تصميم ويب · السعودية</span>
        </footer>
      </div>
    </main>
  );
}
