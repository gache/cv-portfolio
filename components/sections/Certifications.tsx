import { certifications as fallback } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Award } from "lucide-react";

type Cert = { name: string; issuer: string; year: string; url?: string };

export default function Certifications({ certifications = fallback }: { certifications?: Cert[] }) {
  return (
    <SectionWrapper id="certifications" className="py-16 border-y border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono text-accent mb-8 tracking-widest uppercase text-center">Certifications</p>
        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border/50 bg-surface card-hover"
            >
              <Award size={16} className="text-accent flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">{cert.name}</div>
                <div className="text-xs text-muted font-mono">
                  {cert.issuer} · {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
