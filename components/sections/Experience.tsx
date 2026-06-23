"use client";

import { useState, useMemo } from "react";
import { experiences as fallback } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ChevronDown, ChevronRight, ShieldCheck, Code2, Settings, Monitor, Users, Briefcase } from "lucide-react"; // ChevronRight used in mission expand
import { useLanguage } from "@/contexts/LanguageContext";
import { Highlight } from "@/components/ui/Highlight";

const EXP_KEYWORDS = [
  "UFT", "Playwright", "Squash", "Squash TM", "Jira", "Confluence",
  "Spring Boot", "Angular", "JUnit", "Mockito", "Sonar",
  "Kafka", "Pact", "Cucumber", "Postman", "Newman", "Elastic",
  "GitLab", "Azure DevOps", "CI/CD", "BDD", "Scrum", "Kanban",
  "EasyVista", "LDAP", "Infor M3",
];

const typeStyle: Record<string, { pill: string; dot: string; icon: React.ElementType }> = {
  QA:    { pill: "bg-pass/10 text-pass border-pass/30",                   dot: "bg-pass",       icon: ShieldCheck },
  Dev:   { pill: "bg-accent/10 text-accent border-accent/30",             dot: "bg-accent",     icon: Code2 },
  Admin: { pill: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30", dot: "bg-yellow-400", icon: Settings },
  IT:    { pill: "bg-sky-400/10 text-sky-400 border-sky-400/30",          dot: "bg-sky-400",    icon: Monitor },
  Asso:  { pill: "bg-rose-400/10 text-rose-400 border-rose-400/30",       dot: "bg-rose-400",   icon: Users },
};

// Fix 3: single source of truth for "currently employed" detection
const IS_PRESENT_RE = /présent|present|actual|actuel/i;

type ExpItem = (typeof fallback)[number] & { order?: number };
type ExpList = ExpItem[];
type EmployerMetaEntry = { period: string; label: string; sortKey: number };

function buildEmployerMeta(
  allGroups: Map<string, ExpList>
): Record<string, EmployerMetaEntry> {
  const map: Record<string, EmployerMetaEntry> = {};
  allGroups.forEach((list, employer) => {
    const periods = list.map(e => e.period ?? "");
    const years = periods.flatMap(p => p.match(/\d{4}/g) ?? []).map(Number).filter(Boolean);
    const minYear = years.length ? Math.min(...years) : null;
    const maxYear = years.length ? Math.max(...years) : 0;
    const hasPresent = periods.some(p => IS_PRESENT_RE.test(p));
    const periodStr = minYear
      ? hasPresent ? `${minYear} — Présent` : years.length > 1 ? `${minYear} — ${maxYear}` : `${minYear}`
      : "";
    // Fix 4: most-recent mission = lowest order value
    const recent = list.reduce((a, b) => ((a.order ?? 0) <= (b.order ?? 0) ? a : b));
    const label = [recent.company, recent.type].filter(Boolean).join(" · ");
    const sortKey = (hasPresent ? 100000 : 0) + maxYear;
    map[employer] = { period: periodStr, label, sortKey };
  });
  return map;
}


function groupByEmployer(exps: ExpList) {
  const map = new Map<string, ExpList>();
  for (const e of exps) {
    const key = e.employer ?? "Autre";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return map;
}

function EmployerCard({
  employer,
  exps,
  openExp,
  setOpenExp,
  defaultOpen = false,
  prominent = false,
  employerMeta,
}: {
  employer: string;
  exps: ExpList;
  openExp: number | null;
  setOpenExp: (id: number | null) => void;
  defaultOpen?: boolean;
  prominent?: boolean;
  employerMeta: Record<string, EmployerMetaEntry>;
}) {
  const [collapsed, setCollapsed] = useState(!defaultOpen);
  const { lang } = useLanguage();
  const currentLabel = lang === "en" ? "Current" : lang === "es" ? "Actual" : "Actuel";
  const meta = employerMeta[employer];
  const isCurrent = IS_PRESENT_RE.test(meta?.period ?? "");

  const borderClass = prominent
    ? "border-accent/60 shadow-[0_0_20px_rgba(129,140,248,0.12)] hover:shadow-[0_0_30px_rgba(129,140,248,0.2)]"
    : "border-border/50 hover:border-accent/35 hover:shadow-[0_0_16px_rgba(129,140,248,0.08)]";

  return (
    <div className={`rounded-xl border bg-surface/60 overflow-hidden transition-all duration-250 hover:-translate-y-0.5 ${borderClass}`}>
      {/* Employer header */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className={`w-full text-left flex items-center justify-between gap-3 px-4 transition-colors ${
          prominent ? "py-4 hover:bg-accent/5" : "py-3 hover:bg-elevated/40"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
          <span className={`font-bold flex-shrink-0 ${prominent ? "text-base" : "text-sm"}`}>{employer}</span>
          {meta && <span className="text-xs text-muted hidden sm:inline truncate">{meta.label}</span>}
          {isCurrent && (
            <span className="flex items-center gap-1 text-xs text-pass font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-pass animate-pulse" />
              {currentLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {meta && <span className="text-xs font-mono text-muted">{meta.period}</span>}
          <span className="text-xs font-mono bg-elevated/80 border border-border/40 px-1.5 py-0.5 rounded text-muted">
            {exps.length}
          </span>
          <ChevronDown size={13} className={`text-muted transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`} />
        </div>
      </button>

      {/* Missions */}
      {!collapsed && (
        <div className="border-t border-border/30 divide-y divide-border/20 animate-fade-in">
          {exps.map((exp) => {
            const colors = typeStyle[exp.type] ?? typeStyle["Dev"];
            const isOpen = openExp === exp.id;
            return (
              <div key={exp.id}>
                <button
                  className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-elevated/30 transition-colors"
                  onClick={() => setOpenExp(isOpen ? null : exp.id)}
                >
                  <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold leading-tight mb-0.5">{exp.role}</p>
                    {exp.company !== employer && (
                      <p className="text-sm text-text-secondary mb-1.5">{exp.company}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono font-semibold border ${colors.pill}`}>
                        <colors.icon size={10} />
                        {exp.type}
                      </span>
                      <span className="text-xs text-muted font-mono">{exp.period}</span>
                    </div>
                    {!isOpen && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {exp.tech.slice(0, 3).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-xs font-mono bg-elevated text-muted border border-border/40">
                            {t}
                          </span>
                        ))}
                        {exp.tech.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-xs font-mono bg-elevated text-muted border border-border/40">
                            +{exp.tech.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <ChevronRight size={13} className={`text-muted flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 bg-elevated/20 animate-fade-in">
                    <p className="prose-justify text-sm text-text-secondary leading-relaxed mb-3 pl-3 border-l-2 border-accent/40 italic">
                      <Highlight text={exp.description} words={EXP_KEYWORDS} />
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {exp.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2.5 text-sm text-text-secondary">
                          <span className="text-pass font-mono text-xs mt-0.5 flex-shrink-0">✓</span>
                          <span className="leading-relaxed"><Highlight text={r} words={EXP_KEYWORDS} /></span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-border/30">
                      <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs font-mono bg-elevated text-text-secondary border border-border/50 hover:border-accent/40 transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Experience({ experiences = fallback }: { experiences?: typeof fallback }) {
  const { t } = useLanguage();

  const translatedExps = useMemo(() => experiences.map((exp) => {
    // Match by role string only — never by numeric id (sequential ids from Firestore collide with cv.ts ids)
    const tr = t.experience.items.find(
      (item) => item.role?.toLowerCase() === exp.role?.toLowerCase()
    );
    return {
      ...exp,
      // Only apply translated role if it matches the same base role (avoid cross-entry pollution)
      role: tr ? (tr.role ?? exp.role) : exp.role,
      // Firestore data takes priority — only fall back to cv.ts translation if field is empty
      description: exp.description || tr?.description || "",
      responsibilities: exp.responsibilities?.length ? exp.responsibilities : (tr?.responsibilities ?? []),
    };
  }), [experiences, t]);

  const allGroups = useMemo(() => groupByEmployer(translatedExps), [translatedExps]);
  const employerMeta = useMemo(() => buildEmployerMeta(allGroups), [allGroups]);
  const [openExpDesktop, setOpenExpDesktop] = useState<number | null>(null);
  const [openExpMobile, setOpenExpMobile] = useState<number | null>(null);

  // Fix 5: sortKey comes directly from buildEmployerMeta — no re-parsing of strings
  const allGroupsList = useMemo(() =>
    [...allGroups.entries()]
      .sort((a, b) => (employerMeta[b[0]]?.sortKey ?? 0) - (employerMeta[a[0]]?.sortKey ?? 0))
      .map(([employer, exps]) => [employer, exps] as [string, ExpList]),
    [allGroups, employerMeta]
  );

  return (
    <SectionWrapper id="experience" className="py-24 bg-surface/50">
      <div className="max-w-5xl mx-auto px-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center w-full justify-center">
          <Briefcase size={12} />
          {t.experience.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{t.experience.title}</h2>
        <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
          {t.experience.subtitle}
        </p>

        {/* Desktop: center-line alternating */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent" />

          <div className="space-y-10">
            {allGroupsList.map(([employer, exps], i) => {
              const isLeft = i % 2 === 0;
              const isCurrent = IS_PRESENT_RE.test(employerMeta[employer]?.period ?? "");

              return (
                <div key={employer} className="relative grid grid-cols-2 gap-10 items-start">
                  <div className="absolute left-1/2 top-5 -translate-x-1/2 z-10">
                    <div className={`rounded-full border-2 border-bg ${
                      isCurrent
                        ? "w-4 h-4 bg-accent shadow-[0_0_16px_rgba(129,140,248,0.7)]"
                        : "w-3 h-3 bg-muted/60"
                    }`} />
                  </div>

                  {/* Fix #5: empty div for unused slot — avoid mounting card twice */}
                  {isLeft ? (
                    <EmployerCard
                      employer={employer}
                      exps={exps}
                      openExp={openExpDesktop}
                      setOpenExp={setOpenExpDesktop}
                      defaultOpen={isCurrent}
                      prominent={isCurrent}
                      employerMeta={employerMeta}
                    />
                  ) : <div />}
                  {!isLeft ? (
                    <EmployerCard
                      employer={employer}
                      exps={exps}
                      openExp={openExpDesktop}
                      setOpenExp={setOpenExpDesktop}
                      defaultOpen={isCurrent}
                      prominent={isCurrent}
                      employerMeta={employerMeta}
                    />
                  ) : <div />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden space-y-2">
          {allGroupsList.map(([employer, exps], i) => {
            const isCurrent = IS_PRESENT_RE.test(employerMeta[employer]?.period ?? "");
            const isLast = i === allGroupsList.length - 1;
            return (
              <div key={employer} className="flex gap-3">
                {/* Timeline spine */}
                <div className="flex flex-col items-center flex-shrink-0 w-4">
                  <div className={`rounded-full flex-shrink-0 mt-4 ${isCurrent ? "w-3.5 h-3.5 bg-accent shadow-[0_0_10px_rgba(129,140,248,0.6)]" : "w-2.5 h-2.5 bg-muted/60"}`} />
                  {!isLast && <div className="flex-1 w-px bg-gradient-to-b from-accent/40 to-transparent mt-1" />}
                </div>
                {/* Card */}
                <div className="flex-1 pb-4">
                  <EmployerCard
                    employer={employer}
                    exps={exps}
                    openExp={openExpMobile}
                    setOpenExp={setOpenExpMobile}
                    defaultOpen={isCurrent}
                    prominent={isCurrent}
                    employerMeta={employerMeta}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
}
