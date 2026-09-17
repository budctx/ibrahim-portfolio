export const sanityConfig = {
  projectId: 'aegfzo3t',
  dataset: 'production',
  apiVersion: '2025-02-19',
} as const;

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
};

export async function getProjects(): Promise<ProjectSummary[]> {
  const query = '*[_type == "project" && status == "published" && contentOrigin == "real" && rightsCleared == true && ndaCleared == true] | order(order asc){projectKey,titleEn,titleAr,"slug":slug.current,classification,year,typeEn,typeAr,roleEn,roleAr,tools,problemEn,problemAr,contextEn,contextAr,processEn,processAr,decisionsEn,decisionsAr,outcomeEn,outcomeAr,projectUrl,order,featured}';
  const endpoint = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, { next: { revalidate: 60 } });
  if (!response.ok) return [];
  const data = (await response.json()) as { result?: ProjectSummary[] };
  return data.result ?? [];
}

export async function getProjectBySlug(slug:string){
  const projects = await getProjects();
  return projects.find((project)=>project.slug===slug) ?? null;
}
