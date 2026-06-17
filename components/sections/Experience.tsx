"use client";

import { useState } from "react";
import { experiences } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ChevronDown, ChevronRight } from "lucide-react"; // ChevronRight used in mission expand
import { useLanguage } from "@/contexts/LanguageContext";

const typeStyle: Record<string, { pill: string; dot: string }> = {
  QA:    { pill: "bg-pass/10 text-pass border-pass/30",                   dot: "bg-pass" },
  Dev:   { pill: "bg-accent/10 text-accent border-accent/30",             dot: "bg-accent" },
  Admin: { pill: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30", dot: "bg-yellow-400" },
  IT:    { pill: "bg-sky-400/10 text-sky-400 border-sky-400/30",          dot: "bg-sky-400" },
  Asso:  { pill: "bg-rose-400/10 text-rose-400 border-rose-400/30",       dot: "bg-rose-400" },
};

const employerMeta: Record<string, { period: string; label: string }> = {
  IBM:             { period: "2021 — Présent", label: "ESN · Consultant" },
  "Auchan Retail": { period: "2019",           label: "Mission directe · Dev" },
  Modis:           { period: "2017 — 2020",    label: "ESN · Support IT" },
  TEJE:            { period: "2012 — 2017",    label: "Association" },
  Oidhaco:         { period: "2015",           label: "ONG · Mission internationale" },
};

const TECH_EMPLOYERS = ["IBM", "Auchan Retail", "Modis"];
const OTHER_EMPLOYERS = ["TEJE", "Oidhaco"];

function groupByEmployer(exps: typeof experiences) {
  const map = new Map<string, typeof experiences>();
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
}: {
  employer: string;
  exps: typeof experiences;
  openExp: number | null;
  setOpenExp: (id: number | null) => void;
  defaultOpen?: boolean;
  prominent?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(!defaultOpen);
  const { lang } = useLanguage();
  const currentLabel = lang === "en" ? "Current" : lang === "es" ? "Actual" : "Actuel";
  const meta = employerMeta[employer];
  const isCurrent = employer === "IBM";

  const borderClass = prominent
    ? "border-accent/60 shadow-[0_0_20px_rgba(129,140,248,0.12)]"
    : "border-border/50";

  return (
    <div className={`rounded-xl border bg-surface/60 overflow-hidden transition-all duration-200 ${borderClass}`}>
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
                    <p className="text-base font-bold leading-tight mb-1">{exp.role}</p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-mono font-semibold border ${colors.pill}`}>
                        {exp.type}
                      </span>
                      <span className="text-xs text-muted font-mono">{exp.period}</span>
                      <span className="text-xs text-muted">·</span>
                      <span className="text-xs text-text-secondary">{exp.company}</span>
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
                      {exp.description}
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {exp.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2.5 text-sm text-text-secondary">
                          <span className="text-pass font-mono text-xs mt-0.5 flex-shrink-0">✓</span>
                          <span className="leading-relaxed">{r}</span>
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

export default function Experience() {
  const { t } = useLanguage();

  const translatedExps = experiences.map((exp) => {
    const tr = t.experience.items.find((item) => item.id === exp.id);
    return {
      ...exp,
      role: tr?.role ?? exp.role,
      description: tr?.description ?? exp.description,
      responsibilities: tr?.responsibilities ?? exp.responsibilities,
    };
  });

  const allGroups = groupByEmployer(translatedExps);
  // Fix #4: separate state per layout to avoid invisible duplicate interactions
  const [openExpDesktop, setOpenExpDesktop] = useState<number | null>(null);
  const [openExpMobile, setOpenExpMobile] = useState<number | null>(null);

  const allGroupsList = [...TECH_EMPLOYERS, ...OTHER_EMPLOYERS]
    .map((e) => [e, allGroups.get(e)] as [string, typeof experiences])
    .filter(([, exps]) => exps !== undefined);

  return (
    <SectionWrapper id="experience" className="py-24 bg-surface/20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center">{t.experience.eyebrow}</p>
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
              const isIBM = employer === "IBM";

              return (
                <div key={employer} className="relative grid grid-cols-2 gap-10 items-start">
                  <div className="absolute left-1/2 top-5 -translate-x-1/2 z-10">
                    <div className={`rounded-full border-2 border-bg ${
                      isIBM
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
                      defaultOpen={isIBM}
                      prominent={isIBM}
                    />
                  ) : <div />}
                  {!isLeft ? (
                    <EmployerCard
                      employer={employer}
                      exps={exps}
                      openExp={openExpDesktop}
                      setOpenExp={setOpenExpDesktop}
                      defaultOpen={false}
                      prominent={false}
                    />
                  ) : <div />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent" />
          <div className="space-y-4">
            {allGroupsList.map(([employer, exps]) => {
              const isIBM = employer === "IBM";
              return (
                <div key={employer} className="relative">
                  <div className={`absolute -left-5 top-4 rounded-full border-2 border-bg ${isIBM ? "w-4 h-4 bg-accent" : "w-3 h-3 bg-muted/60"}`} />
                  <EmployerCard
                    employer={employer}
                    exps={exps}
                    openExp={openExpMobile}
                    setOpenExp={setOpenExpMobile}
                    defaultOpen={isIBM}
                    prominent={isIBM}
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
