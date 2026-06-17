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

  const all = [...staticTestimonials, ...kvTestimonials];

  return <TestimonialsClient initialTestimonials={all} />;
}
