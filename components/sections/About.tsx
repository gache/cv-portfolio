import SectionWrapper from "@/components/ui/SectionWrapper";
import { Shield, Code2, Brain, Rocket } from "lucide-react";

const journey = [
  {
    icon: Shield,
    title: "Support IT & Infrastructure",
    desc: "Début de carrière dans le support technique et l'administration système — bases solides en IT.",
  },
  {
    icon: Code2,
    title: "Développement Full Stack",
    desc: "Évolution vers le développement Java/Spring Boot et Angular dans des contextes bancaires critiques.",
  },
  {
    icon: Shield,
    title: "QA Automation",
    desc: "Spécialisation en automatisation de tests — UFT, Playwright, Cucumber, BDD, contract testing.",
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle",
    desc: "Intégration de l'IA générative dans les workflows : prompt engineering, agents autonomes, IBM AI.",
  },
  {
    icon: Rocket,
    title: "Apprentissage continu",
    desc: "Certifications, side projects, veille techno — toujours en mouvement.",
  },
];

export default function About() {
  return (
    <SectionWrapper id="apropos" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-mono text-accent mb-3 tracking-widest uppercase">À propos</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Du support IT à l&apos;IA —{" "}
              <span className="gradient-text">une trajectoire technique</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Consultant IT chez IBM depuis plusieurs années, j&apos;ai forgé mon expertise dans des environnements exigeants :
              secteur bancaire, e-commerce, luxe et retail. Mon profil hybride <strong className="text-text-primary">QA + Dev</strong> me
              permet de comprendre la qualité logicielle sous tous ses angles — de l&apos;écriture du code à la validation de son comportement.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Convaincu que la qualité n&apos;est pas une phase mais une culture, je m&apos;investis dans l&apos;automatisation intelligente,
              les bonnes pratiques de testing et l&apos;intégration de l&apos;IA générative pour des workflows plus efficaces.
            </p>

            <div className="flex flex-wrap gap-3">
              {["ISTQB", "IBM Certified", "Agile / Scrum", "BDD", "CI/CD"].map((badge) => (
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
                  style={{ animationDelay: `${i * 0.1}s` }}
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
