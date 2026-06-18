"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { X, Send, MessageSquare, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Testimonial = { name: string; role: string; company: string; text: string };

function QuoteIcon() {
  return (
    <svg width="28" height="22" viewBox="0 0 36 28" fill="none" aria-hidden="true">
      <path
        d="M0 28V16.8C0 7.467 5.6 1.867 16.8 0L18.667 2.8C12.133 4.367 8.867 7.933 8.4 13.067H15.867V28H0ZM21.467 28V16.8C21.467 7.467 27.067 1.867 38.267 0L40.133 2.8C33.6 4.367 30.333 7.933 29.867 13.067H37.333V28H21.467Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div
      className="group rounded-xl border border-border/30 bg-surface/60 p-6 flex flex-col gap-5 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_8px_32px_rgba(129,140,248,0.08)] transition-all duration-300"
      style={{ animation: `slideUpFade 0.4s ease ${index * 100}ms both` }}
    >
      <div className="text-accent/20 group-hover:text-accent/40 transition-colors duration-300">
        <QuoteIcon />
      </div>

      <p className="text-sm text-text-secondary leading-relaxed flex-1">
        {testimonial.text}
      </p>

      <div className="pt-4 border-t border-border/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-accent font-mono">
            {testimonial.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary leading-tight">{testimonial.name}</p>
          <p className="text-xs text-muted mt-0.5">
            {testimonial.role}
            {testimonial.company ? ` · ${testimonial.company}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [values, setValues] = useState({ name: "", role: "", text: "" });
  const isFormValid = values.name.trim() !== "" && values.role.trim() !== "" && values.text.trim() !== "";

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
    const hasNameErr = !data.name;
    const hasRoleErr = !data.role;
    const hasTextErr = !data.text;
    setNameError(hasNameErr);
    setRoleError(hasRoleErr);
    setTextError(hasTextErr);
    if (hasNameErr || hasRoleErr || hasTextErr) { setSending(false); return; }
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(t.testimonials.errorMsg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h3 className="font-semibold">{t.testimonials.modalTitle}</h3>
          <button onClick={onClose} className="text-muted hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-pass/10 border border-pass/20 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-pass" strokeWidth={2.5} />
              </div>
              <p className="font-semibold text-text-primary mb-2">{t.testimonials.thankYouTitle}</p>
              <p className="text-sm text-text-secondary">{t.testimonials.thankYouBody}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="t-name" className="block text-xs text-text-secondary mb-1.5 font-mono">
                    {t.testimonials.labelName}<span aria-hidden="true" className="text-red-400 ml-0.5">*</span>
                  </label>
                  <input
                    id="t-name"
                    type="text"
                    name="name"
                    required
                    aria-required="true"
                    autoComplete="name"
                    aria-invalid={nameError ? "true" : undefined}
                    aria-describedby={nameError ? "t-name-error" : undefined}
                    onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))}
                    onBlur={(e) => setNameError(!e.target.value)}
                    className={`w-full px-3 py-3 rounded-lg bg-elevated border text-sm focus:outline-none focus:border-accent transition-colors ${nameError ? "border-red-400/60" : "border-border/50"}`}
                    placeholder={t.testimonials.placeholderName}
                  />
                  {nameError && (
                    <p id="t-name-error" role="alert" className="text-xs text-red-400 mt-1">{t.contact.emailRequired}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="t-role" className="block text-xs text-text-secondary mb-1.5 font-mono">
                    {t.testimonials.labelRole}<span aria-hidden="true" className="text-red-400 ml-0.5">*</span>
                  </label>
                  <input
                    id="t-role"
                    type="text"
                    name="role"
                    required
                    aria-required="true"
                    autoComplete="organization-title"
                    aria-invalid={roleError ? "true" : undefined}
                    aria-describedby={roleError ? "t-role-error" : undefined}
                    onChange={(e) => setValues(v => ({ ...v, role: e.target.value }))}
                    onBlur={(e) => setRoleError(!e.target.value)}
                    className={`w-full px-3 py-3 rounded-lg bg-elevated border text-sm focus:outline-none focus:border-accent transition-colors ${roleError ? "border-red-400/60" : "border-border/50"}`}
                    placeholder={t.testimonials.placeholderRole}
                  />
                  {roleError && (
                    <p id="t-role-error" role="alert" className="text-xs text-red-400 mt-1">{t.contact.emailRequired}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="t-company" className="block text-xs text-text-secondary mb-1.5 font-mono">
                  {t.testimonials.labelCompany}
                </label>
                <input
                  id="t-company"
                  type="text"
                  name="company"
                  autoComplete="organization"
                  className="w-full px-3 py-3 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder={t.testimonials.placeholderCompany}
                />
              </div>
              <div>
                <label htmlFor="t-text" className="block text-xs text-text-secondary mb-1.5 font-mono">
                  {t.testimonials.labelText}<span aria-hidden="true" className="text-red-400 ml-0.5">*</span>
                </label>
                <textarea
                  id="t-text"
                  name="text"
                  required
                  aria-required="true"
                  rows={4}
                  autoComplete="off"
                  aria-invalid={textError ? "true" : undefined}
                  aria-describedby={textError ? "t-text-error" : undefined}
                  onChange={(e) => setValues(v => ({ ...v, text: e.target.value }))}
                  onBlur={(e) => setTextError(!e.target.value)}
                  className={`w-full px-3 py-3 rounded-lg bg-elevated border text-sm focus:outline-none focus:border-accent transition-colors resize-none ${textError ? "border-red-400/60" : "border-border/50"}`}
                  placeholder={t.testimonials.placeholderText}
                />
                {textError && (
                  <p id="t-text-error" role="alert" className="text-xs text-red-400 mt-1">{t.contact.emailRequired}</p>
                )}
              </div>
              {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={sending || !isFormValid}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent text-bg font-medium text-sm hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {sending ? (
                  <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {sending ? t.testimonials.sending : t.testimonials.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SectionWrapper id="temoignages" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="inline-flex items-center gap-1.5 text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center w-full justify-center">
            <MessageSquare size={12} />
            {t.testimonials.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {t.testimonials.title}
          </h2>
          <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
            {t.testimonials.subtitle}
          </p>

          {initialTestimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {initialTestimonials.map((testimonial, i) => (
                <TestimonialCard
                  key={`${testimonial.name}-${i}`}
                  testimonial={testimonial}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-12">
              <div className="w-14 h-14 rounded-full bg-accent/5 border border-border/30 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={20} className="text-accent/30" />
              </div>
              <p className="text-sm text-muted">{t.testimonials.emptyState}</p>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-text-secondary mb-4">{t.testimonials.ctaQuestion}</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-200"
            >
              {t.testimonials.cta}
            </button>
          </div>
        </div>
      </SectionWrapper>

      {modalOpen && <TestimonialModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
