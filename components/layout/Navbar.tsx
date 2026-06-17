"use client";

import { useState, useEffect } from "react";
import { personal } from "@/data/cv";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/i18n/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { lang, setLang, t } = useLanguage();

  const links = [
    { href: "#apropos", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#skills", label: t.nav.skills },
    { href: "#projets", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["apropos", "experience", "skills", "projets", "contact"];
    const onScroll = () => {
      const threshold = 80;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-sm font-medium text-accent tracking-wider">
          EF<span className="cursor-blink text-accent">_</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm transition-colors duration-200 ${activeSection && l.href === '#' + activeSection ? 'text-accent font-semibold' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-0.5 font-mono text-xs">
            {(["fr", "en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-1.5 py-1 rounded transition-colors uppercase ${
                  lang === l
                    ? "text-accent font-semibold"
                    : "text-muted hover:text-text-secondary"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <span className="w-px h-4 bg-border/60" />
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition-all duration-200"
          >
            {t.nav.downloadCv}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${activeSection && l.href === '#' + activeSection ? 'text-accent font-semibold' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-accent/10 text-accent border border-accent/30 w-fit"
            onClick={() => setOpen(false)}
          >
            {t.nav.downloadCv}
          </a>
          <div className="flex items-center gap-0.5 font-mono text-xs">
            {(["fr", "en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-1.5 py-1 rounded transition-colors uppercase ${
                  lang === l
                    ? "text-accent font-semibold"
                    : "text-muted hover:text-text-secondary"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
