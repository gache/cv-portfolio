"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

const STATS = [
  { value: 6,  suffix: "",  label: { fr: "missions IBM", en: "IBM missions", es: "misiones IBM" } },
  { value: 17, suffix: "+", label: { fr: "outils QA & techno", en: "QA tools & tech", es: "herramientas & tech" } },
  { value: 3,  suffix: "",  label: { fr: "langues", en: "languages", es: "idiomas" } },
];

export default function Stats() {
  const { lang } = useLanguage();

  return (
    <div className="bg-elevated/40 border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6 py-10 flex justify-center gap-8 md:gap-16">
        {STATS.map((stat) => (
          <div key={stat.label.fr} className="text-center px-6 py-4">
            <p className="text-3xl md:text-4xl font-bold font-mono text-accent">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1600} />
            </p>
            <p className="text-xs text-muted mt-1">{stat.label[lang]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
