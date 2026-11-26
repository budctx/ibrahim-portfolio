# Independent mobile findings — targeted corrections

Baseline reviewed by Reality Checker: 0385ab75efea6984458b069513d1f7e0ba73e44b.

- P1: English Contact CTA overlapped the footer at568×320. Short-landscape Contact now gives copy a wider column, fits both heading lines and the full description, and reserves the footer's own grid row. CTA placement is corrected; no z-index/pointer-event bypass is used.
- P2: Work03/04/05 metadata clipped inside the card. The short-landscape layout gives metadata more width, uses20px titles/14px descriptions/12px categories and proportionate padding. All original CMS titles, categories and summaries remain visible. No line clamp, ellipsis, display:none or content deletion.

The height/landscape breakpoint leaves portrait, taller landscape, approved Hero and normal-flow language/theme tools unchanged. Each scene retains Fit Viewport.

Regression now includes568×320,667×375 and740×360 in AR/EN and both themes. It checks every card's text bounds inside its clipping ancestor, five CTA hit-test points, separation from the footer and both contact openers. The previous scene-only bounds assertion could not detect either issue. Real touch input was additionally checked with mobile Chromium emulation at568×320 for four locale/theme cases; both openers and focus return passed.

Before/after: `/concept-v2/qa/evidence/mobile-landscape-fixed.jpg`. Chromium emulation, not physical Safari/iPhone. No merge or production changes.
