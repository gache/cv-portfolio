"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const experience = document.getElementById("experience");
      const threshold = experience
        ? experience.getBoundingClientRect().top + window.scrollY
        : document.body.scrollHeight * 0.3;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      aria-label="Retour en haut"
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20 hover:border-accent/70 hover:shadow-[0_0_12px_rgba(129,140,248,0.3)] flex items-center justify-center transition-all duration-200"
    >
      <ArrowUp size={16} />
    </button>
  );
}
