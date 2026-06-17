import { kv } from "@vercel/kv";
import { testimonials as staticTestimonials } from "@/data/cv";
import TestimonialsClient from "./Testimonials";

type Testimonial = { name: string; role: string; company: string; text: string };

export default async function TestimonialsServer() {
  let kvTestimonials: Testimonial[] = [];

  try {
    const raw = await kv.lrange<Testimonial>("approved_testimonials", 0, -1);
    kvTestimonials = raw ?? [];
  } catch {
    // KV not available — fallback to static only
  }

  // Fix #6: deduplicate by name+text — KV-approved takes precedence over static
  const seen = new Set<string>();
  const all: Testimonial[] = [];
  for (const t of [...kvTestimonials, ...staticTestimonials]) {
    const key = `${t.name}::${t.text}`;
    if (!seen.has(key)) {
      seen.add(key);
      all.push(t);
    }
  }

  return <TestimonialsClient initialTestimonials={all} />;
}
