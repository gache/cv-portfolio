import { projects } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export default function Projects() {
  return (
    <SectionWrapper id="projets" className="py-24 bg-surface/20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center">Projets</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Projets personnels</h2>
        <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
          Side projects construits pour explorer de nouvelles technologies et résoudre de vrais problèmes.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const hasGithub = project.github !== "#";
            const hasDemo = project.demo !== "#";
            const isFeatured = (project as { featured?: boolean }).featured;

            return (
              <div
                key={project.id}
                className={`rounded-xl border bg-surface overflow-hidden card-hover group ${
                  isFeatured ? "border-accent/40 shadow-[0_0_30px_rgba(129,140,248,0.08)]" : "border-border/50"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Image area */}
                <div className="h-44 bg-elevated/80 flex items-center justify-center border-b border-border/50 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${isFeatured ? "from-accent/10 to-accent-dark/20" : "from-accent/5 to-accent-dark/10"}`} />
                  <span className="font-mono text-4xl text-accent/30 select-none">{`{}`}</span>

                  {/* Featured badge */}
                  {isFeatured && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-mono bg-accent text-bg font-semibold">
                      Live ↗
                    </span>
                  )}

                  {/* Links */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <a
                      href={project.github}
                      target={hasGithub ? "_blank" : undefined}
                      rel={hasGithub ? "noopener noreferrer" : undefined}
                      className={`w-7 h-7 rounded-md bg-bg/80 border border-border/50 flex items-center justify-center transition-all ${
                        hasGithub ? "text-muted hover:text-text-primary hover:border-accent/50" : "text-border cursor-default"
                      }`}
                      aria-label="GitHub"
                    >
                      <GithubIcon size={13} />
                    </a>
                    <a
                      href={project.demo}
                      target={hasDemo ? "_blank" : undefined}
                      rel={hasDemo ? "noopener noreferrer" : undefined}
                      className={`w-7 h-7 rounded-md bg-bg/80 border border-border/50 flex items-center justify-center transition-all ${
                        hasDemo ? "text-muted hover:text-text-primary hover:border-accent/50" : "text-border cursor-default"
                      }`}
                      aria-label="Demo"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`px-2 py-0.5 rounded text-xs font-mono border ${
                          t === "Claude Code"
                            ? "bg-accent/10 text-accent border-accent/30"
                            : "bg-elevated text-muted border-border/40"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
