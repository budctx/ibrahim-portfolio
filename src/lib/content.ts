import {createReader} from '@keystatic/core/reader';
import {createGitHubReader} from '@keystatic/core/reader/github';
import {cookies, draftMode} from 'next/headers';
import {cache} from 'react';
import keystaticConfig from '../../keystatic.config';

const localReader = createReader(process.cwd(), keystaticConfig);

const readerForRequest = cache(async () => {
  try {
    const draft = await draftMode();
    if (draft.isEnabled) {
      const cookieStore = await cookies();
      const branch = cookieStore.get('ks-branch')?.value;

      if (branch) {
        return createGitHubReader(keystaticConfig, {
          repo: 'budctx/ibrahim-portfolio',
          ref: branch,
          token: cookieStore.get('keystatic-gh-access-token')?.value,
        });
      }
    }
  } catch {
    // Request APIs are unavailable during static generation/build-time discovery.
  }

  return localReader;
});

async function isDraftRequest() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

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

type ProjectEntry = Awaited<ReturnType<typeof localReader.collections.projects.read>>;

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
    tools: [...entry.tools],
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
    order: entry.order ?? undefined,
    featured: entry.featured,
    cover: entry.cover
      ? {url: entry.cover, altEn: entry.coverAltEn, altAr: entry.coverAltAr}
      : undefined,
    gallery: entry.gallery.flatMap((item) =>
      item.image ? [{url: item.image, altEn: item.altEn, altAr: item.altAr}] : [],
    ),
  };
}

function isPublicReady(entry: NonNullable<ProjectEntry>) {
  const galleryReady = entry.gallery.every(
    (item) => !item.image || (Boolean(item.altEn) && Boolean(item.altAr)),
  );

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
    Boolean(entry.cover) &&
    Boolean(entry.coverAltEn) &&
    Boolean(entry.coverAltAr) &&
    galleryReady
  );
}

export async function getProjects(): Promise<ProjectSummary[]> {
  const reader = await readerForRequest();
  const entries = await reader.collections.projects.all();

  return entries
    .filter(({entry}) => isPublicReady(entry))
    .map(({slug, entry}) => mapProject(slug, entry))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.projectKey.localeCompare(b.projectKey));
}

export async function getProjectBySlug(slug: string): Promise<ProjectSummary | null> {
  const reader = await readerForRequest();
  const entry = await reader.collections.projects.read(slug);

  if (!entry) return null;
  if (!(await isDraftRequest()) && !isPublicReady(entry)) return null;

  return mapProject(slug, entry);
}

export async function getPreviewProjectBySlug(slug: string): Promise<ProjectSummary | null> {
  const reader = await readerForRequest();
  const entry = await reader.collections.projects.read(slug);
  return entry ? mapProject(slug, entry) : null;
}
