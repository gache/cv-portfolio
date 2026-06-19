"use client";

import { useState, useEffect, useRef } from "react";
import { personal } from "@/data/cv";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/i18n/translations";
import { Check } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { lang, setLang, t } = useLanguage();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: "#apropos", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#skills", label: t.nav.skills },
    { href: "#projets", label: t.nav.projects },
    { href: "#hobbies", label: t.nav.hobbies },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const sectionIds = ["apropos", "experience", "skills", "projets", "hobbies", "contact"];
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
        <a
          href="#"
          aria-label="Erick Franco — home"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/40 hover:bg-accent/20 hover:border-accent/70 hover:shadow-[0_0_12px_rgba(129,140,248,0.3)] transition-all duration-200"
        >
          <span className="font-mono font-bold text-sm text-accent select-none tracking-tight">EF</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = activeSection && l.href === '#' + activeSection;
            return (
              <li key={l.href} className="relative pb-1">
                <a
                  href={l.href}
                  className={`text-sm transition-colors duration-200 ${isActive ? 'text-accent font-semibold' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  {l.label}
                </a>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-0.5 font-mono text-xs">
            {(["fr", "en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={`Langue : ${l.toUpperCase()}`}
                aria-pressed={lang === l}
                className={`px-2.5 py-1.5 rounded transition-colors uppercase min-w-[44px] min-h-[44px] flex items-center justify-center ${
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
          ref={hamburgerRef}
          className="md:hidden text-text-secondary p-2.5 rounded-md hover:text-text-primary transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden bg-surface border-b border-border px-6 py-4 flex flex-col gap-4">
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
                aria-label={`Langue : ${l.toUpperCase()}`}
                aria-pressed={lang === l}
                className={`px-2.5 py-1.5 rounded transition-colors uppercase min-w-[44px] min-h-[44px] flex items-center justify-center ${
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
