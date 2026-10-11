# Graphic Design Gallery — Keystatic owner guide

Open `/keystatic` using the existing GitHub sign-in. Choose **Graphic Design Gallery** → Create entry.

1. Set a permanent lowercase, hyphenated design ID and share slug. Keep both unchanged after sharing links.
2. Enter English and Arabic titles and one-line descriptions (maximum 240 characters each).
3. Enter the real client/entity in both languages, or check **Self-initiated work**. Never invent a commission.
4. Choose Discord, Brand Identity, Social & Campaigns, or Print & Packaging.
5. Upload a cover and optional additional images; supply descriptive English and Arabic alt text for each. Supported public media: JPG/JPEG, PNG, WebP, AVIF or GIF. Images are stored in the existing `public/project-media` location. SVG uploads are excluded from public content for safety; export raster artwork instead.
6. Set display order (lower values first). New entries default to Draft. Set Published only when the actual artwork and both translations are approved. Use Hidden to remove a previously published design from discovery and direct modal links, or delete the entry.
7. Save using the existing Keystatic GitHub workflow. Publication becomes visible after the associated deployment; unpublished/incomplete entries never appear in public gallery data, including direct-link requests.
8. Open the category, open the design, and use its copy-link control. Permanent links have the form `/work/discord?design=your-slug`; Arabic uses `/ar/work/discord?design=your-slug`.

## Review/release boundary

This feature is on `feature/graphic-design-gallery` only. Do not use CMS actions that write to main during owner review. The existing CMS infrastructure and production authentication are unchanged. A separate real, published design collection entry is not necessary for testing.

The preview includes conspicuously labelled **PREVIEW TEST / اختبار المعاينة** geometric fixtures, one per category. They are generated in server code, never stored as published content. They are enabled only for Vercel Preview with the exact feature branch or explicit fixture flag, or local development with an explicit flag. `VERCEL_ENV=production` always excludes them, even when flags are accidentally present. Test image files are inert assets, not discoverable portfolio records.

Draft preview cookies may select a Keystatic branch, but never bypass publication checks. Both languages must be complete; there is no silent translation fallback. No new database or CMS is introduced. No authorized real gallery artwork was supplied for this implementation, so the real collection remains empty.

## Stable links and editorial preview

The stable ID identifies the record; the slug is the actual permanent URL identifier. Keystatic does not enforce immutability or retain redirects when an owner renames a slug. Renaming it breaks previously shared links, so edit titles freely but keep the original slug and ID. The server filters duplicate IDs from public discovery.

This collection intentionally has no Keystatic **Preview** shortcut: the existing `/preview/start` workflow is scoped to legacy project detail routes, not this modal gallery. Review changes on the feature branch Vercel Preview and copy links from the modal. Arabic filenames are supported for raster uploads. CMS authentication and authenticated create/upload/save/publish/delete actions still require real browser verification with an authorized account; source/type/content validation is not proof of that authenticated workflow. No real entries were created, edited, or removed in this implementation.
