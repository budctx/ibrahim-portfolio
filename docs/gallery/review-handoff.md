# Graphic Design Gallery — owner review handoff

Date: 2026-10-11. Status: implemented; gallery tests passed; public Preview available; overall release gate BLOCKED; awaiting owner review. No merge or Production deployment authorized or performed.

## Review links

- Draft PR: https://github.com/budctx/ibrahim-portfolio/pull/6
- Branch: `feature/graphic-design-gallery`
- Tested application commit: `6c0bb29eb8d4b730dc3d28647ac689766811cb1e`
- Preview: https://ibrahim-portfolio-gafdzpw75-budctx1-8956s-projects.vercel.app
- Landing: https://ibrahim-portfolio-gafdzpw75-budctx1-8956s-projects.vercel.app/work/graphic-design
- Discord: https://ibrahim-portfolio-gafdzpw75-budctx1-8956s-projects.vercel.app/work/discord
- Brand Identity: https://ibrahim-portfolio-gafdzpw75-budctx1-8956s-projects.vercel.app/work/brand-identity
- Social & Campaigns: https://ibrahim-portfolio-gafdzpw75-budctx1-8956s-projects.vercel.app/work/social-campaigns
- Print & Packaging: https://ibrahim-portfolio-gafdzpw75-budctx1-8956s-projects.vercel.app/work/print-packaging
- Demonstration: https://ibrahim-portfolio-gafdzpw75-budctx1-8956s-projects.vercel.app/work/discord?design=preview-test-discord
- Arabic routes use `/ar/work/...`; language switching preserves the selected published design.

The demonstration is explicitly labelled PREVIEW TEST, not portfolio work and no client. Fixtures are isolated from CMS content and cannot render in Production even when the fixture flag is set. No fictional client work has been published.

## Implementation and reuse

Graphic Design is a primary Work entry alongside preserved ATHAR. Its existing card navigates to a four-category typographic landing. Category cards open the reused native project dialog. URL state supports refresh, direct entry, close, Back/Forward, invalid IDs, and localized links.

The authoritative static homepage had inline card/modal code, not a reusable React component. It was extracted into `public/portfolio/work-ui.js` (`createProjectCard`, `bindProjectModal`) and `work.css`; both homepage and gallery use these shared implementations. Existing card markup, visuals, modal structure, close controls, focus and scroll behavior are retained/extended. Gallery-only media styling contains complete artwork and multiple images. No new runtime dependency or animation framework was added. Server route rendering avoids reviving the older Next visual layout.

Hero, About and Contact markup were compared with baseline and remain byte-identical. The current homepage is four scenes (Hero, Work, About, Contact) and dark-only, in conflict with the brief's five sections and Light mode. Actual approved Production was preserved as directed; no Approach section or theme redesign was introduced.

## CMS

See [owner instructions](../gallery-cms.md). In existing Keystatic choose Graphic Designs, create an entry, set stable ID/slug, both language titles/one-line descriptions/entity and alt text, choose one of four categories, upload cover/optional images, set order and draft/published/hidden, then save using the established branch workflow. Public discovery requires complete bilingual published content. Use self-initiated attribution where appropriate. Copy the permanent design link from its modal; keep its slug stable after sharing. Hide/delete removes public discovery and deep-link access.

Authenticated CMS create/upload/save/publish/hide UI was **not executed**. Schema integration, TypeScript, reader behavior and publication boundaries were validated; no live CMS records or infrastructure were modified. This remains a pre-release validation gap.

## Executed QA

Evidence: https://github.com/budctx/ibrahim-portfolio/actions/runs/38116317047

| Check | Result / scope |
|---|---|
| Production build | PASS locally and CI |
| TypeScript | PASS |
| ESLint | PASS scoped JavaScript configuration; not full-repository TypeScript lint |
| Content tests | 5 PASS: publication, localization, paths including Arabic filenames, fixtures and production exclusion |
| Gallery real-browser tests | 28/28 PASS in CI Chromium |
| Responsive | EN/AR at 320,375,390,768,1440,1920 and 844x390 landscape |
| Interactions | Four categories, Work entry, ATHAR preservation, keyboard/focus/Escape, touch emulation, scroll lock, rapid reopen, deep-link reload/history, invalid IDs, language switch |
| Accessibility | axe WCAG 2.2 AA checks passed on sampled landing/category/modal states; keyboard and reduced-motion tests passed; not complete WCAG certification |
| Themes | Light system preference retains authoritative dark-only UI; separate Light theme does not exist |
| Actual Vercel browser | Public access, category navigation, direct modal, language switch, Escape, Back/Forward and refresh manually exercised across preview iterations |
| Existing Stage18 tests | 5 PASS, 16 FAIL; unchanged suites run, not hidden or marked passing |
| Dependency audit | FAIL: 1 critical and 5 high reports affecting existing dependency versions |

Legacy failure details are retained in artifact `legacy-regression-qa` (11693149823). Many require obsolete `.cvMapGrid`, `.cvHeroActions`, `.cvSignal`, `.cvHeroKeywordLoop` and related old-layout nodes absent from the approved static homepage. Another expects a 44px language target while baseline is 40px. These failures are unresolved; a clean baseline browser comparison of all 16 has not been run, so no blanket claim that every failure is pre-existing is made. Do not redesign the approved homepage to satisfy obsolete tests.

Audit versions were compared with main and are unchanged (including Next 16.3.5 and @keystatic/next 5.0.5). npm proposes a Next upgrade and a breaking Keystatic-chain change; no force-fix or unrelated infrastructure upgrade was attempted. Exploitability was not assessed. This blocks an overall release PASS.

Local Chromium execution was blocked by host socket restrictions; actual browser test results above came from GitHub Actions, not local execution. Physical devices, Safari, authenticated CMS writes and field performance were not tested. Source performance review found no extra runtime framework, lazy media, and about 16.4KB uncompressed shared gallery JS/CSS; no measured CLS/LCP claim is made. Owner uploads still need sensible image dimensions/compression.

## Visual evidence

Eight EN/AR desktop/mobile category/modal screenshots and JSON results: https://github.com/budctx/ibrahim-portfolio/actions/runs/38116317047/artifacts/11692914987

Source-controlled representative screenshots are in `evidence/`. Arabic mobile modal and English desktop category were visually inspected: complete artwork, visible close control, readable copy and no overlap. Other viewport assertions passed automatically. Preview fixtures demonstrate layout, not final artistic content.

## Expert OS final review

See [Expert OS review](expert-review.md). Applied the available v1.6.9 methodology; v1.7.0 was an unmerged candidate overlay. Findings G-01 multi-image clipping and G-02 rapid history race were corrected and browser re-tested. Gallery-focused checks pass; overall release status remains BLOCKED due to dependency audit, unresolved legacy suite failures and authenticated CMS validation gap. This is evidence-based AI review, not independent human certification.

## Owner judgment and release

Owner review is needed for visual acceptance and eventual real design assets. Decide separately whether to authorize a dependency-remediation/test-baseline maintenance follow-up; no redesign or breaking upgrade is included here. Complete authenticated CMS workflow validation before release.

Main remained `c0e77234f0fa65e31f3a6d5e0d14873dc10cf07b` at final readback. Production settings, domain and live records remain untouched. Draft PR remains unmerged. This handoff stops at Preview. Rollback before release is closing the Draft PR/removing its feature preview; no Production rollback is currently needed. Any future merge or Production deployment requires new explicit owner approval.
