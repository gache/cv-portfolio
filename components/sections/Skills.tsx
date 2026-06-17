"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";

const categoryOrder = ["Test Automation", "Backend", "Frontend", "DevOps & Outils", "Intelligence Artificielle"];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Test Automation");
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const currentSkills = skills[activeCategory as keyof typeof skills] ?? [];

  return (
    <SectionWrapper id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center">Compétences</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Stack technique</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          Expertise construite sur des projets réels en environnements critiques.
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setAnimated(false); setTimeout(() => setAnimated(true), 50); }}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-bg font-medium"
                  : "bg-surface border border-border/50 text-text-secondary hover:border-accent/40 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div ref={ref} className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {currentSkills.map((skill, i) => (
            <div
              key={skill.name}
              className="p-4 rounded-lg border border-border/50 bg-surface/50"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-medium font-mono">{skill.name}</span>
                <span className="text-xs text-muted font-mono">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-dark transition-all duration-1000 ease-out"
                  style={{
                    width: animated ? `${skill.level}%` : "0%",
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
