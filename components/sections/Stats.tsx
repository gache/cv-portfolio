import { stats } from "@/data/cv";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Stats() {
  return (
    <SectionWrapper id="stats" className="py-16 border-y border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 font-mono">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-text-secondary">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
