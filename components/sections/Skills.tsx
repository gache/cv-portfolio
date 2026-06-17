"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { skills } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";

const categoryOrder = ["Test Automation", "Backend", "Frontend", "DevOps & Outils", "Intelligence Artificielle"];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Test Automation");
  const { t } = useLanguage();

  const currentSkills = skills[activeCategory as keyof typeof skills] ?? [];
  const desc = t.skills.categoryDesc[activeCategory];

  return (
    <SectionWrapper id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center">{t.skills.eyebrow}</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{t.skills.title}</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          {t.skills.subtitle}
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-bg font-medium"
                  : "bg-surface border border-border/50 text-text-secondary hover:border-accent/40 hover:text-text-primary"
              }`}
            >
              {t.skills.categories[cat] ?? cat}
            </button>
          ))}
        </div>

        {/* Tag grid */}
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-muted mb-6 text-center">{desc}</p>
          <div key={activeCategory} className="flex flex-wrap justify-center gap-3">
            {currentSkills.map((skill, i) => {
              const isCore = skill.level >= 85;
              return (
                <span
                  key={skill.name}
                  className={`px-4 py-2 rounded-lg text-sm font-mono ${
                    isCore
                      ? "bg-accent/15 border border-accent/40 text-accent font-medium"
                      : "bg-surface border border-border/50 text-text-secondary"
                  }`}
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.25s ease ${i * 45}ms forwards`,
                  }}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
