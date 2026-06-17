import { blogPosts } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <SectionWrapper id="blog" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center">Blog</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Articles à venir</h2>
        <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
          Retours d&apos;expérience, guides pratiques et explorations techniques.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <a
              key={post.title}
              href={post.slug}
              className="group rounded-xl border border-border/50 bg-surface p-5 card-hover flex flex-col"
            >
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-accent/10 text-accent border border-accent/20 mb-4 w-fit">
                {post.tag}
              </span>
              <h3 className="text-sm font-semibold leading-snug mb-3 group-hover:text-accent transition-colors flex-1">
                {post.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                <span className="text-xs text-muted font-mono">{post.date}</span>
                <span className="text-xs text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lire <ArrowRight size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
