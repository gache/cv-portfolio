"use client";

import { useEffect, useState } from "react";
import { personal } from "@/data/cv";
import { ArrowDown, Download, Mail } from "lucide-react";

const terminalLines = [
  { text: "$ running qualification suite...", delay: 200, color: "text-muted" },
  { text: "✓ QA Automation Engineer", delay: 700, color: "text-pass" },
  { text: "✓ Java Spring Boot Developer", delay: 1200, color: "text-pass" },
  { text: "✓ AI Enthusiast", delay: 1700, color: "text-pass" },
  { text: "", delay: 2000, color: "" },
  { text: "3/3 passed · 10+ ans d'expérience", delay: 2200, color: "text-accent" },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % personal.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center grid-bg overflow-hidden">
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-dark/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-xs text-accent font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-pass animate-pulse" />
              Disponible pour de nouvelles missions
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              <span className="text-text-primary">Erick</span>
              <br />
              <span className="gradient-text">Franco</span>
            </h1>

            <div className="h-8 mb-6 overflow-hidden">
              <p
                key={titleIndex}
                className="text-lg md:text-xl text-text-secondary font-mono animate-slide-in"
              >
                {personal.titles[titleIndex]}
              </p>
            </div>

            <p className="text-text-secondary leading-relaxed mb-10 max-w-lg">
              {personal.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={personal.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-accent text-bg hover:bg-accent/90 transition-all duration-200 font-mono"
              >
                <Download size={16} />
                Télécharger CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border border-border hover:border-accent/50 hover:text-accent transition-all duration-200"
              >
                <Mail size={16} />
                Me contacter
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Voir l&apos;expérience
                <ArrowDown size={16} />
              </a>
            </div>
          </div>

          {/* Right — terminal */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.3s", opacity: 0, animation: "fadeIn 0.5s ease 0.3s forwards" }}
          >
            <div className="rounded-xl border border-border/80 bg-surface/80 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-elevated/50">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-auto text-xs text-muted font-mono">qualification.test.ts</span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm min-h-[180px]">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`transition-opacity duration-300 leading-relaxed ${
                      visibleLines.includes(i) ? "opacity-100" : "opacity-0"
                    } ${line.color}`}
                  >
                    {line.text || <br />}
                  </div>
                ))}
                {visibleLines.length < terminalLines.length && (
                  <span className="cursor-blink text-accent">▋</span>
                )}
              </div>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["UFT", "Playwright", "Spring Boot", "Angular", "Claude AI", "CI/CD"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-elevated/80 text-text-secondary border border-border/50"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#apropos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors animate-bounce"
        aria-label="Défiler vers le bas"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
