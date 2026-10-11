import {createReader} from '@keystatic/core/reader';
import {createGitHubReader} from '@keystatic/core/reader/github';
import {cookies, draftMode} from 'next/headers';
import config from '../../keystatic.config';

// Server data boundary: request cookies and filesystem reader never enter a client component.
export const graphicCategories = [
  {slug: 'discord', title: {en: 'Discord', ar: 'ديسكورد'}},
  {slug: 'brand-identity', title: {en: 'Brand Identity', ar: 'الهوية البصرية'}},
  {slug: 'social-campaigns', title: {en: 'Social & Campaigns', ar: 'التواصل والحملات'}},
  {slug: 'print-packaging', title: {en: 'Print & Packaging', ar: 'المطبوعات والتغليف'}},
] as const;
export type GraphicCategorySlug = typeof graphicCategories[number]['slug'];
export type GalleryText = {ar: string; en: string};
export type GraphicImage = {url: string; alt: GalleryText};
export type GraphicDesign = {
  id: string; slug: string; title: GalleryText; description: GalleryText; entity: GalleryText;
  category: GalleryText; categorySlug: GraphicCategorySlug; cover: GraphicImage;
  images: GraphicImage[]; order: number; entityLogo?: string; selfInitiated?: boolean;
};
const reader = createReader(process.cwd(), config);
type Entry = NonNullable<Awaited<ReturnType<typeof reader.collections.graphicDesigns.read>>>;
const complete = (value: string | null | undefined): value is string => Boolean(value?.trim());
const safeImage = (value: string | null | undefined): value is string => Boolean(value && /^\/project-media\/[\p{L}\p{M}\p{N}/_ .-]+\.(?:avif|webp|png|jpe?g|gif)$/iu.test(value) && !value.includes('..'));
const stable = (value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

export function mapPublishedGraphicDesign(slug: string, entry: Entry): GraphicDesign | null {
  const category = graphicCategories.find(item => item.slug === entry.category);
  if (!category || entry.status !== 'published' || entry.contentOrigin !== 'real' || !stable(slug) || !stable(entry.designId)) return null;
  if (![entry.titleEn, entry.titleAr, entry.descriptionEn, entry.descriptionAr, entry.coverAltEn, entry.coverAltAr].every(complete)) return null;
  if ([entry.descriptionEn, entry.descriptionAr].some(value => /[\r\n]/.test(value) || value.length > 240)) return null;
  if (!entry.selfInitiated && ![entry.entityEn, entry.entityAr].every(complete)) return null;
  if (!safeImage(entry.cover)) return null;
  if (entry.images.some(image => !safeImage(image.image) || !complete(image.altEn) || !complete(image.altAr))) return null;
  return {
    id: entry.designId, slug,
    title: {en: entry.titleEn, ar: entry.titleAr},
    description: {en: entry.descriptionEn, ar: entry.descriptionAr},
    entity: entry.selfInitiated ? {en: 'Self-initiated work', ar: 'عمل شخصي'} : {en: entry.entityEn, ar: entry.entityAr},
    category: category.title, categorySlug: category.slug,
    entityLogo: safeImage(entry.entityLogo) ? entry.entityLogo : undefined, selfInitiated: entry.selfInitiated,
    cover: {url: entry.cover, alt: {en: entry.coverAltEn, ar: entry.coverAltAr}},
    images: entry.images.map(image => ({url: image.image!, alt: {en: image.altEn, ar: image.altAr}})),
    order: entry.order ?? 999,
  };
}

export function galleryFixturesEnabled(env: NodeJS.ProcessEnv = process.env) {
  if (env.VERCEL_ENV === 'production') return false;
  return (env.VERCEL_ENV === 'preview' && (env.GRAPHIC_GALLERY_FIXTURES === '1' || env.VERCEL_GIT_COMMIT_REF === 'feature/graphic-design-gallery')) ||
    (env.NODE_ENV === 'development' && !env.VERCEL_ENV && env.GRAPHIC_GALLERY_FIXTURES === '1');
}
function fixture(category: typeof graphicCategories[number]): GraphicDesign {
  const image = {url: '/gallery-fixtures/test.svg', alt: {en: 'PREVIEW TEST — neutral geometry, not portfolio work', ar: 'اختبار المعاينة — أشكال تجريبية وليست عملاً منشوراً'}};
  return {id: `preview-test-${category.slug}`, slug: `preview-test-${category.slug}`, title: {en: 'PREVIEW TEST', ar: 'اختبار المعاينة'}, description: {en: 'Isolated preview fixture for testing gallery interactions.', ar: 'عينة معزولة في المعاينة لاختبار تفاعلات المعرض.'}, entity: {en: 'Test fixture — no client', ar: 'عينة اختبار — بلا عميل'}, category: category.title, categorySlug: category.slug, cover: image, images: [image], order: 9999};
}
export async function getGraphicDesigns(category?: string): Promise<GraphicDesign[]> {
  let requestReader: Pick<typeof reader, 'collections'> = reader;
  try {
    if ((await draftMode()).isEnabled) {
      const jar = await cookies();
      const branch = jar.get('ks-branch')?.value;
      if (branch) requestReader = createGitHubReader(config, {repo: 'budctx/ibrahim-portfolio', ref: branch, token: jar.get('keystatic-gh-access-token')?.value});
    }
  } catch { /* Build-time content uses the checked-out branch. */ }
  // Even authenticated draft-mode requests pass publication and language validation.
  const entries = await requestReader.collections.graphicDesigns.all();
  const designs = entries.map(item => mapPublishedGraphicDesign(item.slug, item.entry)).filter((item): item is GraphicDesign => item !== null);
  const ids = new Set<string>();
  const unique = designs.filter(item => {if (ids.has(item.id)) return false; ids.add(item.id); return true;});
  if (galleryFixturesEnabled()) unique.push(...graphicCategories.map(fixture));
  return unique.filter(item => !category || item.categorySlug === category).sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}
