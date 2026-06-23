"use client";

import { useEffect, useState } from "react";
import { Check, X, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: { border: "border-pass/40",         icon: "bg-pass/10 text-pass",         text: "text-pass",         El: Check },
    error:   { border: "border-red-400/40",       icon: "bg-red-400/10 text-red-400",   text: "text-red-400",      El: AlertTriangle },
    info:    { border: "border-accent/40",        icon: "bg-accent/10 text-accent",     text: "text-accent",       El: Check },
    warning: { border: "border-yellow-400/40",    icon: "bg-yellow-400/10 text-yellow-400", text: "text-yellow-400", El: AlertTriangle },
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl border bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${styles.border}`}
    >
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.icon}`}>
        <styles.El size={14} strokeWidth={2.5} />
      </span>
      <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="ml-1 text-muted hover:text-text-secondary transition-colors"
        aria-label="Fermer"
      >
        <X size={13} />
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const show = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
  };

  const hide = () => setToast(null);

  return { toast, show, hide };
}
