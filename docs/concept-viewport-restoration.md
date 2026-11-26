# Owner correction — 26 November 2026

The owner identified three regressions in the concept: Approach ignored dark mode, sections no longer fit the viewport, and persistent theme/language controls obstructed the journey.

## Root causes and decisions

- Approach used a hard-coded cream background and green copy rather than the shared theme tokens. It now uses the same background/text/border/accent tokens as the other scenes.
- The audit change to content-driven section heights conflicted with the approved one-viewport scene contract. That recommendation is superseded by the owner's correction. All five scenes again occupy exactly the scroll container height, with mandatory vertical snapping.
- Global fixed language/theme tools were a prior recommendation, not a locked requirement. The owner rejected their persistent display. The same two controls now live in the Hero header in normal flow and leave the viewport with it. Preferences still persist across pages.

## Content within the viewport

Work keeps all five real destinations in a native horizontal track. Numbered buttons select cards without requiring a drag; card titles/images still open the study/gallery. There is no added animation library, automatic cycling or second signature interaction.

Approach keeps all three authentic ATHAR decisions as native, mutually exclusive details. The original detailed copy remains available. About removes only the generic repeated method sentence; product design, graphic design and supporting AI copy remain. Header, copy and objects use separate height-aware grid tracks. Hero artwork/flip behavior is unchanged.

## Verification

48 viewport/locale/theme cases, all with actual Readex font resources loaded: exact scene heights, content bounds, every Work card and every decision expanded. No vertical clipping or JavaScript errors observed. A new `tests/concept-viewport.spec.cjs` protects this contract in CI. Existing audit expectations were updated so off-screen header tools are required, rather than treating them as a failure.

Screenshots and raw metrics: `/concept-v2/qa/viewport.html` and `/concept-v2/qa/viewport-results.json`.

Chromium emulation only; no physical Safari/iPhone claim. No merge or production change.

## Deployed navigation regression

The deployed smoke test exposed a direct-jump defect: a relative `scrollBy` operation stops at the first intermediate card under `scroll-snap-stop: always`. Adjacent navigation had passed. Work selection now uses an absolute `scrollTo` destination, preserving per-gesture snap behavior while allowing any numbered button to reach its target. The viewport test now checks non-sequential indices `[0,4,1,3,2,0]` in every case.
