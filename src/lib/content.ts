import {createReader} from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export type ProjectImage = {
  url: string;
  altEn?: string;
  altAr?: string;
};

export type ProjectSummary = {
  projectKey: string;
  titleEn: string;
  titleAr: string;
  slug: string;
  classification: 'flagship' | 'selected' | 'playground';
  year?: string;
  typeEn?: string;
  typeAr?: string;
  roleEn?: string;
  roleAr?: string;
  tools?: string[];
  problemEn?: string;
  problemAr?: string;
  contextEn?: string;
  contextAr?: string;
  processEn?: string;
  processAr?: string;
  decisionsEn?: string;
  decisionsAr?: string;
  outcomeEn?: string;
  outcomeAr?: string;
  projectUrl?: string;
  order?: number;
  featured?: boolean;
  cover?: ProjectImage;
  gallery?: ProjectImage[];
};

type ProjectEntry = Awaited<ReturnType<typeof reader.collections.projects.read>>;

function mapImage(image: NonNullable<ProjectEntry>['cover']): ProjectImage | undefined {
  if (!image?.src) return undefined;
  return {url: image.src, altEn: image.altEn, altAr: image.altAr};
}

function mapProject(slug: string, entry: NonNullable<ProjectEntry>): ProjectSummary {
  return {
    projectKey: entry.projectKey,
    titleEn: entry.titleEn,
    titleAr: entry.titleAr,
    slug,
    classification: entry.classification,
    year: entry.year,
    typeEn: entry.typeEn,
    typeAr: entry.typeAr,
    roleEn: entry.roleEn,
    roleAr: entry.roleAr,
    tools: entry.tools,
    problemEn: entry.problemEn,
    problemAr: entry.problemAr,
    contextEn: entry.contextEn,
    contextAr: entry.contextAr,
    processEn: entry.processEn,
    processAr: entry.processAr,
    decisionsEn: entry.decisionsEn,
    decisionsAr: entry.decisionsAr,
    outcomeEn: entry.outcomeEn,
    outcomeAr: entry.outcomeAr,
    projectUrl: entry.projectUrl || undefined,
    order: entry.order,
    featured: entry.featured,
    cover: mapImage(entry.cover),
    gallery: entry.gallery.flatMap((image) => {
      const mapped = mapImage(image);
      return mapped ? [mapped] : [];
    }),
  };
}

function isPublicReady(entry: NonNullable<ProjectEntry>) {
  return (
    entry.status === 'published' &&
    entry.contentOrigin === 'real' &&
    entry.rightsCleared === true &&
    entry.ndaCleared === true &&
    Boolean(entry.projectKey) &&
    Boolean(entry.titleEn) &&
    Boolean(entry.titleAr) &&
    Boolean(entry.year) &&
    Boolean(entry.typeEn) &&
    Boolean(entry.typeAr) &&
    Boolean(entry.roleEn) &&
    Boolean(entry.roleAr) &&
    entry.tools.length > 0 &&
    Boolean(entry.problemEn) &&
    Boolean(entry.problemAr) &&
    Boolean(entry.contextEn) &&
    Boolean(entry.contextAr) &&
    Boolean(entry.processEn) &&
    Boolean(entry.processAr) &&
    Boolean(entry.decisionsEn) &&
    Boolean(entry.decisionsAr) &&
    Boolean(entry.outcomeEn) &&
    Boolean(entry.outcomeAr) &&
    Boolean(entry.cover?.src) &&
    Boolean(entry.cover?.altEn) &&
    Boolean(entry.cover?.altAr)
  );
}

export async function getProjects(): Promise<ProjectSummary[]> {
  const entries = await reader.collections.projects.all();
  return entries
    .filter(({entry}) => isPublicReady(entry))
    .map(({slug, entry}) => mapProject(slug, entry))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.projectKey.localeCompare(b.projectKey));
}

export async function getProjectBySlug(slug: string): Promise<ProjectSummary | null> {
  const entry = await reader.collections.projects.read(slug);
  if (!entry || !isPublicReady(entry)) return null;
  return mapProject(slug, entry);
}

export async function getPreviewProjectBySlug(slug: string): Promise<ProjectSummary | null> {
  const entry = await reader.collections.projects.read(slug);
  return entry ? mapProject(slug, entry) : null;
}
