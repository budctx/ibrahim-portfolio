# Portfolio CI closure — 2026-11-04

## Goal
Close security and production regression debt while preserving the approved production visual experience. This changes dependencies and CI test targeting only: no Hero redesign, gallery content, or publishing-model changes.

## Security remediation
- Upgrade Next.js **16.3.5 → 16.4.4** (stable patch release) and update its lockfile.
- Resolve `sharp` to **0.35.5** and `source-map-js` to **1.2.2** through documented npm overrides, rather than a destructive forced downgrade of Keystatic.
- The October 14 audit found 6 advisories (5 high, 1 critical); this is historical **baseline**, not a claim about the remediated graph.
- GHSA-vfj7-8cjw-p6xm (`braces`) was **withdrawn October 23, 2026** as not practically exploitable. No unnecessary replacement of `@keystatic/next` / `chokidar`.
- Required verification: `npm ci`, `npm audit --audit-level=high`, TypeScript, build, gallery tests and current production tests in GitHub Actions. Fix any new failures before merging.

## Stage 18 regression migration
The earlier `tests/stage18-*.spec.cjs` files captured an older, unshipped `.cv*` homepage and English-default route. They remain in the repository as **historical test evidence** but are not applicable to the current Arabic-root / English-/en Hero implementation. Do not treat their selector failures as proof that current features are broken.

The stable `existing-regressions` job ID now runs `tests/portfolio-production.spec.cjs`, which exercises:
- Arabic `/`, English `/en`, legacy `/ar` redirect and canonical/hreflang metadata;
- current Hero card, semantic scene navigation, Work/ATHAR, Contact and modal focus;
- 320, 390, 768, 1440 px and 200% root text sizing;
- keyboard activation, Reduced Motion, horizontal overflow, serious/critical axe rules.

The existing `graphic-gallery` job continues running its full test suite independently. Keeping all checks separate avoids false PASS and ensures security remains a required gate.

## Shipping rules
1. First validate the isolated branch PR in CI.
2. Review the Vercel preview and regression evidence before merging.
3. Verify production deployment and smoke test after an approved merge.
4. Record the resulting run, deployment and release decision in [Notion closure tracker](https://app.notion.com/p/0123562b2300452d855fe7248caccd92).

**Status:** Implementation under review; no production PASS is implied by this document.

## Rollback
Revert the maintenance PR if the package upgrade causes an unforeseen regression. Do not downgrade to a vulnerable release without a documented mitigation.
