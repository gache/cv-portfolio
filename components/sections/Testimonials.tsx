"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { X, Send } from "lucide-react";

type Testimonial = { name: string; role: string; company: string; text: string };

function TestimonialModal({ onClose }: { onClose: () => void }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      text: (form.elements.namedItem("text") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Erreur d'envoi. Réessayez.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h3 className="font-semibold">Laisser un témoignage</h3>
          <button onClick={onClose} className="text-muted hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {sent ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">✓</span>
              <p className="font-semibold text-pass mb-2">Merci pour ton témoignage !</p>
              <p className="text-sm text-text-secondary">Il sera ajouté au site prochainement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-text-secondary mb-1.5 font-mono">Nom *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                    placeholder="Marie L."
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1.5 font-mono">Poste *</label>
                  <input
                    type="text"
                    name="role"
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                    placeholder="Tech Lead"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1.5 font-mono">Entreprise</label>
                <input
                  type="text"
                  name="company"
                  className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                  placeholder="Nom de l'entreprise"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1.5 font-mono">Témoignage *</label>
                <textarea
                  name="text"
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent/60 transition-colors resize-none"
                  placeholder="Décris ton expérience de travail avec Erick..."
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent text-bg font-medium text-sm hover:bg-accent/90 disabled:opacity-60 transition-all"
              >
                {sending ? (
                  <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {sending ? "Envoi..." : "Envoyer"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SectionWrapper id="temoignages" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center">Témoignages</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Ce que disent mes collègues</h2>
          <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
            Retours de collaborateurs avec qui j&apos;ai travaillé sur des projets réels.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {initialTestimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border/50 bg-surface p-6 flex flex-col gap-4 card-hover"
              >
                <span className="text-3xl text-accent/40 font-serif leading-none select-none">&ldquo;</span>
                <p className="text-sm text-text-secondary leading-relaxed flex-1 -mt-2">{t.text}</p>
                <div className="pt-4 border-t border-border/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-accent">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-4">Vous avez travaillé avec moi ?</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-200"
            >
              Laisser un témoignage
            </button>
          </div>
        </div>
      </SectionWrapper>

      {modalOpen && <TestimonialModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
