"use client";

import { personal } from "@/data/cv";
import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-b from-surface/20 to-transparent">
      {/* Gradient separator — blends from contact's bg-surface/50 */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      {/* Main bar */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left — identity */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5" aria-label={`Erick Franco — ${t.nav.backToTop}`}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/40">
                <span className="font-mono font-bold text-xs text-accent">EF</span>
              </div>
              <span className="font-mono text-base font-semibold text-accent">Erick Franco</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 text-[13px] font-mono text-muted">
              <span className="w-px h-4 bg-border/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-pass animate-pulse ml-2" />
              {t.footer.available}
            </span>
          </div>

          {/* Right — CV download only (social links already in Contact) */}
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg bg-accent text-bg text-xs font-mono font-semibold hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Download size={13} />
            {t.nav.downloadCv}
          </a>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-border/20 py-4">
        <p className="text-center text-[13px] font-mono text-muted">
          © {new Date().getFullYear()} Erick Franco Delgado — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
