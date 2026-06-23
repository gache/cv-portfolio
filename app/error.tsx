"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("[AppError]", error);
  }, [error]);

  return (
    <div className="min-h-dvh bg-bg flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="font-mono text-accent text-xs tracking-widest uppercase mb-3">Erreur</p>
        <h1 className="text-2xl font-bold mb-2">Quelque chose s'est mal passé</h1>
        <p className="text-sm text-muted mb-6">
          Une erreur inattendue s'est produite. Réessayez ou revenez plus tard.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-accent text-bg text-sm font-semibold hover:bg-accent/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
