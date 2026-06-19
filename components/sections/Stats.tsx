"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

const STATS = [
  { value: 6,  suffix: "",  key: "missions" as const },
  { value: 20, suffix: "+", key: "tools"    as const },
  { value: 3,  suffix: "",  key: "languages" as const },
];

export default function Stats() {
  const { t } = useLanguage();

  return (
    <div className="bg-elevated/40 border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6 py-10 flex justify-center gap-8 md:gap-16">
        {STATS.map((stat) => (
          <div key={stat.key} className="text-center px-6 py-4">
            <p className="text-3xl md:text-4xl font-bold font-mono text-accent">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1600} />
            </p>
            <p className="text-xs text-muted mt-1">{t.stats[stat.key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
