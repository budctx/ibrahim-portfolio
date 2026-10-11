# Graphic Design Gallery — baseline and plan

## Identity and release boundary

Repository: `budctx/ibrahim-portfolio`. Production baseline supplied and audited for this task: `c0e77234f0fa65e31f3a6d5e0d14873dc10cf07b`. Feature branch: `feature/graphic-design-gallery`. No main push, merge, production deployment or production CMS write is authorized. Technical PASS is not release authorization.

## Source audit (verified source, not browser evidence)

The approved homepage is vanilla HTML/CSS/JS in `public/hero-preview/index.html` and `en.html`, served by beforeFiles rewrites for `/` and `/en`. `/ar` redirects to `/`. The live-design source contains four scenes: Hero, Work, About, Contact. Approach is not a separate scene. It uses Readex Pro and dark colors only. Existing Work includes ATHAR and three identified demonstration templates. Those records are hardcoded; the existing Keystatic collection powers older Next routes, not this homepage.

Old `src/components/project-card.tsx` navigates to detail pages and has different styles/motion; it is not the approved Work experience. The old Next root layout injects Plex fonts and old site CSS, so new gallery route handlers render standalone HTML using the approved shared Work assets within the same application/domain.

## Material brief conflicts and disposition

- Preserve actual four-scene homepage rather than inserting Approach. This follows the brief's explicit production-source precedence.
- Actual approved homepage has no Light mode. Preserve its dark-only behavior; report Light-mode requirement as a baseline conflict and limitation rather than pretending a light toggle exists or silently introducing an unapproved theme.
- Keep existing homepage locale URLs `/` Arabic and `/en` English. Gallery semantic routes follow requested unprefixed English and `/ar/work/...` Arabic; home links return to the corresponding actual root.
- No authorized gallery assets were supplied. Real collection remains empty. Conspicuous server-generated preview fixtures are excluded from Production independently of environment flags.

## Exact reusable boundaries

Extract the approved `.project-card`, artwork, metadata, arrow, native `.project-modal`, backdrop, close button, copy, responsive rules and Reduced Motion rules into `public/portfolio/work.css`. Extract the approved DOM card factory and native dialog behavior into `public/portfolio/work-ui.js`. Both homepage languages and gallery consume the same functions. Homepage retains ATHAR artwork, carousel, scene navigation and unrelated interactions. Add navigation activation for collection cards, optional entity/media in modal, scroll lock and fallback focus without a second modal system.

## Architecture

One Graphic Design collection card alongside ATHAR; four typographic landing links. Dedicated category routes under `/work` and `/ar/work`: discord, brand-identity, social-campaigns, print-packaging. Keystatic `graphicDesigns` collection stores bilingual text/alt, stable ID/slug, category, entity or self-initiated attribution, cover/additional images, order, origin and publication status. Server validation excludes drafts, hidden, incomplete translations and development-origin records before serialization. URL `?design=slug` drives one existing dialog; native history handles Back/Forward and refresh.

## Acceptance evidence plan

Run content-boundary tests, TypeScript, ESLint, production build and existing tests. Browser evidence must cover all routes, EN/AR, 320/390/tablet/desktop/wide/short-height, card/modal, deep link/reload/Back/Forward, invalid IDs, keyboard/focus/Escape/touch and Reduced Motion. Distinguish browser observations from source review and automated checks. Keep initial review pending until evidence is available. Deliver Draft PR and accessible Vercel Preview; stop for owner approval.

## Rollback

Before release, abandon/revert only feature-branch commits and delete preview if desired. Production remains at its independent baseline. Any future approved release rollback would revert the feature merge; existing project content and CMS infrastructure are not migrated or deleted.
