# Portfolio editorial style guide

This is the writing reference for every project added in Keystatic. Read this before editing project fields. The published homepage remains the visual and interaction authority.

## Approved narrative reference for all work

The owner has approved the published BU'D case study as the editorial reference for every portfolio project, including future Keystatic entries and revisions to existing studies. Use `content/projects/bud-discord-events.yaml` as the concrete bilingual example, alongside this guide. Public references: [Arabic](https://ibrahim-portfolio-blush.vercel.app/ar/projects/bud-discord-events) and [English](https://ibrahim-portfolio-blush.vercel.app/projects/bud-discord-events).

Every study should communicate these essentials when supported by the project evidence:

1. The specific problem or opportunity and who it affects.
2. The owner's actual role, responsibility and contribution.
3. The important design decisions, the reasons for choosing them and relevant alternatives.
4. How those decisions shape the user's experience.
5. Documented outcomes and what the owner learned.

Keep the Saudi professional Arabic voice, independently natural English, concise explanations, honest evidence and shared visual system consistent across all work. Adapt chapter titles, order, length and presentation to the project. These essentials are coverage requirements, not five compulsory identical headings. Do not copy BU'D wording, host terminology, four-stage journey or product-specific claims into unrelated projects. A graphic collection can use a shorter brief, visual rationale and deliverable explanation rather than an invented product research story.

Choose presentation blocks to fit the information: a real interface beside its explanation, one strong design idea, meaningful ordered steps or titled decisions. Use only what the project needs. Before/after comparisons and quotations require genuine, approved evidence. Missing metrics must never be replaced with invented success claims.

Before adding a new project, compare its draft against BU'D for clarity, rationale, brevity, evidence and reading rhythm. Review each language on its own. A project is editorially ready when readers understand the work and the owner's judgment without needing the internal development history.

## Voice and tone

Arabic: contemporary professional Saudi Arabic. Write as a product designer explaining a decision to a hiring manager or another designer. Use natural, accessible Arabic, with restrained personality. Avoid both bureaucratic formality and heavy dialect. Read each paragraph aloud. English: direct, reflective first person, sentence case, specific verbs and concrete consequences. Write each language independently; preserve facts rather than sentence structure.

Use first person for decisions the owner made. Distinguish product/design ownership from AI-assisted development. Say what changed and why it matters to a host or participant. Do not imply hand coding every line, formal research or measured impact without supporting records.

## Approved terms

| Meaning | Arabic | English |
| --- | --- | --- |
| Portfolio role | مصمم منتجات رقمية | Digital Product Designer |
| Product | بُعد | BU'D |
| Host | الهوست | host |
| Participant | المشارك | participant |
| Question & Condition | سؤال وشرط | Question & Condition |
| Mini Games | ميني قيمز | Mini Games |
| Work destination | الأعمال | Work |
| Project CTA | عرض المشروع | View project |
| Return CTA | العودة للأعمال | Back to work |
| External CTA | زيارة المنتج | Visit live product |
| Dialog in narrative | نافذة | dialog |

Do not alternate الهوست and المضيف within a study. Preserve product names; isolate Latin names/URLs when needed with semantic bidi isolation, never spaces inserted to fix direction.

## Shortening without losing meaning

One main idea per paragraph, usually two or three sentences. Prefer a concrete action over «قمت بإنشاء»، «تم تنفيذ»، «تم العمل على». Delete redundant transitions such as «حيث إن» or «بالإضافة إلى ذلك» when the sentence stands alone. Vary openings naturally, including subject-led sentences. Do not force every sentence to start with “I”. Keep useful rationale and evidence; move release dates and internal acceptance caveats to documentation.

Headings: name the decision, tension or chapter, not a generic promise. No ending full stop. Buttons: short, destination-specific labels; retain approved labels above. Captions: one sentence explaining what the genuine screenshot demonstrates. Alt text: describe the relevant visible state, without duplicating the caption word for word.

## Punctuation, numbers and direction

Use Arabic comma «،» and question mark «؟» in Arabic. Use full stops for completed sentences. Avoid decorative dashes, underscore separators and repeated ellipses. Use 0–9 consistently in interface counters and technical quantities; spell small quantities in natural prose when clearer. Do not force digits into every Arabic sentence. Keep stable historical career/education dates where chronology matters. Never substitute a dynamic current year for a removed date. Screenshot capture and release dates belong in source records.

Use logical CSS properties, RTL for Arabic and LTR for English. Ordered flows follow document direction; numbers retain normal digit order. Test mixed Latin names and Arabic at 320px and with keyboard focus.

## Examples from the portfolio

| Before | After | Reason |
| --- | --- | --- |
| كانت الفرصة التصميمية هي تنظيم تشغيل فعاليات مجتمعات ديسكورد ضمن تجربة واضحة يقودها الهوست | مع اختلاف الألعاب، تتغير القواعد وطريقة التفاعل. كان التحدي أن يستوعب بُعد هذا التنوع | Lead with the actual design tension |
| حددت رحلة تشغيل قابلة للتكرار: الإعداد ← شاشة الفعالية ← الجوائز ← الختام | وحّدت المراحل من التجهيز إلى الختام | The ordered steps carry the sequence; the prose explains the decision |
| حسنت تحديثات «ميني قيمز» الموثقة في نوفمبر 2026 وضوح تأكيد إعادة الجولات | شملت التحسينات وضوح إعادة الجولة واستعادة الجلسة | Remove release reporting from the visitor narrative |
| The design opportunity was to bring Discord community event operations into a clearer host-led experience | Different games need different rules and controls | Concrete tension instead of an abstract introduction |

These are editorial before/after examples, not fabricated product screenshot comparisons or user quotations.

## Keystatic authoring and presentation

Existing bilingual Problem, Context, Process, Decisions and Outcome fields remain the narrative source. They support ordinary paragraphs, emphasis, lists and subheadings through the existing Markdoc dependency. Raw HTML, executable MDX and in-copy images are not enabled. Use the existing media fields with bilingual alt/captions. Links accept HTTPS, site-relative paths or fragments; unsafe schemes are omitted.

Optional Editorial presentation entries select one layout per chapter. Leave this array empty for existing behavior. `editorial` uses regular text with chapter media; `statement` adds one prominent authored idea, never styled as a testimonial; `steps` uses an ordered list; `decisions` uses short titled explanations; `split` places concise narrative/steps beside real chapter media on wide containers and stacks them on small screens. Wide media and captions remain existing gallery behavior. Only populate a lead or items if they add information beyond the body. Do not copy the same text into all fields.

Use a limited subset for each study. BU'D uses a statement for the problem, a split journey with four stages, titled decisions and a reflective outcome. Do not invent before images, user quotes or authenticated captures to fill a layout. A future testimonial requires an attributable, approved source before adding a quote component.

## Publication checklist

- Has the draft been checked against the approved BU'D narrative reference, with project-specific structure and wording?
- Can a reader identify the problem, role, decision, rationale, consequence and documented learning?
- Does each paragraph add information? Are sentence openings varied?
- Are the owner's role and AI-assisted development accurate?
- Does each language sound written naturally, rather than translated?
- Are qualitative observations separate from quantified results?
- Are screenshots genuine, cleared, captioned and free of participant data?
- Are unnecessary years, capture dates and internal release notes absent?
- Are headings, buttons and terms consistent with this guide?
- Are there only the return action and an available external product action?
- Do Work links go to the homepage carousel, with correct locale?
- Are content, keyboard navigation, focus, RTL, both themes and small screens reviewed?
- Have Keystatic reading, TypeScript, Build and applicable CI checks passed?
