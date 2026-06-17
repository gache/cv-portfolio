import { personal } from "@/data/cv";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const navLinks = [
  { href: "#apropos", label: "À propos" },
  { href: "#experience", label: "Expérience" },
  { href: "#skills", label: "Skills" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/30 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="font-mono text-lg font-bold text-accent mb-2">EF_</p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              QA Automation Engineer & Java Spring Boot Developer — basé à Lille, France.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="text-muted hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Contact</p>
            <div className="space-y-2">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <Mail size={14} />
                {personal.email}
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <LinkedinIcon size={14} />
                LinkedIn
              </a>
              <a
                href={personal.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-md text-xs font-mono bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition-colors"
              >
                Télécharger CV
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-border/20 flex justify-center">
          <p className="text-xs text-muted font-mono">
            © {new Date().getFullYear()} Erick Franco Delgado — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
