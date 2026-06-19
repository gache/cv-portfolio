"use client";

import { useState, useRef } from "react";
import { personal } from "@/data/cv";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Mail, Send, MessageSquare, Check, RotateCcw } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [emailErrorKey, setEmailErrorKey] = useState<"emailRequired" | "emailInvalid" | null>(null);
  const emailErrorMsg = emailErrorKey ? t.contact[emailErrorKey] : "";
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const isFormValid =
    values.name.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) &&
    values.message.trim() !== "";

  const validateEmail = (value: string) => {
    if (!value) { setEmailErrorKey("emailRequired"); return false; }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailErrorKey(valid ? null : "emailInvalid");
    return valid;
  };

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
    const hasNameErr = !data.name;
    const hasMsgErr = !data.message;
    const emailOk = validateEmail(data.email);
    setNameError(hasNameErr);
    setMessageError(hasMsgErr);
    if (hasNameErr || hasMsgErr || !emailOk) {
      setSending(false);
      setSubmitAttempted(true);
      if (hasNameErr) nameRef.current?.focus();
      else if (!emailOk) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }
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
                <span className="w-12 h-12 rounded-full bg-pass/20 border border-pass/40 flex items-center justify-center mb-4">
                  <Check size={24} className="text-pass" strokeWidth={2.5} />
                </span>
                <p className="font-semibold text-pass mb-2">{t.contact.sentTitle}</p>
                <p className="text-sm text-text-secondary mb-6">{t.contact.sentBody}</p>
                <button
                  onClick={() => { setSent(false); setValues({ name: "", email: "", message: "" }); setEmailErrorKey(null); setNameError(false); setMessageError(false); setSubmitAttempted(false); }}
                  className="inline-flex items-center gap-2 text-xs text-muted hover:text-text-secondary transition-colors"
                >
                  <RotateCcw size={12} />
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {submitAttempted && (nameError || !!emailErrorKey || messageError) && (
                  <div role="alert" aria-live="assertive" className="rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-3">
                    <p className="text-xs font-medium text-red-400 mb-1.5">{t.contact.errorsTitle}</p>
                    <ul className="space-y-1">
                      {nameError && <li className="text-xs text-red-400/80"><a href="#contact-name" className="underline underline-offset-2 hover:text-red-400 transition-colors">{t.contact.labelName}</a> — {t.contact.emailRequired}</li>}
                      {emailErrorKey && <li className="text-xs text-red-400/80"><a href="#contact-email" className="underline underline-offset-2 hover:text-red-400 transition-colors">{t.contact.labelEmail}</a> — {emailErrorMsg}</li>}
                      {messageError && <li className="text-xs text-red-400/80"><a href="#contact-message" className="underline underline-offset-2 hover:text-red-400 transition-colors">{t.contact.labelMessage}</a> — {t.contact.emailRequired}</li>}
                    </ul>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs text-text-secondary mb-1.5 font-mono">{t.contact.labelName}<span aria-hidden="true" className="text-red-400 ml-0.5">*</span></label>
                    <input
                      ref={nameRef}
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      aria-required="true"
                      autoComplete="name"
                      aria-invalid={nameError ? "true" : undefined}
                      aria-describedby={nameError ? "contact-name-error" : undefined}
                      onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))}
                      onBlur={(e) => setNameError(!e.target.value)}
                      className={`w-full px-3 py-3 rounded-lg bg-surface border text-sm focus:outline-none focus:border-accent transition-colors ${nameError ? "border-red-400/60" : "border-border/50"}`}
                      placeholder={t.contact.placeholderName}
                    />
                    {nameError && (
                      <p id="contact-name-error" role="alert" className="text-xs text-red-400 mt-1">{t.contact.emailRequired}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs text-text-secondary mb-1.5 font-mono">{t.contact.labelEmail}<span aria-hidden="true" className="text-red-400 ml-0.5">*</span></label>
                    <input
                      ref={emailRef}
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      aria-invalid={emailErrorKey ? "true" : undefined}
                      aria-describedby={emailErrorKey ? "contact-email-error" : undefined}
                      onChange={(e) => setValues(v => ({ ...v, email: e.target.value }))}
                      onBlur={(e) => validateEmail(e.target.value)}
                      className={`w-full px-3 py-3 rounded-lg bg-surface border text-sm focus:outline-none focus:border-accent transition-colors ${emailErrorKey ? "border-red-400/60" : "border-border/50"}`}
                      placeholder={t.contact.placeholderEmail}
                    />
                    {emailErrorKey && (
                      <p id="contact-email-error" role="alert" className="text-xs text-red-400 mt-1">{emailErrorMsg}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-xs text-text-secondary mb-1.5 font-mono">{t.contact.labelCompany}</label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    className="w-full px-3 py-3 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder={t.contact.placeholderCompany}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs text-text-secondary mb-1.5 font-mono">{t.contact.labelMessage}<span aria-hidden="true" className="text-red-400 ml-0.5">*</span></label>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    required
                    aria-required="true"
                    name="message"
                    rows={4}
                    autoComplete="off"
                    aria-invalid={messageError ? "true" : undefined}
                    aria-describedby={messageError ? "contact-message-error" : undefined}
                    onChange={(e) => setValues(v => ({ ...v, message: e.target.value }))}
                    onBlur={(e) => setMessageError(!e.target.value)}
                    className={`w-full px-3 py-3 rounded-lg bg-surface border text-sm focus:outline-none focus:border-accent transition-colors resize-none ${messageError ? "border-red-400/60" : "border-border/50"}`}
                    placeholder={t.contact.placeholderMessage}
                  />
                  {messageError && (
                    <p id="contact-message-error" role="alert" className="text-xs text-red-400 mt-1">{t.contact.emailRequired}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={sending || !isFormValid}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent text-bg font-medium text-sm hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {sending ? (
                    <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  {sending ? t.contact.sending : t.contact.submit}
                </button>
                {error && (
                  <p role="alert" className="text-sm text-red-400 text-center">{error}</p>
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
