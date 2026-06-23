import { experiences as fallbackExp, projects as fallbackProj, skills as fallbackSkills, certifications as fallbackCerts } from "@/data/cv";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;

const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Convert Firestore REST value to JS value
function fromFsValue(val: Record<string, unknown>): unknown {
  if ("stringValue" in val) return val.stringValue;
  if ("integerValue" in val) return Number(val.integerValue);
  if ("doubleValue" in val) return val.doubleValue;
  if ("booleanValue" in val) return val.booleanValue;
  if ("nullValue" in val) return null;
  if ("arrayValue" in val) {
    const arr = val.arrayValue as { values?: Record<string, unknown>[] };
    return (arr.values || []).map(fromFsValue);
  }
  if ("mapValue" in val) {
    const map = val.mapValue as { fields?: Record<string, Record<string, unknown>> };
    return fromFsFields(map.fields || {});
  }
  return undefined;
}

function fromFsFields(fields: Record<string, Record<string, unknown>>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, fromFsValue(v)]));
}

async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const url = `${BASE}/${collectionName}?key=${API_KEY}&pageSize=100`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`[getPortfolioData] Firestore ${collectionName} → HTTP ${res.status}`);
      return [];
    }
    const json = await res.json();
    if (!json.documents) return [];
    return json.documents.map((d: { fields: Record<string, Record<string, unknown>> }) => fromFsFields(d.fields)) as T[];
  } catch (e) {
    console.error(`Firestore fetch error [${collectionName}]:`, e);
    return [];
  }
}

// ── Public types ───────────────────────────────────────────────────────────────

export type FsExperience = {
  employer: string; role: string; company: string; period: string;
  type: string; description: string; responsibilities: string[];
  tech: string[]; order: number; defaultOpen: boolean; prominent: boolean;
};

export type FsProject = {
  title: string; description: string; tech: string[];
  github: string; demo: string; featured: boolean; order: number;
};

export type FsSkillGroup = { category: string; items: string[]; levels: Record<string, number>; order: number; };

export type FsCert = { name: string; issuer: string; year: string; url?: string; };

// ── Fetchers with fallback ─────────────────────────────────────────────────────

export async function getExperiences(): Promise<typeof fallbackExp> {
  const docs = await fetchCollection<FsExperience>("experiences");
  if (!docs.length) return fallbackExp;
  return docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((d, i) => ({
    id: i + 1,
    employer: d.employer ?? "",
    role: d.role ?? "",
    company: d.company ?? "",
    period: d.period ?? "",
    type: d.type ?? "QA",
    description: d.description ?? "",
    responsibilities: d.responsibilities ?? [],
    tech: d.tech ?? [],
    defaultOpen: d.defaultOpen ?? false,
    prominent: d.prominent ?? false,
  }));
}

export async function getProjects(): Promise<typeof fallbackProj> {
  const docs = await fetchCollection<FsProject>("projects");
  if (!docs.length) return fallbackProj;
  return docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((d, i) => ({
    id: i,
    title: d.title ?? "",
    description: d.description ?? "",
    tech: d.tech ?? [],
    github: d.github ?? "#",
    demo: d.demo ?? "#",
    featured: d.featured ?? false,
    image: "",
  }));
}

export async function getSkills(): Promise<typeof fallbackSkills> {
  const docs = await fetchCollection<FsSkillGroup>("skills");
  if (!docs.length) return fallbackSkills;
  return Object.fromEntries(
    docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(d => [d.category, (d.items ?? []).map(name => ({ name, level: d.levels?.[name] ?? 80 }))])
  ) as typeof fallbackSkills;
}

export async function getCertifications(): Promise<typeof fallbackCerts> {
  const docs = await fetchCollection<FsCert>("certifications");
  if (!docs.length) return fallbackCerts;
  return docs.map(d => ({ name: d.name ?? "", issuer: d.issuer ?? "", year: d.year ?? "" }));
}
