export const sanityConfig = {
  projectId: 'aegfzo3t',
  dataset: 'production',
  apiVersion: '2025-02-19',
} as const;

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

const publicProjectFilter = `
  _type == "project" &&
  status == "published" &&
  contentOrigin == "real" &&
  rightsCleared == true &&
  ndaCleared == true &&
  defined(projectKey) &&
  defined(titleEn) &&
  defined(titleAr) &&
  defined(slug.current) &&
  defined(classification) &&
  defined(year) &&
  defined(typeEn) &&
  defined(typeAr) &&
  defined(roleEn) &&
  defined(roleAr) &&
  count(tools) > 0 &&
  defined(problemEn) &&
  defined(problemAr) &&
  defined(contextEn) &&
  defined(contextAr) &&
  defined(processEn) &&
  defined(processAr) &&
  defined(decisionsEn) &&
  defined(decisionsAr) &&
  defined(outcomeEn) &&
  defined(outcomeAr) &&
  defined(cover.asset) &&
  defined(cover.altEn) &&
  defined(cover.altAr)
`;

const projectProjection = `{
  projectKey,
  titleEn,
  titleAr,
  "slug": slug.current,
  classification,
  year,
  typeEn,
  typeAr,
  roleEn,
  roleAr,
  tools,
  problemEn,
  problemAr,
  contextEn,
  contextAr,
  processEn,
  processAr,
  decisionsEn,
  decisionsAr,
  outcomeEn,
  outcomeAr,
  projectUrl,
  order,
  featured,
  "cover": select(defined(cover.asset) => {"url": cover.asset->url, "altEn": cover.altEn, "altAr": cover.altAr}),
  "gallery": gallery[]{"url": asset->url, altEn, altAr}
}`;

async function sanityQuery<T>(query: string): Promise<T | null> {
  const endpoint = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(endpoint, {next: {revalidate: 60}});
    if (!response.ok) return null;
    const data = (await response.json()) as {result?: T};
    return data.result ?? null;
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<ProjectSummary[]> {
  const query = `*[${publicProjectFilter}] | order(order asc, _createdAt asc) ${projectProjection}`;
  return (await sanityQuery<ProjectSummary[]>(query)) ?? [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectSummary | null> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}
