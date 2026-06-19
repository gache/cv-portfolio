"use client";

import { personal } from "@/data/cv";
import { Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-border/30">
      {/* Main bar */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left — identity */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5" aria-label="Erick Franco — retour en haut">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/40">
                <span className="font-mono font-bold text-xs text-accent">EF</span>
              </div>
              <span className="font-mono text-base font-semibold text-accent">Erick Franco</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted">
              <span className="w-px h-4 bg-border/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-pass animate-pulse ml-2" />
              {t.footer.available}
            </span>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all"
            >
              <Mail size={16} />
            </a>
            <a
              href={personal.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-bg text-xs font-mono font-semibold hover:bg-accent/90 transition-colors ml-1"
            >
              <Download size={13} />
              CV
            </a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-border/20 py-4">
        <p className="text-center text-xs font-mono text-muted">
          © {new Date().getFullYear()} Erick Franco Delgado — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
