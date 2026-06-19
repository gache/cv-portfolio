"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Shield, Code2, Brain, Rocket, User2 } from "lucide-react";
import { Highlight } from "@/components/ui/Highlight";

const ABOUT_KEYWORDS = ["IBM", "QA + Dev", "Claude 101", "Anthropic", "IA générative", "Generative AI", "IA generativa", "automatisation intelligente", "intelligent automation", "automatización inteligente"];

const journeyIcons = [Shield, Code2, Shield, Brain, Rocket];

export default function About() {
  const { t } = useLanguage();

  const journey = t.about.journey.map((step, i) => ({
    icon: journeyIcons[i],
    title: step.title,
    desc: step.desc,
  }));

  return (
    <SectionWrapper id="apropos" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-mono text-accent mb-3 tracking-widest uppercase">
              <User2 size={12} />
              {t.about.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {t.about.title}{" "}
              <span className="text-accent">{t.about.titleAccent}</span>
            </h2>
            <p className="prose-justify text-text-secondary leading-relaxed mb-6">
              <Highlight text={t.about.p1} words={ABOUT_KEYWORDS} />
            </p>
            <p className="prose-justify text-text-secondary leading-relaxed mb-8">
              <Highlight text={t.about.p2} words={ABOUT_KEYWORDS} />
            </p>

            <div className="flex flex-wrap gap-3">
              {t.about.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-md text-xs font-mono bg-accent/10 text-accent border border-accent/20"
                >
                  {badge}
                </span>
              ))}
            </div>

          </div>

          {/* Right — journey */}
          <div className="space-y-5">
            {journey.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-4 p-4 rounded-lg border border-border/50 bg-surface/50 card-hover"
                  style={{
                    opacity: 0,
                    animation: `slideUpFade 0.4s ease ${i * 0.1}s forwards`,
                  }}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
