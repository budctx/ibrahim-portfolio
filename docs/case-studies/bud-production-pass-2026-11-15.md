# BU'D case study — visual production pass, 15 November 2026

## Delivery boundary
Same branch and draft PR #18. No merge, production deployment, publication flag or image-rights approval. `status: draft`, `rightsCleared: false`, `ndaCleared: false` retained. The project detail route accepts drafts only in development, Vercel Preview, or existing CMS draft mode; production retains the public-readiness gate. Preview metadata is noindex. Listings still exclude drafts. Graphic Design Gallery remains separate.

## Sources inspected
- Existing portfolio production, PR #18 and branch source.
- BU'D production homepage and /events in the interactive browser; repository main `4b1e48908e1519d641b5a57b50a21535486974c4` (source checkout, not a claim that browser assets expose this exact SHA).
- Notion case-study page `419b475e25f1811ab508c709fd7a265e`, command center, approved decisions `404b475e25f18150a4e6f0f13ce6a912`, and November 11 audit `40eb475e25f181a49151c6c69f7e8fc1`.
- Prior PR head e9ecaf2: Portfolio CI success (run 43709096109), Vercel READY. Fresh results must be checked against the final head.

## Genuine image inventory
All five JPEGs are unmodified browser captures of the actual public production product. No generated or reconstructed interfaces; no staged authenticated results. Recaptured using keyboard activation to avoid visible automation-pointer overlays. Images include public prices, but no personal financial records, identity data or credentials.

| File | Observed state | Narrative placement |
| --- | --- | --- |
| catalog.jpg | Product cards and public trials | Hero |
| home.jpg | Product introduction and event-selection action | Product and role |
| onboarding.jpg | Public How to Start dialog | Host journey, explicitly distinguished from authenticated setup |
| cards-revealed.jpg | Question and condition cards revealed, timer at zero | Discovery interaction |
| mini-trial.jpg | Two matched pairs, completion feedback | Discovery interaction |

Partner logos on the homepage require the final rights review. No rights clearance inferred from capture.

## Access limitation
The connected local browser was unavailable. The cloud browser had no signed-in BU'D session. Discord login reached its credential form. No credentials were requested, no purchase was made, and no credit was consumed. Consequently authenticated setup, live hosting, winner entry, awards, closing, six-game selector and start modal were NOT captured or freshly tested. No replacement was fabricated. These gaps are explicitly described in the bilingual case study.

## Editorial decisions
Personal product/design ownership, solo AI-assisted development and informal real-user feedback remain first-person user reports. The unnamed gameplay iteration remains general; increasing competitiveness and enjoyment is an intention, not a measured result. The November 11 release is attributed to its historical record. No invented research sample, conversion, engagement or satisfaction metrics.

## Implementation
Keystatic gallery items gain optional narrative placement and bilingual captions, with gallery default for older entries. Shared server-rendered case-study component keeps EN/AR in parity, paragraph structure, chapter navigation, full-size screenshot links and theme support. Existing site typography, surfaces and controls are reused. Preview disclosure appears only in development/Preview.

## Local validation
- Production build passed; TypeScript passed.
- CSS audit passed all six checks (47,726 bytes at initial pass).
- Diff whitespace checks passed.
- npm audit --audit-level=high passed its threshold; two existing moderate findings in the Keystatic/minimatch dependency chain remain. No breaking dependency update made.
- Added seven CI browser checks: EN/AR at 390/768/1440, real image loading and alt text, overflow, both themes, WCAG A/AA axe scan, keyboard section navigation, counterpart language route and draft listing exclusion. These require their actual CI result before being called passed.

## Remaining review
Capture authenticated host journey, review image rights and wording, inspect final Preview on both languages, and obtain publication approval. No publication readiness is asserted merely because CI or Vercel is green.
