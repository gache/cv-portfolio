"use client";

import { useState } from "react";
import { personal } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Mail, Send, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
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
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(t.contact.errorMsg);
    } finally {
      setSending(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="py-24 bg-surface/50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center w-full justify-center">
          <MessageSquare size={12} />
          {t.contact.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{t.contact.title}</h2>
        <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
          {t.contact.subtitle}
        </p>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-xl border border-pass/30 bg-pass/5">
                <span className="text-4xl mb-4">✓</span>
                <p className="font-semibold text-pass mb-2">{t.contact.sentTitle}</p>
                <p className="text-sm text-text-secondary">{t.contact.sentBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5 font-mono">{t.contact.labelName}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                      placeholder={t.contact.placeholderName}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5 font-mono">{t.contact.labelEmail}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                      placeholder="jean@entreprise.fr"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1.5 font-mono">{t.contact.labelCompany}</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                    placeholder={t.contact.placeholderCompany}
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1.5 font-mono">{t.contact.labelMessage}</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent/60 transition-colors resize-none"
                    placeholder={t.contact.placeholderMessage}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent text-bg font-medium text-sm hover:bg-accent/90 disabled:opacity-60 transition-all duration-200"
                >
                  {sending ? (
                    <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  {sending ? t.contact.sending : t.contact.submit}
                </button>
                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {t.contact.availability}
              </p>
              <div className="flex items-center gap-3 text-sm text-text-secondary mb-2">
                <span className="text-pass">●</span>
                <span>{t.contact.basedIn}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="text-pass">●</span>
                <span>{t.contact.openTo}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border/50 space-y-3">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-surface border border-border/50 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                  <Mail size={14} className="text-accent" />
                </span>
                {personal.email}
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-surface border border-border/50 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                  <LinkedinIcon size={14} className="text-accent" />
                </span>
                LinkedIn — Erick Franco
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-surface border border-border/50 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                  <GithubIcon size={14} className="text-accent" />
                </span>
                GitHub — @erickfranco
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
