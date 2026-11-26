# UI review corrections — 2026-11-26

Concept branch only; baseline 1c817d3171174b5658dd16c4c239c34791e2462c.

- Fixed short landscape Hero grid allocation instead of raising a transform floor: below640px in landscape the badge has its own full-height center track and the four roles retain outer tracks. At568×320 actual card96.2×133.2px, formerly26×36px. Approved flip interaction unchanged.
- Contained compact landscape About skill rows within their155px orbit; reserved12px before selector controls. Former overlap14px; current clearance12px at568×320 and844×390.
- Hero descriptions and professional title have a12px minimum and explicit line-height; supporting About title inherits site typography.
- Intentionally did not add a next/arrow CTA: owner previously removed those. Approach whitespace recommendation is optional and retained pending visual comparison rather than arbitrary repositioning.

Verification: regenerated bilingual concept; Chromium emulation with actual Readex font replay; viewport regression covers15sizes ×2languages ×2themes, plus4scene/gallery interaction tests. Added assertions for badge visual scale and About compact landscape clearance. Fresh screenshots at concept-evidence/ui-fixes. Physical iPhone/Safari not tested. No production deployment or PR merge.

## Portrait follow-up from owner screenshot
The initial compact-landscape fix did not cover portrait. Removed fixed vertical gaps from every skill-grid breakpoint and used intrinsic content rows with space-between, keeping all labels inside the orbit. Portrait clearance8px; compact landscape12px. Regression now asserts selector clearance on every scene size, including402×874 (screenshot aspect ratio), both languages and themes. Chromium emulation only.
