/**
 * Public professional facts traced to the one-page CV supplied by Ibrahim.
 * Source: IBRAHIM AL-AJMI CV.pdf (2).pdf, uploaded 2026-09-18.
 * This module stores factual identity, not hypothetical projects or quantified outcomes.
 * “Digital Product & Experience Designer” is portfolio positioning, NOT the CV's job title.
 */
export type ProfileLocale = 'ar' | 'en';

export const profileContact = {
  email: 'ibrahim.alajmi407@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ibrahim-al-ajmi-97ba02335',
  phoneE164: '+966597866665',
} as const;

export const verifiedProfessionalFacts = {
  education: {
    degree: 'Bachelor of Management Information Systems',
    institution: 'Imam Abdulrahman Bin Faisal University',
    start: '2019-09',
    end: '2024-10',
  },
  roles: [
    {
      id: 'patient-coordinator',
      title: 'Patient Coordinator',
      organization: 'Dr. Sulaiman Al Habib Hospital',
      start: '2025-04',
      end: '2025-08',
    },
    {
      id: 'web-designer',
      title: 'Web Designer',
      organization: 'Imam Abdulrahman Bin Faisal University',
      start: '2025-08',
      end: null,
    },
  ],
  credentials: [
    'Google AI Professional Certificate',
    'Google UX Design Professional Certificate',
  ],
  tools: ['Figma', 'Adobe XD'],
} as const;

export function getCareerLayers(locale: ProfileLocale) {
  return locale === 'ar'
    ? [
        {step:'الأساس',period:'09/2019—10/2024',title:'نظم المعلومات الإدارية',
          text:'فهم الأنظمة والبيانات وهندسة المعلومات وسير العمل قبل واجهاتها.',
          evidence:'بكالوريوس نظم المعلومات الإدارية · جامعة الإمام عبدالرحمن بن فيصل'},
        {step:'التشغيل',period:'04/2025—08/2025',title:'تنسيق المرضى',
          text:'تحسين تدفق استقبال البيانات والتحقق منها داخل نظام إدارة المستشفى.',
          evidence:'منسق مرضى · مستشفى الدكتور سليمان الحبيب'},
        {step:'التطبيق',period:'08/2025—الآن',title:'تصميم الويب وتجربة المستخدم',
          text:'تطوير واجهات قابلة للتنفيذ وتوظيف سير عمل AI ضمن متطلبات الحوكمة الرقمية.',
          evidence:'مصمم ويب · جامعة الإمام عبدالرحمن بن فيصل'},
      ]
    : [
        {step:'Foundation',period:'09/2019—10/2024',title:'Management Information Systems',
          text:'Understanding data, dependencies, information architecture and workflows before interfaces.',
          evidence:'Bachelor of MIS · Imam Abdulrahman Bin Faisal University'},
        {step:'Operations',period:'04/2025—08/2025',title:'Patient coordination',
          text:'Improving data intake and validation workflows in an enterprise hospital management system.',
          evidence:'Patient Coordinator · Dr. Sulaiman Al Habib Hospital'},
        {step:'Application',period:'08/2025—Present',title:'Web design and UI/UX',
          text:'Delivering buildable UI, AI-assisted workflows and design aligned with digital governance.',
          evidence:'Web Designer · Imam Abdulrahman Bin Faisal University'},
      ];
}

export function getCredentials(locale: ProfileLocale) {
  return locale === 'ar'
    ? [
        {issuer:'IAU / أكاديمي',title:'بكالوريوس نظم المعلومات الإدارية',detail:'جامعة الإمام عبدالرحمن بن فيصل · 09/2019—10/2024'},
        {issuer:'Google / UX',title:'Google UX Design Professional Certificate',detail:'مذكورة في السيرة الذاتية'},
        {issuer:'Google / AI',title:'Google AI Professional Certificate',detail:'مذكورة في السيرة الذاتية'},
      ]
    : [
        {issuer:'IAU / ACADEMIC',title:'Bachelor of Management Information Systems',detail:'Imam Abdulrahman Bin Faisal University · 09/2019—10/2024'},
        {issuer:'GOOGLE / UX',title:'Google UX Design Professional Certificate',detail:'Listed in CV'},
        {issuer:'GOOGLE / AI',title:'Google AI Professional Certificate',detail:'Listed in CV'},
      ];
}
