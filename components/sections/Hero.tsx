"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { personal } from "@/data/cv";
import { ArrowDown, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Highlight } from "@/components/ui/Highlight";

const HERO_KEYWORDS = ["IBM", "QA Automation", "Claude 101", "Anthropic", "Playwright", "UFT"];

const LINE_COLORS = ["text-muted", "text-pass", "text-pass", "text-pass", "", "text-accent"];

function PhotoBlock({
  photoError,
  setPhotoError,
}: {
  photoError: boolean;
  setPhotoError: (v: boolean) => void;
}) {
  return (
    <div className="relative inline-block flex-shrink-0">
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-accent/40 shadow-lg bg-surface">
        {!photoError ? (
          <Image
            src="/images/profile.jpg"
            alt="Erick Franco"
            fill
            className="object-cover object-top"
            onError={() => setPhotoError(true)}
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent/10">
            <span className="font-mono font-bold text-2xl text-accent">EF</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const [typedLines, setTypedLines] = useState<(string | null)[]>(Array(6).fill(null));
  const [animDone, setAnimDone] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    setTypedLines(Array(6).fill(null));
    setAnimDone(false);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const lines = [
      { text: "$ running qualification suite...", delay: 200 },
      { text: "✓ QA Automation Engineer",         delay: 700 },
      { text: "✓ AI Enthusiast — Claude 101",     delay: 1200 },
      { text: "✓ Java/Spring Boot — background",  delay: 1700 },
      { text: "",                                  delay: 2000 },
      { text: t.hero.terminalSuffix,               delay: 2200 },
    ];

    lines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setTypedLines(prev => { const n = [...prev]; n[i] = ""; return n; });
      }, line.delay));

      [...line.text].forEach((_, ci) => {
        timers.push(setTimeout(() => {
          setTypedLines(prev => { const n = [...prev]; n[i] = line.text.slice(0, ci + 1); return n; });
          if (i === lines.length - 1 && ci === line.text.length - 1) setAnimDone(true);
        }, line.delay + (ci + 1) * 22));
      });
    });

    return () => timers.forEach(clearTimeout);
  }, [t.hero.terminalSuffix]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % personal.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-dvh flex items-center grid-bg overflow-hidden">
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-dark/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 lg:py-32 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-xs text-accent font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-pass animate-pulse" />
              {t.hero.available}
            </div>

            {/* Photo inline next to name */}
            <div className="flex flex-wrap items-center gap-4 md:gap-5 mb-4">
              <PhotoBlock photoError={photoError} setPhotoError={setPhotoError} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                <span className="text-text-primary block">Erick</span>
                <span className="text-accent block">Franco</span>
              </h1>
            </div>

            <div className="h-8 mb-6 overflow-hidden">
              <p
                key={titleIndex}
                className="text-lg md:text-xl text-text-secondary font-mono animate-slide-in"
              >
                {personal.titles[titleIndex]}
              </p>
            </div>

            <p className="text-text-secondary leading-relaxed mb-10 max-w-lg">
              <Highlight text={t.hero.description} words={HERO_KEYWORDS} />
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={personal.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-accent text-bg hover:bg-accent/90 transition-all duration-200 font-mono"
              >
                <Download size={16} />
                {t.hero.downloadCv}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border border-accent/30 text-text-primary hover:border-accent/60 hover:text-accent transition-all duration-200"
              >
                <Mail size={16} />
                {t.hero.contactMe}
              </a>
              <a
                href="#experience"
                aria-label={t.hero.seeExperience}
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors duration-200 min-h-[44px]"
              >
                {t.hero.seeExperience}
                <ArrowDown size={14} />
              </a>
            </div>

            {/* Contact links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8">
              <a
                href={`mailto:${personal.email}`}
                aria-label={personal.email}
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-200 font-mono"
              >
                <Mail size={12} />
                <span className="hidden sm:inline">{personal.email}</span>
                <span className="sm:hidden">Email</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-200 font-mono"
              >
                <LinkedinIcon size={12} />
                LinkedIn
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-200 font-mono"
              >
                <GithubIcon size={12} />
                GitHub
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
                {LINE_COLORS.map((color, i) => (
                  <div key={i} className={`leading-relaxed min-h-[1.4em] ${color}`}>
                    {typedLines[i] !== null ? (typedLines[i] || " ") : ""}
                  </div>
                ))}
                <span className={`cursor-blink text-accent ${animDone ? "opacity-60" : ""}`}>▋</span>
              </div>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Playwright", "Claude AI", "UFT", "CI/CD", "Spring Boot", "Angular"].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-elevated/80 text-text-secondary border border-border/50"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#apropos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors animate-nudge"
        aria-label={t.hero.scrollLabel}
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
