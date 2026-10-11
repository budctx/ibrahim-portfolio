# Expert OS review — Graphic Design Gallery

## Framework and evidence scope

Baseline read: `EXPERT_DEPARTMENT_OS_AUTOBOOT_v1.6.9(1).md`, Library ID `libfile_02f1cdb394588191b8cdc3f236b8cef7`, governance/review search and lines 82–161 inspected. Applied evidence labels, blocking-failure rule, audit identity, regression invalidation and truthful completion invariant. The local `expert-os-context-v1.7.0/modules/CONTEXT_CREDIT_OPTIMIZATION.md` was read; it explicitly calls itself an **unmerged candidate overlay**, not a certified replacement. Its selective-context guidance does not lower acceptance requirements.

This is AI source review through the requested eight expert perspectives, not eight independent human certifications. A delegated AI source audit examined actual repository files; browser and automated evidence must be attributed separately. Context is sufficient for the source findings below; insufficient for final visual/runtime certification.

## Initial perspective reviews

| Perspective | Initial verdict and why | Evidence status | Risk / required validation | Confidence |
|---|---|---|---|---|
| Information Architect / UX Architect | Source PASS: four fixed disciplines and single Work entry; no new global section | VERIFIED source: gallery-page, graphic-gallery, shared homepage factory | Browser navigation and empty-state evidence pending | High |
| Digital Art Director | PENDING: approved card/dialog extraction is appropriate; visual parity not certified from code | EVIDENCE: work.css, gallery.css | Compare desktop/mobile AR/EN; preserve four-scene/dark baseline conflicts explicitly | Medium |
| Senior Frontend Engineer | Source PASS with testing pending: shared DOM module used across static homepage and gallery; server Keystatic boundary | VERIFIED source: work-ui.js, gallery-page.ts, graphic-gallery.ts | Build, lint, type, existing regressions; CMS authenticated save not inferred | High |
| Interaction Designer | PENDING: URL-based modal and native history implemented | EVIDENCE: gallery.js, work-ui.js | Rapid close/reopen/history race and reload must be browser-tested | Medium |
| Accessibility Specialist | Source fix verified for G-01; initial fixed-height clipped artwork issue corrected | VERIFIED source: renderArt + work.css | Fix gallery media layout, test all images, close visibility, focus cycle, Escape and reduced motion | High |
| Bilingual UX Specialist | Source PASS: both text/alt languages required; Arabic routes/dir and selected slug preservation implemented | VERIFIED source: content mapper and gallery response | Browser mixed text and 320px Arabic controls pending | High |
| QA Engineer | PENDING: source review is not test execution | UNKNOWN runtime | Execute required test matrix; report unsupported dimensions honestly | High |
| Web Performance Engineer | Source PASS with limitations: no new dependency/framework, lazy images, server-side published filtering | EVIDENCE: gallery.js and route renderer | Actual CLS/media weight/performance measurements pending; uploads not automatically optimized | Medium |

## Finding register

- **G-01 — Major / blocking at initial review:** `gallery.js` appends cover and additional images to `.project-art.gallery-art`, while reused CSS fixes modal artwork height and hides overflow. Gallery-scoped contained media layout is needed. Status: corrected in gallery-scoped CSS; source readback confirms height:auto, grid gap, overflow:visible and contained max-height images. Browser re-test remains pending.
- **G-02 — Required runtime challenge:** close events and `history.back()` are asynchronous. Test rapid close/reopen/Back/Forward so an old close callback cannot clear a newer selection or leave scroll locked. Status: pending browser evidence, not a proven defect.
- **G-03 — Baseline conflict:** Light mode does not exist in approved homepage. Preserve actual behavior and explicitly disclose unsupported Light-mode validation rather than claiming parity. Status: documented, owner-facing limitation required.
- **G-04 — Baseline conflict:** requested five-section order differs from four approved scenes. Preserve four scenes as explicitly required by production-precedence rule. Status: documented.

## Security/source review

Published data excludes draft, hidden, development-origin, invalid slugs, duplicate IDs, missing bilingual copy/alt and unsafe image paths. Image public paths are restricted to local raster assets without traversal. Serialized data escapes `<`; HTML text/attributes are escaped and client text uses textContent. Fixture generation explicitly returns false in Production. No production settings are changed by these source additions. These are source observations, not penetration-test results.

## Final gate

**NOT YET CERTIFIED.** This is the initial review checkpoint. Do not claim final PASS until G-01 browser verification and required test evidence are resolved. Deployment/readiness and production-unchanged claims require tool readback at handoff. Owner approval remains mandatory after Preview delivery regardless of technical outcome.
