# Editorial research and implementation decision

## Arabic references reviewed

| Source | Material read | Applied | Not adopted |
| --- | --- | --- | --- |
| [abadLife/ux-araby](https://github.com/abadLife/ux-araby/blob/main/SKILL.md) | Purpose, four quality standards, direct verbs, natural register, RTL and number guidance | Purposeful concise natural clear copy; avoid literal English calques and passive filler | Rigid microcopy word limits for long-form case-study prose |
| [UX-Writing/Content-Style-Guide-in-Arabic](https://github.com/UX-Writing/Content-Style-Guide-in-Arabic/tree/main/examples/gatsby-theme-docs/src/docs) | voice-and-tone.md, actionable-language.md, style-and-mechanics.md | Stable voice, context-sensitive tone, clear labels, concise headings, action/value connection | Fictional brand examples and punctuation rules treated as absolute laws |
| [itady74/ux-writing-arabic](https://github.com/itady74/ux-writing-arabic) | README, SKILL.md and checklist.md | Terminology consistency and context/RTL review checklist | Contradictory numeral advice, mixed-language/corrupted example fragments, blanket synonym replacements such as management → editing |

The sources are editorial references, not installed agent instructions or dependencies. The portfolio voice is the owner's Saudi professional voice. Current BU'D copy previously repeated release dates, source caveats and numbered prose paragraphs. The revision names the design tension, separates role from process and presents meaningful steps/decisions semantically. Historical text is preserved in bud-editorial-source-archive.md.

## Content rendering comparison

| Option | Capability | Fit here | Decision |
| --- | --- | --- | --- |
| [mdx-js/mdx](https://github.com/mdx-js/mdx/blob/main/readme.md) | Markdown plus executable JSX/components, compiler/bundler integration | Requires a new authoring/build boundary for the existing YAML collection | Do not add |
| [remarkjs/react-markdown](https://github.com/remarkjs/react-markdown/blob/main/readme.md) | Safe Markdown React renderer, custom component mapping and plugins | Useful renderer but overlaps the installed Markdoc parser | Do not add |
| [unifiedjs/unified](https://github.com/unifiedjs/unified/blob/main/readme.md) | Extensible syntax-tree parse/transform/stringify pipeline | Excess configuration for a small controlled presentation system | Do not add |
| [tailwindlabs/tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography/blob/main/README.md) | Typography defaults for CMS HTML via prose classes | This project uses scoped CSS and no Tailwind dependency | Borrow the separation of prose/media styling; do not install |
| Existing Keystatic 0.6.9 | YAML text, objects, select, array, image fields; Markdoc 0.4 already installed | Preserves current records, reader/draft behavior and media | Extend optional typed presentation metadata; render Markdown subset with installed Markdoc |

No new runtime dependency or content migration is required. Keystatic remains the source of text, lead statements, step/decision items and images. Missing presentation metadata defaults to ordinary chapters; media placement and publication gates remain intact. The `year` field is historical CMS metadata and no longer appears in project UI. Meaningful employment and education dates remain on career/about pages.

## Evidence boundary

Only existing public catalog, onboarding and trial screenshots are used. No host-session imagery, participant data, fabricated quotations, survey counts or measured commercial outcomes are added. The gameplay-refinement example names no game. The start-dialog placement is a design choice; deferred instruction copy is still described accurately.
