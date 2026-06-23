"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function SkipLink() {
  const { lang } = useLanguage();
  const label =
    lang === "en" ? "Skip to main content" :
    lang === "es" ? "Ir al contenido principal" :
    "Aller au contenu principal";

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-bg focus:font-medium focus:text-sm focus:shadow-lg"
    >
      {label}
    </a>
  );
}
