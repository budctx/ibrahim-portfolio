# BU'D Case Study — Visual Storyboard and Evidence Map

**Status:** Internal / draft / not approved for public release  
**Source of truth:** [BU'D evidence-first case study in Notion](https://app.notion.com/p/419b475e25f1811ab508c709fd7a265e)  
**Portfolio CMS:** `content/projects/bud-discord-events.yaml` (Keystatic project entry)  
**Primary public product:** https://budteam.net/  
**Last editorial review:** 2026-11-15

## Design objective

Use the existing bilingual portfolio design system to communicate one coherent product-design story: how a solo product designer directed the host journey, made structural UX decisions, guided AI-assisted delivery, and refined mechanics through live qualitative feedback.

Use the portfolio's neutral editorial design instead of copying BU'D's full commercial visual identity into the portfolio shell. The actual screenshots should retain their true branding. Do not imply the screenshots prove a formal user study or measured outcome.

## Visual sequence

| Order | Visual block | Required authentic evidence | Suggested caption (EN) | Arabic caption | Condition |
| --- | --- | --- | --- | --- | --- |
| 01 | Hero: dominant product screenshot, with title and role alongside | Current public event catalog or representative host screen | "An interactive events platform designed around the host." | "منصة فعاليات تفاعلية تتمحور حول تجربة الهوست." | Needs captured screenshot |
| 02 | Context: compact text + product model | Public event card with preview/setup entry point | "Choosing an activity should lead into a predictable hosting journey." | "اختيار الفعالية يقود إلى رحلة تشغيل واضحة." | Needs captured screenshot |
| 03 | Journey strip: four real UI states | Setup; game screen; prizes; closing summary | "One familiar sequence, adapted to multiple activities." | "مراحل مألوفة تتكيف مع أنواع مختلفة من الفعاليات." | Needs four captures |
| 04 | Decision 01: text beside UI | Question & Condition's manual winner entry and winners list | "Host-led adjudication without participant-side registration." | "تحكيم يدوي للهوست دون تسجيل المشاركين." | Needs captures from authorized session |
| 05 | Decision 02: compare two event surfaces | Question & Condition and Mini Games shared phases | "Shared framework, game-specific interaction." | "إطار مشترك وتفاعل خاص بكل لعبة." | Needs two captures, no artificial before/after |
| 06 | Decision 03: contextual start | Mini Games grid plus one start modal | "Show the next action where the host needs it." | "إظهار خطوة البدء داخل سياق اللعبة." | **Do not claim explanatory copy is already present** |
| 07 | Feedback/iteration: qualitative narrative | Host feedback or redacted participant reactions, only with permission; alternative: approved redacted decision note | "Observations from live sessions helped guide gameplay refinements." | "ملاحظات الجلسات المباشرة ساعدت في توجيه تحسينات اللعب." | Do not expose names or invent quotes |
| 08 | Delivered iteration: proof strip | Redacted GitHub PR #123, CI result, or deployment version | "Interaction refinements were reviewed, tested, and released." | "مراجعة تحسينات التفاعل واختبارها ونشرها." | Verified from project records, cite exact release |
| 09 | End: outcome + learnings + live product link | No image required | "A live product with continued iteration, not a claimed quantified success." | "منتج يعمل ويتطور، دون ادعاء نتائج رقمية غير مثبتة." | Copy already drafted |

## Responsive editorial layout

- Desktop: editorial 40/60 hero split; subsequent narrative sections at ~32/68; decision sections pair copy with true product images.
- Mobile: single column; sequence text precedes associated media; no fixed-height cropping of important UI controls.
- Use image `alt` text in both EN/AR with real screen content, not generic "screenshot" descriptions.
- Maintain `dir=rtl` for Arabic; do not invert product screenshot content.
- Do not add animated product mockups, metrics badges, customer testimonials, or fake charts.
- Respect `prefers-reduced-motion`, keyboard navigation, screen reader figures and high-contrast reading.
- The existing project page currently renders the gallery **after** the narrative. A future small template enhancement may interleave image/copy pairs; do not block content authoring on this feature.

## Capture plan and publication safeguards

1. First gather **public, logged-out** catalog/preview screens. Remove username/account identifiers if visible.
2. For host-specific screenshots, use an authorized test session with sample winners and sample prizes. Avoid capturing real participants' names, Discord IDs, token/session data, personal order details, or checkout credentials.
3. Prefer 1440px desktop captures plus one representative mobile viewport where useful; preserve readable type and unaltered UI.
4. Store final, approved local files through Keystatic's image fields (`public/project-media`) rather than hotlinking live app assets.
5. Add a true cover + bilingual alt text; keep gallery order aligned to the storytelling sequence. Do **not** use brand OG art as a substitute for evidence of UI.
6. Public release gate: status=`published`, contentOrigin=`real`, rightsCleared and ndaCleared explicitly reviewed and set true, real cover image present, all essential bilingual fields present. Until then, draft is intentionally invisible to public visitors.
7. Capture at least one qualitative user-feedback example without requiring a named game. No participant counts, engagement uplift, survey scores, or time/cost savings until backed by data.

## Source and accuracy notes

- Case-study Notion: https://app.notion.com/p/419b475e25f1811ab508c709fd7a265e
- Owner decisions: https://app.notion.com/p/404b475e25f18150a4e6f0f13ce6a912
- Common engine: https://app.notion.com/p/404b475e25f181beb076c4efca046a78
- Mini Games release audit: https://app.notion.com/p/40eb475e25f181a49151c6c69f7e8fc1
- Change PR: https://github.com/budctx/bud-events-website/pull/123

**Validation limitation:** Live HTML and public repository contents were available during this preparation, but an interactive screenshot-capable browser session was not. No authentic UI screenshot was captured in this pass. Do not mark the storyboard as visually QA-complete.
